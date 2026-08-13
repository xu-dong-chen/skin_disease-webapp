from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from chatbot.chat_service import chat


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class ChatRequest(BaseModel):
    message: str


@app.post("/chat")
async def chatbot(request: ChatRequest):
    print(f"Received: {request.message}")

    answer = chat(request.message)

    return {
        "response": answer
    }


@app.get("/healthz")
def health():
    return {"status": "ok"}