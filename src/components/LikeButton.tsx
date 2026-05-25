import { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import { motion } from "framer-motion";
import { getDeviceId, hasLiked, setLiked } from "@/lib/device";

interface LikeButtonProps {
  projectId: string;
}

const LikeButton = ({ projectId }: LikeButtonProps) => {
  const [liked, setLikedState] = useState(false);
  const [count, setCount] = useState<number | null>(null);
  const [pending, setPending] = useState(false);

  // Estado inicial: "liked" vem do local (instantâneo); contagem vem da API.
  useEffect(() => {
    setLikedState(hasLiked(projectId));
    let active = true;
    fetch(`/api/likes?projectId=${encodeURIComponent(projectId)}`)
      .then((r) => (r.ok ? r.json() : { count: 0 }))
      .then((d: { count?: number }) => {
        if (active) setCount(typeof d.count === "number" ? d.count : 0);
      })
      .catch(() => active && setCount(0));
    return () => {
      active = false;
    };
  }, [projectId]);

  const toggle = async () => {
    if (pending) return;
    const next = !liked;
    setPending(true);

    // Atualização otimista
    setLikedState(next);
    setLiked(projectId, next);
    setCount((c) => (c == null ? c : Math.max(0, c + (next ? 1 : -1))));

    try {
      const res = await fetch("/api/likes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          projectId,
          deviceId: getDeviceId(),
          action: next ? "like" : "unlike",
        }),
      });
      if (res.ok) {
        const d = (await res.json()) as { count?: number };
        if (typeof d.count === "number") setCount(d.count);
      } else {
        throw new Error("falhou");
      }
    } catch {
      // Reverter em caso de erro
      setLikedState(!next);
      setLiked(projectId, !next);
      setCount((c) => (c == null ? c : Math.max(0, c + (next ? -1 : 1))));
    } finally {
      setPending(false);
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      disabled={pending}
      aria-pressed={liked}
      aria-label={liked ? "Remover gosto" : "Gostar deste projeto"}
      className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-heading font-semibold transition-all disabled:opacity-60 ${
        liked
          ? "bg-primary/15 border-primary/50 text-primary"
          : "bg-secondary/60 border-border text-foreground/80 hover:border-primary/40 hover:text-primary"
      }`}
    >
      <motion.span
        key={liked ? "on" : "off"}
        initial={{ scale: 0.6 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 500, damping: 15 }}
      >
        <Heart size={18} className={liked ? "fill-primary" : ""} />
      </motion.span>
      <span>{count ?? "—"}</span>
    </button>
  );
};

export default LikeButton;
