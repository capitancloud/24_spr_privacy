import { motion, AnimatePresence } from 'framer-motion';
import { UserData } from '@/types/privacy';
import DataCard from './DataCard';
import { Database, Trash2, RefreshCw, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface DataVisualizerProps {
  data: UserData[];
  onAnonymize: (id: string) => void;
  onDelete: (id: string) => void;
  onReset: () => void;
  onAnonymizeAll: () => void;
  onDeleteWithoutConsent: () => void;
}

const DataVisualizer = ({ 
  data, 
  onAnonymize, 
  onDelete, 
  onReset,
  onAnonymizeAll,
  onDeleteWithoutConsent,
}: DataVisualizerProps) => {
  const activeData = data.filter(d => !d.isDeleted);
  const deletedCount = data.filter(d => d.isDeleted).length;
  const anonymizedCount = data.filter(d => d.isAnonymized && !d.isDeleted).length;
  const withoutConsentCount = activeData.filter(d => !d.hasConsent).length;

  return (
    <motion.div
      className="p-6 rounded-2xl bg-card border border-border shadow-card"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-primary/10">
            <Database className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h3 className="text-xl font-display font-semibold">Database Simulato</h3>
            <p className="text-sm text-muted-foreground">
              {activeData.length} record attivi • {deletedCount} cancellati • {anonymizedCount} anonimi
            </p>
          </div>
        </div>
        
        <Button
          variant="outline"
          size="sm"
          onClick={onReset}
          className="gap-2"
        >
          <RefreshCw className="w-4 h-4" />
          Reset
        </Button>
      </div>

      {/* Bulk actions */}
      <div className="flex flex-wrap gap-3 mb-6">
        <Button
          variant="secondary"
          size="sm"
          onClick={onAnonymizeAll}
          disabled={anonymizedCount === activeData.length}
          className="gap-2"
        >
          <EyeOff className="w-4 h-4" />
          Anonimizza tutti
        </Button>
        <Button
          variant="destructive"
          size="sm"
          onClick={onDeleteWithoutConsent}
          disabled={withoutConsentCount === 0}
          className="gap-2"
        >
          <Trash2 className="w-4 h-4" />
          Elimina senza consenso ({withoutConsentCount})
        </Button>
      </div>

      {/* Data grid */}
      <motion.div 
        className="grid gap-4 md:grid-cols-2"
        layout
      >
        <AnimatePresence mode="popLayout">
          {activeData.map((item) => (
            <DataCard
              key={item.id}
              data={item}
              onAnonymize={onAnonymize}
              onDelete={onDelete}
            />
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Empty state */}
      {activeData.length === 0 && (
        <motion.div
          className="text-center py-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="text-6xl mb-4">🗑️</div>
          <h4 className="text-xl font-display font-semibold mb-2">Database vuoto!</h4>
          <p className="text-muted-foreground mb-4">
            Tutti i dati sono stati cancellati. Il diritto all'oblio in azione!
          </p>
          <Button onClick={onReset} variant="outline">
            <RefreshCw className="w-4 h-4 mr-2" />
            Ripristina dati demo
          </Button>
        </motion.div>
      )}

      {/* Educational note */}
      <motion.div
        className="mt-6 p-4 rounded-xl bg-accent/50 border border-primary/20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <p className="text-sm text-foreground">
          <strong className="text-primary">💡 Diritto alla cancellazione (Art. 17 GDPR):</strong> Gli 
          utenti possono richiedere la cancellazione dei propri dati. L'anonimizzazione è un'alternativa 
          che preserva valore statistico senza identificare l'individuo.
        </p>
      </motion.div>
    </motion.div>
  );
};

export default DataVisualizer;
