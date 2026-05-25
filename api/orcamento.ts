/**
 * Vercel Serverless Function — POST /api/orcamento
 *
 * Recebe uma submissão do formulário de orçamento e guarda em
 * src/data/orcamentos.json no repositório GitHub via API.
 *
 * Variáveis de ambiente necessárias no Vercel:
 *   GITHUB_TOKEN  — Personal Access Token com permissão "repo" (Contents: write)
 *
 * O repositório e owner estão hardcoded (mesmo repo onde esta função vive).
 */

const GITHUB_OWNER = "dantasdev97";
const GITHUB_REPO = "portfolio-showcase";
const FILE_PATH = "src/data/orcamentos.json";
const GITHUB_API = "https://api.github.com";

interface OrcamentoEntry {
  id: string;
  cliente_nome: string;
  cliente_email?: string;
  cliente_telefone?: string;
  plano_key?: string;
  addons_sel?: string[];
  mensagem?: string;
  created_at: string;
}

function randomId(): string {
  // crypto.randomUUID() is available in modern Node.js (18+) and Edge runtime
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  // Fallback for older environments
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export default async function handler(req: Request): Promise<Response> {
  // CORS headers for same-domain requests (not strictly needed)
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Content-Type": "application/json",
  };

  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), { status: 405, headers });
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: "JSON inválido" }), { status: 400, headers });
  }

  const nome = (body.nome as string | undefined)?.trim();
  if (!nome) {
    return new Response(JSON.stringify({ error: "Nome é obrigatório" }), { status: 400, headers });
  }

  const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
  if (!GITHUB_TOKEN) {
    console.error("GITHUB_TOKEN não configurado");
    return new Response(JSON.stringify({ error: "Configuração do servidor incompleta" }), { status: 500, headers });
  }

  const entry: OrcamentoEntry = {
    id: randomId(),
    cliente_nome: nome,
    ...(body.email && typeof body.email === "string" ? { cliente_email: body.email.trim() } : {}),
    ...(body.telefone && typeof body.telefone === "string" ? { cliente_telefone: body.telefone.trim() } : {}),
    ...(body.plano_key && typeof body.plano_key === "string" ? { plano_key: body.plano_key } : {}),
    ...(Array.isArray(body.addons_sel) && body.addons_sel.length > 0 ? { addons_sel: body.addons_sel as string[] } : {}),
    ...(body.mensagem && typeof body.mensagem === "string" ? { mensagem: body.mensagem.trim() } : {}),
    created_at: new Date().toISOString(),
  };

  const ghHeaders: Record<string, string> = {
    Authorization: `Bearer ${GITHUB_TOKEN}`,
    Accept: "application/vnd.github+json",
    "Content-Type": "application/json",
    "X-GitHub-Api-Version": "2022-11-28",
  };

  // Get current file (may not exist yet)
  let sha: string | undefined;
  let list: OrcamentoEntry[] = [];

  const getRes = await fetch(
    `${GITHUB_API}/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${FILE_PATH}`,
    { headers: ghHeaders }
  );

  if (getRes.ok) {
    const data = (await getRes.json()) as { sha: string; content: string };
    sha = data.sha;
    try {
      const decoded = atob(data.content.replace(/\n/g, ""));
      list = JSON.parse(decoded) as OrcamentoEntry[];
    } catch {
      list = [];
    }
  } else if (getRes.status !== 404) {
    return new Response(JSON.stringify({ error: "Erro ao ler dados existentes" }), { status: 502, headers });
  }

  list.push(entry);

  const newContent = btoa(unescape(encodeURIComponent(JSON.stringify(list, null, 2) + "\n")));

  const putRes = await fetch(
    `${GITHUB_API}/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${FILE_PATH}`,
    {
      method: "PUT",
      headers: ghHeaders,
      body: JSON.stringify({
        message: `feat(orcamentos): pedido de ${entry.cliente_nome}`,
        content: newContent,
        ...(sha ? { sha } : {}),
      }),
    }
  );

  if (!putRes.ok) {
    const errText = await putRes.text().catch(() => "");
    console.error("GitHub PUT failed:", putRes.status, errText);
    return new Response(JSON.stringify({ error: "Erro ao guardar pedido" }), { status: 502, headers });
  }

  return new Response(JSON.stringify({ ok: true, id: entry.id }), { status: 200, headers });
}
