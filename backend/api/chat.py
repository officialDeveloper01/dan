from fastapi import APIRouter
from models.schemas import ChatRequest, ChatResponse
from core.prompt_compiler import compile_system_prompt
from llm.ollama_client import ask_llm

router = APIRouter()

@router.post("/chat", response_model=ChatResponse)
def chat(request: ChatRequest):
    system_prompt = compile_system_prompt(
        request.assistant_name, request.character
    )

    reply = ask_llm(system_prompt, request.message)

    return ChatResponse(
        assistant_name=request.assistant_name,
        reply=reply,
    )
