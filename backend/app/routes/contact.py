from fastapi import APIRouter, BackgroundTasks, HTTPException
from pydantic import BaseModel
from typing import Optional
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import os

router = APIRouter()

class ContactRequest(BaseModel):
    name: str
    email: str
    phone: str
    message: str

def send_contact_email(data: ContactRequest):
    sender_email = os.getenv("EMAIL_HOST_USER")
    sender_password = os.getenv("EMAIL_HOST_PASSWORD")
    
    if not sender_email or not sender_password or sender_password == "your_app_password_here":
        print("Email configuration is missing. Cannot send contact email.")
        return

    receiver_email = "enrollaplusacademy05@gmail.com"
    subject = f"New General Query from {data.name}"
    
    body = f"""
    You have received a new query from the website contact form!
    
    Name: {data.name}
    Email: {data.email}
    Phone Number: {data.phone}
    
    Query/Message: 
    {data.message}
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
        print(f"Contact email sent successfully for {data.name}")
    except Exception as e:
        print(f"Failed to send contact email: {e}")

@router.post("/contact")
def submit_contact(request: ContactRequest, background_tasks: BackgroundTasks):
    background_tasks.add_task(send_contact_email, request)
    return {"message": "Your query has been submitted successfully."}
