import { motion } from 'framer-motion';
import { PrivacyConcept } from '@/types/privacy';

interface ConceptCardProps {
  concept: PrivacyConcept;
  index: number;
}

const ConceptCard = ({ concept, index }: ConceptCardProps) => {
  return (
    <motion.div
      className="group relative p-6 rounded-2xl bg-card border border-border/50 shadow-card hover:shadow-card-hover transition-all duration-300"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ y: -4 }}
    >
      {/* Glow effect on hover */}
      <div className="absolute inset-0 rounded-2xl bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div className="relative z-10">
        {/* Icon */}
        <div className="text-4xl mb-4">{concept.icon}</div>
        
        {/* Title */}
        <h3 className="text-xl font-display font-semibold mb-2 group-hover:text-primary transition-colors">
          {concept.title}
        </h3>
        
        {/* Description */}
        <p className="text-muted-foreground mb-4 leading-relaxed">
          {concept.description}
        </p>
        
        {/* Example box */}
        <div className="p-4 rounded-xl bg-accent/50 border border-primary/10 mb-4">
          <p className="text-sm">
            <span className="font-semibold text-primary">Esempio: </span>
            {concept.example}
          </p>
        </div>
        
        {/* GDPR Reference */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary text-secondary-foreground text-xs font-medium">
          📜 {concept.gdprArticle}
        </div>
      </div>
    </motion.div>
  );
};

export default ConceptCard;
