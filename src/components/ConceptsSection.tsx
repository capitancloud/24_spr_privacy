import { motion } from 'framer-motion';
import { privacyConcepts } from '@/data/mockData';
import ConceptCard from './ConceptCard';
import { BookOpen, Scale, Globe, Euro, Heart } from 'lucide-react';

const ConceptsSection = () => {
  return (
    <section className="py-20 px-4 relative overflow-hidden">
      {/* Background decorations */}
      <motion.div
        className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-info/5 blur-3xl"
        animate={{ 
          x: [0, 30, 0],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 10, repeat: Infinity }}
      />

      <div className="container max-w-6xl mx-auto relative z-10">
        {/* Section header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <motion.div 
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 border border-primary/30 text-primary mb-4"
            whileHover={{ scale: 1.05 }}
          >
            <BookOpen className="w-4 h-4" />
            <span className="text-sm font-medium">I 4 Pilastri del GDPR</span>
          </motion.div>
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">
            Le Regole d'Oro della <span className="gradient-text">Privacy</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Questi principi sono la base di tutto. Memorizzali e applicali sempre 
            quando sviluppi software che gestisce dati personali.
          </p>
        </motion.div>

        {/* Concept cards grid */}
        <div className="grid gap-6 md:grid-cols-2 mb-16">
          {privacyConcepts.map((concept, index) => (
            <ConceptCard key={concept.id} concept={concept} index={index} />
          ))}
        </div>

        {/* Why Europe section */}
        <motion.div
          className="bg-card border border-border rounded-3xl p-8 shadow-lg overflow-hidden relative"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {/* Background decoration */}
          <div className="absolute top-0 right-0 text-[200px] opacity-5 pointer-events-none">
            🇪🇺
          </div>

          <motion.h3 
            className="text-2xl md:text-3xl font-display font-bold mb-8 flex items-center gap-3"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-4xl">🇪🇺</span>
            Perché l'Europa è Leader nella Privacy?
          </motion.h3>
          
          <div className="grid md:grid-cols-2 gap-6 relative z-10">
            {[
              {
                icon: Scale,
                title: 'È un Diritto Fondamentale',
                color: 'primary',
                description: 'La Carta dei Diritti Fondamentali dell\'UE (Art. 8) riconosce la protezione dei dati personali come diritto umano. Non è solo burocrazia, è etica!',
              },
              {
                icon: Globe,
                title: 'Standard Globale',
                color: 'info',
                description: 'Il GDPR ha ispirato leggi simili in tutto il mondo (Brasile, California, Giappone...). Imparalo e sei pronto per il mercato globale.',
              },
              {
                icon: Euro,
                title: 'Sanzioni Serie',
                color: 'warning',
                description: 'Multe fino al 4% del fatturato globale o 20 milioni di euro. Non è uno scherzo: la privacy è un requisito di business.',
              },
              {
                icon: Heart,
                title: 'Fiducia degli Utenti',
                color: 'success',
                description: 'Le app che rispettano la privacy costruiscono fiducia. Gli utenti europei sono consapevoli e preferiscono servizi trasparenti.',
              },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                className="p-5 rounded-xl bg-secondary/30 border border-border"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * index }}
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: '0 0 20px hsl(158 64% 50% / 0.1)',
                }}
              >
                <div className="flex items-start gap-3">
                  <motion.div
                    className={`p-2 rounded-lg bg-${item.color}/20`}
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 4, repeat: Infinity, delay: index * 0.5 }}
                  >
                    <item.icon className={`w-5 h-5 text-${item.color}`} />
                  </motion.div>
                  <div>
                    <h4 className="font-semibold mb-2">{item.title}</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ConceptsSection;
