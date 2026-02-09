import { Calendar, MapPin, Mail, Phone } from "lucide-react";
import { motion } from "framer-motion";

const contactInfo = [
  { icon: Calendar, label: "Idade", value: "28 anos" },
  { icon: MapPin, label: "Endereço", value: "Leiria, Portugal" },
  { icon: Mail, label: "Email", value: "daantadev@gmail.com" },
  { icon: Phone, label: "Telefone", value: "913821065" },
];

const ContatoSection = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="glass-card p-8 h-full overflow-auto"
    >
      <h2 className="text-2xl font-heading font-bold mb-1">Contato</h2>
      <div className="h-0.5 bg-primary/30 mb-8" />

      <div className="grid gap-6 mt-4">
        {contactInfo.map(({ icon: Icon, label, value }) => (
          <div key={label} className="flex items-center gap-4 p-4 rounded-lg bg-secondary/50 border border-border">
            <div className="w-11 h-11 rounded-lg bg-primary/15 flex items-center justify-center shrink-0">
              <Icon className="text-primary" size={20} />
            </div>
            <div>
              <p className="text-sm font-heading font-semibold">{label}</p>
              <p className="text-sm text-muted-foreground">{value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Contact Form */}
      <h3 className="text-xl font-heading font-semibold mt-10 mb-4">Enviar Mensagem</h3>
      <form className="space-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Nome"
            className="w-full px-4 py-3 rounded-lg bg-secondary/50 border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-3 rounded-lg bg-secondary/50 border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
          />
        </div>
        <textarea
          rows={4}
          placeholder="Sua mensagem..."
          className="w-full px-4 py-3 rounded-lg bg-secondary/50 border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors resize-none"
        />
        <button
          type="button"
          className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold text-sm hover:brightness-110 transition-all"
        >
          Enviar
        </button>
      </form>
    </motion.div>
  );
};

export default ContatoSection;
