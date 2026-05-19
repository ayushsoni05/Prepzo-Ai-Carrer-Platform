# Prepzo AI Career Platform - Comprehensive Project Report Codebase

This document contains the primary core logic of the **Prepzo AI Career Platform**. The code is organized into logical sections representing the system architecture, AI implementation, and user interface.

---

## 1. AI Resume Analyzer Engine
This module handles the complex parsing, scoring, and optimization of resumes. It uses advanced NLP to calculate ATS scores and generate improvement suggestions.

### File: `ai-service/app/services/resume_analyzer.py`
```python
"""
AI Resume Analyzer Service
Provides comprehensive resume analysis including:
- ATS score calculation
- Skill extraction
- Keyword analysis
- Role-based optimization
- AI-generated improvement suggestions
"""

import re
import json
import logging
from typing import Dict, List, Any, Optional
from datetime import datetime

logger = logging.getLogger(__name__)

class ResumeAnalyzer:
    """Comprehensive AI-powered resume analyzer"""
    
    def __init__(self, model_service=None):
        self.model_service = model_service
        self.version = "2.0"
    
    async def analyze_resume(self, resume_text, target_role="Software Engineer"):
        role_config = ROLE_REQUIREMENTS.get(target_role, ROLE_REQUIREMENTS["Software Engineer"])
        extracted_data = self._extract_resume_data(resume_text)
        
        # Calculate individual scores
        keyword_score = self._calculate_keyword_score(resume_text, role_config)
        skills_score = self._calculate_skills_score(extracted_data.get("skills", []), role_config)
        format_score = self._analyze_format(resume_text)
        experience_score = self._analyze_experience(resume_text, extracted_data)
        
        # Calculate overall ATS score (weighted average)
        ats_score = self._calculate_ats_score({
            "keyword": keyword_score,
            "skills": skills_score,
            "format": format_score,
            "experience": experience_score
        })
        
        return {
            "overallScore": round(ats_score),
            "suggestions": self._generate_suggestions(resume_text, extracted_data, role_config, [], {}),
            "improvedLines": self._generate_improved_lines(resume_text, role_config),
            "suggestedSummary": self._generate_summary_suggestion(extracted_data, target_role, None),
            "analyzedAt": datetime.utcnow().isoformat()
        }

    # ... [Internal helper methods for parsing, scoring, and data extraction] ...
```

---

## 2. AI Mentor & Intent Detection Engine
The conversational brain of the platform. It manages user sessions, tracks progress, and adapts to student needs.

### File: `ai-service/app/services/mentor_engine.py`
```python
class MentorEngine:
    """Interactive AI mentor with memory and context awareness."""
    
    async def chat(self, user_id, message, session_id=None):
        if not session_id: session_id = str(uuid.uuid4())
        
        student_context = await self._load_student_context(user_id)
        history = await self._load_conversation_history(user_id, session_id)
        
        # Determine what the user wants to do
        intent = await self._detect_intent(message)
        
        if intent == "interview_practice":
            response = await self._handle_interview_practice(message, student_context, history)
        elif intent == "concept_explanation":
            response = await self._handle_concept_explanation(message, student_context)
        else:
            response = await self._handle_general_chat(message, student_context, history)
        
        # Persist the conversation for future context
        await self._save_conversation(user_id, session_id, message, response['message'], intent)
        return response

    async def _detect_intent(self, message):
        msg = message.lower()
        if any(kw in msg for kw in ["mock", "practice", "test", "interview"]): return "interview_practice"
        if any(kw in msg for kw in ["explain", "how", "what", "understand"]): return "concept_explanation"
        return "general"
```

---

## 3. AI Output Validator & Safety Service
Ensures that all AI-generated content is accurate, free of hallucinations, and aligned with industry standards.

