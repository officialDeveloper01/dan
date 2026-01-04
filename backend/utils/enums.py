from enum import Enum

class AssistantStyle(str, Enum):
    NEUTRAL = "NEUTRAL"
    CARING = "CARING"
    BLUNT = "BLUNT"
    MOTIVATIONAL = "MOTIVATIONAL"
    CALM_ADVISOR = "CALM_ADVISOR"


class Tone(str, Enum):
    SOFT = "SOFT"
    BALANCED = "BALANCED"
    FIRM = "FIRM"


class HonestyLevel(str, Enum):
    POLITE = "POLITE"
    HONEST = "HONEST"
    BRUTALLY_HONEST = "BRUTALLY_HONEST"


class EmotionalExpression(str, Enum):
    LOW = "LOW"
    MEDIUM = "MEDIUM"
    HIGH = "HIGH"


class Assertiveness(str, Enum):
    LOW = "LOW"
    MEDIUM = "MEDIUM"
    HIGH = "HIGH"


class ResponseLength(str, Enum):
    SHORT = "SHORT"
    MEDIUM = "MEDIUM"
    DETAILED = "DETAILED"
