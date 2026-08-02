# function that builds the prompt to ask the AI(Qwen)
def buildPrompt(question,disease, history):
    conversation = "/n".join(history)
    if disease is None:
        return f"""
            You are an educational chatbot for common skin diseases.
            The user's question could not be matched to any disease in the knowledge base.
            Politely explain that you only answer questions about the diseases currently available.
            User question: {question}
            """
    
    prompt = f"""
    You are an educational AI assistant for common skin diseases.

    Use ONLY the information provided below.

    Disease:
    {disease["name"]}

    Description:
    {disease["description"]}

    Symptoms:
    {", ".join(disease["symptoms"])}

    Causes:
    {", ".join(disease["causes"])}

    Treatments:
    {", ".join(disease["treatments"])}

    When to seek medical attention:
    {disease["when_to_seek_help"]}

    Conversation History:
    {conversation}

    User Question:
    {question}

    Instructions:
    - Answer in clear, simple English.
    - Only use the information above.
    - Do not make up facts.
    - Do not diagnose the user and tell them that the AI can make mistakes.
    - Recommend seeing a healthcare professional when appropriate.
    """

    return prompt