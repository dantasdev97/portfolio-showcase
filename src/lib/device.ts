/**
 * Identificação anónima de dispositivo para o sistema de likes.
 * Não recolhe dados pessoais — apenas um UUID aleatório guardado no navegador.
 */

const DEVICE_KEY = "device-id";
const LIKED_KEY = "liked-projects";

/** Devolve (criando se necessário) o ID anónimo deste dispositivo. */
export function getDeviceId(): string {
  if (typeof window === "undefined") return "";
  let id = localStorage.getItem(DEVICE_KEY);
  if (!id) {
    id =
      typeof crypto !== "undefined" && typeof crypto.randomUUID === "function"
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
    localStorage.setItem(DEVICE_KEY, id);
  }
  return id;
}

function readLikedSet(): Set<string> {
  if (typeof window === "undefined") return new Set();
  try {
    const raw = localStorage.getItem(LIKED_KEY);
    return new Set(raw ? (JSON.parse(raw) as string[]) : []);
  } catch {
    return new Set();
  }
}

/** O dispositivo já deu like a este projeto? (estado local, p/ UI instantânea) */
export function hasLiked(projectId: string): boolean {
  return readLikedSet().has(projectId);
}

/** Marca/desmarca o like local para este projeto. */
export function setLiked(projectId: string, liked: boolean): void {
  if (typeof window === "undefined") return;
  const set = readLikedSet();
  if (liked) set.add(projectId);
  else set.delete(projectId);
  localStorage.setItem(LIKED_KEY, JSON.stringify([...set]));
}
