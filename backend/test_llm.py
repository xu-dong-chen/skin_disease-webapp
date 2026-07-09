from chatbot.llm import generateResponse


answer = generateResponse(
    "Explain eczema in simple terms."
)


print(answer)