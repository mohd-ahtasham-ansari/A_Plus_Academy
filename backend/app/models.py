from sqlalchemy import Column, Integer, String
from .database import Base

class Material(Base):
    __tablename__ = "materials"

    id = Column(Integer, primary_key=True, index=True)
    subject = Column(String, index=True)
    student_class = Column(String, index=True)
    chapter = Column(String, index=True)
    pdf_url = Column(String)

class Course(Base):
    __tablename__ = "courses"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    classes = Column(String)
    desc = Column(String)
    icon = Column(String)
    color = Column(String)
    taughtBy = Column(String, nullable=True)

class Statistic(Base):
    __tablename__ = "statistics"

    id = Column(Integer, primary_key=True, index=True)
    value = Column(String, index=True)
    label = Column(String)
    color = Column(String)

class Faculty(Base):
    __tablename__ = "faculty"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    subject = Column(String)
    qualification = Column(String)
    experience = Column(String)
