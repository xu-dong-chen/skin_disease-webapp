from chatbot.retriever import getDisease
from chatbot.prompt import buildPrompt
from chatbot.llm import generateResponse

conversation_history = []
most_recent_disease = None

# Main chat pipeline, called by app.py
def chat(question: str) -> str: # both input question and response are strings
    global most_recent_disease
    
    disease = getDisease(question)
    if disease is None:
        disease = most_recent_disease
    else:
        most_recent_disease = disease

    prompt = buildPrompt(question, disease, conversation_history)

    response = generateResponse(prompt)

    while len(conversation_history) > 6:
        conversation_history.pop(0)
    conversation_history.append(f"User: {question}")
    conversation_history.append(f"Assistant: {response}")

    return response