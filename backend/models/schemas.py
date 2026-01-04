from pydantic import BaseModel
from utils.enums import (
    AssistantStyle,
    Tone,
    HonestyLevel,
    EmotionalExpression,
    Assertiveness,
    ResponseLength,
)

class CharacterConfig(BaseModel):
    assistant_style: AssistantStyle
    tone: Tone
    honesty_level: HonestyLevel
    emotional_expression: EmotionalExpression
    assertiveness: Assertiveness
    response_length: ResponseLength


class ChatRequest(BaseModel):
    assistant_name: str
    character: CharacterConfig
    message: str


class ChatResponse(BaseModel):
    assistant_name: str
    reply: str
