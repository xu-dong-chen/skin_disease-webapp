from chatbot.retriever import getDisease
from chatbot.prompt import buildPrompt
from chatbot.llm import generateResponse

# Main chat pipeline, called by app.py
def chat(question: str) -> str: # both input question and response are strings

    disease = getDisease(question)

    prompt = buildPrompt(question, disease)

    response = generateResponse(prompt)

    return response