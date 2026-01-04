import { AnimatePresence, motion } from 'framer-motion';
import { useAssistantStore } from '@/store/useAssistantStore';
import { OnboardingFlow } from '@/components/onboarding/OnboardingFlow';
import { MainLayout } from '@/components/layout/MainLayout';

const Index = () => {
  const { onboardingComplete } = useAssistantStore();

  return (
    <AnimatePresence mode="wait">
      {!onboardingComplete ? (
        <motion.div
          key="onboarding"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.5 }}
        >
          <OnboardingFlow />
        </motion.div>
      ) : (
        <motion.div
          key="main"
          initial={{ opacity: 0, scale: 1.02 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <MainLayout />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Index;
