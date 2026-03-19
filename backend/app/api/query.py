from fastapi import APIRouter
from app.models.request_models import QueryRequest
from app.services.rag_pipeline import query_rag

router = APIRouter(prefix="/query")

@router.post("/")
def ask_question(req: QueryRequest):

    answer = query_rag(req.question)

    return {"answer": answer}