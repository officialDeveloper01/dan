import { motion } from 'framer-motion';
import { useAssistantStore, AssistantStyle, Tone, HonestyLevel, ExpressionLevel, ResponseLength } from '@/store/useAssistantStore';
import { SelectionGroup, TripleToggle } from '@/components/ui/selection-button';
import { Settings, Sparkles } from 'lucide-react';

const assistantStyles: { value: AssistantStyle; label: string }[] = [
  { value: 'NEUTRAL', label: 'Neutral' },
  { value: 'CARING', label: 'Caring' },
  { value: 'BLUNT', label: 'Blunt' },
  { value: 'MOTIVATIONAL', label: 'Motivational' },
  { value: 'CALM_ADVISOR', label: 'Calm Advisor' },
];

export function ControlsPanel() {
  const { character, updateCharacter, assistantName, setAssistantName } = useAssistantStore();

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
    <div className="h-full overflow-y-auto p-6 space-y-8 scrollbar-thin">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-3"
      >
        <div className="w-10 h-10 rounded-xl bg-primary/20 border border-primary/30 flex items-center justify-center">
          <Settings className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h2 className="font-semibold text-foreground">Controls</h2>
          <p className="text-xs text-muted-foreground">Adjust anytime</p>
        </div>
      </motion.div>

      {/* Name */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="space-y-3"
      >
        <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider flex items-center gap-2">
          <Sparkles className="w-3 h-3" />
          Assistant Name
        </label>
        <input
          type="text"
          value={assistantName}
          onChange={(e) => setAssistantName(e.target.value)}
          className="w-full px-4 py-2.5 text-sm bg-secondary/50 border border-border rounded-lg
                   text-foreground placeholder:text-muted-foreground/50
                   focus:outline-none focus:border-primary/50
                   transition-all duration-300"
          maxLength={20}
        />
      </motion.div>

      {/* Assistant Style */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="space-y-3"
      >
        <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
          Assistant Style
        </label>
        <SelectionGroup
          options={assistantStyles}
          value={character.assistant_style}
          onChange={(value) => updateCharacter({ assistant_style: value as AssistantStyle })}
          className="flex-col"
        />
      </motion.div>

      {/* Tone */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="space-y-3"
      >
        <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
          Tone
        </label>
        <TripleToggle
          options={['SOFT', 'BALANCED', 'FIRM']}
          labels={['Soft', 'Balanced', 'Firm']}
          value={character.tone}
          onChange={(value) => updateCharacter({ tone: value as Tone })}
        />
      </motion.div>

      {/* Personality Settings */}
      {settings.map((setting, index) => (
        <motion.div
          key={setting.key}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 + index * 0.05 }}
          className="space-y-3"
        >
          <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
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
  );
}
