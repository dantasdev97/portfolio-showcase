import projectsData from "./projects.json";

export interface Project {
  id: string;
  title: string;
  category: string;
  tags: string[];
  desc: string;
  fullDescription: string;
  challenges?: string;
  liveUrl?: string;
  gallery: { type: "image" | "video"; url: string; alt?: string; fallback?: string }[];
  technologies: { name: string; iconSrc: string }[];
}

export const categories = ["Todos", "Código", "Vídeos"];

// Fonte de dados gerida pelo app desktop (publica via commit/push neste JSON).
// Os dois projetos iniciais foram migrados para projects.json.
export const projects: Project[] = projectsData as Project[];
