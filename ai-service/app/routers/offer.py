from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from app.services.offer_service import parse_offer_text

router = APIRouter()

class OfferParseRequest(BaseModel):
    text: str

@router.post("/parse")
async def parse_offer(request: OfferParseRequest):
    try:
        parsed_data = parse_offer_text(request.text)
        return {
            "success": True,
            "data": parsed_data
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
