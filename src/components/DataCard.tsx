import { motion, AnimatePresence } from 'framer-motion';
import { UserData } from '@/types/privacy';
import { Lock, Eye, EyeOff, Trash2, Shield, AlertTriangle, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface DataCardProps {
  data: UserData;
  onAnonymize: (id: string) => void;
  onDelete: (id: string) => void;
}

const categoryConfig = {
  essential: {
    label: 'Essenziale',
    description: 'Necessario per il servizio',
    bgClass: 'data-card-safe',
    borderClass: 'border-success/40',
    icon: Shield,
    iconColor: 'text-success',
  },
  optional: {
    label: 'Opzionale',
    description: 'Migliora l\'esperienza',
    bgClass: 'bg-secondary/50',
    borderClass: 'border-info/40',
    icon: Eye,
    iconColor: 'text-info',
  },
  sensitive: {
    label: 'Sensibile',
    description: 'Richiede protezione extra',
    bgClass: 'data-card-sensitive',
    borderClass: 'border-sensitive/40',
    icon: AlertTriangle,
    iconColor: 'text-sensitive',
  },
};

const DataCard = ({ data, onAnonymize, onDelete }: DataCardProps) => {
  const config = categoryConfig[data.category];
  const Icon = config.icon;

  const anonymizeValue = (value: string): string => {
    if (value.includes('@')) {
      const [local, domain] = value.split('@');
      return `${local[0]}***@${domain}`;
    }
    if (value.match(/^\+?\d/)) {
      return value.replace(/\d(?=\d{2})/g, '*');
    }
    if (value.includes('/')) {
      return '**/**/****';
    }
    const words = value.split(' ');
    return words.map(w => w[0] + '***').join(' ');
  };

  return (
    <AnimatePresence mode="popLayout">
      {!data.isDeleted && (
        <motion.div
          layout
          initial={{ opacity: 0, scale: 0.8, y: 20, rotateY: -15 }}
          animate={{ 
            opacity: 1, 
            scale: 1, 
            y: 0,
            rotateY: 0,
          }}
          exit={{ 
            opacity: 0, 
            scale: 0.3, 
            y: -50,
            rotateY: 45,
            filter: 'blur(10px)',
          }}
          transition={{ 
            type: 'spring', 
            stiffness: 300, 
            damping: 25,
            layout: { duration: 0.4 },
          }}
          whileHover={{ 
            scale: 1.02,
            boxShadow: '0 10px 30px hsl(0 0% 0% / 0.3)',
          }}
          className={`
            relative p-5 rounded-xl border-2 overflow-hidden
            ${config.bgClass} ${config.borderClass}
            ${!data.hasConsent && !data.isAnonymized ? 'opacity-70' : ''}
          `}
        >
          {/* Animated background on anonymization */}
          {data.isAnonymized && (
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-primary/10"
              animate={{ x: ['-100%', '100%'] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            />
          )}

          {/* Header */}
          <div className="flex items-start justify-between mb-3 relative z-10">
            <div className="flex items-center gap-2">
              <motion.div
                animate={data.category === 'sensitive' ? { 
                  scale: [1, 1.2, 1],
                } : {}}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Icon className={`w-4 h-4 ${config.iconColor}`} />
              </motion.div>
              <div>
                <span className="text-xs font-medium px-2 py-1 rounded-full bg-background/80 block">
                  {config.label}
                </span>
                <span className="text-[10px] text-muted-foreground mt-1 block">
                  {config.description}
                </span>
              </div>
            </div>
            
            {data.hasConsent ? (
              <motion.span 
                className="text-xs text-success flex items-center gap-1 px-2 py-1 rounded-full bg-success/20"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Lock className="w-3 h-3" />
                Consenso ✓
              </motion.span>
            ) : (
              <span className="text-xs text-muted-foreground flex items-center gap-1 px-2 py-1 rounded-full bg-muted">
                <EyeOff className="w-3 h-3" />
                No consenso
              </span>
            )}
          </div>

          {/* Field name */}
          <h4 className="font-semibold text-foreground mb-1 relative z-10">{data.field}</h4>
          
          {/* Value with anonymization effect */}
          <motion.div 
            className={`text-sm mb-3 font-mono relative z-10 ${data.isAnonymized ? 'text-muted-foreground' : 'text-foreground'}`}
            animate={{ 
              opacity: data.isAnonymized ? 0.7 : 1,
            }}
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={data.isAnonymized ? 'anon' : 'normal'}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                {data.isAnonymized ? anonymizeValue(data.value) : data.value}
              </motion.span>
            </AnimatePresence>
            {data.isAnonymized && (
              <motion.span 
                className="ml-2 text-xs text-primary px-2 py-0.5 rounded-full bg-primary/20"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                🔒 anonimizzato
              </motion.span>
            )}
          </motion.div>

          {/* Retention info */}
          <div className="flex items-center gap-1 text-xs text-muted-foreground mb-4 relative z-10">
            <Clock className="w-3 h-3" />
            Conservazione: {data.retentionDays} giorni
          </div>

          {/* Actions */}
          <div className="flex gap-2 relative z-10">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onAnonymize(data.id)}
              disabled={data.isAnonymized}
              className="flex-1 text-xs group"
            >
              <motion.div
                animate={!data.isAnonymized ? { rotate: [0, 10, -10, 0] } : {}}
                transition={{ duration: 0.5 }}
              >
                <EyeOff className="w-3 h-3 mr-1 group-hover:text-primary transition-colors" />
              </motion.div>
              {data.isAnonymized ? 'Anonimizzato' : 'Anonimizza'}
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => onDelete(data.id)}
              className="flex-1 text-xs group"
            >
              <motion.div
                whileHover={{ rotate: -20 }}
              >
                <Trash2 className="w-3 h-3 mr-1" />
              </motion.div>
              Cancella
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DataCard;
