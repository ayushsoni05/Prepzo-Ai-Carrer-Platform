from fastapi import APIRouter, Depends, HTTPException, Body
from typing import Dict, Any, List
from pydantic import BaseModel
from loguru import logger

from app.services.placement_service import PlacementService
from app.dependencies import get_placement_service

router = APIRouter(prefix="/placement", tags=["placement"])

class ATSRequest(BaseModel):
    resume_text: str
    job_description: str

class TailorRequest(BaseModel):
    original_bullets: List[str]
    job_description: str
    missing_keywords: List[str]

class OutreachRequest(BaseModel):
    resume_text: str
    job_description: str
    target_company: str
    target_role: str

@router.post("/analyze-ats")
async def analyze_ats(
    request: ATSRequest,
    placement_service: PlacementService = Depends(get_placement_service)
):
    """Analyze resume against job description for ATS match score."""
    try:
        result = await placement_service.analyze_ats_match(
            request.resume_text,
            request.job_description
        )
        return {"success": True, "data": result}
    except Exception as e:
        logger.error(f"Error in analyze_ats: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/tailor-resume")
async def tailor_resume(
    request: TailorRequest,
    placement_service: PlacementService = Depends(get_placement_service)
):
    """Tailor resume bullets using missing keywords."""
    try:
        result = await placement_service.tailor_resume_bullets(
            request.original_bullets,
            request.job_description,
            request.missing_keywords
        )
        return {"success": True, "data": result}
    except Exception as e:
        logger.error(f"Error in tailor_resume: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/generate-outreach")
async def generate_outreach(
    request: OutreachRequest,
    placement_service: PlacementService = Depends(get_placement_service)
):
    """Generate cold email and LinkedIn DM for outreach."""
    try:
        result = await placement_service.generate_cold_outreach(
            request.resume_text,
            request.job_description,
            request.target_company,
            request.target_role
        )
        return {"success": True, "data": result}
    except Exception as e:
        logger.error(f"Error in generate_outreach: {e}")
        raise HTTPException(status_code=500, detail=str(e))
