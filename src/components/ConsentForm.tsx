import { motion } from 'framer-motion';
import { consentOptions } from '@/data/mockData';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Shield, AlertCircle, Info, HelpCircle } from 'lucide-react';

interface ConsentFormProps {
  consents: Record<string, boolean>;
  onConsentChange: (id: string, value: boolean) => void;
}

const categoryIcons = {
  essential: Shield,
  optional: Info,
  sensitive: AlertCircle,
};

const categoryStyles = {
  essential: 'border-success/40 bg-success/10',
  optional: 'border-info/40 bg-info/10',
  sensitive: 'border-sensitive/40 bg-sensitive/10',
};

const ConsentForm = ({ consents, onConsentChange }: ConsentFormProps) => {
  return (
    <motion.div
      className="p-6 rounded-2xl bg-card border border-border shadow-lg"
      whileHover={{ boxShadow: '0 0 30px hsl(158 64% 50% / 0.1)' }}
    >
      <div className="flex items-center gap-3 mb-6">
        <motion.div 
          className="p-3 rounded-xl bg-primary/20"
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          <Shield className="w-6 h-6 text-primary" />
        </motion.div>
        <div>
          <h3 className="text-xl font-display font-semibold">Gestione del Consenso</h3>
          <p className="text-sm text-muted-foreground">
            Simula le scelte dell'utente
          </p>
        </div>
      </div>

      {/* Explanation for beginners */}
      <motion.div
        className="p-4 rounded-xl bg-info/10 border border-info/30 mb-6"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-start gap-2">
          <HelpCircle className="w-4 h-4 text-info flex-shrink-0 mt-0.5" />
          <p className="text-sm text-foreground/80">
            <strong className="text-info">Cosa stai simulando?</strong> Quando un utente 
            si registra, deve poter scegliere quali dati condividere. Prova a spuntare 
            le caselle e guarda cosa cambia nel "database" a destra!
          </p>
        </div>
      </motion.div>

      <div className="space-y-4">
        {consentOptions.map((option, index) => {
          const Icon = categoryIcons[option.category];
          const isChecked = option.required || consents[option.id];
          
          return (
            <motion.div
              key={option.id}
              className={`p-4 rounded-xl border-2 ${categoryStyles[option.category]} transition-all duration-300`}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02, x: 5 }}
              animate={isChecked ? { 
                boxShadow: '0 0 15px hsl(158 64% 50% / 0.2)',
              } : {}}
            >
              <div className="flex items-start gap-4">
                <motion.div
                  whileTap={{ scale: 0.9 }}
                >
                  <Checkbox
                    id={option.id}
                    checked={isChecked}
                    disabled={option.required}
                    onCheckedChange={(checked) => 
                      onConsentChange(option.id, checked as boolean)
                    }
                    className="mt-1"
                  />
                </motion.div>
                <div className="flex-1">
                  <Label
                    htmlFor={option.id}
                    className="flex items-center gap-2 font-medium cursor-pointer"
                  >
                    <motion.div
                      animate={isChecked ? { scale: [1, 1.2, 1] } : {}}
                      transition={{ duration: 0.3 }}
                    >
                      <Icon className="w-4 h-4" />
                    </motion.div>
                    {option.label}
                    {option.required && (
                      <motion.span 
                        className="text-xs px-2 py-0.5 rounded-full bg-success/30 text-success"
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        Obbligatorio
                      </motion.span>
                    )}
                  </Label>
                  <p className="text-sm text-muted-foreground mt-1">
                    {option.description}
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Educational note */}
      <motion.div
        className="mt-6 p-4 rounded-xl bg-primary/10 border border-primary/30"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4 }}
        whileHover={{ scale: 1.01 }}
      >
        <p className="text-sm text-foreground">
          <strong className="text-primary">💡 Perché è importante?</strong> Nel GDPR, il consenso 
          deve essere <em>granulare</em>: l'utente sceglie esattamente cosa condividere. 
          Le checkbox <strong>non devono mai essere pre-selezionate</strong>! L'utente deve fare 
          un'azione consapevole.
        </p>
      </motion.div>
    </motion.div>
  );
};

export default ConsentForm;
