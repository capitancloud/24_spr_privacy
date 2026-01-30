import { motion, AnimatePresence } from 'framer-motion';
import { UserData } from '@/types/privacy';
import DataCard from './DataCard';
import { Database, Trash2, RefreshCw, EyeOff, HelpCircle, Zap } from 'lucide-react';
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
      className="p-6 rounded-2xl bg-card border border-border shadow-lg"
      whileHover={{ boxShadow: '0 0 30px hsl(158 64% 50% / 0.1)' }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <motion.div 
            className="p-3 rounded-xl bg-info/20"
            animate={{ 
              rotateY: [0, 360],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
          >
            <Database className="w-6 h-6 text-info" />
          </motion.div>
          <div>
            <h3 className="text-xl font-display font-semibold">Database Simulato</h3>
            <div className="flex gap-3 text-xs text-muted-foreground mt-1">
              <motion.span 
                className="flex items-center gap-1"
                animate={activeData.length < 8 ? { scale: [1, 1.1, 1] } : {}}
                transition={{ duration: 0.5 }}
              >
                <span className="w-2 h-2 rounded-full bg-success" />
                {activeData.length} attivi
              </motion.span>
              <motion.span 
                className="flex items-center gap-1"
                animate={deletedCount > 0 ? { scale: [1, 1.1, 1] } : {}}
                transition={{ duration: 0.5 }}
              >
                <span className="w-2 h-2 rounded-full bg-destructive" />
                {deletedCount} cancellati
              </motion.span>
              <motion.span 
                className="flex items-center gap-1"
                animate={anonymizedCount > 0 ? { scale: [1, 1.1, 1] } : {}}
                transition={{ duration: 0.5 }}
              >
                <span className="w-2 h-2 rounded-full bg-primary" />
                {anonymizedCount} anonimi
              </motion.span>
            </div>
          </div>
        </div>
        
        <motion.div whileHover={{ rotate: 180 }} transition={{ duration: 0.3 }}>
          <Button
            variant="outline"
            size="sm"
            onClick={onReset}
            className="gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            Reset
          </Button>
        </motion.div>
      </div>

      {/* Explanation */}
      <motion.div
        className="p-3 rounded-xl bg-muted/50 border border-border mb-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="flex items-start gap-2">
          <HelpCircle className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-0.5" />
          <p className="text-xs text-muted-foreground">
            Questi sono dati <strong>finti</strong> per farti capire come funziona. 
            Prova i pulsanti "Anonimizza" e "Cancella" per vedere le animazioni!
          </p>
        </div>
      </motion.div>

      {/* Bulk actions */}
      <div className="flex flex-wrap gap-3 mb-6">
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
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
        </motion.div>
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
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
        </motion.div>
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
      <AnimatePresence>
        {activeData.length === 0 && (
          <motion.div
            className="text-center py-12"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
          >
            <motion.div 
              className="text-6xl mb-4"
              animate={{ 
                rotate: [0, 10, -10, 0],
                y: [0, -10, 0],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              🗑️
            </motion.div>
            <h4 className="text-xl font-display font-semibold mb-2">Database vuoto!</h4>
            <p className="text-muted-foreground mb-4 max-w-sm mx-auto">
              Hai cancellato tutti i dati. Questo è il <strong className="text-primary">"Diritto all'Oblio"</strong> in azione! 
              L'utente ha il diritto di far cancellare i suoi dati.
            </p>
            <motion.div whileHover={{ scale: 1.05 }}>
              <Button onClick={onReset} variant="outline" className="gap-2">
                <RefreshCw className="w-4 h-4" />
                Ripristina dati demo
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Educational notes */}
      <motion.div
        className="mt-6 space-y-3"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <motion.div 
          className="p-4 rounded-xl bg-primary/10 border border-primary/30"
          whileHover={{ scale: 1.01 }}
        >
          <p className="text-sm text-foreground flex items-start gap-2">
            <Zap className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
            <span>
              <strong className="text-primary">Anonimizzazione vs Cancellazione:</strong> L'anonimizzazione 
              maschera i dati rendendoli non identificabili, ma mantiene il valore statistico. 
              La cancellazione li elimina completamente.
            </span>
          </p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default DataVisualizer;
