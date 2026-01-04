import { useRef, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useAssistantStore } from '@/store/useAssistantStore';
import { ChatMessage, TypingIndicator } from './ChatMessage';
import { ChatInput } from './ChatInput';
import { MessageCircle } from 'lucide-react';
import { generateMockResponse } from '@/lib/mockResponses';

export function ChatPanel() {
  const { messages, addMessage, isTyping, setIsTyping, assistantName, character } = useAssistantStore();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async (content: string) => {
    addMessage({ role: 'user', content });
    setIsTyping(true);

    // Simulate typing delay based on response length setting
    const delay = character.response_length === 'SHORT' ? 1000 : character.response_length === 'MEDIUM' ? 1500 : 2000;

    setTimeout(() => {
      const response = generateMockResponse(content, character);
      addMessage({ role: 'assistant', content: response });
      setIsTyping(false);
    }, delay);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Messages area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4 scrollbar-thin">
        {messages.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="h-full flex flex-col items-center justify-center text-center gap-4"
          >
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="w-20 h-20 rounded-2xl bg-primary/10 border border-primary/30 flex items-center justify-center"
            >
              <MessageCircle className="w-10 h-10 text-primary" />
            </motion.div>
            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-foreground">
                Start a conversation with {assistantName}
              </h3>
              <p className="text-muted-foreground max-w-sm">
                Your assistant is ready to help. Type a message to begin.
              </p>
            </div>
          </motion.div>
        ) : (
          <>
            <AnimatePresence mode="popLayout">
              {messages.map((message) => (
                <ChatMessage
                  key={message.id}
                  message={message}
                  assistantName={assistantName}
                />
              ))}
            </AnimatePresence>
            <AnimatePresence>
              {isTyping && <TypingIndicator />}
            </AnimatePresence>
          </>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input area */}
      <ChatInput onSend={handleSend} disabled={isTyping} />
    </div>
  );
}
