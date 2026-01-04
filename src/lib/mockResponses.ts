import { AssistantCharacter } from '@/store/useAssistantStore';

const greetings: Record<string, string[]> = {
  CARING: [
    "I'm here for you. ",
    "I care about what you're going through. ",
    "Thank you for sharing with me. ",
  ],
  BLUNT: [
    "Alright, let's get to it. ",
    "Here's the deal: ",
    "Cutting straight to it — ",
  ],
  MOTIVATIONAL: [
    "You've got this! ",
    "Let's make it happen! ",
    "I believe in your potential. ",
  ],
  CALM_ADVISOR: [
    "Let me share my thoughts. ",
    "Consider this perspective: ",
    "Here's what I'd suggest: ",
  ],
  NEUTRAL: [
    "Understood. ",
    "I see. ",
    "Here's my response: ",
  ],
};

const baseResponses = [
  "That's an interesting point you've raised.",
  "I understand what you're getting at.",
  "Let me think about that for a moment.",
  "There are several ways to look at this.",
  "I appreciate you bringing this up.",
  "That's worth exploring further.",
];

const emotionalExpressions: Record<string, string[]> = {
  HIGH: [
    "I'm genuinely excited about this! ",
    "This really resonates with me. ",
    "I feel strongly about this topic. ",
  ],
  MEDIUM: [
    "This is quite interesting. ",
    "I find this meaningful. ",
  ],
  LOW: ["", ""],
};

const honestyModifiers: Record<string, string[]> = {
  POLITE: [
    "If I may gently suggest...",
    "You might want to consider...",
    "Perhaps it could be helpful to...",
  ],
  HONEST: [
    "In my view...",
    "I think...",
    "Here's my honest take:",
  ],
  BRUTALLY_HONEST: [
    "Let me be direct:",
    "The truth is:",
    "No sugarcoating here:",
  ],
};

const toneEndings: Record<string, string[]> = {
  SOFT: [
    " Take your time with this.",
    " No pressure at all.",
    " I'm here whenever you need me.",
  ],
  BALANCED: [
    " Let me know what you think.",
    " Happy to discuss further.",
  ],
  FIRM: [
    " I stand by this.",
    " That's my position.",
    " Consider this carefully.",
  ],
};

function getRandomElement<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function generateMockResponse(userMessage: string, character: AssistantCharacter): string {
  const greeting = getRandomElement(greetings[character.assistant_style] || greetings.NEUTRAL);
  const emotional = getRandomElement(emotionalExpressions[character.emotional_expression]);
  const honesty = getRandomElement(honestyModifiers[character.honesty_level]);
  const base = getRandomElement(baseResponses);
  const ending = getRandomElement(toneEndings[character.tone]);

  let response = greeting;

  if (character.emotional_expression !== 'LOW') {
    response += emotional;
  }

  response += honesty + " " + base;

  // Add more content for longer responses
  if (character.response_length === 'DETAILED') {
    response += ` This connects to several broader themes that might be worth exploring. Your message about "${userMessage.slice(0, 30)}${userMessage.length > 30 ? '...' : ''}" raises important considerations.`;
  } else if (character.response_length === 'MEDIUM') {
    response += ` I'd be happy to explore this further with you.`;
  }

  response += ending;

  return response;
}
