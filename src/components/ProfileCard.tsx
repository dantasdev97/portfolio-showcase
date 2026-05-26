import { ClipboardList, Instagram, Linkedin, Github } from "lucide-react";
import { motion } from "framer-motion";
import heroBg from "@/assets/hero-bg.jpg";

interface ProfileCardProps {
  onNavigate: (section: string) => void;
}

const ProfileCard = ({ onNavigate }: ProfileCardProps) => {
  return (
    <motion.div
      initial={{ y: 30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="glass-card accent-card overflow-hidden w-full lg:max-w-[320px] shrink-0"
    >
      {/* Banner */}
      <div className="h-[160px] relative overflow-hidden">
        <img src={heroBg} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-card/90" />
      </div>

      {/* Avatar */}
      <div className="flex flex-col items-center -mt-14 relative z-10 px-6 pb-6">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="w-24 h-24 rounded-full border-[3px] border-primary bg-secondary flex items-center justify-center overflow-hidden mb-4"
        >
          <img src="/perfil.jpg" alt="Foto de perfil" className="w-full h-full object-cover" />
        </motion.div>

        <h1 className="text-xl font-heading font-semibold">Augusto Dantas</h1>
        <p className="text-sm mt-1">
          <span className="text-primary font-medium">Web Designer</span>
          <span className="text-muted-foreground"> & </span>
          <span className="font-medium">Full Stack</span>
        </p>

        {/* Social Icons */}
        <div className="flex gap-3 mt-5">
          {[
            { icon: Instagram, href: "#", label: "Instagram" },
            { icon: Linkedin, href: "#", label: "LinkedIn" },
            { icon: Github, href: "#", label: "GitHub" },
          ].map(({ icon: Icon, href, label }) => (
            <motion.a
              key={label}
              href={href}
              whileHover={{ scale: 1.15, backgroundColor: "hsl(var(--primary) / 0.15)" }}
              whileTap={{ scale: 0.9 }}
              className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center text-foreground transition-colors"
            >
              <Icon size={18} />
            </motion.a>
          ))}
        </div>

        {/* CTA Button */}
        <div className="mt-5 w-full">
          <motion.button
            onClick={() => onNavigate("sobre")}
            whileHover={{ scale: 1.04, boxShadow: "0 0 20px hsl(145 100% 45% / 0.45)" }}
            whileTap={{ scale: 0.96 }}
            className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground rounded-lg py-2.5 text-sm font-semibold transition-all"
          >
            <ClipboardList size={16} />
            Faça um Orçamento
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProfileCard;
