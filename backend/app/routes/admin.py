from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from sqlalchemy.orm import Session
from ..database import get_db
from ..models import Admin
from ..auth import verify_password, get_password_hash, create_access_token
import os
import random
import string
import smtplib
from email.mime.text import MIMEText
from datetime import datetime, timedelta

router = APIRouter()

class LoginRequest(BaseModel):
    password: str

class ForgotPasswordRequest(BaseModel):
    email: str

class ResetPasswordRequest(BaseModel):
    email: str
    otp: str
    new_password: str

@router.post("/admin/login")
def admin_login(request: LoginRequest, db: Session = Depends(get_db)):
    admin = db.query(Admin).first()
    if not admin:
        raise HTTPException(status_code=500, detail="Admin account not initialized")
        
    if verify_password(request.password, admin.password):
        token = create_access_token(data={"sub": str(admin.id)})
        return {"success": True, "token": token}
    else:
        raise HTTPException(status_code=401, detail="Invalid password")

@router.post("/admin/forgot-password")
def forgot_password(request: ForgotPasswordRequest, db: Session = Depends(get_db)):
    admin = db.query(Admin).filter(Admin.email == request.email).first()
    if not admin:
        raise HTTPException(status_code=404, detail="Email not found")
        
    otp = ''.join(random.choices(string.digits, k=6))
    admin.reset_otp = otp
    admin.reset_otp_expiry = datetime.utcnow() + timedelta(minutes=15)
    db.commit()
    
    # Send email
    smtp_email = os.getenv("SMTP_EMAIL")
    smtp_password = os.getenv("SMTP_PASSWORD")
    if smtp_email and smtp_password:
        try:
            msg = MIMEText(f"Your OTP for A Plus Academy password reset is: {otp}")
            msg['Subject'] = 'Admin Password Reset OTP'
            msg['From'] = smtp_email
            msg['To'] = request.email

            server = smtplib.SMTP_SSL('smtp.gmail.com', 465)
            server.login(smtp_email, smtp_password)
            server.send_message(msg)
            server.quit()
        except Exception as e:
            print(f"Failed to send email: {e}")
            print(f"Fallback OTP is: {otp}")
    else:
        # Fallback if no SMTP configured
        print(f"--- MOCK EMAIL SENDER ---")
        print(f"To: {request.email}")
        print(f"Subject: Admin Password Reset OTP")
        print(f"Your OTP is: {otp}")
        print(f"-------------------------")
    
    return {"success": True, "message": "OTP sent to email"}

@router.post("/admin/reset-password")
def reset_password(request: ResetPasswordRequest, db: Session = Depends(get_db)):
    admin = db.query(Admin).filter(Admin.email == request.email).first()
    if not admin:
        raise HTTPException(status_code=404, detail="Email not found")
        
    if not admin.reset_otp or admin.reset_otp != request.otp:
        raise HTTPException(status_code=400, detail="Invalid OTP")
        
    if not admin.reset_otp_expiry or admin.reset_otp_expiry < datetime.utcnow():
        raise HTTPException(status_code=400, detail="OTP expired")
        
    admin.password = get_password_hash(request.new_password)
    admin.reset_otp = None
    admin.reset_otp_expiry = None
    db.commit()
    
    return {"success": True, "message": "Password reset successfully"}
