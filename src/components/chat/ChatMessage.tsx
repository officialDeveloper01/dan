import { motion } from 'framer-motion';
import { Message } from '@/store/useAssistantStore';
import { Bot, User } from 'lucide-react';
import { format } from 'date-fns';

interface ChatMessageProps {
  message: Message;
  assistantName: string;
}

export function ChatMessage({ message, assistantName }: ChatMessageProps) {
  const isAssistant = message.role === 'assistant';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, x: isAssistant ? -10 : 10 }}
      animate={{ opacity: 1, y: 0, x: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex gap-3 ${isAssistant ? 'flex-row' : 'flex-row-reverse'}`}
    >
      {/* Avatar */}
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center ${
          isAssistant
            ? 'bg-primary/20 text-primary border border-primary/30'
            : 'bg-secondary text-foreground border border-border'
        }`}
      >
        {isAssistant ? <Bot className="w-5 h-5" /> : <User className="w-5 h-5" />}
      </motion.div>

      {/* Message content */}
      <div className={`flex flex-col gap-1 max-w-[75%] ${isAssistant ? 'items-start' : 'items-end'}`}>
        <span className="text-xs text-muted-foreground px-1">
          {isAssistant ? assistantName : 'You'}
        </span>
        <div
          className={`px-4 py-3 rounded-2xl ${
            isAssistant
              ? 'bg-card border border-border rounded-tl-sm'
              : 'bg-primary/10 border border-primary/20 rounded-tr-sm text-foreground'
          }`}
        >
          <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
        </div>
        <span className="text-xs text-muted-foreground/60 px-1">
          {format(message.timestamp, 'HH:mm')}
        </span>
      </div>
    </motion.div>
  );
}

export function TypingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="flex gap-3"
    >
      <div className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center bg-primary/20 text-primary border border-primary/30">
        <Bot className="w-5 h-5" />
      </div>
      <div className="px-4 py-3 rounded-2xl rounded-tl-sm bg-card border border-border">
        <div className="flex gap-1.5">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 rounded-full bg-primary/60"
              animate={{
                y: [0, -6, 0],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                delay: i * 0.15,
              }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
