from fastapi import APIRouter
from app.models.request_models import QueryRequest
from app.services.rag_pipeline import query_rag

router = APIRouter(prefix="/query")


@router.post("/")
def ask_question(req: QueryRequest):

    result = query_rag(req.question, req.pdfs)

    return {
        "answer": result.get("answer"),
        "images": result.get("images", []),
        "citations": result.get("citations", []),
        "excel": result.get("excel")
    }