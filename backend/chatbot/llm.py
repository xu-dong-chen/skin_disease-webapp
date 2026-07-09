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
    print("Tokenizing...")
    inputs = tokenizer(prompt, return_tensors="pt").to(model.device)

    print("generating...")

    outputs = model.generate(**inputs, max_new_tokens=50, temperature=0.7)

    print("generation complete...")

    response = tokenizer.decode(outputs[0], skip_special_tokens=True)

    return response

