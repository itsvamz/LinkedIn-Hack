from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Dict, Any, Optional
import json
import uvicorn
import os
from resume_pitch_generator import ResumePitchGenerator

# Initialize FastAPI app
app = FastAPI(
    title="Resume Pitch Generator API",
    description="API for generating elevator pitches from resume data",
    version="1.0.0"
)

# CORS middleware to allow requests from your React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ResumeData(BaseModel):
    data: Dict[str, Any]

@app.post("/generate-pitch")
async def generate_pitch(resume_data: ResumeData):
    """
    Generate an elevator pitch from resume JSON data
    
    Request body should be a JSON object with the resume data
    """
    try:
        generator = ResumePitchGenerator(resume_data.dict())
        pitch = generator.generate_pitch()
        return {
            "success": True,
            "pitch": pitch,
            "word_count": len(pitch.split())
        }
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.post("/generate-pitch-from-file")
async def generate_pitch_from_file(request: Request):
    """
    Generate pitch from a file upload (for testing)
    """
    try:
        form_data = await request.form()
        if 'file' not in form_data:
            raise HTTPException(status_code=400, detail="No file uploaded")
        
        file = form_data['file']
        try:
            resume_data = json.loads(file.file.read())
        except json.JSONDecodeError:
            raise HTTPException(status_code=400, detail="Invalid JSON file")
            
        generator = ResumePitchGenerator(resume_data)
        pitch = generator.generate_pitch()
        
        return {
            "success": True,
            "pitch": pitch,
            "word_count": len(pitch.split())
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "healthy"}

if __name__ == "__main__":
    # Run with: uvicorn main:app --reload --host 0.0.0.0 --port 8000
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
