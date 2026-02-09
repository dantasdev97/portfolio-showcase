import { Download, MessageCircle, Instagram, Linkedin, Github } from "lucide-react";
import { motion } from "framer-motion";
import heroBg from "@/assets/hero-bg.jpg";

const ProfileCard = () => {
  return (
    <motion.div
      initial={{ y: 30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="glass-card overflow-hidden w-full lg:max-w-[320px] shrink-0"
    >
      {/* Banner */}
      <div className="h-[160px] relative overflow-hidden">
        <img src={heroBg} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-card/90" />
      </div>

      {/* Avatar */}
      <div className="flex flex-col items-center -mt-14 relative z-10 px-6 pb-6">
        <div className="w-24 h-24 rounded-full border-[3px] border-primary bg-secondary flex items-center justify-center overflow-hidden mb-4">
          <div className="w-full h-full bg-muted flex items-center justify-center text-2xl font-heading font-bold text-primary">
            AD
          </div>
        </div>

        <h1 className="text-xl font-heading font-semibold">Augusto Dantas</h1>
        <p className="text-sm mt-1">
          <span className="text-primary font-medium">Web Designer</span>
          <span className="text-muted-foreground"> & </span>
          <span className="font-medium">Full Stack</span>
        </p>

        {/* Social Icons */}
        <div className="flex gap-3 mt-5">
          {[
            { icon: Instagram, href: "#" },
            { icon: Linkedin, href: "#" },
            { icon: Github, href: "#" },
          ].map(({ icon: Icon, href }, i) => (
            <a
              key={i}
              href={href}
              className="w-10 h-10 rounded-lg bg-secondary hover:bg-secondary/80 flex items-center justify-center text-foreground transition-colors"
            >
              <Icon size={18} />
            </a>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="flex gap-3 mt-5 w-full">
          <button className="flex-1 flex items-center justify-center gap-2 bg-primary text-primary-foreground rounded-lg py-2.5 text-sm font-semibold hover:brightness-110 transition-all">
            <Download size={16} />
            Baixar CV
          </button>
          <button className="flex-1 flex items-center justify-center gap-2 bg-primary text-primary-foreground rounded-lg py-2.5 text-sm font-semibold hover:brightness-110 transition-all">
            <MessageCircle size={16} />
            WhatsApp
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProfileCard;
