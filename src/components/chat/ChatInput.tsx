import { useState, KeyboardEvent } from 'react';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

export function ChatInput({ onSend, disabled }: ChatInputProps) {
  const [message, setMessage] = useState('');

  const handleSubmit = () => {
    const trimmed = message.trim();
    if (trimmed && !disabled) {
      onSend(trimmed);
      setMessage('');
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-4 border-t border-border bg-card/50 backdrop-blur-sm"
    >
      <div className="flex gap-3 items-end">
        <div className="flex-1 relative">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
            disabled={disabled}
            rows={1}
            className="w-full px-4 py-3 bg-secondary/50 border border-border rounded-xl
                     text-foreground placeholder:text-muted-foreground/50
                     focus:outline-none focus:border-primary/50
                     transition-all duration-300 resize-none
                     disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ minHeight: '48px', maxHeight: '120px' }}
          />
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleSubmit}
          disabled={!message.trim() || disabled}
          className={`p-3 rounded-xl transition-all duration-300 ${
            message.trim() && !disabled
              ? 'bg-primary text-primary-foreground glow-border'
              : 'bg-muted text-muted-foreground cursor-not-allowed'
          }`}
        >
          <Send className="w-5 h-5" />
        </motion.button>
      </div>
      <p className="text-xs text-muted-foreground/60 mt-2 text-center">
        Press Enter to send, Shift+Enter for new line
      </p>
    </motion.div>
  );
}
