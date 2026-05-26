import { MapPin, Mail, Phone, Clock, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const contactRows = [
  { icon: Mail, label: "Email", value: "daantadev@gmail.com" },
  { icon: Phone, label: "Telefone", value: "+351 913 821 065" },
  { icon: Clock, label: "Fuso Horário", value: "GMT · WET (Lisboa)" },
];

const ContatoSection = () => {
  return (
    <section id="contato" className="scroll-mt-32 lg:scroll-mt-8">
      <div className="glass-card accent-card p-6 md:p-8">
        <h2 className="text-2xl font-heading font-bold mb-1">Contato</h2>
        <div className="h-0.5 bg-primary/30 mb-8" />

        {/* Map card */}
        <div className="relative rounded-2xl overflow-hidden border border-border h-[190px]">
          {/* Grid background */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(hsl(var(--border) / 0.6) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--border) / 0.6) 1px, transparent 1px)",
              backgroundSize: "28px 28px",
            }}
          />
          {/* Green glow */}
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full"
            style={{ background: "radial-gradient(circle, hsl(145 100% 45% / 0.22), transparent 70%)" }}
          />
          {/* Pin */}
          <motion.div
            initial={{ y: -24, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 260, damping: 14 }}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[120%]"
          >
            <MapPin size={40} className="text-destructive fill-destructive/30" strokeWidth={2.2} />
          </motion.div>
          {/* Pulse under pin */}
          <span className="absolute left-1/2 top-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-destructive/60 animate-ping" />

          {/* Location badge */}
          <div className="absolute left-4 bottom-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-card/90 border border-border backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-sm font-medium">Leiria, Portugal</span>
          </div>
        </div>

        {/* Contact rows */}
        <div className="mt-5 space-y-3">
          {contactRows.map(({ icon: Icon, label, value }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              className="flex items-center gap-4 p-3 rounded-xl bg-secondary/40 border border-border"
            >
              <div className="w-11 h-11 rounded-lg bg-primary/15 flex items-center justify-center shrink-0">
                <Icon className="text-primary" size={20} />
              </div>
              <div>
                <p className="text-[11px] tracking-wide uppercase text-muted-foreground">{label}</p>
                <p className="text-sm font-medium mt-0.5">{value}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Action buttons */}
        <div className="grid grid-cols-2 gap-3 mt-5">
          <a
            href="https://wa.me/351913821065"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 py-3 rounded-xl bg-primary text-primary-foreground text-sm font-heading font-semibold hover:brightness-110 transition-all"
            style={{ boxShadow: "0 0 20px hsl(145 100% 45% / 0.3)" }}
          >
            <MessageCircle size={16} />
            WhatsApp
          </a>
          <a
            href="mailto:daantadev@gmail.com"
            className="flex items-center justify-center gap-2 py-3 rounded-xl border border-primary/50 text-primary text-sm font-heading font-semibold hover:bg-primary/10 transition-all"
          >
            <Mail size={16} />
            Email
          </a>
        </div>

        {/* Message form */}
        <h3 className="text-xl font-heading font-semibold mt-10 mb-4">Enviar Mensagem</h3>
        <form className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <input type="text" placeholder="Nome" className="w-full px-4 py-3 rounded-lg bg-secondary/50 border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors" />
            <input type="email" placeholder="Email" className="w-full px-4 py-3 rounded-lg bg-secondary/50 border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors" />
          </div>
          <textarea rows={4} placeholder="Sua mensagem..." className="w-full px-4 py-3 rounded-lg bg-secondary/50 border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors resize-none" />
          <button type="button" className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold text-sm hover:brightness-110 transition-all">
            Enviar
          </button>
        </form>

        {/* Legal footer */}
        <div className="mt-10 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Augusto Dantas. Todos os direitos reservados.</p>
          <div className="flex items-center gap-4">
            <Link to="/termos" className="hover:text-primary transition-colors">Termos de Serviço</Link>
            <Link to="/privacidade" className="hover:text-primary transition-colors">Política de Privacidade</Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContatoSection;
