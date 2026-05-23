export const SITE_URL = "https://dantasdev.pt";
export const SITE_NAME = "Augusto Dantas";
export const DEFAULT_IMAGE = "/perfil.jpg";

export const DEFAULT_TITLE =
  "Augusto Dantas | Web Designer & Full Stack Developer em Portugal";
export const DEFAULT_DESCRIPTION =
  "Portfólio de Augusto Dantas — Web Designer & Full Stack Developer em Leiria, Portugal. Landing pages, lojas online, WordPress, SEO e Inteligência Artificial.";

/** Resolve a path or relative URL to an absolute URL on the production domain. */
export function absoluteUrl(pathOrUrl: string): string {
  if (/^https?:\/\//i.test(pathOrUrl)) return pathOrUrl;
  return `${SITE_URL}${pathOrUrl.startsWith("/") ? "" : "/"}${pathOrUrl}`;
}

/** schema.org Person describing the site owner. Used on the home page. */
export const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: SITE_NAME,
  url: SITE_URL,
  image: absoluteUrl(DEFAULT_IMAGE),
  jobTitle: "Web Designer & Full Stack Developer",
  email: "mailto:daantadev@gmail.com",
  telephone: "+351913821065",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Leiria",
    addressCountry: "PT",
  },
  knowsAbout: [
    "Web Design",
    "Desenvolvimento Full Stack",
    "React",
    "Next.js",
    "WordPress",
    "SEO",
    "Inteligência Artificial",
  ],
};
