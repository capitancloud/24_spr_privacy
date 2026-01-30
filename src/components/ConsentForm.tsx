import { motion } from 'framer-motion';
import { consentOptions } from '@/data/mockData';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Shield, AlertCircle, Info } from 'lucide-react';

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
  essential: 'border-success/30 bg-success/5',
  optional: 'border-info/30 bg-info/5',
  sensitive: 'border-sensitive/30 bg-sensitive/5',
};

const ConsentForm = ({ consents, onConsentChange }: ConsentFormProps) => {
  return (
    <motion.div
      className="p-6 rounded-2xl bg-card border border-border shadow-card"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-xl bg-primary/10">
          <Shield className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h3 className="text-xl font-display font-semibold">Gestione del Consenso</h3>
          <p className="text-sm text-muted-foreground">
            Seleziona quali dati vuoi condividere
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {consentOptions.map((option, index) => {
          const Icon = categoryIcons[option.category];
          
          return (
            <motion.div
              key={option.id}
              className={`p-4 rounded-xl border-2 ${categoryStyles[option.category]} transition-all duration-200`}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.01 }}
            >
              <div className="flex items-start gap-4">
                <Checkbox
                  id={option.id}
                  checked={option.required || consents[option.id]}
                  disabled={option.required}
                  onCheckedChange={(checked) => 
                    onConsentChange(option.id, checked as boolean)
                  }
                  className="mt-1"
                />
                <div className="flex-1">
                  <Label
                    htmlFor={option.id}
                    className="flex items-center gap-2 font-medium cursor-pointer"
                  >
                    <Icon className="w-4 h-4" />
                    {option.label}
                    {option.required && (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-success/20 text-success">
                        Obbligatorio
                      </span>
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
        className="mt-6 p-4 rounded-xl bg-accent/50 border border-primary/20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4 }}
      >
        <p className="text-sm text-foreground">
          <strong className="text-primary">💡 Nota educativa:</strong> Nel GDPR, il consenso 
          deve essere <em>granulare</em>: l'utente sceglie esattamente cosa condividere. 
          Le checkbox non devono mai essere pre-selezionate!
        </p>
      </motion.div>
    </motion.div>
  );
};

export default ConsentForm;
