import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { UserData } from '@/types/privacy';
import { initialMockUserData } from '@/data/mockData';
import ConsentForm from './ConsentForm';
import DataVisualizer from './DataVisualizer';
import { Sparkles } from 'lucide-react';

const SimulatorSection = () => {
  const [userData, setUserData] = useState<UserData[]>(initialMockUserData);
  const [consents, setConsents] = useState<Record<string, boolean>>({
    essential: true,
    contact: false,
    sensitive: false,
    marketing: false,
  });

  // Update consent and reflect in data
  const handleConsentChange = useCallback((id: string, value: boolean) => {
    setConsents(prev => ({ ...prev, [id]: value }));
    
    // Map consent categories to data categories
    const categoryMapping: Record<string, string[]> = {
      essential: ['essential'],
      contact: ['optional'],
      sensitive: ['sensitive'],
      marketing: ['optional'],
    };

    const affectedCategories = categoryMapping[id] || [];
    
    setUserData(prev => prev.map(item => {
      if (affectedCategories.includes(item.category)) {
        // Special handling for marketing-specific fields
        if (id === 'marketing' && ['Preferenze di marketing', 'Cronologia acquisti'].includes(item.field)) {
          return { ...item, hasConsent: value };
        }
        if (id === 'contact' && ['Numero di telefono', 'Indirizzo'].includes(item.field)) {
          return { ...item, hasConsent: value };
        }
        if (id === 'sensitive' && ['Data di nascita', 'Codice Fiscale'].includes(item.field)) {
          return { ...item, hasConsent: value };
        }
      }
      return item;
    }));
  }, []);

  const handleAnonymize = useCallback((id: string) => {
    setUserData(prev => prev.map(item => 
      item.id === id ? { ...item, isAnonymized: true } : item
    ));
  }, []);

  const handleDelete = useCallback((id: string) => {
    setUserData(prev => prev.map(item => 
      item.id === id ? { ...item, isDeleted: true } : item
    ));
  }, []);

  const handleReset = useCallback(() => {
    setUserData(initialMockUserData);
    setConsents({
      essential: true,
      contact: false,
      sensitive: false,
      marketing: false,
    });
  }, []);

  const handleAnonymizeAll = useCallback(() => {
    setUserData(prev => prev.map(item => ({ ...item, isAnonymized: true })));
  }, []);

  const handleDeleteWithoutConsent = useCallback(() => {
    setUserData(prev => prev.map(item => 
      !item.hasConsent ? { ...item, isDeleted: true } : item
    ));
  }, []);

  return (
    <section className="py-16 px-4 bg-secondary/30">
      <div className="container max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-4">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">Simulatore Interattivo</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Prova la Gestione dei Dati
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Interagisci con un database simulato. Concedi consensi, anonimizza dati 
            e osserva cosa succede quando applichi i principi GDPR.
          </p>
        </motion.div>

        {/* Simulator grid */}
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Consent Form */}
          <div>
            <ConsentForm 
              consents={consents} 
              onConsentChange={handleConsentChange} 
            />
          </div>

          {/* Data Visualizer */}
          <div>
            <DataVisualizer
              data={userData}
              onAnonymize={handleAnonymize}
              onDelete={handleDelete}
              onReset={handleReset}
              onAnonymizeAll={handleAnonymizeAll}
              onDeleteWithoutConsent={handleDeleteWithoutConsent}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SimulatorSection;
