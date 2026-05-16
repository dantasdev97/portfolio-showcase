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
  gallery: { type: "image" | "video"; url: string; alt?: string; fallback?: string }[];
  technologies: { name: string; iconSrc: string }[];
}

export const categories = ["Todos", "Código", "Vídeos"];

export const projects: Project[] = [
  {
    id: "barbearia-of-brothers",
    title: "Barbearia Of Brothers",
    category: "Código",
    tags: ["Next.js", "Supabase", "SEO"],
    liveUrl: "https://barbeariaofbrothers.pt",
    desc: "Presença digital completa com agendamento, SEO local e painel de admin.",
    fullDescription:
      "Transformámos um site Next.js 16 em branco numa presença digital completa para a Barbearia Of Brothers em Leiria. O projeto cobre desde o detalhe visual — animações premium com Framer Motion em todos os botões e scroll horizontal nos produtos para mobile — até à infraestrutura robusta com Supabase (PostgreSQL, Storage, Auth) e deploy contínuo na Vercel.\n\nImplementámos SEO local avançado: sitemap dinâmico, metadados por página, schema BarberShop com avaliações e morada, e título otimizado para \"Barbearia em Leiria\". O painel de admin suporta upload de vídeos para o hero com barra de progresso em tempo real, sem os limites do servidor. A conformidade RGPD foi tratada a sério — o GA4 só ativa após consentimento, com banner moderno e páginas legais em português.\n\nBotões de partilha social (WhatsApp, Facebook, Pinterest) em cada serviço, com imagem e nome pré-preenchidos. Para fechar, uma auditoria de segurança completa corrigiu open redirect no login, adicionou todos os headers HTTP incluindo Content-Security-Policy, e levou a nota do site de D para A+ no SecurityHeaders.com.",
    challenges:
      "O maior desafio técnico foi o upload de vídeos de grandes dimensões para o hero, que causava erro 413 no servidor. Resolvemos integrando o upload diretamente no Supabase Storage com feedback visual em tempo real para o administrador.",
    gallery: [
      { type: "image", url: "/projects/barbearia-mockup.jpg", alt: "Barbearia Of Brothers — site mobile", fallback: "https://images.unsplash.com/photo-1585747860019-8083262d40e8?w=800" },
      { type: "image", url: "https://images.unsplash.com/photo-1503951914875-452b59e3bb21?w=800", alt: "Corte de cabelo" },
    ],
    technologies: [
      { name: "Next.js", iconSrc: techIcons["Next.js"] },
      { name: "TypeScript", iconSrc: techIcons.TypeScript },
      { name: "Tailwind", iconSrc: techIcons.Tailwind },
      { name: "Supabase", iconSrc: techIcons.Supabase },
      { name: "Framer Motion", iconSrc: techIcons["Framer Motion"] },
    ],
  },
  {
    id: "mimiart",
    title: "MimiArt",
    category: "Código",
    tags: ["React", "Vite", "E-commerce"],
    liveUrl: "https://mimiart.pt",
    desc: "Loja online de arte com galeria e encomendas personalizadas.",
    fullDescription:
      "Plataforma de e-commerce para uma artista visual portuguesa, desenvolvida em React com Vite. O site combina uma loja de obras originais com galeria filtrada por coleção, sistema de encomendas personalizadas e checkout otimizado para conversão. O design é clean e elegante, valorizando as obras sem distrações, com navegação intuitiva e página de produto com zoom de alta resolução.",
    challenges:
      "O desafio foi criar uma experiência visual que valorizasse a arte sem sobrecarregar a interface, mantendo a loja funcional e o processo de checkout simples para todos os perfis de utilizador.",
    gallery: [
      { type: "image", url: "/projects/mimiart-mockup.jpg", alt: "MimiArt — loja mobile", fallback: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800" },
      { type: "image", url: "https://images.unsplash.com/photo-1499678329028-101435549a4e?w=800", alt: "Loja de arte online" },
    ],
    technologies: [
      { name: "React", iconSrc: techIcons.React },
      { name: "TypeScript", iconSrc: techIcons.TypeScript },
      { name: "Tailwind", iconSrc: techIcons.Tailwind },
      { name: "Node.js", iconSrc: techIcons["Node.js"] },
      { name: "Figma", iconSrc: techIcons.Figma },
    ],
  },
];
