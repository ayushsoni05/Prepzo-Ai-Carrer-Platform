import os
import json
import logging
from typing import Dict, Any, Optional
from pydantic import BaseModel
from openai import OpenAI

logger = logging.getLogger(__name__)

# Same setup as placement_service
OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")
OPENROUTER_BASE_URL = "https://openrouter.ai/api/v1"
MODEL = "google/gemini-2.5-flash"  

client = OpenAI(
    api_key=OPENROUTER_API_KEY,
    base_url=OPENROUTER_BASE_URL,
)

class OfferSchema(BaseModel):
    base_salary: float
    sign_on_bonus: float
    target_bonus: float
    equity_type: str
    equity_amount: float
    strike_price: float
    current_valuation: float
    vesting_years: int
    cliff_months: int

def parse_offer_text(text: str) -> Dict[str, Any]:
    """
    Parses raw offer letter text into a structured JSON dictionary.
    """
    if not text or not text.strip():
        raise ValueError("Offer text cannot be empty.")

    system_prompt = (
        "You are an expert compensation analyst. Your job is to extract financial data "
        "from offer letters and output ONLY valid JSON matching the specified schema. "
        "If a value is not found, use 0 for numbers, or 'None' for strings. "
        "Always convert salaries to their full annual numerical value (e.g. $150k -> 150000). "
        "For equity_type, use 'RSUs', 'Options', 'ISOs', 'NSOs', or 'None'. "
        "For vesting_years, the standard is usually 4. For cliff_months, usually 12."
        "The JSON MUST HAVE EXACTLY these keys: "
        "base_salary, sign_on_bonus, target_bonus, equity_type, equity_amount, strike_price, current_valuation, vesting_years, cliff_months."
    )

    try:
        response = client.chat.completions.create(
            model=MODEL,
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": f"Extract compensation details from this offer letter:\n\n{text}"}
            ],
            response_format={"type": "json_object"},
            temperature=0.1
        )
        
        content = response.choices[0].message.content
        if not content:
            raise ValueError("No content returned from AI.")
            
        data = json.loads(content)
        
        # Validate schema and set defaults
        parsed_offer = {
            "base_salary": float(data.get("base_salary", 0)),
            "sign_on_bonus": float(data.get("sign_on_bonus", 0)),
            "target_bonus": float(data.get("target_bonus", 0)),
            "equity_type": str(data.get("equity_type", "None")),
            "equity_amount": float(data.get("equity_amount", 0)),
            "strike_price": float(data.get("strike_price", 0)),
            "current_valuation": float(data.get("current_valuation", 0)),
            "vesting_years": int(data.get("vesting_years", 4)),
            "cliff_months": int(data.get("cliff_months", 12))
        }
        
        return parsed_offer

    except Exception as e:
        logger.error(f"Error parsing offer text: {e}")
        # Return empty shell on failure
        return {
            "base_salary": 0.0,
            "sign_on_bonus": 0.0,
            "target_bonus": 0.0,
            "equity_type": "None",
            "equity_amount": 0.0,
            "strike_price": 0.0,
            "current_valuation": 0.0,
            "vesting_years": 4,
            "cliff_months": 12
        }
