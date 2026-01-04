import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SelectionButtonProps {
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
}

export function SelectionButton({ selected, onClick, children, className }: SelectionButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        'relative px-6 py-3 rounded-lg font-medium transition-all duration-300',
        'border-2 overflow-hidden',
        selected
          ? 'border-primary bg-primary/10 text-primary glow-border'
          : 'border-border bg-secondary/50 text-muted-foreground hover:border-primary/50 hover:text-foreground',
        className
      )}
    >
      {selected && (
        <motion.div
          layoutId="selection-glow"
          className="absolute inset-0 bg-primary/5"
          initial={false}
          transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
        />
      )}
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}

interface SelectionGroupProps {
  options: { value: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export function SelectionGroup({ options, value, onChange, className }: SelectionGroupProps) {
  return (
    <div className={cn('flex flex-wrap gap-3', className)}>
      {options.map((option) => (
        <SelectionButton
          key={option.value}
          selected={value === option.value}
          onClick={() => onChange(option.value)}
        >
          {option.label}
        </SelectionButton>
      ))}
    </div>
  );
}

interface TripleToggleProps {
  options: [string, string, string];
  labels: [string, string, string];
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export function TripleToggle({ options, labels, value, onChange, className }: TripleToggleProps) {
  const selectedIndex = options.indexOf(value);

  return (
    <div className={cn('relative flex rounded-xl bg-secondary/50 p-1 border border-border', className)}>
      <motion.div
        className="absolute top-1 bottom-1 rounded-lg bg-primary/20 border border-primary/50 glow-border"
        initial={false}
        animate={{
          left: `calc(${selectedIndex * 33.33}% + 4px)`,
          width: 'calc(33.33% - 8px)',
        }}
        transition={{ type: 'spring', bounce: 0.15, duration: 0.5 }}
      />
      {options.map((option, index) => (
        <button
          key={option}
          onClick={() => onChange(option)}
          className={cn(
            'relative z-10 flex-1 py-2.5 px-4 rounded-lg text-sm font-medium transition-colors duration-200',
            value === option ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
          )}
        >
          {labels[index]}
        </button>
      ))}
    </div>
  );
}
