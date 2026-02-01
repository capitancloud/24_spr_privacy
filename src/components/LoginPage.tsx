import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Lock, Eye, EyeOff, AlertCircle, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { verifyAccessCode } from '@/lib/auth';
import { useAuth } from '@/contexts/AuthContext';

const LoginPage = () => {
  const [code, setCode] = useState('');
  const [showCode, setShowCode] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const isValid = await verifyAccessCode(code);
      
      if (isValid) {
        login();
      } else {
        setError('Codice di accesso non valido. Riprova.');
        setCode('');
      }
    } catch {
      setError('Errore durante la verifica. Riprova.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5],
          }}
          transition={{ duration: 5, repeat: Infinity }}
        />
      </div>

      {/* Grid pattern */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-md"
      >
        <Card className="bg-card/80 backdrop-blur-xl border-primary/20 shadow-2xl">
          <CardHeader className="text-center space-y-4">
            <motion.div
              className="mx-auto w-20 h-20 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center shadow-lg"
              animate={{ 
                boxShadow: [
                  '0 0 20px rgba(34, 197, 94, 0.3)',
                  '0 0 40px rgba(34, 197, 94, 0.5)',
                  '0 0 20px rgba(34, 197, 94, 0.3)'
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Shield className="w-10 h-10 text-primary-foreground" />
            </motion.div>
            
            <div>
              <CardTitle className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                PrivacyGuard
              </CardTitle>
              <CardDescription className="text-muted-foreground mt-2">
                Piattaforma Educativa sulla Privacy dei Dati
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Educational note */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-primary/10 border border-primary/20 rounded-lg p-4"
            >
              <div className="flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <div className="text-sm">
                  <p className="font-semibold text-primary mb-1">🔐 Nota Educativa</p>
                  <p className="text-muted-foreground">
                    Questa schermata simula un controllo di accesso. 
                    In un'app reale, le credenziali sarebbero verificate tramite un server sicuro, 
                    mai esposte nel codice frontend.
                  </p>
                </div>
              </div>
            </motion.div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground flex items-center gap-2">
                  <Lock className="w-4 h-4 text-primary" />
                  Codice di Accesso
                </label>
                <div className="relative">
                  <Input
                    type={showCode ? 'text' : 'password'}
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="Inserisci il codice di accesso..."
                    className="pr-12 bg-background/50 border-border/50 focus:border-primary transition-colors"
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowCode(!showCode)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showCode ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: 'auto' }}
                    exit={{ opacity: 0, y: -10, height: 0 }}
                    className="flex items-center gap-2 text-destructive text-sm bg-destructive/10 p-3 rounded-lg"
                  >
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    {error}
                  </motion.div>
                )}
              </AnimatePresence>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity"
                disabled={isLoading || !code.trim()}
              >
                {isLoading ? (
                  <motion.div
                    className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  />
                ) : (
                  <>
                    <Shield className="w-4 h-4 mr-2" />
                    Accedi all'App Educativa
                  </>
                )}
              </Button>
            </form>

            {/* Security info */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-center text-xs text-muted-foreground space-y-1 pt-4 border-t border-border/50"
            >
              <p className="flex items-center justify-center gap-1">
                <Lock className="w-3 h-3" />
                Il codice viene verificato tramite hash SHA-256
              </p>
              <p>Nessuna password viene memorizzata in chiaro</p>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default LoginPage;
