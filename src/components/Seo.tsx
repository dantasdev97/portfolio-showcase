import { Helmet } from "react-helmet-async";
import { DEFAULT_DESCRIPTION, absoluteUrl } from "@/lib/seo";

interface SeoProps {
  title: string;
  description?: string;
  /** Route path, e.g. "/" or "/projeto/mimiart". Used for the canonical URL. */
  path?: string;
  noindex?: boolean;
  /** schema.org object(s) rendered as JSON-LD. */
  jsonLd?: object | object[];
}

// Owns the search-engine-facing head tags per route (Googlebot renders JS).
// Social og:/twitter: tags stay static in index.html for no-JS scrapers, so we
// intentionally do NOT emit them here — that would duplicate the static tags.
const Seo = ({
  title,
  description = DEFAULT_DESCRIPTION,
  path = "/",
  noindex = false,
  jsonLd,
}: SeoProps) => {
  const canonical = absoluteUrl(path);
  const blocks = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : [];

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      <meta
        name="robots"
        content={noindex ? "noindex, nofollow" : "index, follow"}
      />

      {blocks.map((block, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(block)}
        </script>
      ))}
    </Helmet>
  );
};

export default Seo;
