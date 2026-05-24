import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie } from "lucide-react";

const STORAGE_KEY = "cookie-consent";

const CookieConsent = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem(STORAGE_KEY)) {
      const timer = setTimeout(() => setVisible(true), 800);
      return () => clearTimeout(timer);
    }
  }, []);

  const decide = (choice: "accepted" | "rejected") => {
    localStorage.setItem(STORAGE_KEY, choice);
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ type: "spring", stiffness: 260, damping: 26 }}
          className="fixed inset-x-0 bottom-0 z-[100] flex justify-center px-4 pb-4 pointer-events-none"
        >
          <div
            role="dialog"
            aria-live="polite"
            aria-label="Aviso de cookies"
            className="glass-card pointer-events-auto flex w-full max-w-3xl flex-col items-start gap-4 p-5 md:flex-row md:items-center md:gap-6 md:p-6"
            style={{ boxShadow: "0 0 30px hsl(145 100% 45% / 0.12), 0 8px 40px rgba(0,0,0,0.5)" }}
          >
            <div className="hidden h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary/15 sm:flex">
              <Cookie className="text-primary" size={22} />
            </div>

            <p className="flex-1 text-sm leading-relaxed text-muted-foreground">
              Usamos cookies e análise de tráfego para melhorar a experiência.{" "}
              <Link
                to="/privacidade"
                className="font-medium text-primary underline-offset-4 hover:underline"
              >
                Política de privacidade
              </Link>
              .
            </p>

            <div className="flex w-full shrink-0 gap-3 md:w-auto">
              <button
                type="button"
                onClick={() => decide("rejected")}
                className="flex-1 rounded-xl border border-border px-5 py-2.5 text-sm font-heading font-semibold text-foreground transition-colors hover:bg-secondary/60 md:flex-none"
              >
                Rejeitar
              </button>
              <button
                type="button"
                onClick={() => decide("accepted")}
                className="flex-1 rounded-xl bg-primary px-5 py-2.5 text-sm font-heading font-semibold text-primary-foreground transition-all hover:brightness-110 md:flex-none"
                style={{ boxShadow: "0 0 20px hsl(145 100% 45% / 0.3)" }}
              >
                Aceitar todos
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieConsent;
