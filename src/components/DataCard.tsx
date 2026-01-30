import { motion, AnimatePresence } from 'framer-motion';
import { UserData } from '@/types/privacy';
import { Lock, Eye, EyeOff, Trash2, Shield, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface DataCardProps {
  data: UserData;
  onAnonymize: (id: string) => void;
  onDelete: (id: string) => void;
}

const categoryConfig = {
  essential: {
    label: 'Essenziale',
    bgClass: 'data-card-safe',
    borderClass: 'border-success/30',
    icon: Shield,
    iconColor: 'text-success',
  },
  optional: {
    label: 'Opzionale',
    bgClass: 'bg-secondary/50',
    borderClass: 'border-border',
    icon: Eye,
    iconColor: 'text-info',
  },
  sensitive: {
    label: 'Sensibile',
    bgClass: 'data-card-sensitive',
    borderClass: 'border-sensitive/30',
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
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ 
            opacity: 1, 
            scale: 1, 
            y: 0,
            filter: data.isAnonymized ? 'blur(0px)' : 'blur(0px)',
          }}
          exit={{ 
            opacity: 0, 
            scale: 0.5, 
            y: -20,
            filter: 'blur(10px)',
          }}
          transition={{ 
            type: 'spring', 
            stiffness: 300, 
            damping: 25,
            layout: { duration: 0.3 },
          }}
          className={`
            relative p-5 rounded-xl border-2 
            ${config.bgClass} ${config.borderClass}
            ${!data.hasConsent && !data.isAnonymized ? 'opacity-60' : ''}
          `}
        >
          {/* Header */}
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-2">
              <Icon className={`w-4 h-4 ${config.iconColor}`} />
              <span className="text-xs font-medium px-2 py-1 rounded-full bg-background/80">
                {config.label}
              </span>
            </div>
            
            {data.hasConsent ? (
              <span className="text-xs text-success flex items-center gap-1">
                <Lock className="w-3 h-3" />
                Consenso
              </span>
            ) : (
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <EyeOff className="w-3 h-3" />
                No consenso
              </span>
            )}
          </div>

          {/* Field name */}
          <h4 className="font-semibold text-foreground mb-1">{data.field}</h4>
          
          {/* Value with anonymization effect */}
          <motion.p 
            className={`text-sm mb-3 font-mono ${data.isAnonymized ? 'text-muted-foreground' : 'text-foreground'}`}
            animate={{ 
              opacity: data.isAnonymized ? 0.7 : 1,
            }}
          >
            {data.isAnonymized ? anonymizeValue(data.value) : data.value}
            {data.isAnonymized && (
              <span className="ml-2 text-xs text-primary">(anonimizzato)</span>
            )}
          </motion.p>

          {/* Retention info */}
          <div className="text-xs text-muted-foreground mb-4">
            ⏰ Conservazione: {data.retentionDays} giorni
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onAnonymize(data.id)}
              disabled={data.isAnonymized}
              className="flex-1 text-xs"
            >
              <EyeOff className="w-3 h-3 mr-1" />
              {data.isAnonymized ? 'Anonimizzato' : 'Anonimizza'}
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => onDelete(data.id)}
              className="flex-1 text-xs"
            >
              <Trash2 className="w-3 h-3 mr-1" />
              Cancella
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DataCard;
