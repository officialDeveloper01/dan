import { motion } from 'framer-motion';
import { useAssistantStore } from '@/store/useAssistantStore';
import { Sparkles } from 'lucide-react';

export function OnboardingStep3() {
  const { assistantName, setAssistantName } = useAssistantStore();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="space-y-10"
    >
      <div className="text-center space-y-3">
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-3xl font-bold gradient-text"
        >
          Name Your Assistant
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-muted-foreground text-lg"
        >
          Give your assistant a unique identity
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
        className="space-y-6"
      >
        <div className="relative">
          <input
            type="text"
            value={assistantName}
            onChange={(e) => setAssistantName(e.target.value)}
            placeholder="Enter a name..."
            className="w-full px-6 py-4 text-xl bg-secondary/50 border-2 border-border rounded-xl 
                     text-foreground placeholder:text-muted-foreground/50
                     focus:outline-none focus:border-primary focus:glow-border
                     transition-all duration-300"
            maxLength={20}
          />
          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
            {assistantName.length}/20
          </div>
        </div>

        <p className="text-sm text-muted-foreground text-center italic">
          Choose a name that feels right to you
        </p>
      </motion.div>

      {assistantName.trim() && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-center space-y-4"
        >
          <div className="inline-flex items-center gap-2 text-muted-foreground">
            <Sparkles className="w-4 h-4 text-primary" />
            <span>Preview</span>
            <Sparkles className="w-4 h-4 text-primary" />
          </div>
          <motion.div
            key={assistantName}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-4xl font-bold"
          >
            <span className="gradient-text">D.A.N</span>
            <span className="text-muted-foreground mx-3">—</span>
            <span className="text-foreground">{assistantName.trim()}</span>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
}
