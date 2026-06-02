from fastapi import APIRouter, BackgroundTasks
from pydantic import BaseModel, Field
from typing import List, Optional
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import os
from dotenv import load_dotenv

load_dotenv()

router = APIRouter()

class EnrollRequest(BaseModel):
    studentName: str
    guardianName: str
    phone: str
    email: Optional[str] = None
    school: Optional[str] = None
    student_class: str = Field(alias="class")
    subjects: List[str]
    message: Optional[str] = None

def send_enrollment_email(data: EnrollRequest):
    sender_email = os.getenv("EMAIL_HOST_USER")
    sender_password = os.getenv("EMAIL_HOST_PASSWORD")
    
    if not sender_email or not sender_password or sender_password == "your_app_password_here":
        print("Email configuration is missing. Cannot send email.")
        return

    receiver_email = "enrollaplusacademy05@gmail.com"
    subject = f"New Enrollment: {data.studentName} (Class {data.student_class})"
    
    body = f"""
    A new student has enrolled!
    
    Student Name: {data.studentName}
    Guardian Name: {data.guardianName or 'N/A'}
    Phone Number: {data.phone}
    Email: {data.email or 'N/A'}
    School: {data.school or 'N/A'}
    Class: {data.student_class}
    Subjects Interested: {', '.join(data.subjects) if data.subjects else 'None'}
    
    Additional Message: 
    {data.message or 'None'}
    """

    msg = MIMEMultipart()
    msg['From'] = sender_email
    msg['To'] = receiver_email
    msg['Subject'] = subject
    msg.attach(MIMEText(body, 'plain'))

    try:
        server = smtplib.SMTP('smtp.gmail.com', 587)
        server.starttls()
        server.login(sender_email, sender_password)
        server.send_message(msg)
        server.quit()
        print(f"Enrollment email sent successfully for {data.studentName}")
    except Exception as e:
        print(f"Failed to send email: {e}")

@router.post("/enroll")
def enroll_student(request: EnrollRequest, background_tasks: BackgroundTasks):
    # Send email in the background so it doesn't block the response
    background_tasks.add_task(send_enrollment_email, request)
    return {"message": "Enrollment successful"}
