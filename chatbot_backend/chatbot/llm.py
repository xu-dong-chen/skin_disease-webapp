from transformers import AutoTokenizer, AutoModelForCausalLM, BitsAndBytesConfig
import torch

quant_config = BitsAndBytesConfig(
    load_in_4bit=True,
    bnb_4bit_compute_dtype=torch.float16
)

model_name = "Qwen/Qwen2.5-3B-Instruct"

print("loading tokenizer")

tokenizer = AutoTokenizer.from_pretrained(model_name)

print("loading model")

model = AutoModelForCausalLM.from_pretrained(model_name,
                                             device_map ="auto",
                                             quantization_config=quant_config)

print("model loaded")
print(next(model.parameters()).device)


def generateResponse(prompt):
    # Convert prompt into a message in Qwen chatbot prefered format
    messages = [
        {
            "role": "user",
            "content": prompt
        }
    ]

    text = tokenizer.apply_chat_template( # Apply the template on the message
        messages,
        tokenize=False, # Does not tokenize message just yet
        add_generation_prompt=True # Adds a indicator for the AI to reply to the prompt
    )
    print("Tokenizing...")
    inputs = tokenizer(text, return_tensors="pt").to(model.device)
    input_length = inputs["input_ids"].shape[1] # Gets the input length of the users question

    print("generating...")
    
    with torch.inference_mode():
        outputs = model.generate(**inputs, max_new_tokens=200, temperature=0.7)

    print("generation complete...")

    generated_tokens = outputs[0][input_length:] # Gets the relevant tokens that are only a part of the AI's response to the user's question
    response = tokenizer.decode(generated_tokens, skip_special_tokens=True) 

    return response

