import { motion } from 'framer-motion';
import { LogOut, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

const NavBar = () => {
  const { logout } = useAuth();

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/50"
    >
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center">
            <Shield className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-lg font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              PrivacyGuard
            </h1>
            <p className="text-xs text-muted-foreground">Educazione alla Privacy</p>
          </div>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={logout}
          className="border-destructive/50 text-destructive hover:bg-destructive hover:text-destructive-foreground transition-colors"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Esci
        </Button>
      </div>
    </motion.nav>
  );
};

export default NavBar;
