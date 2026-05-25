import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, CheckCircle2, AlertCircle, Loader2, ChevronDown } from "lucide-react";

interface PlanoAddon {
  text: string;
  preco?: number;
}

interface Plano {
  key: string;
  name: string;
  preco_base: number;
  descricao: string;
  addons: PlanoAddon[];
}

interface Props {
  planos: Plano[];
  defaultPlanoKey?: string;
  defaultAddons?: string[];
  onClose: () => void;
}

const schema = z.object({
  nome: z.string().min(2, "Nome demasiado curto").max(80, "Nome demasiado longo"),
  email: z
    .string()
    .email("Email inválido")
    .optional()
    .or(z.literal("")),
  telefone: z
    .string()
    .regex(/^(\+?[0-9\s\-()]{7,20})?$/, "Número inválido")
    .optional()
    .or(z.literal("")),
  plano_key: z.string().optional(),
  mensagem: z.string().max(500, "Máximo 500 caracteres").optional().or(z.literal("")),
});

type FormData = z.infer<typeof schema>;

type State = "idle" | "sending" | "success" | "error";

export default function OrcamentoModal({ planos, defaultPlanoKey, defaultAddons = [], onClose }: Props) {
  const [state, setState] = useState<State>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [addonsSel, setAddonsSel] = useState<string[]>(defaultAddons);

  function toggleAddon(text: string) {
    setAddonsSel((prev) =>
      prev.includes(text) ? prev.filter((a) => a !== text) : [...prev, text]
    );
  }

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { plano_key: defaultPlanoKey ?? "" },
  });

  const selectedKey = watch("plano_key");
  const selectedPlano = planos.find((p) => p.key === selectedKey);
  const mensagemVal = watch("mensagem") ?? "";

  async function onSubmit(data: FormData) {
    setState("sending");
    setErrorMsg("");
    try {
      const res = await fetch("/api/orcamento", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome: data.nome,
          email: data.email || undefined,
          telefone: data.telefone || undefined,
          plano_key: data.plano_key || undefined,
          addons_sel: addonsSel.length > 0 ? addonsSel : undefined,
          mensagem: data.mensagem || undefined,
        }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error((err as { error?: string }).error ?? "Erro no servidor");
      }
      setState("success");
    } catch (e) {
      setState("error");
      setErrorMsg(e instanceof Error ? e.message : "Erro ao enviar. Tenta novamente.");
    }
  }

  return (
    // Backdrop
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      {/* Overlay */}
      <motion.div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />

      {/* Modal */}
      <motion.div
        className="relative z-10 w-full max-w-md bg-card border border-border rounded-2xl shadow-2xl overflow-hidden"
        initial={{ opacity: 0, y: 40, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.97 }}
        transition={{ type: "spring", stiffness: 400, damping: 32 }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <div>
            <h2 className="text-lg font-heading font-bold">Pedir Orçamento</h2>
            <p className="text-xs text-muted-foreground mt-0.5">Respondo em menos de 24h</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary/60 transition-all"
          >
            <X size={16} />
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-5">
          <AnimatePresence mode="wait">
            {state === "success" ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center gap-4 py-8 text-center"
              >
                <div
                  className="w-16 h-16 rounded-full bg-primary/15 flex items-center justify-center"
                  style={{ boxShadow: "0 0 30px hsl(145 100% 45% / 0.3)" }}
                >
                  <CheckCircle2 className="text-primary" size={32} />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-lg">Pedido enviado!</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Recebi o teu pedido e vou entrar em contacto em breve.
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="mt-2 px-6 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-heading font-semibold hover:brightness-110 transition-all"
                >
                  Fechar
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-4"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {/* Nome */}
                <div>
                  <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1.5 block">
                    Nome <span className="text-primary">*</span>
                  </label>
                  <input
                    {...register("nome")}
                    placeholder="O teu nome"
                    className={`w-full px-4 py-3 rounded-xl bg-secondary/50 border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none transition-colors ${
                      errors.nome ? "border-destructive/70" : "border-border focus:border-primary/50"
                    }`}
                  />
                  {errors.nome && (
                    <p className="text-xs text-destructive mt-1 flex items-center gap-1">
                      <AlertCircle size={11} /> {errors.nome.message}
                    </p>
                  )}
                </div>

                {/* Email + Telefone */}
                <div className="grid sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1.5 block">
                      Email
                    </label>
                    <input
                      {...register("email")}
                      type="email"
                      placeholder="email@exemplo.com"
                      className={`w-full px-4 py-3 rounded-xl bg-secondary/50 border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none transition-colors ${
                        errors.email ? "border-destructive/70" : "border-border focus:border-primary/50"
                      }`}
                    />
                    {errors.email && (
                      <p className="text-xs text-destructive mt-1 flex items-center gap-1">
                        <AlertCircle size={11} /> {errors.email.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1.5 block">
                      Telefone
                    </label>
                    <input
                      {...register("telefone")}
                      type="tel"
                      placeholder="+351 9xx xxx xxx"
                      className={`w-full px-4 py-3 rounded-xl bg-secondary/50 border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none transition-colors ${
                        errors.telefone ? "border-destructive/70" : "border-border focus:border-primary/50"
                      }`}
                    />
                    {errors.telefone && (
                      <p className="text-xs text-destructive mt-1 flex items-center gap-1">
                        <AlertCircle size={11} /> {errors.telefone.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Plano */}
                <div>
                  <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1.5 block">
                    Plano de interesse
                  </label>
                  <div className="relative">
                    <select
                      {...register("plano_key")}
                      className="w-full px-4 py-3 rounded-xl bg-secondary/50 border border-border text-sm text-foreground focus:outline-none focus:border-primary/50 transition-colors appearance-none pr-10"
                    >
                      <option value="">— Sem preferência —</option>
                      {planos.map((p) => (
                        <option key={p.key} value={p.key}>
                          {p.name} — a partir de €{p.preco_base}
                        </option>
                      ))}
                    </select>
                    <ChevronDown
                      size={15}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
                    />
                  </div>
                  {selectedPlano && selectedPlano.addons.length > 0 && (
                    <div className="mt-2">
                      <p className="text-[11px] text-muted-foreground mb-1.5">Extras opcionais:</p>
                      <div className="flex flex-wrap gap-1.5">
                        {selectedPlano.addons.map((a) => {
                          const active = addonsSel.includes(a.text);
                          return (
                            <button
                              key={a.text}
                              type="button"
                              onClick={() => toggleAddon(a.text)}
                              className={`text-[11px] px-2.5 py-1 rounded-full border flex items-center gap-1 transition-all ${
                                active
                                  ? "bg-primary/20 border-primary text-primary font-semibold"
                                  : "bg-secondary/40 border-border text-muted-foreground hover:border-primary/40"
                              }`}
                            >
                              {active ? "✓" : "+"} {a.text}
                              {a.preco != null && a.preco > 0 && (
                                <span className={`ml-0.5 font-bold ${active ? "text-primary" : ""}`}>€{a.preco}</span>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>

                {/* Mensagem */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                      Detalhes
                    </label>
                    <span className="text-xs text-muted-foreground">
                      {mensagemVal.length}/500
                    </span>
                  </div>
                  <textarea
                    {...register("mensagem")}
                    rows={3}
                    placeholder="Descreve o que precisas..."
                    className={`w-full px-4 py-3 rounded-xl bg-secondary/50 border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none transition-colors resize-none ${
                      errors.mensagem ? "border-destructive/70" : "border-border focus:border-primary/50"
                    }`}
                  />
                  {errors.mensagem && (
                    <p className="text-xs text-destructive mt-1 flex items-center gap-1">
                      <AlertCircle size={11} /> {errors.mensagem.message}
                    </p>
                  )}
                </div>

                {/* Error banner */}
                {state === "error" && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="flex items-center gap-2 px-4 py-3 rounded-xl bg-destructive/10 border border-destructive/30 text-sm text-destructive"
                  >
                    <AlertCircle size={14} />
                    {errorMsg}
                  </motion.div>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isSubmitting || state === "sending"}
                  className="w-full py-3 rounded-xl bg-primary text-primary-foreground text-sm font-heading font-semibold flex items-center justify-center gap-2 hover:brightness-110 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                  style={{ boxShadow: "0 0 22px hsl(145 100% 45% / 0.35)" }}
                >
                  {state === "sending" ? (
                    <>
                      <Loader2 size={15} className="animate-spin" />
                      A enviar…
                    </>
                  ) : (
                    <>
                      <Send size={15} />
                      Enviar pedido
                    </>
                  )}
                </button>

                <p className="text-[11px] text-center text-muted-foreground">
                  Apenas o nome é obrigatório · sem compromisso
                </p>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
