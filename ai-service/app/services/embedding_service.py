"""
Prepzo AI Service - Embedding Service
Generates vector embeddings using Sentence Transformers
"""

from sentence_transformers import SentenceTransformer
from loguru import logger
from typing import List, Dict, Any, Optional, Union
import numpy as np
import asyncio
from concurrent.futures import ThreadPoolExecutor

from app.config import get_settings


class EmbeddingService:
    """
    Service for generating text embeddings using Sentence Transformers
    Used for semantic search, skill matching, and recommendation scoring
    """
    
    def __init__(self):
        self.settings = get_settings()
        self.model: Optional[SentenceTransformer] = None
        self.executor = ThreadPoolExecutor(max_workers=2)
        self._initialized = False
        self.embedding_dim = 384  # Default for all-MiniLM-L6-v2
    
    async def initialize(self):
        """Initialize the embedding model"""
        if self._initialized:
            return
        
        try:
            loop = asyncio.get_event_loop()
            self.model = await loop.run_in_executor(
                self.executor,
                self._load_model
            )
            self.embedding_dim = self.model.get_sentence_embedding_dimension()
            self._initialized = True
            logger.info(f"✅ Embedding model loaded: {self.settings.embedding_model}")
            logger.info(f"   Embedding dimension: {self.embedding_dim}")
            
        except Exception as e:
            logger.error(f"❌ Failed to load embedding model: {e}")
            raise
    
    def _load_model(self) -> SentenceTransformer:
        """Load sentence transformer model"""
        return SentenceTransformer(self.settings.embedding_model)
    
    async def embed_text(self, text: str) -> np.ndarray:
        """
        Generate embedding for a single text
        
        Args:
            text: Input text to embed
            
        Returns:
            numpy array of embedding vector
        """
        if not self.model:
            raise RuntimeError("Embedding model not initialized")
        
        loop = asyncio.get_event_loop()
        embedding = await loop.run_in_executor(
            self.executor,
            lambda: self.model.encode(text, convert_to_numpy=True)
        )
        return embedding
    
    async def embed_texts(self, texts: List[str]) -> np.ndarray:
        """
        Generate embeddings for multiple texts
        
        Args:
            texts: List of texts to embed
            
        Returns:
            numpy array of shape (n_texts, embedding_dim)
        """
        if not self.model:
            raise RuntimeError("Embedding model not initialized")
        
        loop = asyncio.get_event_loop()
        embeddings = await loop.run_in_executor(
            self.executor,
            lambda: self.model.encode(texts, convert_to_numpy=True, show_progress_bar=False)
        )
        return embeddings
    
    async def embed_student_profile(self, profile: Dict[str, Any]) -> np.ndarray:
        """
        Create a comprehensive embedding for a student profile
        
        Args:
            profile: Student profile dictionary
            
        Returns:
            Combined embedding vector
        """
        # Construct profile text for embedding
        profile_text = self._construct_profile_text(profile)
        return await self.embed_text(profile_text)
    
    def _construct_profile_text(self, profile: Dict[str, Any]) -> str:
        """Construct embedding-friendly text from profile"""
        parts = []
        
        # Education
        if profile.get('degree'):
            parts.append(f"Education: {profile['degree']}")
        if profile.get('fieldOfStudy'):
            parts.append(f"Field: {profile['fieldOfStudy']}")
        if profile.get('college'):
            parts.append(f"College: {profile['college']}")
        
        # Target
        if profile.get('targetRole'):
            parts.append(f"Target role: {profile['targetRole']}")
        if profile.get('targetCompanies'):
            parts.append(f"Target companies: {', '.join(profile['targetCompanies'])}")
        
        # Skills
        if profile.get('skills'):
            parts.append(f"Skills: {', '.join(profile['skills'])}")
        if profile.get('knownTechnologies'):
            parts.append(f"Technologies: {', '.join(profile['knownTechnologies'])}")
        
        # Experience
        if profile.get('experience'):
            parts.append(f"Experience: {profile['experience']}")
        if profile.get('projects'):
            project_names = [p.get('name', '') for p in profile['projects'] if p.get('name')]
            if project_names:
                parts.append(f"Projects: {', '.join(project_names)}")
        
        return ". ".join(parts)
    
    async def embed_skill(self, skill_name: str, context: Optional[str] = None) -> np.ndarray:
        """
        Create embedding for a skill with optional context
        
        Args:
            skill_name: Name of the skill
            context: Additional context (e.g., industry, role)
            
        Returns:
            Skill embedding vector
        """
        if context:
            text = f"{skill_name} in context of {context}"
        else:
            text = skill_name
        
        return await self.embed_text(text)
    
    async def embed_role_requirements(self, role: str, company: Optional[str] = None) -> np.ndarray:
        """
        Create embedding for role requirements
        
        Args:
            role: Job role
            company: Optional company name
            
        Returns:
            Role requirement embedding
        """
        if company:
            text = f"Requirements for {role} position at {company}"
        else:
            text = f"Requirements for {role} position"
        
        return await self.embed_text(text)
    
    async def embed_resource(self, resource: Dict[str, Any]) -> np.ndarray:
        """
        Create embedding for a learning resource
        
        Args:
            resource: Resource dictionary with title, description, skills
            
        Returns:
            Resource embedding
        """
        parts = []
        
        if resource.get('title'):
            parts.append(resource['title'])
        if resource.get('description'):
            parts.append(resource['description'])
        if resource.get('skills'):
            parts.append(f"Skills: {', '.join(resource['skills'])}")
        if resource.get('level'):
            parts.append(f"Level: {resource['level']}")
        
        text = ". ".join(parts)
        return await self.embed_text(text)
    
    async def compute_similarity(
        self,
        embedding1: np.ndarray,
        embedding2: np.ndarray
    ) -> float:
        """
        Compute cosine similarity between two embeddings
        
        Args:
            embedding1: First embedding vector
            embedding2: Second embedding vector
            
        Returns:
            Cosine similarity score (0-1)
        """
        # Normalize vectors
        norm1 = np.linalg.norm(embedding1)
        norm2 = np.linalg.norm(embedding2)
        
        if norm1 == 0 or norm2 == 0:
            return 0.0
        
        similarity = np.dot(embedding1, embedding2) / (norm1 * norm2)
        return float(similarity)
    
    async def compute_gap_score(
        self,
        student_embedding: np.ndarray,
        requirement_embedding: np.ndarray
    ) -> Dict[str, float]:
        """
        Compute skill gap score between student and requirements
        
        Args:
            student_embedding: Student profile embedding
            requirement_embedding: Role/skill requirement embedding
            
        Returns:
            Dict with similarity score and gap magnitude
        """
        similarity = await self.compute_similarity(student_embedding, requirement_embedding)
        
        # Gap magnitude is inverse of similarity
        gap_magnitude = 1.0 - similarity
        
        return {
            "similarity_score": similarity,
            "gap_magnitude": gap_magnitude,
            "gap_percentage": gap_magnitude * 100,
            "readiness_score": similarity * 100
        }
    
    async def rank_skill_gaps(
        self,
        student_embedding: np.ndarray,
        skill_embeddings: Dict[str, np.ndarray],
        top_k: int = 10
    ) -> List[Dict[str, Any]]:
        """
        Rank skills by gap magnitude (most needed first)
        
        Args:
            student_embedding: Student profile embedding
            skill_embeddings: Dict of skill_name -> embedding
            top_k: Number of top gaps to return
            
        Returns:
            List of skill gaps sorted by priority
        """
        gaps = []
        
        for skill_name, skill_emb in skill_embeddings.items():
            similarity = await self.compute_similarity(student_embedding, skill_emb)
            gap_magnitude = 1.0 - similarity
            
            gaps.append({
                "skill": skill_name,
                "similarity": similarity,
                "gap_magnitude": gap_magnitude,
                "priority_score": gap_magnitude  # Can be weighted by industry demand
            })
        
        # Sort by gap magnitude (highest gap = highest priority)
        gaps.sort(key=lambda x: x["gap_magnitude"], reverse=True)
        
        return gaps[:top_k]
    
    async def find_best_resources(
        self,
        skill_embedding: np.ndarray,
        resource_embeddings: List[Dict[str, Any]],
        top_k: int = 5
    ) -> List[Dict[str, Any]]:
        """
        Find best matching resources for a skill gap
        
        Args:
            skill_embedding: Target skill embedding
            resource_embeddings: List of dicts with 'embedding' and 'resource' keys
            top_k: Number of top resources to return
            
        Returns:
            List of best matching resources with scores
        """
        scored_resources = []
        
        for item in resource_embeddings:
            similarity = await self.compute_similarity(
                skill_embedding,
                item['embedding']
            )
            
            scored_resources.append({
                "resource": item['resource'],
                "match_score": similarity,
                "relevance": similarity * 100
            })
        
        # Sort by match score
        scored_resources.sort(key=lambda x: x["match_score"], reverse=True)
        
        return scored_resources[:top_k]
    
    @property
    def is_ready(self) -> bool:
        """Check if embedding service is ready"""
        return self._initialized and self.model is not None
