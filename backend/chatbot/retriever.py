import json
from pathlib import Path

knowledge_base_file = Path(__file__).parent.parent/"kb"/"diseases_kb.json"

def readJson():
    with open(knowledge_base_file, "r", encoding="utf-8") as file:
        return json.load(file)

def findDisease(question):
    kb = readJson()
    question = question.lower()
    for disease in kb:
        if disease["name"].lower() in question:
            return disease
    return None

def getDisease(question):
    return findDisease(question)
