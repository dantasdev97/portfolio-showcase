/**
 * Vercel Edge Function — /api/likes
 *
 * Likes anónimos por dispositivo, persistidos em GitHub (mesma técnica do /api/orcamento)
 * numa branch dedicada `likes-data` para NÃO disparar redeploy de produção a cada like
 * (produção só faz deploy a partir de `main`).
 *
 * Ficheiro: src/data/likes.json na branch `likes-data`
 * Formato:  { "<projectId>": ["<deviceId>", ...] }
 *
 *   GET  /api/likes?projectId=X            -> { count }
 *   POST /api/likes { projectId, deviceId, action: "like" | "unlike" } -> { count, liked }
 *
 * Variáveis de ambiente (Vercel):
 *   GITHUB_TOKEN — PAT com permissão Contents: write (já usado pelo /api/orcamento)
 */

export const config = { runtime: "edge" };

const OWNER = "dantasdev97";
const REPO = "portfolio-showcase";
const FILE = "src/data/likes.json";
const BRANCH = "likes-data";
const GH = "https://api.github.com";

type LikesMap = Record<string, string[]>;

const JSON_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
  "Content-Type": "application/json",
};

function ghHeaders(token: string): Record<string, string> {
  const h: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
    "User-Agent": "dantasdev-portfolio",
  };
  if (token) h["Authorization"] = `Bearer ${token}`;
  return h;
}

async function readLikes(token: string): Promise<{ map: LikesMap; sha?: string }> {
  const res = await fetch(
    `${GH}/repos/${OWNER}/${REPO}/contents/${FILE}?ref=${BRANCH}`,
    { headers: ghHeaders(token), cache: "no-store" }
  );
  if (res.status === 404) return { map: {} };
  if (!res.ok) throw new Error(`read ${res.status}`);
  const data = (await res.json()) as { sha: string; content: string };
  try {
    const decoded = atob(data.content.replace(/\n/g, ""));
    return { map: JSON.parse(decoded) as LikesMap, sha: data.sha };
  } catch {
    return { map: {}, sha: data.sha };
  }
}

async function writeLikes(token: string, map: LikesMap, sha: string | undefined, msg: string) {
  const content = btoa(unescape(encodeURIComponent(JSON.stringify(map, null, 2) + "\n")));
  return fetch(`${GH}/repos/${OWNER}/${REPO}/contents/${FILE}`, {
    method: "PUT",
    headers: { ...ghHeaders(token), "Content-Type": "application/json" },
    body: JSON.stringify({ message: msg, content, branch: BRANCH, ...(sha ? { sha } : {}) }),
  });
}

export default async function handler(req: Request): Promise<Response> {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: JSON_HEADERS });
  }

  const token = (typeof process !== "undefined" && process.env?.GITHUB_TOKEN) || "";

  // ---- GET: contagem de um projeto ----
  if (req.method === "GET") {
    const projectId = new URL(req.url).searchParams.get("projectId");
    if (!projectId) {
      return new Response(JSON.stringify({ error: "projectId em falta" }), { status: 400, headers: JSON_HEADERS });
    }
    try {
      const { map } = await readLikes(token);
      const count = map[projectId]?.length ?? 0;
      return new Response(JSON.stringify({ count }), {
        status: 200,
        headers: { ...JSON_HEADERS, "Cache-Control": "s-maxage=10, stale-while-revalidate=30" },
      });
    } catch {
      return new Response(JSON.stringify({ error: "Erro ao ler likes" }), { status: 502, headers: JSON_HEADERS });
    }
  }

  // ---- POST: dar / remover like ----
  if (req.method === "POST") {
    if (!token) {
      return new Response(JSON.stringify({ error: "Configuração do servidor incompleta" }), { status: 500, headers: JSON_HEADERS });
    }

    let body: { projectId?: string; deviceId?: string; action?: string };
    try {
      body = (await req.json()) as typeof body;
    } catch {
      return new Response(JSON.stringify({ error: "JSON inválido" }), { status: 400, headers: JSON_HEADERS });
    }

    const { projectId, deviceId, action } = body;
    if (!projectId || !deviceId || (action !== "like" && action !== "unlike")) {
      return new Response(JSON.stringify({ error: "Parâmetros inválidos" }), { status: 400, headers: JSON_HEADERS });
    }

    // Retry em conflito de sha (escritas concorrentes)
    for (let attempt = 0; attempt < 4; attempt++) {
      const { map, sha } = await readLikes(token);
      const set = new Set(map[projectId] ?? []);
      if (action === "like") set.add(deviceId);
      else set.delete(deviceId);
      map[projectId] = [...set];

      const put = await writeLikes(token, map, sha, `chore(likes): ${action} ${projectId}`);
      if (put.ok) {
        return new Response(JSON.stringify({ count: set.size, liked: action === "like" }), { status: 200, headers: JSON_HEADERS });
      }
      if (put.status !== 409) {
        return new Response(JSON.stringify({ error: "Erro ao guardar like" }), { status: 502, headers: JSON_HEADERS });
      }
      // 409 → outro pedido escreveu primeiro; tenta de novo com sha fresco
    }

    return new Response(JSON.stringify({ error: "Conflito persistente, tente novamente" }), { status: 409, headers: JSON_HEADERS });
  }

  return new Response(JSON.stringify({ error: "Method not allowed" }), { status: 405, headers: JSON_HEADERS });
}
