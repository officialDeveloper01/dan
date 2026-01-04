import { motion } from 'framer-motion';
import { useAssistantStore, AssistantStyle, Tone } from '@/store/useAssistantStore';
import { SelectionGroup, TripleToggle } from '@/components/ui/selection-button';

const assistantStyles: { value: AssistantStyle; label: string }[] = [
  { value: 'NEUTRAL', label: 'Neutral' },
  { value: 'CARING', label: 'Caring' },
  { value: 'BLUNT', label: 'Blunt' },
  { value: 'MOTIVATIONAL', label: 'Motivational' },
  { value: 'CALM_ADVISOR', label: 'Calm Advisor' },
];

export function OnboardingStep1() {
  const { character, updateCharacter } = useAssistantStore();

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
          Configure Your Assistant
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-muted-foreground text-lg"
        >
          Choose how you want D.A.N to interact with you
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="space-y-4"
      >
        <label className="text-sm font-medium text-foreground uppercase tracking-wider">
          Assistant Style
        </label>
        <SelectionGroup
          options={assistantStyles}
          value={character.assistant_style}
          onChange={(value) => updateCharacter({ assistant_style: value as AssistantStyle })}
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="space-y-4"
      >
        <label className="text-sm font-medium text-foreground uppercase tracking-wider">
          Tone
        </label>
        <TripleToggle
          options={['SOFT', 'BALANCED', 'FIRM']}
          labels={['Soft', 'Balanced', 'Firm']}
          value={character.tone}
          onChange={(value) => updateCharacter({ tone: value as Tone })}
        />
      </motion.div>
    </motion.div>
  );
}
