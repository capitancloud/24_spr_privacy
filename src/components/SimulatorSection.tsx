import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { UserData } from '@/types/privacy';
import { initialMockUserData } from '@/data/mockData';
import ConsentForm from './ConsentForm';
import DataVisualizer from './DataVisualizer';
import { Sparkles, Info, AlertCircle, CheckCircle } from 'lucide-react';

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
    
    setUserData(prev => prev.map(item => {
      if (id === 'marketing' && ['Preferenze di marketing', 'Cronologia acquisti'].includes(item.field)) {
        return { ...item, hasConsent: value };
      }
      if (id === 'contact' && ['Numero di telefono', 'Indirizzo'].includes(item.field)) {
        return { ...item, hasConsent: value };
      }
      if (id === 'sensitive' && ['Data di nascita', 'Codice Fiscale'].includes(item.field)) {
        return { ...item, hasConsent: value };
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
    <section className="py-20 px-4 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 -z-10">
        <div 
          className="w-full h-full opacity-30"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 50%, hsl(158 64% 50% / 0.1) 0%, transparent 50%),
                              radial-gradient(circle at 80% 50%, hsl(200 80% 55% / 0.1) 0%, transparent 50%)`,
          }}
        />
      </div>

      <div className="container max-w-6xl mx-auto relative z-10">
        {/* Section header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <motion.div 
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-warning/20 border border-warning/30 text-warning mb-4"
            animate={{ 
              boxShadow: [
                '0 0 0 0 hsl(38 92% 50% / 0.4)',
                '0 0 0 10px hsl(38 92% 50% / 0)',
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">Simulatore Interattivo</span>
          </motion.div>
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">
            Prova Tu Stesso! <span className="gradient-text">🧪</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Questo è un database finto con dati inventati. Gioca con i consensi, 
            anonimizza e cancella per vedere cosa succede!
          </p>

          {/* Instructions */}
          <motion.div
            className="grid sm:grid-cols-3 gap-4 max-w-3xl mx-auto mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            {[
              { 
                icon: Info, 
                color: 'info',
                step: '1',
                text: 'A sinistra gestisci i consensi',
              },
              { 
                icon: AlertCircle, 
                color: 'warning',
                step: '2',
                text: 'A destra vedi l\'effetto sui dati',
              },
              { 
                icon: CheckCircle, 
                color: 'success',
                step: '3',
                text: 'Prova ad anonimizzare e cancellare',
              },
            ].map((item, index) => (
              <motion.div
                key={item.step}
                className="flex items-center gap-3 p-4 rounded-xl bg-card/50 border border-border"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className={`w-8 h-8 rounded-full bg-${item.color}/20 flex items-center justify-center text-${item.color} font-bold`}>
                  {item.step}
                </div>
                <span className="text-sm text-left">{item.text}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Simulator grid */}
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Consent Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <ConsentForm 
              consents={consents} 
              onConsentChange={handleConsentChange} 
            />
          </motion.div>

          {/* Data Visualizer */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <DataVisualizer
              data={userData}
              onAnonymize={handleAnonymize}
              onDelete={handleDelete}
              onReset={handleReset}
              onAnonymizeAll={handleAnonymizeAll}
              onDeleteWithoutConsent={handleDeleteWithoutConsent}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SimulatorSection;
