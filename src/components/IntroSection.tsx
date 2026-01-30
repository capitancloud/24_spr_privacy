import { motion } from 'framer-motion';
import { HelpCircle, User, Database, Shield, AlertTriangle } from 'lucide-react';

const IntroSection = () => {
  return (
    <section className="py-20 px-4 relative overflow-hidden">
      {/* Background decoration */}
      <motion.div
        className="absolute top-0 right-0 w-96 h-96 rounded-full bg-primary/5 blur-3xl"
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      <div className="container max-w-4xl mx-auto relative z-10">
        {/* Section header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <motion.div 
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-info/20 border border-info/30 text-info mb-4"
            whileHover={{ scale: 1.05 }}
          >
            <HelpCircle className="w-4 h-4" />
            <span className="text-sm font-medium">Partiamo dalle Basi</span>
          </motion.div>
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">
            Cosa sono i <span className="gradient-text">Dati Personali</span>?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Prima di tutto, capiamo di cosa stiamo parlando
          </p>
        </motion.div>

        {/* Main explanation card */}
        <motion.div
          className="bg-card border border-border rounded-3xl p-8 mb-12 shadow-lg"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          whileHover={{ boxShadow: '0 0 40px hsl(158 64% 50% / 0.1)' }}
        >
          <div className="flex items-start gap-4 mb-6">
            <motion.div
              className="p-3 rounded-2xl bg-primary/20"
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <User className="w-8 h-8 text-primary" />
            </motion.div>
            <div>
              <h3 className="text-2xl font-display font-semibold mb-2">
                Definizione semplice
              </h3>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Un <strong className="text-foreground">dato personale</strong> è qualsiasi informazione 
                che può identificare una persona. Può essere <em>direttamente</em> (come il nome) 
                o <em>indirettamente</em> (come un indirizzo IP).
              </p>
            </div>
          </div>

          {/* Examples grid */}
          <div className="grid md:grid-cols-2 gap-4 mt-8">
            <motion.div
              className="p-5 rounded-xl bg-success/10 border border-success/30"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              whileHover={{ scale: 1.02 }}
            >
              <h4 className="font-semibold text-success mb-3 flex items-center gap-2">
                <Database className="w-4 h-4" />
                Esempi di dati personali:
              </h4>
              <ul className="text-sm space-y-2 text-muted-foreground">
                <li className="flex items-center gap-2">
                  <span className="text-success">•</span> Nome e cognome
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-success">•</span> Indirizzo email
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-success">•</span> Numero di telefono
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-success">•</span> Indirizzo di casa
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-success">•</span> Foto del volto
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-success">•</span> Indirizzo IP
                </li>
              </ul>
            </motion.div>

            <motion.div
              className="p-5 rounded-xl bg-sensitive/10 border border-sensitive/30"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              whileHover={{ scale: 1.02 }}
            >
              <h4 className="font-semibold text-sensitive mb-3 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" />
                Dati SENSIBILI (protezione extra):
              </h4>
              <ul className="text-sm space-y-2 text-muted-foreground">
                <li className="flex items-center gap-2">
                  <span className="text-sensitive">•</span> Stato di salute
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-sensitive">•</span> Orientamento sessuale
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-sensitive">•</span> Opinioni politiche
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-sensitive">•</span> Credenze religiose
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-sensitive">•</span> Dati genetici
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-sensitive">•</span> Dati biometrici
                </li>
              </ul>
            </motion.div>
          </div>
        </motion.div>

        {/* Why it matters */}
        <motion.div
          className="bg-gradient-to-r from-primary/10 to-info/10 border border-primary/20 rounded-3xl p-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex items-start gap-4">
            <motion.div
              className="p-3 rounded-2xl bg-primary/20 flex-shrink-0"
              animate={{ 
                boxShadow: [
                  '0 0 0 0 hsl(158 64% 50% / 0.4)',
                  '0 0 0 15px hsl(158 64% 50% / 0)',
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Shield className="w-8 h-8 text-primary" />
            </motion.div>
            <div>
              <h3 className="text-2xl font-display font-semibold mb-3">
                Perché è importante proteggerli?
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Immagina se qualcuno sapesse tutto di te: dove vivi, cosa compri, 
                con chi parli, quali malattie hai avuto. Questi dati possono essere usati per:
              </p>
              <div className="grid sm:grid-cols-3 gap-4">
                {[
                  { emoji: '🎯', text: 'Truffe mirate' },
                  { emoji: '💰', text: 'Furto d\'identità' },
                  { emoji: '🔓', text: 'Violazione privacy' },
                ].map((item, i) => (
                  <motion.div
                    key={item.text}
                    className="flex items-center gap-2 p-3 rounded-xl bg-card/50"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + i * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <span className="text-2xl">{item.emoji}</span>
                    <span className="text-sm font-medium">{item.text}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default IntroSection;
