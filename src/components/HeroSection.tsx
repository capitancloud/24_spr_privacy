import { motion } from 'framer-motion';
import { Shield, Lock, Eye, ArrowDown, Sparkles } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div 
        className="absolute inset-0 -z-10"
        style={{ background: 'var(--gradient-hero)' }}
      />
      
      {/* Animated grid background */}
      <div className="absolute inset-0 -z-10 opacity-20">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(hsl(158 64% 50% / 0.1) 1px, transparent 1px),
              linear-gradient(90deg, hsl(158 64% 50% / 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }}
        />
      </div>
      
      {/* Animated floating orbs */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: Math.random() * 200 + 50,
              height: Math.random() * 200 + 50,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: i % 2 === 0 
                ? 'radial-gradient(circle, hsl(158 64% 50% / 0.15) 0%, transparent 70%)'
                : 'radial-gradient(circle, hsl(180 60% 50% / 0.1) 0%, transparent 70%)',
            }}
            animate={{
              y: [0, -40, 0],
              x: [0, 20, 0],
              scale: [1, 1.1, 1],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: 8 + i * 1.5,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.5,
            }}
          />
        ))}
      </div>

      <div className="container px-4 py-16">
        <motion.div
          className="text-center max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          {/* Animated badge */}
          <motion.div
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary/20 border border-primary/30 text-primary mb-8"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            whileHover={{ scale: 1.05 }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
            >
              <Sparkles className="w-4 h-4" />
            </motion.div>
            <span className="text-sm font-medium">Impara la Privacy da Zero</span>
          </motion.div>

          {/* Animated title with glow */}
          <motion.div
            className="relative mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <motion.h1
              className="text-5xl md:text-7xl lg:text-8xl font-display font-bold tracking-tight"
              animate={{ 
                textShadow: [
                  '0 0 20px hsl(158 64% 50% / 0.3)',
                  '0 0 40px hsl(158 64% 50% / 0.5)',
                  '0 0 20px hsl(158 64% 50% / 0.3)',
                ]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <span className="gradient-text">PrivacyGuard</span>
            </motion.h1>
            
            {/* Animated underline */}
            <motion.div
              className="h-1 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mt-4"
              initial={{ width: 0 }}
              animate={{ width: '60%' }}
              transition={{ delay: 0.8, duration: 1 }}
            />
          </motion.div>

          {/* Subtitle with typewriter effect feel */}
          <motion.p
            className="text-lg md:text-xl text-muted-foreground mb-6 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <strong className="text-foreground">Non sai nulla di privacy?</strong> Perfetto! 
            Questa app ti insegna come proteggere i dati degli utenti 
            nel modo giusto, passo dopo passo.
          </motion.p>

          {/* What you'll learn box */}
          <motion.div
            className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-6 mb-8 max-w-xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <h3 className="text-sm font-semibold text-primary mb-3 flex items-center justify-center gap-2">
              <Shield className="w-4 h-4" />
              Cosa imparerai oggi:
            </h3>
            <ul className="text-sm text-muted-foreground space-y-2 text-left">
              <motion.li 
                className="flex items-start gap-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
              >
                <span className="text-primary mt-0.5">✓</span>
                <span><strong className="text-foreground">Cosa sono i dati personali</strong> e perché vanno protetti</span>
              </motion.li>
              <motion.li 
                className="flex items-start gap-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 }}
              >
                <span className="text-primary mt-0.5">✓</span>
                <span><strong className="text-foreground">Il GDPR europeo</strong> spiegato in modo semplice</span>
              </motion.li>
              <motion.li 
                className="flex items-start gap-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 }}
              >
                <span className="text-primary mt-0.5">✓</span>
                <span><strong className="text-foreground">Simulazione pratica</strong> di gestione dati con animazioni</span>
              </motion.li>
            </ul>
          </motion.div>

          {/* Feature pills with stagger animation */}
          <motion.div
            className="flex flex-wrap justify-center gap-4 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
          >
            {[
              { icon: Lock, text: 'Minimizzazione', desc: 'Raccogli solo il necessario' },
              { icon: Eye, text: 'Trasparenza', desc: 'Spiega cosa fai con i dati' },
              { icon: Shield, text: 'Protezione', desc: 'Difendi i dati degli utenti' },
            ].map((item, index) => (
              <motion.div
                key={item.text}
                className="flex flex-col items-center gap-2 px-6 py-4 rounded-2xl bg-card/80 backdrop-blur-sm shadow-lg border border-border/50"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 + index * 0.1 }}
                whileHover={{ 
                  scale: 1.05, 
                  y: -5,
                  boxShadow: '0 0 30px hsl(158 64% 50% / 0.2)',
                }}
              >
                <motion.div
                  animate={{ 
                    scale: [1, 1.1, 1],
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity,
                    delay: index * 0.3,
                  }}
                >
                  <item.icon className="w-6 h-6 text-primary" />
                </motion.div>
                <span className="font-semibold">{item.text}</span>
                <span className="text-xs text-muted-foreground">{item.desc}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            className="flex flex-col items-center gap-2 text-muted-foreground"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span className="text-sm">Scorri per iniziare</span>
            <ArrowDown className="w-5 h-5" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
