import { motion } from 'framer-motion';
import { Shield, Heart, ExternalLink, Sparkles } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="py-16 px-4 border-t border-border relative overflow-hidden">
      {/* Background decoration */}
      <motion.div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-primary/5 blur-3xl"
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 6, repeat: Infinity }}
      />

      <div className="container max-w-4xl mx-auto relative z-10">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {/* Logo */}
          <motion.div 
            className="flex items-center justify-center gap-2 mb-6"
            whileHover={{ scale: 1.05 }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            >
              <Shield className="w-8 h-8 text-primary" />
            </motion.div>
            <span className="text-2xl font-display font-bold gradient-text">PrivacyGuard</span>
          </motion.div>

          {/* Summary */}
          <motion.div
            className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-6 mb-8 max-w-2xl mx-auto"
            whileHover={{ boxShadow: '0 0 30px hsl(158 64% 50% / 0.1)' }}
          >
            <h3 className="font-display font-semibold mb-3 flex items-center justify-center gap-2">
              <Sparkles className="w-4 h-4 text-primary" />
              Cosa hai imparato oggi?
            </h3>
            <ul className="text-sm text-muted-foreground space-y-2 text-left max-w-md mx-auto">
              <li className="flex items-start gap-2">
                <span className="text-success mt-0.5">✓</span>
                <span>I <strong className="text-foreground">dati personali</strong> sono informazioni che identificano una persona</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-success mt-0.5">✓</span>
                <span>La <strong className="text-foreground">minimizzazione</strong> significa raccogliere solo il necessario</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-success mt-0.5">✓</span>
                <span>Il <strong className="text-foreground">consenso</strong> deve essere libero, specifico e informato</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-success mt-0.5">✓</span>
                <span>La <strong className="text-foreground">retention</strong> limita quanto tempo conservi i dati</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-success mt-0.5">✓</span>
                <span>Gli utenti hanno il <strong className="text-foreground">diritto alla cancellazione</strong></span>
              </li>
            </ul>
          </motion.div>

          {/* Resources links */}
          <p className="text-sm text-muted-foreground mb-4">Vuoi approfondire? Ecco alcune risorse ufficiali:</p>
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {[
              { href: 'https://gdpr.eu/', label: 'GDPR Ufficiale' },
              { href: 'https://www.garanteprivacy.it/', label: 'Garante Privacy Italia' },
              { href: 'https://edpb.europa.eu/', label: 'EDPB' },
            ].map((link, index) => (
              <motion.a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-secondary hover:bg-accent transition-colors text-sm border border-border"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -2 }}
              >
                <ExternalLink className="w-3 h-3" />
                {link.label}
              </motion.a>
            ))}
          </div>

          {/* Bottom text */}
          <motion.p 
            className="text-sm text-muted-foreground flex items-center justify-center gap-2"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            Creato con <Heart className="w-4 h-4 text-sensitive" /> per educare alla privacy responsabile
          </motion.p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
