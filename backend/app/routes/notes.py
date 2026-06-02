from fastapi import APIRouter, Depends, File, UploadFile, Form, HTTPException
from sqlalchemy.orm import Session
from typing import List
from pydantic import BaseModel
import shutil
import os
import uuid

from ..database import get_db
from ..models import Material

router = APIRouter()

class NoteResponse(BaseModel):
    id: int
    subject: str
    student_class: str
    chapter: str
    pdfUrl: str

    class Config:
        from_attributes = True

@router.get("/notes", response_model=List[NoteResponse])
def get_notes(db: Session = Depends(get_db)):
    materials = db.query(Material).all()
    # Map the model fields to the expected frontend schema
    result = []
    for mat in materials:
        result.append({
            "id": mat.id,
            "subject": mat.subject,
            "student_class": mat.student_class,
            "chapter": mat.chapter,
            "pdfUrl": mat.pdf_url
        })
    return result

@router.post("/notes")
async def create_note(
    subject: str = Form(...),
    student_class: str = Form(..., alias="class"),
    chapter: str = Form(...),
    file: UploadFile = File(...),
    db: Session = Depends(get_db)
):
    if not file.filename.endswith(".pdf"):
        raise HTTPException(status_code=400, detail="Only PDF files are allowed")

    # Save file
    file_ext = os.path.splitext(file.filename)[1]
    unique_filename = f"{uuid.uuid4()}{file_ext}"
    file_path = f"uploads/{unique_filename}"
    
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    # Note: Using http://127.0.0.1:8000 for local dev.
    # In production, this should be an environment variable or relative path.
    pdf_url = f"http://127.0.0.1:8000/uploads/{unique_filename}"

    new_material = Material(
        subject=subject,
        student_class=student_class,
        chapter=chapter,
        pdf_url=pdf_url
    )
    db.add(new_material)
    db.commit()
    db.refresh(new_material)

    return {"message": "Material uploaded successfully", "id": new_material.id}

@router.delete("/notes/{note_id}")
def delete_note(note_id: int, db: Session = Depends(get_db)):
    material = db.query(Material).filter(Material.id == note_id).first()
    if not material:
        raise HTTPException(status_code=404, detail="Material not found")
    
    # Optional: Delete file from disk
    filename = material.pdf_url.split("/")[-1]
    file_path = f"uploads/{filename}"
    if os.path.exists(file_path):
        os.remove(file_path)

    db.delete(material)
    db.commit()
    return {"message": "Material deleted successfully"}
