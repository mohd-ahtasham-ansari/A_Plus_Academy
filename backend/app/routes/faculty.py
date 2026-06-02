from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from pydantic import BaseModel

from ..database import get_db
from ..models import Faculty

router = APIRouter()

class FacultyBase(BaseModel):
    name: str
    subject: str
    qualification: str
    experience: str

class FacultyCreate(FacultyBase):
    pass

class FacultyResponse(FacultyBase):
    id: int

    class Config:
        from_attributes = True

@router.get("/faculty", response_model=List[FacultyResponse])
def get_faculty(db: Session = Depends(get_db)):
    return db.query(Faculty).all()

@router.post("/faculty", response_model=FacultyResponse)
def create_faculty(faculty: FacultyCreate, db: Session = Depends(get_db)):
    db_faculty = Faculty(**faculty.model_dump())
    db.add(db_faculty)
    db.commit()
    db.refresh(db_faculty)
    return db_faculty

@router.delete("/faculty/{faculty_id}")
def delete_faculty(faculty_id: int, db: Session = Depends(get_db)):
    db_faculty = db.query(Faculty).filter(Faculty.id == faculty_id).first()
    if not db_faculty:
        raise HTTPException(status_code=404, detail="Faculty member not found")
    
    db.delete(db_faculty)
    db.commit()
    return {"message": "Faculty deleted successfully"}
