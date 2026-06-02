from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import os

router = APIRouter()

class LoginRequest(BaseModel):
    password: str

@router.post("/admin/login")
def admin_login(request: LoginRequest):
    # For a robust system, use JWT. For this simple use case, 
    # we just verify password and return success.
    # Admin password can be set in .env or hardcoded fallback.
    expected_password = os.getenv("ADMIN_PASSWORD", "aplus123")
    
    if request.password == expected_password:
        return {"success": True, "token": "simple-admin-token-123"}
    else:
        raise HTTPException(status_code=401, detail="Invalid password")
