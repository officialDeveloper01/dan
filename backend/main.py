from fastapi import FastAPI
from api.chat import router as chat_router
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="D.A.N Backend")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # frontend dev
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(chat_router)
