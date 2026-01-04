import { useRef, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useAssistantStore } from '@/store/useAssistantStore';
import { ChatMessage, TypingIndicator } from './ChatMessage';
import { ChatInput } from './ChatInput';
import { MessageCircle } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const API_URL = 'http://localhost:8000/chat';

export function ChatPanel() {
  const { messages, addMessage, isTyping, setIsTyping, assistantName, character } = useAssistantStore();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [streamingMessageId, setStreamingMessageId] = useState<string | null>(null);
  const [displayedContent, setDisplayedContent] = useState<string>('');
  const [fullContent, setFullContent] = useState<string>('');

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, displayedContent]);

  // Streaming effect: reveal characters one by one
  useEffect(() => {
    if (!streamingMessageId || displayedContent.length >= fullContent.length) {
      if (streamingMessageId && displayedContent.length >= fullContent.length) {
        setStreamingMessageId(null);
        setDisplayedContent('');
        setFullContent('');
      }
      return;
    }

    const charDelay = character.response_length === 'SHORT' ? 15 : character.response_length === 'MEDIUM' ? 12 : 10;
    
    const timer = setTimeout(() => {
      setDisplayedContent(fullContent.slice(0, displayedContent.length + 1));
    }, charDelay);

    return () => clearTimeout(timer);
  }, [streamingMessageId, displayedContent, fullContent, character.response_length]);

  const handleSend = async (content: string) => {
    addMessage({ role: 'user', content });
    setIsTyping(true);

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          assistant_name: assistantName,
          character: {
            assistant_style: character.assistant_style,
            tone: character.tone,
            honesty_level: character.honesty_level,
            emotional_expression: character.emotional_expression,
            assertiveness: character.assertiveness,
            response_length: character.response_length,
          },
          message: content,
        }),
      });

      if (!response.ok) {
        throw new Error('Backend request failed');
      }

      const data = await response.json();
      const reply = data.reply;

      // Add message with empty content initially for streaming effect
      const messageId = crypto.randomUUID();
      addMessage({ role: 'assistant', content: reply });
      
      // Start streaming effect
      setFullContent(reply);
      setDisplayedContent('');
      setStreamingMessageId(messageId);
      setIsTyping(false);
    } catch (error) {
      setIsTyping(false);
      toast({
        title: "Connection Error",
        description: "Could not reach D.A.N backend. Please ensure the server is running.",
        variant: "destructive",
      });
    }
  };

  // Get the message content to display (with streaming effect for latest assistant message)
  const getDisplayContent = (message: typeof messages[0], index: number) => {
    const isLastAssistantMessage = 
      message.role === 'assistant' && 
      index === messages.length - 1 && 
      streamingMessageId;
    
    if (isLastAssistantMessage) {
      return displayedContent + (displayedContent.length < fullContent.length ? '▌' : '');
    }
    return message.content;
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
              {messages.map((message, index) => (
                <ChatMessage
                  key={message.id}
                  message={{ ...message, content: getDisplayContent(message, index) }}
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
      <ChatInput onSend={handleSend} disabled={isTyping || !!streamingMessageId} />
    </div>
  );
}