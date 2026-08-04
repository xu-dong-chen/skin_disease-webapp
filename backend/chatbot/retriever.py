import json
from pathlib import Path
from rapidfuzz import fuzz

knowledge_base_file = Path(__file__).parent.parent/"kb"/"diseases_kb.json"

def readJson():
    with open(knowledge_base_file, "r", encoding="utf-8") as file:
        return json.load(file)

def findDisease(question):
    kb = readJson()
    question = question.lower()
    best_match, best_score = None,0
    for disease in kb:
        disease_name = disease["name"].lower()
        if disease_name in question:
            return disease
        
        curr_score = fuzz.partial_ratio(question,disease_name)
        if curr_score > best_score:
            best_match = disease
            best_score = curr_score
    return best_match if best_score > 85 else None

def getDisease(question):
    return findDisease(question)
