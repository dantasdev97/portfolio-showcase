import { useState } from "react";
import { Code2 } from "lucide-react";

interface TechIconProps {
  src: string;
  alt: string;
  className?: string;
}

const TechIcon = ({ src, alt, className }: TechIconProps) => {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return <Code2 className={className} aria-label={alt} />;
  }

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      className={className}
      onError={() => setFailed(true)}
    />
  );
};

export default TechIcon;
