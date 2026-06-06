from fastapi import APIRouter, Depends, File, UploadFile, Form, HTTPException
from sqlalchemy.orm import Session
from typing import List
from pydantic import BaseModel
import shutil
import os
import uuid
import cloudinary
import cloudinary.uploader

from ..database import get_db
from ..models import Material, Admin
from ..auth import get_current_admin

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
    db: Session = Depends(get_db),
    current_admin: Admin = Depends(get_current_admin)
):
    if not file.filename.endswith(".pdf"):
        raise HTTPException(status_code=400, detail="Only PDF files are allowed")

    if os.getenv("CLOUDINARY_URL"):
        try:
            result = cloudinary.uploader.upload(file.file, resource_type="raw")
            pdf_url = result.get("secure_url")
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Cloudinary upload failed: {str(e)}")
    else:
        # Fallback to local save
        file_ext = os.path.splitext(file.filename)[1]
        unique_filename = f"{uuid.uuid4()}{file_ext}"
        file_path = f"uploads/{unique_filename}"
        
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        backend_url = os.getenv("BACKEND_URL", "http://127.0.0.1:8000").rstrip("/")
        pdf_url = f"{backend_url}/uploads/{unique_filename}"

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
def delete_note(note_id: int, db: Session = Depends(get_db), current_admin: Admin = Depends(get_current_admin)):
    material = db.query(Material).filter(Material.id == note_id).first()
    if not material:
        raise HTTPException(status_code=404, detail="Material not found")
    
    if os.getenv("CLOUDINARY_URL") and "cloudinary.com" in material.pdf_url:
        try:
            # For raw files in Cloudinary, public_id is typically the filename with extension.
            # We'll just extract it from the URL.
            public_id = material.pdf_url.split("/")[-1]
            cloudinary.uploader.destroy(public_id, resource_type="raw")
        except Exception as e:
            print(f"Failed to delete from Cloudinary: {e}")
    else:
        # Delete file from disk
        filename = material.pdf_url.split("/")[-1]
        file_path = f"uploads/{filename}"
        if os.path.exists(file_path):
            os.remove(file_path)

    db.delete(material)
    db.commit()
    return {"message": "Material deleted successfully"}
