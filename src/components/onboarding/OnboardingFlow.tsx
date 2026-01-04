import { motion, AnimatePresence } from 'framer-motion';
import { useAssistantStore } from '@/store/useAssistantStore';
import { OnboardingStep1 } from './OnboardingStep1';
import { OnboardingStep2 } from './OnboardingStep2';
import { OnboardingStep3 } from './OnboardingStep3';
import { ArrowRight, ArrowLeft, Zap } from 'lucide-react';

const TOTAL_STEPS = 3;

export function OnboardingFlow() {
  const { onboardingStep, setOnboardingStep, setOnboardingComplete, assistantName } = useAssistantStore();

  const canProceed = () => {
    if (onboardingStep === 2) {
      return assistantName.trim().length > 0;
    }
    return true;
  };

  const handleNext = () => {
    if (onboardingStep < TOTAL_STEPS - 1) {
      setOnboardingStep(onboardingStep + 1);
    } else if (canProceed()) {
      setOnboardingComplete(true);
    }
  };

  const handleBack = () => {
    if (onboardingStep > 0) {
      setOnboardingStep(onboardingStep - 1);
    }
  };

  const renderStep = () => {
    switch (onboardingStep) {
      case 0:
        return <OnboardingStep1 />;
      case 1:
        return <OnboardingStep2 />;
      case 2:
        return <OnboardingStep3 />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Ambient background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute w-[600px] h-[600px] rounded-full opacity-20"
          style={{
            background: 'radial-gradient(circle, hsl(var(--primary)) 0%, transparent 70%)',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.15, 0.25, 0.15],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12"
      >
        <h1 className="text-5xl font-bold gradient-text glow-text tracking-tight">
          D.A.N
        </h1>
      </motion.div>

      {/* Progress indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="flex items-center gap-3 mb-10"
      >
        {Array.from({ length: TOTAL_STEPS }).map((_, index) => (
          <motion.div
            key={index}
            className="relative"
            initial={false}
          >
            <div
              className={`w-12 h-1.5 rounded-full transition-all duration-500 ${
                index <= onboardingStep
                  ? 'bg-primary glow-border'
                  : 'bg-border'
              }`}
            />
            {index === onboardingStep && (
              <motion.div
                layoutId="progress-glow"
                className="absolute inset-0 bg-primary rounded-full"
                style={{ boxShadow: 'var(--shadow-glow)' }}
              />
            )}
          </motion.div>
        ))}
      </motion.div>

      {/* Step content */}
      <div className="w-full max-w-xl glass-panel rounded-2xl p-8 relative z-10">
        <AnimatePresence mode="wait">
          {renderStep()}
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="flex items-center gap-4 mt-10"
      >
        {onboardingStep > 0 && (
          <motion.button
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={handleBack}
            className="flex items-center gap-2 px-6 py-3 rounded-xl border border-border
                     text-muted-foreground hover:text-foreground hover:border-primary/50
                     transition-all duration-300"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </motion.button>
        )}

        <motion.button
          whileHover={{ scale: canProceed() ? 1.02 : 1 }}
          whileTap={{ scale: canProceed() ? 0.98 : 1 }}
          onClick={handleNext}
          disabled={!canProceed()}
          className={`flex items-center gap-2 px-8 py-3 rounded-xl font-semibold
                   transition-all duration-300 ${
                     canProceed()
                       ? 'bg-primary text-primary-foreground glow-border hover:glow-border-lg'
                       : 'bg-muted text-muted-foreground cursor-not-allowed'
                   }`}
        >
          {onboardingStep === TOTAL_STEPS - 1 ? (
            <>
              <Zap className="w-4 h-4" />
              Enter D.A.N
            </>
          ) : (
            <>
              Continue
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </motion.button>
      </motion.div>

      {/* Step indicator text */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-6 text-sm text-muted-foreground"
      >
        Step {onboardingStep + 1} of {TOTAL_STEPS}
      </motion.p>
    </div>
  );
}
