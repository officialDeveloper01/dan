import { motion } from 'framer-motion';
import { useAssistantStore } from '@/store/useAssistantStore';
import { ControlsPanel } from '@/components/controls/ControlsPanel';
import { ChatPanel } from '@/components/chat/ChatPanel';
import { ThemeToggle } from './ThemeToggle';
import { Bot, Menu, X } from 'lucide-react';
import { useState } from 'react';

export function MainLayout() {
  const { assistantName } = useAssistantStore();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-background">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex-shrink-0 h-16 border-b border-border bg-card/50 backdrop-blur-sm flex items-center justify-between px-4 md:px-6"
      >
        <div className="flex items-center gap-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-lg hover:bg-secondary/50 transition-colors md:hidden"
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          <div className="flex items-center gap-3">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="w-10 h-10 rounded-xl bg-primary/20 border border-primary/30 flex items-center justify-center animate-pulse-glow"
            >
              <Bot className="w-5 h-5 text-primary" />
            </motion.div>
            <div>
              <h1 className="font-bold text-lg">
                <span className="gradient-text">D.A.N</span>
                <span className="text-muted-foreground mx-2">—</span>
                <span className="text-foreground">{assistantName}</span>
              </h1>
            </div>
          </div>
        </div>
        <ThemeToggle />
      </motion.header>

      {/* Main content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <motion.aside
          initial={{ x: -300 }}
          animate={{ x: sidebarOpen ? 0 : -300 }}
          transition={{ type: 'spring', bounce: 0.15, duration: 0.5 }}
          className={`absolute md:relative z-20 h-[calc(100vh-4rem)] w-80 border-r border-border bg-card/80 backdrop-blur-xl flex-shrink-0 ${
            sidebarOpen ? 'block' : 'hidden md:block'
          }`}
        >
          <ControlsPanel />
        </motion.aside>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
            className="absolute inset-0 z-10 bg-background/80 backdrop-blur-sm md:hidden"
          />
        )}

        {/* Chat panel */}
        <main className="flex-1 flex flex-col overflow-hidden">
          <ChatPanel />
        </main>
      </div>
    </div>
  );
}
