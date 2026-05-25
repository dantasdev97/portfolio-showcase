/**
 * Vercel Edge Function — GET /api/planos
 *
 * Lê src/data/planos.json diretamente do GitHub (sem cache de build).
 * Os preços ficam actualizados em ~3s após o app fazer git push,
 * sem precisar de esperar o Vercel terminar o redeploy.
 *
 * Repos públicos: funciona sem token.
 * Repos privados: adicionar GITHUB_TOKEN nas env vars do Vercel.
 */

export const config = { runtime: "edge" };

const OWNER = "dantasdev97";
const REPO = "portfolio-showcase";
const FILE = "src/data/planos.json";
const BRANCH = "main";

export default async function handler(): Promise<Response> {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
    "User-Agent": "dantasdev-portfolio",
  };

  // Usa token se configurado (necessário para repos privados)
  const token = (typeof process !== "undefined" && process.env?.GITHUB_TOKEN) ?? "";
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const res = await fetch(
    `https://api.github.com/repos/${OWNER}/${REPO}/contents/${FILE}?ref=${BRANCH}`,
    { headers }
  );

  if (!res.ok) {
    return new Response(JSON.stringify({ error: "Não foi possível carregar os planos" }), {
      status: 502,
      headers: { "Content-Type": "application/json" },
    });
  }

  const data = (await res.json()) as { content: string };

  let planos: unknown;
  try {
    const decoded = atob(data.content.replace(/\n/g, ""));
    planos = JSON.parse(decoded);
  } catch {
    return new Response(JSON.stringify({ error: "Erro ao ler planos" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  return new Response(JSON.stringify(planos), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      // Cache de 30s no CDN do Vercel; stale-while-revalidate serve cached enquanto actualiza
      "Cache-Control": "s-maxage=30, stale-while-revalidate=60",
    },
  });
}
