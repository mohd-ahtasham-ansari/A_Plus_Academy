from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List, Optional
from pydantic import BaseModel

from ..database import get_db
from ..models import Course, Admin
from ..auth import get_current_admin

router = APIRouter()

class CourseBase(BaseModel):
    title: str
    classes: str
    desc: str
    icon: str
    color: str
    taughtBy: Optional[str] = None

class CourseCreate(CourseBase):
    pass

class CourseResponse(CourseBase):
    id: int

    class Config:
        from_attributes = True

@router.get("/courses", response_model=List[CourseResponse])
def get_courses(db: Session = Depends(get_db)):
    return db.query(Course).all()

@router.post("/courses", response_model=CourseResponse)
def create_course(course: CourseCreate, db: Session = Depends(get_db), current_admin: Admin = Depends(get_current_admin)):
    db_course = Course(**course.model_dump())
    db.add(db_course)
    db.commit()
    db.refresh(db_course)
    return db_course

@router.delete("/courses/{course_id}")
def delete_course(course_id: int, db: Session = Depends(get_db), current_admin: Admin = Depends(get_current_admin)):
    db_course = db.query(Course).filter(Course.id == course_id).first()
    if not db_course:
        raise HTTPException(status_code=404, detail="Course not found")
    
    db.delete(db_course)
    db.commit()
    return {"message": "Course deleted successfully"}
