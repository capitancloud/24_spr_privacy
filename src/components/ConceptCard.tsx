import { motion } from 'framer-motion';
import { PrivacyConcept } from '@/types/privacy';
import { Lightbulb } from 'lucide-react';

interface ConceptCardProps {
  concept: PrivacyConcept;
  index: number;
}

const ConceptCard = ({ concept, index }: ConceptCardProps) => {
  return (
    <motion.div
      className="group relative p-6 rounded-2xl bg-card border border-border/50 shadow-lg overflow-hidden"
      initial={{ opacity: 0, y: 30, rotateX: -10 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15, duration: 0.6, type: 'spring' }}
      whileHover={{ 
        y: -8,
        boxShadow: '0 20px 40px hsl(0 0% 0% / 0.3), 0 0 30px hsl(158 64% 50% / 0.15)',
      }}
    >
      {/* Animated glow effect on hover */}
      <motion.div 
        className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
      />
      
      {/* Floating particles on hover */}
      <div className="absolute inset-0 overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-primary/40"
            style={{
              left: `${20 + i * 15}%`,
              bottom: '10%',
            }}
            animate={{
              y: [-10, -60],
              opacity: [1, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        ))}
      </div>
      
      <div className="relative z-10">
        {/* Icon with animation */}
        <motion.div 
          className="text-5xl mb-4"
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0],
          }}
          transition={{ 
            duration: 4, 
            repeat: Infinity,
            delay: index * 0.5,
          }}
        >
          {concept.icon}
        </motion.div>
        
        {/* Title with gradient on hover */}
        <h3 className="text-xl font-display font-semibold mb-3 group-hover:gradient-text transition-all duration-300">
          {concept.title}
        </h3>
        
        {/* Description */}
        <p className="text-muted-foreground mb-4 leading-relaxed">
          {concept.description}
        </p>
        
        {/* Example box with icon */}
        <motion.div 
          className="p-4 rounded-xl bg-accent/30 border border-primary/20 mb-4"
          whileHover={{ scale: 1.02 }}
        >
          <div className="flex items-start gap-2">
            <Lightbulb className="w-4 h-4 text-warning flex-shrink-0 mt-0.5" />
            <p className="text-sm">
              <span className="font-semibold text-warning">Esempio pratico: </span>
              <span className="text-foreground/80">{concept.example}</span>
            </p>
          </div>
        </motion.div>
        
        {/* GDPR Reference with pulse */}
        <motion.div 
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary text-secondary-foreground text-xs font-medium"
          animate={{
            boxShadow: [
              '0 0 0 0 hsl(158 64% 50% / 0.2)',
              '0 0 0 8px hsl(158 64% 50% / 0)',
            ]
          }}
          transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
        >
          📜 {concept.gdprArticle}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ConceptCard;
