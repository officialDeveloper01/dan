import { motion } from 'framer-motion';
import { useAssistantStore, HonestyLevel, ExpressionLevel, ResponseLength } from '@/store/useAssistantStore';
import { TripleToggle } from '@/components/ui/selection-button';

export function OnboardingStep2() {
  const { character, updateCharacter } = useAssistantStore();

  const settings = [
    {
      label: 'Honesty Level',
      key: 'honesty_level' as const,
      options: ['POLITE', 'HONEST', 'BRUTALLY_HONEST'] as [HonestyLevel, HonestyLevel, HonestyLevel],
      labels: ['Polite', 'Honest', 'Brutally Honest'] as [string, string, string],
    },
    {
      label: 'Emotional Expression',
      key: 'emotional_expression' as const,
      options: ['LOW', 'MEDIUM', 'HIGH'] as [ExpressionLevel, ExpressionLevel, ExpressionLevel],
      labels: ['Low', 'Medium', 'High'] as [string, string, string],
    },
    {
      label: 'Assertiveness',
      key: 'assertiveness' as const,
      options: ['LOW', 'MEDIUM', 'HIGH'] as [ExpressionLevel, ExpressionLevel, ExpressionLevel],
      labels: ['Low', 'Medium', 'High'] as [string, string, string],
    },
    {
      label: 'Response Length',
      key: 'response_length' as const,
      options: ['SHORT', 'MEDIUM', 'DETAILED'] as [ResponseLength, ResponseLength, ResponseLength],
      labels: ['Short', 'Medium', 'Detailed'] as [string, string, string],
    },
  ];

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
          Fine-Tune Personality
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-muted-foreground text-lg"
        >
          Adjust how D.A.N expresses itself
        </motion.p>
      </div>

      <div className="space-y-6">
        {settings.map((setting, index) => (
          <motion.div
            key={setting.key}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + index * 0.1 }}
            className="space-y-3"
          >
            <label className="text-sm font-medium text-foreground uppercase tracking-wider">
              {setting.label}
            </label>
            <TripleToggle
              options={setting.options}
              labels={setting.labels}
              value={character[setting.key]}
              onChange={(value) => updateCharacter({ [setting.key]: value })}
            />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
