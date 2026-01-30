import { motion } from 'framer-motion';
import { privacyConcepts } from '@/data/mockData';
import ConceptCard from './ConceptCard';
import { BookOpen } from 'lucide-react';

const ConceptsSection = () => {
  return (
    <section className="py-16 px-4">
      <div className="container max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-4">
            <BookOpen className="w-4 h-4" />
            <span className="text-sm font-medium">Fondamenti GDPR</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            I Pilastri della Privacy
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprendi i principi fondamentali che guidano la protezione dei dati in Europa. 
            Ogni sviluppatore dovrebbe conoscerli!
          </p>
        </motion.div>

        {/* Concept cards grid */}
        <div className="grid gap-6 md:grid-cols-2">
          {privacyConcepts.map((concept, index) => (
            <ConceptCard key={concept.id} concept={concept} index={index} />
          ))}
        </div>

        {/* Why Europe section */}
        <motion.div
          className="mt-12 p-8 rounded-2xl bg-gradient-to-br from-primary/5 to-accent/20 border border-primary/20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-display font-bold mb-4 flex items-center gap-3">
            🇪🇺 Perché l'Europa è Leader nella Privacy?
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-2">Protezione come Diritto Fondamentale</h4>
              <p className="text-muted-foreground text-sm leading-relaxed">
                La Carta dei Diritti Fondamentali dell'UE (Art. 8) riconosce la protezione 
                dei dati personali come diritto umano. Non è solo compliance, è etica.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Standard Globale</h4>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Il GDPR ha ispirato leggi simili in tutto il mondo (LGPD in Brasile, CCPA in 
                California). Conoscere il GDPR ti prepara per il mercato globale.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Sanzioni Significative</h4>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Multe fino al 4% del fatturato globale o 20 milioni di euro. La privacy 
                non è opzionale: è un requisito di business.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Fiducia degli Utenti</h4>
              <p className="text-muted-foreground text-sm leading-relaxed">
                App che rispettano la privacy costruiscono fiducia duratura. Gli utenti 
                europei sono sempre più consapevoli e scelgono servizi trasparenti.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ConceptsSection;
