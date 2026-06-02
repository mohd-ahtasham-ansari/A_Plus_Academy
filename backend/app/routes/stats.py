from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from pydantic import BaseModel

from ..database import get_db
from ..models import Statistic

router = APIRouter()

class StatisticBase(BaseModel):
    value: str
    label: str
    color: str

class StatisticCreate(StatisticBase):
    pass

class StatisticResponse(StatisticBase):
    id: int

    class Config:
        from_attributes = True

@router.get("/stats", response_model=List[StatisticResponse])
def get_stats(db: Session = Depends(get_db)):
    return db.query(Statistic).all()

@router.post("/stats", response_model=StatisticResponse)
def create_stat(stat: StatisticCreate, db: Session = Depends(get_db)):
    db_stat = Statistic(**stat.model_dump())
    db.add(db_stat)
    db.commit()
    db.refresh(db_stat)
    return db_stat

@router.delete("/stats/{stat_id}")
def delete_stat(stat_id: int, db: Session = Depends(get_db)):
    db_stat = db.query(Statistic).filter(Statistic.id == stat_id).first()
    if not db_stat:
        raise HTTPException(status_code=404, detail="Statistic not found")
    
    db.delete(db_stat)
    db.commit()
    return {"message": "Statistic deleted successfully"}
