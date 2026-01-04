import { motion } from 'framer-motion';
import { useAssistantStore, Theme } from '@/store/useAssistantStore';
import { Moon, Sun, Sparkles } from 'lucide-react';
import { useEffect } from 'react';

const themes: { value: Theme; label: string; icon: typeof Moon }[] = [
  { value: 'dark', label: 'Dark', icon: Moon },
  { value: 'light', label: 'Light', icon: Sun },
  { value: 'cyber', label: 'Cyber', icon: Sparkles },
];

export function ThemeToggle() {
  const { theme, setTheme } = useAssistantStore();

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('light', 'dark', 'cyber');
    if (theme !== 'dark') {
      root.classList.add(theme);
    }
  }, [theme]);

  const currentIndex = themes.findIndex((t) => t.value === theme);

  return (
    <div className="relative flex items-center bg-secondary/50 rounded-xl p-1 border border-border">
      <motion.div
        className="absolute top-1 bottom-1 rounded-lg bg-primary/20 border border-primary/30"
        initial={false}
        animate={{
          left: `calc(${currentIndex * 33.33}% + 4px)`,
          width: 'calc(33.33% - 8px)',
        }}
        transition={{ type: 'spring', bounce: 0.15, duration: 0.5 }}
      />
      {themes.map((t) => {
        const Icon = t.icon;
        return (
          <button
            key={t.value}
            onClick={() => setTheme(t.value)}
            className={`relative z-10 flex items-center justify-center w-10 h-8 rounded-lg transition-colors duration-200 ${
              theme === t.value ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
            }`}
            title={t.label}
          >
            <Icon className="w-4 h-4" />
          </button>
        );
      })}
    </div>
  );
}
