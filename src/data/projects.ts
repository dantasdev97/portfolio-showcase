import { techIcons } from "@/data/techIcons";

export interface Project {
  id: string;
  title: string;
  category: string;
  tags: string[];
  desc: string;
  fullDescription: string;
  challenges?: string;
  gallery: { type: "image" | "video"; url: string; alt?: string }[];
  technologies: { name: string; iconSrc: string }[];
}

export const categories = ["Todos", "Código", "WordPress", "Design"];

export const projects: Project[] = [
  {
    id: "barbearia-of-brothers",
    title: "Barbearia Of Brothers",
    category: "WordPress",
    tags: ["WordPress", "Elementor"],
    desc: "Site profissional para barbearia com agendamento online.",
    fullDescription:
      "O site da Barbearia Of Brothers é um site institucional para uma barbearia localizada no coração de Leiria, Portugal. Ele promove serviços como cortes de cabelo (modernos e tradicionais), cuidados com a barba e design de sobrancelhas, destacando a experiência de mais de 10 anos do líder, Vitor Chagas, e uma equipe de três profissionais especializados. O foco é oferecer uma experiência única e relaxante, utilizando produtos de alta qualidade, com uma chamada à ação para agendar uma visita.",
    challenges: "Desafios: Sites em WordPress podem ser limitados para funcionalidades mais complexas.",
    gallery: [
      { type: "image", url: "https://images.unsplash.com/photo-1585747860019-8083262d40e8?w=800", alt: "Barbearia interior" },
      { type: "image", url: "https://images.unsplash.com/photo-1503951914875-452b59e3bb21?w=800", alt: "Corte de cabelo" },
    ],
    technologies: [
      { name: "WordPress", iconSrc: techIcons.WordPress },
      { name: "Elementor", iconSrc: techIcons.Elementor },
      { name: "MongoDB", iconSrc: techIcons.MongoDB },
      { name: "Express", iconSrc: techIcons.Express },
      { name: "Node.js", iconSrc: techIcons["Node.js"] },
    ],
  },
  {
    id: "mens-concept-barbershop",
    title: "Mens Concept Barbershop",
    category: "WordPress",
    tags: ["WordPress", "Elementor"],
    desc: "Landing page para agendamento e serviços.",
    fullDescription:
      "Landing page moderna e responsiva desenvolvida para a Mens Concept Barbershop, focada em conversão e agendamento online. O design prioriza a apresentação dos serviços e a facilidade de navegação para os clientes.",
    gallery: [
      { type: "image", url: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=800", alt: "Barbershop" },
    ],
    technologies: [
      { name: "WordPress", iconSrc: techIcons.WordPress },
      { name: "Elementor", iconSrc: techIcons.Elementor },
    ],
  },
  {
    id: "dashboard-analytics",
    title: "Dashboard Analytics",
    category: "Código",
    tags: ["React", "TypeScript"],
    desc: "Painel de controle com gráficos e métricas.",
    fullDescription:
      "Dashboard completo desenvolvido em React com TypeScript, apresentando gráficos interativos, métricas em tempo real e filtros avançados. A interface foi projetada para facilitar a análise de dados de forma intuitiva e eficiente.",
    gallery: [
      { type: "image", url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800", alt: "Dashboard" },
    ],
    technologies: [
      { name: "React", iconSrc: techIcons.React },
      { name: "TypeScript", iconSrc: techIcons.TypeScript },
      { name: "Tailwind", iconSrc: techIcons.Tailwind },
      { name: "Recharts", iconSrc: techIcons.Recharts },
    ],
  },
  {
    id: "ecommerce-ui",
    title: "E-commerce UI",
    category: "Design",
    tags: ["Figma", "UI/UX"],
    desc: "Design de interface para loja virtual.",
    fullDescription:
      "Design completo de interface para uma loja virtual, incluindo telas de catálogo, produto, carrinho e checkout. Foco em usabilidade, acessibilidade e uma experiência de compra fluida.",
    gallery: [
      { type: "image", url: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800", alt: "E-commerce" },
    ],
    technologies: [
      { name: "Figma", iconSrc: techIcons.Figma },
      { name: "Photoshop", iconSrc: techIcons.Photoshop },
    ],
  },
];