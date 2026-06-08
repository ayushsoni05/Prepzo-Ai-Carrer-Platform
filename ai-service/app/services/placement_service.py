import json
from loguru import logger
from typing import Dict, Any, List

from app.services.model_service import ModelService

class PlacementService:
    def __init__(self, model_service: ModelService):
        self.model = model_service

    async def analyze_ats_match(self, resume_text: str, job_description: str) -> Dict[str, Any]:
        """
        Extracts requirements from JD, matches against Resume, and calculates a score.
        """
        system_prompt = """You are an expert ATS (Applicant Tracking System) algorithm and senior technical recruiter.
Your job is to strictly analyze how well a candidate's resume matches a job description.
Return ONLY valid JSON. Do not return markdown blocks or any other text."""

        prompt = f"""
        JOB DESCRIPTION:
        {job_description}

        CANDIDATE RESUME:
        {resume_text}

        Compare the two texts. Give an ATS match score (0-100). Identify exactly which hard skills, soft skills, and tools mentioned in the JD are MISSING from the resume.
        Identify the skills that MATCH.

        Return JSON format:
        {{
            "match_score": 75,
            "missing_keywords": ["Kubernetes", "Redis", "Agile"],
            "matched_keywords": ["Python", "React", "AWS"],
            "critical_gaps": "Candidate is missing Kubernetes which is listed as a hard requirement.",
            "recommendation": "Add specific examples of scaling applications with Kubernetes to the resume."
        }}
        """

        response = await self.model.generate(
            prompt=prompt,
            system_prompt=system_prompt,
            max_tokens=800,
            temperature=0.2
        )

        try:
            start = response.find("{")
            end = response.rfind("}") + 1
            if start != -1 and end > start:
                return json.loads(response[start:end])
        except Exception as e:
            logger.error(f"Failed to parse JSON for ATS match: {e} - Raw: {response}")
            
        return {
            "match_score": 0,
            "missing_keywords": ["Error parsing AI response"],
            "matched_keywords": [],
            "critical_gaps": "Failed to analyze",
            "recommendation": "Please try again."
        }

    async def tailor_resume_bullets(self, original_bullets: List[str], job_description: str, missing_keywords: List[str]) -> Dict[str, Any]:
        """
        Optimizes existing resume bullets to include missing keywords where it makes sense naturally.
        """
        system_prompt = """You are an elite career coach and resume writer. 
Your task is to take a candidate's existing resume bullets and rewrite them to organically incorporate the missing keywords from the job description.
DO NOT invent new jobs or fake experiences. Only enhance the phrasing to highlight the relevant skills.
Make the bullets impactful using the Action-Task-Result (STAR) format.
Return ONLY valid JSON. Do not return markdown blocks."""

        prompt = f"""
        JOB DESCRIPTION CONTEXT:
        {job_description}

        MISSING ATS KEYWORDS TO INCORPORATE (If relevant/possible):
        {', '.join(missing_keywords)}

        ORIGINAL BULLET POINTS:
        {json.dumps(original_bullets)}

        Rewrite these bullet points. Provide the new tailored bullets and a brief explanation of what changed.
        
        Return JSON format:
        {{
            "tailored_bullets": [
                "Architected a scalable microservices backend using Python, naturally integrating Redis for caching to improve response times by 40%"
            ],
            "explanation": "Added Redis to the first bullet point to match the JD requirements, and quantified the impact."
        }}
        """

        response = await self.model.generate(
            prompt=prompt,
            system_prompt=system_prompt,
            max_tokens=1000,
            temperature=0.4
        )

        try:
            start = response.find("{")
            end = response.rfind("}") + 1
            if start != -1 and end > start:
                return json.loads(response[start:end])
        except Exception as e:
            logger.error(f"Failed to parse JSON for tailor bullets: {e}")
            
        return {
            "tailored_bullets": original_bullets,
            "explanation": "AI optimization failed. Returning original bullets."
        }

    async def generate_cold_outreach(self, resume_text: str, job_description: str, target_company: str, target_role: str) -> Dict[str, Any]:
        """
        Generates customized cold emails and LinkedIn DMs.
        """
        system_prompt = """You are an expert tech recruiter and networking strategist.
Your goal is to write a highly persuasive cold email and a short LinkedIn connection request that a candidate can send to a recruiter or hiring manager at their target company.
The message MUST reference how the candidate's specific background (from their resume) perfectly matches the problems the company is trying to solve (from the JD).
Return ONLY valid JSON."""

        prompt = f"""
        TARGET COMPANY: {target_company}
        TARGET ROLE: {target_role}

        JOB DESCRIPTION:
        {job_description}

        CANDIDATE RESUME:
        {resume_text}

        Write two things:
        1. A Cold Email (Subject + Body) - Max 150 words. Focus on value proposition.
        2. A LinkedIn DM (Max 300 characters).

        Return JSON format:
        {{
            "email_subject": "...",
            "email_body": "Hi [Name],\\n\\n...",
            "linkedin_dm": "Hi [Name], I saw..."
        }}
        """

        response = await self.model.generate(
            prompt=prompt,
            system_prompt=system_prompt,
            max_tokens=800,
            temperature=0.5
        )

        try:
            start = response.find("{")
            end = response.rfind("}") + 1
            if start != -1 and end > start:
                return json.loads(response[start:end])
        except Exception as e:
            logger.error(f"Failed to parse JSON for outreach: {e}")
            
        return {
            "email_subject": "Application for " + target_role,
            "email_body": "Failed to generate customized email. Please try again.",
            "linkedin_dm": "Failed to generate DM."
        }
