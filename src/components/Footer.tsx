import { motion } from 'framer-motion';
import { Shield, Heart, ExternalLink } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="py-12 px-4 border-t border-border">
      <div className="container max-w-6xl mx-auto">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {/* Logo */}
          <div className="flex items-center justify-center gap-2 mb-4">
            <Shield className="w-6 h-6 text-primary" />
            <span className="text-xl font-display font-bold gradient-text">PrivacyGuard</span>
          </div>

          {/* Tagline */}
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Un progetto educativo per promuovere la consapevolezza sulla privacy 
            e la protezione dei dati personali.
          </p>

          {/* Resources links */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <a
              href="https://gdpr.eu/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-4 py-2 rounded-lg bg-secondary hover:bg-accent transition-colors text-sm"
            >
              <ExternalLink className="w-3 h-3" />
              GDPR Ufficiale
            </a>
            <a
              href="https://www.garanteprivacy.it/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-4 py-2 rounded-lg bg-secondary hover:bg-accent transition-colors text-sm"
            >
              <ExternalLink className="w-3 h-3" />
              Garante Privacy Italia
            </a>
            <a
              href="https://edpb.europa.eu/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-4 py-2 rounded-lg bg-secondary hover:bg-accent transition-colors text-sm"
            >
              <ExternalLink className="w-3 h-3" />
              EDPB
            </a>
          </div>

          {/* Bottom text */}
          <p className="text-sm text-muted-foreground flex items-center justify-center gap-1">
            Creato con <Heart className="w-4 h-4 text-sensitive" /> per l'educazione alla privacy
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
