from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from .routes import enroll, notes, admin, contact, courses, stats, faculty
from .database import engine, Base, SessionLocal
from .models import Course, Statistic, Faculty
import os

# Create database tables
Base.metadata.create_all(bind=engine)

def seed_courses():
    db = SessionLocal()
    if db.query(Course).count() == 0:
        default_courses = [
            {"title": "Mathematics", "classes": "6th to 12th", "desc": "Master core mathematical concepts, algebra, geometry, and calculus with our problem-solving approach.", "icon": "FaSquareRootAlt", "color": "bg-blue-500", "taughtBy": "Faisal Sir"},
            {"title": "Science", "classes": "6th to 10th", "desc": "Practical understanding of physics, chemistry, and biology through real-world applications.", "icon": "FaFlask", "color": "bg-green-500", "taughtBy": "Faisal Sir"},
            {"title": "English Literature", "classes": "6th to 12th", "desc": "In-depth analysis of prose, poetry, and drama to build strong comprehension skills.", "icon": "FaBookOpen", "color": "bg-purple-500", "taughtBy": ""},
            {"title": "English Grammar", "classes": "6th to 12th", "desc": "Perfect your written English with detailed grammar rules, vocabulary, and writing skills.", "icon": "FaLanguage", "color": "bg-pink-500", "taughtBy": ""},
            {"title": "English Speaking", "classes": "All Classes", "desc": "Build fluency, confidence, and correct pronunciation with interactive speaking sessions.", "icon": "FaMicrophoneAlt", "color": "bg-yellow-500", "taughtBy": ""},
            {"title": "Social Science", "classes": "6th to 10th", "desc": "Comprehensive coverage of History, Geography, Civics, and Economics.", "icon": "FaGlobeAmericas", "color": "bg-indigo-500", "taughtBy": ""},
            {"title": "Economics", "classes": "11th to 12th", "desc": "Understand micro and macro economics, financial markets, and economic policies.", "icon": "FaChartLine", "color": "bg-teal-500", "taughtBy": ""},
            {"title": "Geography", "classes": "11th to 12th", "desc": "Explore physical and human geography, environmental studies, and cartography.", "icon": "FaMap", "color": "bg-emerald-500", "taughtBy": ""},
            {"title": "Political Science", "classes": "11th to 12th", "desc": "Study political systems, government operations, and international relations.", "icon": "FaLandmark", "color": "bg-cyan-500", "taughtBy": ""},
            {"title": "Accounts", "classes": "11th to 12th", "desc": "Master accounting principles, financial statements, and business finance.", "icon": "FaCalculator", "color": "bg-orange-500", "taughtBy": ""},
            {"title": "History", "classes": "11th to 12th", "desc": "Dive deep into ancient, medieval, and modern history of India and the world.", "icon": "FaHistory", "color": "bg-red-500", "taughtBy": ""}
        ]
        for c in default_courses:
            db.add(Course(**c))
        db.commit()

    if db.query(Statistic).count() == 0:
        default_stats = [
            {"value": "500+", "label": "Students Taught", "color": "secondary"},
            {"value": "95%", "label": "Success Rate", "color": "accent"},
            {"value": "50+", "label": "Weekly Tests Conducted", "color": "primary"}
        ]
        for s in default_stats:
            db.add(Statistic(**s))
        db.commit()

    if db.query(Faculty).count() == 0:
        default_faculty = [
            {"name": "Faisal Rahman", "subject": "Maths & Science", "qualification": "Electrical Engineering from JMI", "experience": "10+ Years"}
        ]
        for f in default_faculty:
            db.add(Faculty(**f))
        db.commit()

    db.close()

seed_courses()

app = FastAPI(title="A Plus Academy API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Ensure uploads directory exists
os.makedirs("uploads", exist_ok=True)
# Mount static files for uploads
app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")

app.include_router(enroll.router, prefix="/api", tags=["Enrollment"])
app.include_router(notes.router, prefix="/api", tags=["Notes"])
app.include_router(admin.router, prefix="/api", tags=["Admin"])
app.include_router(contact.router, prefix="/api", tags=["Contact"])
app.include_router(courses.router, prefix="/api", tags=["Courses"])
app.include_router(stats.router, prefix="/api", tags=["Stats"])
app.include_router(faculty.router, prefix="/api", tags=["Faculty"])

@app.get("/")
def read_root():
    return {"message": "Welcome to A Plus Academy API"}
