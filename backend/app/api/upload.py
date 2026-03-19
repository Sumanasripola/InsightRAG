from fastapi import APIRouter, UploadFile, File
from app.services.rag_pipeline import process_document
from app.utils.file_utils import save_upload

router = APIRouter(prefix="/upload", tags=["Upload"])

@router.post("/")
async def upload_pdf(file: UploadFile = File(...)):

    file_path = save_upload(file)

    process_document(file_path)

    return {"message": "PDF processed successfully"}