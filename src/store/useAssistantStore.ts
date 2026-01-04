import { create } from 'zustand';

export type AssistantStyle = 'NEUTRAL' | 'CARING' | 'BLUNT' | 'MOTIVATIONAL' | 'CALM_ADVISOR';
export type Tone = 'SOFT' | 'BALANCED' | 'FIRM';
export type HonestyLevel = 'POLITE' | 'HONEST' | 'BRUTALLY_HONEST';
export type ExpressionLevel = 'LOW' | 'MEDIUM' | 'HIGH';
export type ResponseLength = 'SHORT' | 'MEDIUM' | 'DETAILED';
export type Theme = 'dark' | 'light' | 'cyber';

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface AssistantCharacter {
  assistant_style: AssistantStyle;
  tone: Tone;
  honesty_level: HonestyLevel;
  emotional_expression: ExpressionLevel;
  assertiveness: ExpressionLevel;
  response_length: ResponseLength;
}

interface AssistantState {
  onboardingComplete: boolean;
  onboardingStep: number;
  assistantName: string;
  character: AssistantCharacter;
  messages: Message[];
  theme: Theme;
  isTyping: boolean;
  
  // Actions
  setOnboardingComplete: (complete: boolean) => void;
  setOnboardingStep: (step: number) => void;
  setAssistantName: (name: string) => void;
  updateCharacter: (updates: Partial<AssistantCharacter>) => void;
  addMessage: (message: Omit<Message, 'id' | 'timestamp'>) => void;
  setTheme: (theme: Theme) => void;
  setIsTyping: (typing: boolean) => void;
  resetOnboarding: () => void;
}

const defaultCharacter: AssistantCharacter = {
  assistant_style: 'CARING',
  tone: 'BALANCED',
  honesty_level: 'HONEST',
  emotional_expression: 'MEDIUM',
  assertiveness: 'MEDIUM',
  response_length: 'MEDIUM',
};

export const useAssistantStore = create<AssistantState>((set) => ({
  onboardingComplete: false,
  onboardingStep: 0,
  assistantName: '',
  character: defaultCharacter,
  messages: [],
  theme: 'dark',
  isTyping: false,

  setOnboardingComplete: (complete) => set({ onboardingComplete: complete }),
  setOnboardingStep: (step) => set({ onboardingStep: step }),
  setAssistantName: (name) => set({ assistantName: name }),
  updateCharacter: (updates) =>
    set((state) => ({
      character: { ...state.character, ...updates },
    })),
  addMessage: (message) =>
    set((state) => ({
      messages: [
        ...state.messages,
        {
          ...message,
          id: crypto.randomUUID(),
          timestamp: new Date(),
        },
      ],
    })),
  setTheme: (theme) => set({ theme }),
  setIsTyping: (typing) => set({ isTyping: typing }),
  resetOnboarding: () =>
    set({
      onboardingComplete: false,
      onboardingStep: 0,
      assistantName: '',
      character: defaultCharacter,
      messages: [],
    }),
}));