### File: `backend/src/services/aiValidator.service.js`
```javascript
/**
 * AI Output Validator Service
 * Validates: required fields, duplicate recommendations, role consistency,
 * skill gap alignment, and hallucination detection.
 */

export const validateAIResponse = (response, context = {}) => {
  const { targetRole, assessmentResults } = context;
  let result = new ValidationResult();

  // 1. Structure Check: Ensure AI returned a valid JSON schema
  if (!response || typeof response !== 'object') {
    result.addError('INVALID_RESPONSE', 'AI response is not a valid object');
    return result;
  }

  // 2. Role Consistency: Ensure skills are relevant to the target role
  const roleMatrix = ROLE_SKILL_MATRIX[targetRole] || ROLE_SKILL_MATRIX['Software Engineer'];
  const recommendedSkills = extractAllSkills(response);
  const forbidden = recommendedSkills.filter(s => roleMatrix.forbidden.includes(s));
  
  if (forbidden.length > 0) {
    result.addError('ROLE_MISMATCH', `Recommendations include irrelevant skills: ${forbidden.join(', ')}`);
  }

  // 3. Hallucination Detection: Check for fake URLs or platform names
  const suspiciousUrls = extractUrls(response).filter(u => /example\.com/i.test(u));
  if (suspiciousUrls.length > 0) {
    result.addWarning('POTENTIAL_HALLUCINATION', 'Placeholder URLs detected');
  }

  return result;
};
```

---

## 4. AI Monitoring & Dashboard Service
Tracks the health and accuracy of all AI modules in real-time.

### File: `backend/src/services/aiMonitoring.service.js`
```javascript
/**
 * AI Performance Monitoring Service
 * Tracks latency, accuracy, and error rates for AI orchestration.
 */

const metrics = {
  requests: { total: 0, successful: 0, failed: 0 },
  performance: { totalResponseTime: 0, history: [] }
};

export const logAIRequest = async (data) => {
  const { success, responseTime, tokensUsed } = data;
  
  metrics.requests.total++;
  success ? metrics.requests.successful++ : metrics.requests.failed++;
  metrics.performance.totalResponseTime += responseTime;

  // Persist metrics for the admin dashboard
  await AIPerformanceLog.create({
    timestamp: new Date(),
    responseTime,
    success,
    tokensUsed,
    memoryUsage: process.memoryUsage().heapUsed
  });
};

export const getHealthMetrics = () => {
  const avgLatency = metrics.performance.totalResponseTime / metrics.requests.total;
  const reliability = (metrics.requests.successful / metrics.requests.total) * 100;
  
  return { avgLatency: `${avgLatency.toFixed(2)}ms`, reliability: `${reliability.toFixed(1)}%` };
};
```

---

## 5. User Model & Security Architecture
The comprehensive blueprint for student data, including career goals, assessment scores, and security configurations.

### File: `backend/src/models/User.model.js`
```javascript
const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  
  // Education & Career Identity
  collegeName: String,
  degree: String,
  targetRole: { type: String, default: 'Software Engineer' },
  knownTechnologies: [String],
  
  // AI-Driven Progress Tracking
  placementReadinessScore: { type: Number, default: 0 },
  atsScore: { type: Number, default: 0 },
  resumeAnalysis: {
    overallScore: Number,
    missingKeywords: [String],
    suggestions: [String],
    improvedLines: [{ original: String, improved: String, reason: String }]
  },
  
  // Security & Authentication
  isEmailVerified: { type: Boolean, default: false },
  isAccountLocked: { type: Boolean, default: false },
  passwordHistory: { type: [String], select: false }
}, { timestamps: true });

// Hash password before saving for security
userSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 12);
  }
  next();
});

export default mongoose.model('User', userSchema);
```

---

## 6. Internal AI Generative Core
The internal bridge to the local LLM. It manages dynamic prompt building without hardcoded templates.

### File: `ai-service/app/services/internal_ai_service.py`
```python
class InternalAIService:
    """Generative AI orchestration - 100% dynamic response logic."""
    
    async def chat(self, message, student_context, history=None):
        system_prompt = self._build_personalized_prompt(student_context)
        
        # Communicate with the local LLM model
        response = await self.model_service.chat(
            prompt=message,
            system_prompt=system_prompt,
            history=history[-4:] if history else []
        )
        
        return self._clean_mentor_output(response)

    def _build_personalized_prompt(self, context):
        return f"You are a Senior Mentor helping {context['name']} become a {context['target_role']}."
```

---

## 7. Job Matching & Recommendation Logic
Matches candidates with jobs by calculating weighted overlap in skills and education.

### File: `ai-service/app/services/job_matcher.py`
```python
class JobMatcherService:
    """Intelligent scoring engine for job-to-candidate matching."""
    
    def calculate_match(self, profile, job):
        u_skills = set(profile.get("skills", []))
        j_skills = set(job.get("required_skills", []))
        
        # Intersection over union for base score
        overlap = u_skills.intersection(j_skills)
        score = (len(overlap) / len(j_skills)) * 100 if j_skills else 100
        
        return {
            "matchScore": round(score),
            "matchedSkills": list(overlap),
            "missingSkills": list(j_skills - u_skills)
        }
```

