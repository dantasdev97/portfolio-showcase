import { techIcons } from "@/data/techIcons";

export interface Project {
  id: string;
  title: string;
  category: string;
  tags: string[];
  desc: string;
  fullDescription: string;
  challenges?: string;
  liveUrl?: string;
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
    liveUrl: "https://barbeariaofbrothers.pt",
    desc: "Site profissional para barbearia com agendamento online.",
    fullDescription:
      "O site da Barbearia Of Brothers é um site institucional para uma barbearia localizada no coração de Leiria, Portugal. Promove serviços como cortes de cabelo modernos e tradicionais, cuidados com a barba e design de sobrancelhas, destacando a experiência de mais de 10 anos do líder Vitor Chagas e uma equipa de três profissionais especializados. O foco é oferecer uma experiência única e relaxante, utilizando produtos de alta qualidade, com uma chamada à ação para agendar uma visita.",
    challenges:
      "O principal desafio foi adaptar um sistema de agendamento intuitivo ao WordPress, garantindo que o site fosse rápido e otimizado para SEO local em Leiria.",
    gallery: [
      { type: "image", url: "https://images.unsplash.com/photo-1585747860019-8083262d40e8?w=800", alt: "Interior da barbearia" },
      { type: "image", url: "https://images.unsplash.com/photo-1503951914875-452b59e3bb21?w=800", alt: "Corte de cabelo" },
    ],
    technologies: [
      { name: "WordPress", iconSrc: techIcons.WordPress },
      { name: "Elementor", iconSrc: techIcons.Elementor },
      { name: "Node.js", iconSrc: techIcons["Node.js"] },
    ],
  },
  {
    id: "mimiart",
    title: "MimiArt",
    category: "WordPress",
    tags: ["WordPress", "WooCommerce", "Design"],
    liveUrl: "https://mimiart.pt",
    desc: "Loja online de arte com galeria e encomendas personalizadas.",
    fullDescription:
      "Plataforma de e-commerce desenvolvida em WordPress com WooCommerce para uma artista visual portuguesa. O site combina uma loja online com galeria de obras originais, sistema de encomendas personalizadas e apresentação do trabalho artístico. O design é clean e elegante, valorizando as obras sem distrações, com navegação intuitiva e checkout otimizado para conversão. Inclui galeria filtrada por coleção, página de produto com zoom de alta resolução e formulário de encomenda à medida.",
    challenges:
      "O desafio foi criar uma experiência visual que valorizasse a arte sem sobrecarregar a interface, mantendo a loja funcional e o processo de checkout simples para todos os perfis de utilizador.",
    gallery: [
      { type: "image", url: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800", alt: "Galeria de arte" },
      { type: "image", url: "https://images.unsplash.com/photo-1499678329028-101435549a4e?w=800", alt: "Loja de arte online" },
    ],
    technologies: [
      { name: "WordPress", iconSrc: techIcons.WordPress },
      { name: "Elementor", iconSrc: techIcons.Elementor },
      { name: "Figma", iconSrc: techIcons.Figma },
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
      "Design completo de interface para uma loja virtual, incluindo ecrãs de catálogo, produto, carrinho e checkout. Foco em usabilidade, acessibilidade e uma experiência de compra fluida.",
    gallery: [
      { type: "image", url: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800", alt: "E-commerce" },
    ],
    technologies: [
      { name: "Figma", iconSrc: techIcons.Figma },
      { name: "Photoshop", iconSrc: techIcons.Photoshop },
    ],
  },
];
