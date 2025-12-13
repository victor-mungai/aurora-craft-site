import { Button } from "@/components/ui/button";
import { Download, ExternalLink, Github, Linkedin, Mail } from "lucide-react";
import { motion } from "framer-motion";

const PremiumHeroSection = () => {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(240,185,11,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(240,185,11,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />
      
      {/* Floating Particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="glass-card rounded-3xl p-12 max-w-4xl mx-auto"
        >
          {/* Profile Image */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative w-32 h-32 mx-auto mb-8"
          >
            <div className="w-full h-full rounded-full glass p-1">
              <img
                src="/profile.jpeg"
                alt="Victor Mungai"
                className="w-full h-full rounded-full object-cover"
              />
            </div>
            <div className="absolute inset-0 rounded-full bg-white/5 animate-pulse" />
          </motion.div>

          {/* Name & Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-5xl md:text-7xl font-bold mb-4"
          >
            Victor <span className="text-gradient">Mungai</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-xl md:text-2xl text-muted-foreground mb-8 font-light"
          >
            DevOps Engineer | Cloud & Automation | CI/CD | Infrastructure as Code
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
          >
            <a
              href="https://github.com/victor-mungai"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 glass bg-white/10 hover:bg-white/20 text-white rounded-2xl transition-all duration-300 border-0 font-medium"
            >
              <ExternalLink className="h-5 w-5" />
              View Projects
            </a>
            <a 
              href={`https://vpc-s3-1.s3.us-east-1.amazonaws.com/victor-mungai-DevOps-resume.docx?v=${Date.now()}`}
              download="Victor-Mungai-DevOps-Resume.docx"
              className="inline-flex items-center gap-2 px-8 py-4 glass bg-white/10 hover:bg-white/20 text-white rounded-2xl transition-all duration-300 border-0 font-medium"
            >
              <Download className="h-5 w-5" />
              Download Resume
            </a>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
            className="flex justify-center gap-6"
          >
            {[
              { icon: Github, href: "https://github.com/victor-mungai", label: "GitHub" },
              { icon: Linkedin, href: "https://www.linkedin.com/in/victor-mungai-a998942a2", label: "LinkedIn" },
              { icon: Mail, href: "mailto:mungaivictor2781@gmail.com", label: "Email" },
            ].map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/10 hover:border-white/30 transition-all duration-300 glass"
                aria-label={label}
              >
                <Icon className="h-5 w-5" />
              </a>
            ))}
          </motion.div>
        </motion.div>


      </div>
    </section>
  );
};

export default PremiumHeroSection;