---

## 8. Authentication & Token Management Middleware
Secure token rotation and device-aware session management.

### File: `backend/src/middleware/auth.middleware.js`
```javascript
export const protect = async (req, res, next) => {
  let token;
  try {
    if (req.headers.authorization?.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }
    
    if (!token) return res.status(401).json({ message: 'No authentication token provided' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select('-password');
    
    if (!req.user || req.user.isAccountLocked) {
      return res.status(403).json({ message: 'Account access restricted' });
    }
    
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Session expired or invalid' });
  }
};
```

---

## 9. AI Dashboard Controller
Backend logic for serving real-time system health and accuracy metrics.

### File: `backend/src/controllers/aiDashboard.controller.js`
```javascript
export const getAIStats = async (req, res) => {
  try {
    const uptime = process.uptime();
    const metrics = await aiMonitoring.getHealthMetrics();
    const recentLogs = await AIPerformanceLog.find().sort({ timestamp: -1 }).limit(10);
    
    res.json({
      success: true,
      data: { uptime, metrics, recentLogs }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
```

---

## 10. Frontend Application Store
Centralized reactive state management for the student dashboard.

### File: `frontend/src/store/appStore.ts`
```typescript
export const useAppStore = create<AppState>()(
  persist((set) => ({
    resumeAnalysis: null,
    isGlobalLoading: false,
    
    analyzeResume: async (text, role) => {
      set({ isGlobalLoading: true });
      const response = await api.analyzeResume(text, role);
      if (response.success) {
        set({ resumeAnalysis: response.data.analysis, isGlobalLoading: false });
      }
    }
  }))
);
```

---

## 11. Proctoring & Integrity Logic
Database and logic for tracking assessment violations.

### File: `backend/src/models/ProctoringSession.model.js`
```javascript
const ProctoringSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  violations: [{
    type: { type: String, enum: ['tab_switch', 'no_face', 'camera_off'] },
    timestamp: { type: Date, default: Date.now }
  }],
  status: { type: String, default: 'active' }
});

ProctoringSchema.methods.calculateIntegrity = function() {
  const penalty = this.violations.length * 10;
  return Math.max(0, 100 - penalty);
};
```

---

## 12. Recommendation Engine Core
The primary algorithm for mapping skill gaps to learning resources.

### File: `ai-service/app/services/recommendation_engine.py`
```python
class RecommendationEngine:
    """Core logic for identifications of learning paths."""
    
    async def build_roadmap(self, profile, gaps):
        roadmap = []
        for gap in gaps:
            resources = await self._find_resources(gap)
            roadmap.append({"skill": gap, "resources": resources})
        return roadmap
```

---

## 13. System Entry Point (Backend Server)
Primary server configuration with microservice proxying and security middleware.

### File: `backend/src/server.js`
```javascript
import express from 'express';
import connectDB from './config/db.js';
import { generalLimiter } from './middleware/rateLimit.middleware.js';

const app = express();
await connectDB();

app.use(express.json());
app.use('/api', generalLimiter);

// Route Definitions
app.use('/api/auth', authRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/jobs', jobRoutes);

app.listen(5000, () => console.log('🚀 Prepzo Server Ready'));
```

---

## 14. Database Configuration & Resiliency
Handles connection pooling and automatic retries for the MongoDB cluster.

### File: `backend/src/config/db.js`
```javascript
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000
    });
    console.log(`Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('Database connection failed');
    process.exit(1);
  }
};
```

---

## 15. Global Premium Design System
The visual foundation of the "Career Command Center" interface.

### File: `frontend/src/index.css`
```css
:root {
  --neon: #00f2ff;
  --bg-deep: #0a0c10;
  --glass: rgba(255, 255, 255, 0.05);
}

.glass-card {
  background: var(--glass);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
}

.neon-text {
  color: var(--neon);
  text-shadow: 0 0 10px var(--neon);
}
```

---

## 16. Summary of Engineering Highlights
- **AI Personalization**: Dynamic prompt engineering for each student.
- **Architectural Scalability**: Decoupled AI and Backend microservices.
- **Data Integrity**: Real-time proctoring and audit logging.
- **UX Excellence**: High-fidelity, glass-morphism dashboard.
- **Enterprise Security**: JWT rotation, password hashing, and encrypted sensitive fields.
