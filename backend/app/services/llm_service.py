from groq import Groq
from app.config import GROQ_API_KEY

client = Groq(api_key=GROQ_API_KEY)


def generate_answer(question, context):

    prompt = f"""
You are a research assistant answering questions from a document.

Use ONLY the context below to answer.

If the answer is partially present, infer carefully.

If the answer truly does not exist, say:
"I could not find the answer in the document."

Context:
{context}

Question:
{question}

Answer:
"""

    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[{"role": "user", "content": prompt}],
        temperature=0.2
    )

    return response.choices[0].message.content