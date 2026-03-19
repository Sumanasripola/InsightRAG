from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api import upload, query

app = FastAPI(
    title="Multimodal PDF RAG",
    version="1.0"
)

# CORS FIX
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],   # allow frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(upload.router)
app.include_router(query.router)

@app.get("/")
def health():
    return {"status": "running"}