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

# Role-specific keywords and requirements
ROLE_REQUIREMENTS = {
    "Software Engineer": {
        "required_skills": ["data structures", "algorithms", "problem solving", "coding", "programming"],
        "preferred_skills": ["system design", "api", "database", "git", "agile"],
        "keywords": ["developed", "implemented", "optimized", "designed", "built", "scalable", "performance"],
        "technologies": ["python", "java", "javascript", "c++", "sql", "react", "node.js", "aws"]
    },
    "Backend Developer": {
        "required_skills": ["api development", "database", "server-side", "system design"],
        "preferred_skills": ["microservices", "docker", "kubernetes", "caching", "message queues"],
        "keywords": ["api", "rest", "graphql", "scalable", "performance", "database", "server"],
        "technologies": ["python", "java", "node.js", "go", "postgresql", "mongodb", "redis", "kafka"]
    },
    "Frontend Developer": {
        "required_skills": ["html", "css", "javascript", "responsive design", "ui/ux"],
        "preferred_skills": ["react", "vue", "angular", "typescript", "testing", "performance"],
        "keywords": ["responsive", "user interface", "component", "ui", "ux", "interactive", "accessibility"],
        "technologies": ["react", "vue", "angular", "typescript", "javascript", "css", "sass", "webpack"]
    },
    "Full Stack Developer": {
        "required_skills": ["frontend", "backend", "database", "api"],
        "preferred_skills": ["devops", "cloud", "system design", "testing"],
        "keywords": ["full stack", "end-to-end", "frontend", "backend", "database", "api", "deployment"],
        "technologies": ["react", "node.js", "python", "mongodb", "postgresql", "docker", "aws"]
    },
    "Data Scientist": {
        "required_skills": ["python", "machine learning", "statistics", "data analysis"],
        "preferred_skills": ["deep learning", "nlp", "computer vision", "big data"],
        "keywords": ["model", "prediction", "analysis", "machine learning", "data", "insights", "algorithm"],
        "technologies": ["python", "tensorflow", "pytorch", "pandas", "numpy", "sql", "spark", "tableau"]
    },
    "Data Analyst": {
        "required_skills": ["sql", "excel", "data visualization", "statistics"],
        "preferred_skills": ["python", "tableau", "power bi", "data modeling"],
        "keywords": ["analysis", "insights", "dashboard", "report", "visualization", "kpi", "metrics"],
        "technologies": ["sql", "excel", "tableau", "power bi", "python", "r"]
    },
    "DevOps Engineer": {
        "required_skills": ["ci/cd", "docker", "kubernetes", "linux", "cloud"],
        "preferred_skills": ["terraform", "ansible", "monitoring", "security"],
        "keywords": ["automation", "deployment", "pipeline", "infrastructure", "monitoring", "scalability"],
        "technologies": ["docker", "kubernetes", "jenkins", "aws", "gcp", "terraform", "ansible", "prometheus"]
    },
    "ML Engineer": {
        "required_skills": ["machine learning", "python", "deep learning", "mlops"],
        "preferred_skills": ["distributed systems", "model deployment", "feature engineering"],
        "keywords": ["model", "training", "inference", "pipeline", "deployment", "optimization"],
        "technologies": ["python", "tensorflow", "pytorch", "mlflow", "kubeflow", "docker", "aws sagemaker"]
    }
}

# Action verbs for strong resume bullets
ACTION_VERBS = {
    "high_impact": ["achieved", "accelerated", "delivered", "drove", "generated", "increased", "launched", "led", "optimized", "reduced", "spearheaded", "transformed"],
    "technical": ["architected", "automated", "built", "coded", "debugged", "deployed", "designed", "developed", "engineered", "implemented", "integrated", "migrated", "programmed", "refactored"],
    "collaboration": ["collaborated", "coordinated", "facilitated", "mentored", "partnered", "presented", "trained"],
    "analysis": ["analyzed", "evaluated", "identified", "investigated", "researched", "solved", "tested", "validated"]
}

# Common resume sections
RESUME_SECTIONS = ["education", "experience", "skills", "projects", "certifications", "achievements", "summary", "objective"]


class ResumeAnalyzer:
    """Comprehensive AI-powered resume analyzer"""
    
    def __init__(self, model_service=None):
        """Initialize the analyzer with optional LLM service"""
        self.model_service = model_service
        self.version = "2.0"
    
    async def analyze_resume(
        self,
        resume_text: str,
        target_role: str = "Software Engineer",
        user_profile: Optional[Dict] = None
    ) -> Dict[str, Any]:
        """
        Perform comprehensive resume analysis
        
        Args:
            resume_text: The extracted text from the resume
            target_role: The target job role for optimization
            user_profile: Optional user profile data for personalization
            
        Returns:
            Complete analysis results including ATS score, suggestions, etc.
        """
        try:
            logger.info(f"Starting resume analysis for target role: {target_role}")
            
            # Normalize inputs
            resume_text_lower = resume_text.lower()
            target_role = self._normalize_role(target_role)
            
            # Get role requirements
            role_config = ROLE_REQUIREMENTS.get(target_role, ROLE_REQUIREMENTS["Software Engineer"])
            
            # Extract resume data
            extracted_data = self._extract_resume_data(resume_text)
            
            # Calculate various scores
            keyword_score = self._calculate_keyword_score(resume_text_lower, role_config)
            skills_score = self._calculate_skills_score(extracted_data.get("skills", []), role_config)
            format_score = self._analyze_format(resume_text)
            experience_score = self._analyze_experience(resume_text, extracted_data)
            project_score = self._analyze_projects(extracted_data.get("projects", []), role_config)
            education_score = self._analyze_education(extracted_data.get("education", []))
            action_verb_score = self._analyze_action_verbs(resume_text_lower)
            quantification_score = self._analyze_quantification(resume_text)
            
            # Calculate overall ATS score (weighted average)
            ats_score = self._calculate_ats_score({
                "keyword": keyword_score,
                "skills": skills_score,
                "format": format_score,
                "experience": experience_score,
                "projects": project_score,
                "education": education_score,
                "action_verbs": action_verb_score,
                "quantification": quantification_score
            })
            
            # Generate section analysis
            sections_analysis = self._generate_section_analysis(resume_text, role_config, {
                "keyword": keyword_score,
                "skills": skills_score,
                "format": format_score,
                "experience": experience_score,
                "projects": project_score
            })
            
            # Find missing keywords
            missing_keywords = self._find_missing_keywords(resume_text_lower, role_config)
            found_keywords = self._find_present_keywords(resume_text_lower, role_config)
            
            # Generate suggestions
            suggestions = self._generate_suggestions(
                resume_text,
                extracted_data,
                role_config,
                missing_keywords,
                {
                    "keyword": keyword_score,
                    "skills": skills_score,
                    "action_verbs": action_verb_score,
                    "quantification": quantification_score
                }
            )
            
            # Generate improved lines
            improved_lines = self._generate_improved_lines(resume_text, role_config)
            
            # Generate professional summary suggestion
            suggested_summary = self._generate_summary_suggestion(
                extracted_data,
                target_role,
                user_profile
            )
            
            # Calculate job match
            job_match = self._calculate_job_match(extracted_data.get("skills", []), role_config, target_role)
            
            # Identify skill gaps
            skill_gaps = self._identify_skill_gaps(extracted_data.get("skills", []), role_config)
            
            # Format analysis
            format_analysis = self._detailed_format_analysis(resume_text)
            
            # Create improvement plan
            improvement_plan = self._create_improvement_plan(
                suggestions,
                skill_gaps,
                missing_keywords,
                {
                    "keyword": keyword_score,
                    "skills": skills_score,
                    "format": format_score
                }
            )
            
            # Industry comparison
            industry_comparison = self._generate_industry_comparison(ats_score, {
                "keyword": keyword_score,
                "skills": skills_score,
                "projects": project_score
            })
            
            # Generate strengths and weaknesses
            strengths, weaknesses = self._analyze_strengths_weaknesses(
                resume_text,
                extracted_data,
                role_config,
                {
                    "keyword": keyword_score,
                    "skills": skills_score,
                    "projects": project_score,
                    "experience": experience_score
                }
            )
            
            # Compile final analysis
            analysis = {
                "overallScore": round(ats_score),
                "sections": sections_analysis,
                "keywords": found_keywords,
                "missingKeywords": missing_keywords,
                "keywordMatchScore": keyword_score,
                "suggestions": suggestions,
                "improvedLines": improved_lines,
                "suggestedSummary": suggested_summary,
                "jobMatch": job_match,
                "skillGapsDetailed": skill_gaps,
                "formatAnalysis": format_analysis,
                "improvementPlan": improvement_plan,
                "industryComparison": industry_comparison,
                "strengthsSummary": strengths,
                "weaknessesSummary": weaknesses,
                "extractedData": extracted_data,
                "analyzedAt": datetime.utcnow().isoformat(),
                "analyzerVersion": self.version,
                "targetRoleUsed": target_role
            }
            
            logger.info(f"Resume analysis complete. ATS Score: {ats_score}")
            return analysis
            
        except Exception as e:
            logger.error(f"Error analyzing resume: {str(e)}")
            raise
    
    def _normalize_role(self, role: str) -> str:
        """Normalize role name to match our configurations"""
        role_lower = role.lower()
        
        # Map common variations
        role_mappings = {
            "sde": "Software Engineer",
            "software developer": "Software Engineer",
            "backend": "Backend Developer",
            "frontend": "Frontend Developer",
            "fullstack": "Full Stack Developer",
            "full-stack": "Full Stack Developer",
            "data science": "Data Scientist",
            "ml": "ML Engineer",
            "machine learning": "ML Engineer",
            "devops": "DevOps Engineer"
        }
        
        for key, value in role_mappings.items():
            if key in role_lower:
                return value
        
        # Check if role exists in our config
        for config_role in ROLE_REQUIREMENTS.keys():
            if config_role.lower() in role_lower or role_lower in config_role.lower():
                return config_role
        
        return "Software Engineer"  # Default
    
    def _extract_resume_data(self, resume_text: str) -> Dict[str, Any]:
        """Extract structured data from resume text using state machine parser (matches JS extractLocalFallback)"""
        
        def clean_leading_bullets(line: str) -> str:
            if not isinstance(line, str):
                return ''
            cleaned = re.sub(r'^[•\-\*\–\—\·\s]+', '', line)
            cleaned = re.sub(r'^(?:\d+\.(?:\s|$)+|\d+\)(?:\s|$)+)', '', cleaned)
            return cleaned.strip()

        def restore_merged_spaces(text: str) -> str:
            if not isinstance(text, str):
                return text
            
            words = re.split(r'(\s+)', text)
            restored_words = []
            
            for word in words:
                if not word or word.isspace():
                    restored_words.append(word)
                    continue
                    
                if '@' in word or re.search(r'https?://', word, re.IGNORECASE) or re.search(r'\b(?:[a-z0-9]+\.)+[a-z]{2,}\b', word, re.IGNORECASE) or 'linkedin.com' in word.lower() or 'github.com' in word.lower():
                    restored_words.append(word)
                    continue
                    
                cleaned = word
                
                # 1. Separate numbers/percentages from leading/trailing words first
                cleaned = re.sub(r'([a-zA-Z]+)(\d+)', r'\1 \2', cleaned)
                cleaned = re.sub(r'(\d+(?:\+|-|%)?)([a-zA-Z]+)', r'\1 \2', cleaned)

                # 2. Separate common articles/adjectives merged at start: a, with, system, etc.
                cleaned = re.sub(
                    r'\ba(full-stack|real-time|deep|learning)\b',
                    lambda m: m.group(0)[0] + ' ' + m.group(0)[1:],
                    cleaned,
                    flags=re.IGNORECASE
                )
                
                # 3. Separate technology name or action verb prefix
                cleaned = re.sub(
                    r'\b(Integrated|Engineered|Developed|Designed|Optimized|Implemented|Built|Trained|Collaborated|Created|Led)(MongoDB|Haar|OpenCV|TensorFlow|React|Node|Express|Flask|Django|Python|Java|SQL|C\+\+)',
                    r'\1 \2',
                    cleaned
                )
                
                # 4. Separate words merged with "with", "using", "for"
                cleaned = re.sub(
                    r'([a-zA-Z]{3,})(with|using|for)\b',
                    r'\1 \2',
                    cleaned
                )
                
                # 5. Separate words ending in via/and using precise word boundaries & callback list checks
                def suffix_replacer(match):
                    full_word = match.group(0)
                    prefix = match.group(1)
                    suffix = match.group(2)
                    lower_word = full_word.lower()
                    
                    if suffix.lower() == 'via':
                        if lower_word in ['trivia', 'olivia', 'salvia', 'via']:
                            return full_word
                        return prefix + ' ' + suffix
                    else: # and
                        common_and = {
                            'and', 'hand', 'land', 'band', 'sand', 'brand', 'grand', 'stand', 'command', 'expand', 'demand',
                            'island', 'thousand', 'husband', 'understand', 'operand', 'garland', 'highland', 'woodland',
                            'borderland', 'hinterland', 'headband', 'wristband', 'waistband', 'broadband', 'contraband',
                            'standby', 'candid'
                        }
                        if lower_word in common_and:
                            return full_word
                        return prefix + ' ' + suffix

                cleaned = re.sub(r'\b([a-zA-Z]+)(and|via)\b', suffix_replacer, cleaned, flags=re.IGNORECASE)
                
                cleaned = re.sub(
                    r'([a-zA-Z]+)and([A-Z][a-zA-Z]*)',
                    r'\1 and \2',
                    cleaned
                )
                
                # Handle specific reverse merges
                cleaned = re.sub(
                    r'\bwith(multi-threaded|multi-threading|real-time)\b',
                    r'with \1',
                    cleaned,
                    flags=re.IGNORECASE
                )
                
                restored_words.append(cleaned)
                
            return ''.join(restored_words)

        def is_pure_tech_list(line: str) -> bool:
            trimmed = line.strip()
            if not trimmed:
                return False

            TECH_REG = re.compile(
                r'\b(?:react(?:\.js)?|angular|vue(?:\.js)?|svelte|next\.js|nuxt\.js|node(?:\.js)?|express(?:\.js)?|koa|django|flask|fastapi|spring\s*boot|laravel|asp\.net|rails|ruby\s*on\s*rails|mongodb|postgres(?:ql)?|mysql|sqlite|redis|cassandra|dynamodb|firebase|supabase|oracle|mssql|docker|kubernetes|k8s|aws|gcp|azure|heroku|vercel|netlify|digital\s*ocean|html(?:5)?|css(?:3)?|javascript|js|typescript|ts|python|java|c\+\+|c\#|go|golang|rust|ruby|php|swift|kotlin|scala|perl|bash|shell|git|github|gitlab|rest\s*apis?|restful|graphql|grpc|socket\.io|jwt|oauth|redux|mobx|recoil|tailwind|bootstrap|material\-ui|mui|chakra|sass|less|webpack|vite|babel|gulp|jest|mocha|cypress|selenium|playwright|jenkins|travis|circleci|github\s*actions|tensorflow|pytorch|keras|scikit\-learn|numpy|pandas|opencv|mediapipe|nltk|spacy|hugging\s*face|transformers|nlp|llm|gan|cnn|rnn|lstm|bert|gpt|gemini|openai|s3|ec2|lambda|serverless|microservices|ci\/cd|dsa|oop|dbms|expo|native|api|apis|rest|nosql|db|databases)\b',
                re.IGNORECASE
            )

            NON_TECH_PROJECT_WORDS = re.compile(
                r'\b(?:platform|system|application|app|website|portal|software|tool|dashboard|extension|game|detector|classifier|generator|engine|management|tracker|detection|control|gaming|commerce|executive|professional|experience|project|internship|student|education|university|college|role|engineer|developer|designer|manager|analyst|lead|architect|intern|specialist|consultant|programmer|tester|administrator|exec|executive|director|vp|head|building|scaling|developing|implementing|managing|predict(?:or|ion)?|recommend(?:er|ation)?|solve(?:r)?|recognition|analysis|learning|smart|automatic|intelligent|helper|utility|portfolio|blog)\b',
                re.IGNORECASE
            )

            ACTION_VERB_OR_DESC_WORD = re.compile(
                r'\b(?:engineered|designed|integrated|developed|implemented|optimized|built|trained|led|completed|created|spearheaded|architected|pioneered|managed|formulated|automated|collaborated|conducted|established|improved|enhanced|contributed|delivered|utilizing|using|translating|achieving|reducing|processing|securing|solving|leading|completing|facial|classification|prediction|webcam|hyperparameter|tuning|augmentation|inference|grayscale|normalization|listings|checkout|validation|handling|modeling|uptime)\b',
                re.IGNORECASE
            )

            clean_line = clean_leading_bullets(trimmed)
            clean_line = re.sub(r'[\-–—\s]+$', '', clean_line).strip()
            if not clean_line:
                return False

            if ACTION_VERB_OR_DESC_WORD.search(clean_line):
                return False
            if NON_TECH_PROJECT_WORDS.search(clean_line):
                return False

            words = [w for w in re.split(r'[\s,;|/\\()]+', clean_line) if w]
            if not words:
                return False

            tech_word_count = sum(1 for w in words if TECH_REG.search(w))
            ratio = tech_word_count / len(words)
            return ratio >= 0.5

        def is_likely_project_title(line: str) -> bool:
            trimmed = line.strip()
            if not trimmed:
                return False
            if trimmed[0].islower():
                return False
            if trimmed[0] in ['%', '&', '+', '/']:
                return False
            words = trimmed.split()
            if len(words) <= 1:
                return False
            if trimmed[-1] in ['%', ',', '.']:
                return False
            if re.match(r'^\b(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec|20\d\d)\b', trimmed, re.IGNORECASE) and len(trimmed) < 30:
                return False
            return True

        def is_likely_experience_title(line: str) -> bool:
            return is_likely_project_title(line)

        def extract_dates_from_text(text: str) -> Dict[str, str]:
            date_regex = re.compile(
                r'(?:Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:tember)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?)\b|(?:19|20)\d{2}\b',
                re.IGNORECASE
            )
            dates = date_regex.findall(text)
            start_date = ''
            end_date = ''
            if dates:
                start_date = dates[0]
                if len(dates) > 1:
                    end_date = dates[1]
                    if 'expected' in text.lower() and 'expected' not in end_date.lower():
                        end_date += ' (Expected)'
                elif 'present' in text.lower():
                    end_date = 'Present'
                elif 'expected' in text.lower():
                    end_date = dates[0] + ' (Expected)'
            return {"startDate": start_date, "endDate": end_date}

        def clean_dates_from_text(text: str) -> str:
            if not isinstance(text, str):
                return ''
            cleaned = re.sub(
                r'(?:Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:tember)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?)\b|(?:19|20)\d{2}\b',
                '',
                text,
                flags=re.IGNORECASE
            )
            cleaned = re.sub(r'\bexpected\b', '', cleaned, flags=re.IGNORECASE)
            cleaned = re.sub(r'[\s\-\–\—\|,\(\)•\·\*\+]+', ' ', cleaned)
            cleaned = re.sub(r'\s+', ' ', cleaned).strip()
            return cleaned

        def clean_timeline_and_skills_from_name_python(name: str) -> str:
            if not isinstance(name, str):
                return ''
            cleaned = name
            parenthesized_date_regex = re.compile(
                r'\([\s\-\–\—a-zA-Z0-9\/\.]*(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec|Present|20\d\d)\b[\s\-\–\—a-zA-Z0-9\/\.]*\)',
                re.IGNORECASE
            )
            cleaned = parenthesized_date_regex.sub('', cleaned)

            month_regex = re.compile(
                r'(?:Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:tember)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?)\b\s*\d{0,4}',
                re.IGNORECASE
            )
            cleaned = month_regex.sub('', cleaned)

            present_or_year_regex = re.compile(r'\b(?:Present)\b|(?:19|20)\d{2}\b', re.IGNORECASE)
            cleaned = present_or_year_regex.sub('', cleaned)

            cleaned = re.sub(r'^[\s\-\–\—\|,\(\)•\·\*\+]+|[\s\-\–\—\|,\(\)•\·\*\+]+$', '', cleaned)
            cleaned = re.sub(r'\s+', ' ', cleaned).strip()
            return cleaned if cleaned else name

        def is_new_project_start(clean_line: str, current_proj: Optional[Dict]) -> bool:
            clean = clean_leading_bullets(clean_line)
            if is_pure_tech_list(clean):
                return False
            if not is_likely_project_title(clean):
                return False
            if re.match(r'^(?:repo|github|link|http|url|demo|website|source)', clean, re.IGNORECASE):
                return False
            if re.search(r'(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\b|(?:19|20)\d{2}\b', clean, re.IGNORECASE) and len(clean) < 40:
                return False
            if re.match(r'^(?:technologies|tech\s+stack|tools|languages|frameworks|libraries|database|devops|skills)', clean, re.IGNORECASE):
                return False
            
            ACTION_VERBS = re.compile(
                r'^(?:engineered|designed|integrated|developed|implemented|optimized|built|trained|led|completed|created|spearheaded|architected|pioneered|managed|formulated|automated|collaborated|conducted|established|improved|enhanced|formulated|contributed|delivered)',
                re.IGNORECASE
            )
            if ACTION_VERBS.match(clean):
                return False

            if not current_proj:
                return True
                
            if len(current_proj.get("description", [])) == 0 and len(current_proj.get("highlights", [])) == 0:
                return False
                
            if '|' in clean or '–' in clean or (' - ' in clean and not re.search(r'(?:19|20)\d{2}\b', clean)) or ':' in clean:
                divider = '|' if '|' in clean else (':' if ':' in clean else '–')
                first_part = clean.split(divider)[0].strip()
                if len(first_part.split()) <= 8:
                    return True
                    
            words = clean.split()
            is_short_title = len(words) >= 1 and len(words) <= 8 and clean[0].isupper()
            return is_short_title

        def clean_project_bullets_and_extract_techs(bullets: List[str], existing_techs: List[str]):
            merged_techs = set(existing_techs or [])
            cleaned_bullets = []
            tech_header_regex = re.compile(
                r'^(?:technologies|tech\s+stack|tools\s+used|technologies\s+used|built\s+with|stack|tech)\s*[:\-–—\s]+',
                re.IGNORECASE
            )

            for bullet in bullets:
                restored = restore_merged_spaces(bullet)
                trimmed = restored.strip()
                if not trimmed:
                    continue

                if tech_header_regex.match(trimmed):
                    tech_part = tech_header_regex.sub('', trimmed)
                    parts = [t.strip() for t in re.split(r'[,/|;]|\s+and\s+|\s*&\s*', tech_part, flags=re.IGNORECASE) if t.strip()]
                    for t in parts:
                        clean_t = re.sub(r'\b(?:and|etc)\b', '', t, flags=re.IGNORECASE).strip()
                        if clean_t:
                            merged_techs.add(clean_t)
                    continue

                if is_pure_tech_list(trimmed):
                    parts = [t.strip() for t in re.split(r'[,/|;]|\s+and\s+|\s*&\s*', trimmed, flags=re.IGNORECASE) if t.strip()]
                    for t in parts:
                        clean_t = re.sub(r'\b(?:and|etc)\b', '', t, flags=re.IGNORECASE).strip()
                        if clean_t:
                            merged_techs.add(clean_t)
                    continue

                cleaned_bullets.append(bullet)

            return {
                "cleanedBullets": cleaned_bullets,
                "technologies": list(merged_techs)
            }

        def is_section_header(line: str) -> Optional[str]:
            clean = line.strip()
            if not clean:
                return None
            if len(clean) > 50:
                return None
            if clean[0] in ['•', '-', '*', '–', '—', '·']:
                return None
            if ',' in clean:
                return None
            if clean.endswith('.'):
                return None
            if ':' in clean and len(clean.split(':', 1)[1].strip()) > 3:
                return None
            if clean[0].islower():
                return None

            lower = clean.lower()

            if re.match(r'^(?:education|academic|academics|qualifications|schooling)(?:\s+\&\s+\w+)?$', lower) or \
               re.match(r'^(?:academic\s+)?qualifications$', lower):
                return 'education'
            if re.match(r'^(?:experience|employment|work\s+history|career|professional\s+background|professional\s+experience|work\s+experience)(?:\s+\&\s+\w+)?$', lower):
                return 'experience'
            if re.match(r'^(?:projects|personal\s+projects|academic\s+projects|key\s+projects|featured\s+projects)(?:\s+\&\s+\w+)?$', lower):
                return 'projects'
            if re.match(r'^(?:skills|technologies|tech\s+stack|technical\s+skills|technical\s+expertise|skills\s+\&\s+expertise|languages|programming\s+languages)$', lower):
                return 'skills'
            if re.match(r'^(?:certifications|courses|licenses|credentials|certified)(?:\s+\&\s+\w+)?$', lower):
                return 'certifications'
            if re.match(r'^(?:achievements|awards|extracurriculars?|extra-curriculars?|leadership|interests|publications|co-curriculars?|activities|honors|volunteer|volunteering)(?:\s+\&\s+[\w\-]+)*$', lower) or \
               'achievements' in lower or 'extracurricular' in lower or 'activities' in lower or 'awards' in lower or 'leadership' in lower:
                if 'solving' in lower or 'team' in lower or 'workshop' in lower or 'dsa' in lower or 'contest' in lower or 'participants' in lower:
                    return None
                return 'achievements'
            if re.match(r'^(?:professional\s+|career\s+|executive\s+)?(?:summary|objective|profile|about\s+me)$', lower):
                return 'summary'

            return None

        # ---------------------------------------------
        # Real Start of Method
        # ---------------------------------------------
        lines = [restore_merged_spaces(l.strip()) for l in resume_text.split('\n') if l.strip()]
        
        result = {
            "name": "",
            "email": "",
            "phone": "",
            "linkedin": "",
            "github": "",
            "summary": "",
            "education": [],
            "experience": [],
            "projects": [],
            "skills": [],
            "certifications": [],
            "achievements": []
        }
        
        if not lines:
            return result
            
        first_line = re.sub(r'[^a-zA-Z\s.-]', '', lines[0]).strip()
        if len(first_line) <= 50 and len(first_line.split()) <= 4:
            result["name"] = first_line

        email_regex = re.compile(r'[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}')
        phone_regex = re.compile(r'(?:\+?\d{1,3}[ -]?)?\(?\d{3}\)?[ -]?\d{3}[ -]?\d{4}')
        linkedin_regex = re.compile(r'linkedin\.com/in/[a-zA-Z0-9_-]+', re.IGNORECASE)
        github_regex = re.compile(r'github\.com/[a-zA-Z0-9_-]+', re.IGNORECASE)

        email_match = email_regex.search(resume_text)
        if email_match:
            result["email"] = email_match.group(0)

        phone_match = phone_regex.search(resume_text)
        if phone_match:
            result["phone"] = phone_match.group(0)

        linkedin_match = linkedin_regex.search(resume_text)
        if linkedin_match:
            result["linkedin"] = 'https://' + linkedin_match.group(0)

        github_match = github_regex.search(resume_text)
        if github_match:
            result["github"] = 'https://' + github_match.group(0)

        found_skills = set()
        COMMON_SKILLS = [
            'JavaScript', 'TypeScript', 'Python', 'Java', 'C++', 'C#', 'Go', 'Rust', 'Ruby', 'PHP', 'Swift', 'Kotlin',
            'HTML', 'CSS', 'Sass', 'React', 'Angular', 'Vue', 'Next.js', 'Nuxt.js', 'Node.js', 'Express', 'Django', 'Flask',
            'Spring Boot', 'ASP.NET', 'Laravel', 'MongoDB', 'PostgreSQL', 'MySQL', 'SQLite', 'Redis', 'Firebase', 'Supabase',
            'Docker', 'Kubernetes', 'AWS', 'Azure', 'GCP', 'Git', 'GitHub', 'CI/CD', 'Jenkins', 'REST API', 'GraphQL',
            'Machine Learning', 'Deep Learning', 'Data Structures', 'Algorithms', 'System Design'
        ]
        for skill_pattern in COMMON_SKILLS:
            pattern_esc = re.escape(skill_pattern)
            regex = re.compile(r'\b' + pattern_esc + r'\b', re.IGNORECASE)
            if regex.search(resume_text):
                found_skills.add(skill_pattern)

        current_section = None
        section_content = []
        pre_header_lines = []

        def flush_section():
            nonlocal current_section, section_content
            if not current_section or not section_content:
                return

            if current_section == 'education':
                education_entries = []
                current_edu = None
                
                for line in section_content:
                    clean_line = re.sub(r'^[•\-\*\–\—\·\s]+', '', line).strip()
                    if not clean_line:
                        continue
                    
                    date_info = extract_dates_from_text(clean_line)
                    
                    gpa = ''
                    gpa_regex = re.compile(r'\b(?:c?gpa|gpa|score)\b\s*[:\-–—\s]*\s*(\d+(?:\.\d+)?(?:\s*[\/\-–—]\s*\d+(?:\.\d+)?)?)', re.IGNORECASE)
                    gpa_match = gpa_regex.search(clean_line)
                    if gpa_match:
                        gpa = gpa_match.group(1).strip()
                        clean_line = clean_line.replace(gpa_match.group(0), '').strip()
                    else:
                        standalone_gpa_regex = re.compile(r'\b\d+(?:\.\d+)?\s*/\s*\d+(?:\.\d+)?\b')
                        standalone_gpa_match = standalone_gpa_regex.search(clean_line)
                        if standalone_gpa_match:
                            gpa = standalone_gpa_match.group(0).strip()
                            clean_line = clean_line.replace(standalone_gpa_match.group(0), '').strip()

                    location = ''
                    loc_match = re.search(r'\b(Baddi|Himachal Pradesh|Didwana|Rajasthan|India|Delhi|Baddi,\s*Himachal Pradesh|Didwana,\s*Rajasthan)\b', clean_line, re.IGNORECASE)
                    if loc_match:
                        idx = clean_line.lower().find(loc_match.group(0).lower())
                        location = re.sub(r'^[\s,\|-]+', '', clean_line[idx:]).strip()
                        clean_line = re.sub(r'[\s,\|-]+$', '', clean_line[:idx]).strip()

                    clean_line = clean_dates_from_text(clean_line)
                    clean_line = re.sub(r'^[\s,\|-]+|[\s,\|-]+$', '', clean_line).strip()
                    
                    if not clean_line:
                        continue

                    is_degree = bool(re.search(
                        r'\b(?:B\.?Tech|B\.?E\.?|B\.?Sc|B\.?A|B\.?B\.?A|M\.?Tech|M\.?E\.?|M\.?S|M\.?Sc|M\.?A|Bachelor|Master|Ph\.?D|Graduate|Postgraduate|Secondary|Senior Secondary|High School|Matriculation|CBSE|RBSE|ICSE|Diploma|Class XII|Class X|10th|12th)\b',
                        clean_line,
                        re.IGNORECASE
                    ))
                    is_institution = bool(re.search(
                        r'\b(?:School|University|College|Institute|Academy|Vidhyalaya|Vidyalaya|Public School|EduSystem)\b',
                        clean_line,
                        re.IGNORECASE
                    ))

                    has_inst = current_edu and current_edu.get("institution") and current_edu["institution"] != 'Institution'
                    has_deg = current_edu and current_edu.get("degree") and current_edu["degree"] != 'Degree'

                    should_start_new = (not current_edu) or (is_institution and has_inst) or (is_degree and has_deg) or (has_inst and has_deg)

                    if should_start_new:
                        if current_edu:
                            education_entries.append(current_edu)
                        current_edu = {
                            "degree": 'Degree',
                            "fieldOfStudy": '',
                            "institution": 'Institution',
                            "location": '',
                            "gpa": '',
                            "startDate": '',
                            "endDate": '',
                            "year": ''
                        }

                    current_has_inst = current_edu and current_edu.get("institution") and current_edu["institution"] != 'Institution'
                    current_has_deg = current_edu and current_edu.get("degree") and current_edu["degree"] != 'Degree'

                    if is_degree:
                        current_edu["degree"] = clean_line
                    elif is_institution:
                        current_edu["institution"] = clean_line
                    else:
                        if not current_has_inst:
                            current_edu["institution"] = clean_line
                        elif not current_has_deg:
                            current_edu["degree"] = clean_line
                        elif not current_edu.get("fieldOfStudy"):
                            current_edu["fieldOfStudy"] = clean_line

                    if location:
                        current_edu["location"] = location
                    if gpa:
                        current_edu["gpa"] = gpa
                    if date_info["startDate"]:
                        current_edu["startDate"] = date_info["startDate"]
                        current_edu["endDate"] = date_info["endDate"]
                        current_edu["year"] = date_info["endDate"] if date_info["endDate"] else date_info["startDate"]

                if current_edu:
                    education_entries.append(current_edu)

                cleaned_edus = []
                for edu in education_entries:
                    if edu["degree"] == 'Degree':
                        edu["degree"] = ''
                    if edu["institution"] == 'Institution':
                        edu["institution"] = ''
                    if edu["degree"] or edu["institution"]:
                        cleaned_edus.append(edu)
                result["education"] = cleaned_edus

            elif current_section == 'skills':
                for line in section_content:
                    clean_line = re.sub(r'^[a-zA-Z\s&/\\|():\-\–\—]+:', '', line).strip()
                    parts = re.split(r'[,;|•·\*\t]|\s{2,}', clean_line)
                    for part in parts:
                        skill = re.sub(r'^[•\-\*\–\—\·\s]+', '', part).strip()
                        if skill and (len(skill) > 1 or skill.lower() in ['c', 'r']) and len(skill) < 40 and not re.search(r'(?:19|20)\d{2}\b', skill):
                            found_skills.add(skill)

            elif current_section == 'experience':
                current_exp = None
                for line in section_content:
                    is_bullet = line.startswith(('•', '-', '*', '–', '—', '·')) or bool(re.match(r'^\d+\.\s', line))
                    clean_line = clean_leading_bullets(line)
                    if not clean_line:
                        continue

                    is_timeline = bool(re.search(r'(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\b|(?:19|20)\d{2}\b', clean_line, re.IGNORECASE)) and len(clean_line) < 40
                    is_tech_list = is_pure_tech_list(clean_line)

                    if is_bullet or (len(line) >= 60 and not is_likely_experience_title(clean_line)):
                        if not current_exp:
                            current_exp = {
                                "company": 'Company',
                                "role": 'Software Engineer',
                                "startDate": '',
                                "endDate": '',
                                "location": '',
                                "description": [],
                                "highlights": []
                            }
                        if len(current_exp["description"]) > 0 and not is_bullet and not line.startswith(' ') and not clean_line[0].isupper():
                            current_exp["description"][-1] += ' ' + clean_line
                            current_exp["highlights"][-1] += ' ' + clean_line
                        else:
                            current_exp["description"].append(clean_line)
                            current_exp["highlights"].append(clean_line)
                    elif is_timeline or is_tech_list:
                        if not current_exp:
                            current_exp = {
                                "company": 'Company',
                                "role": 'Software Engineer',
                                "startDate": '',
                                "endDate": '',
                                "location": '',
                                "description": [],
                                "highlights": []
                            }
                        if is_timeline:
                            dates = re.findall(r'(?:Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:tember)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?)\b|(?:19|20)\d{2}\b', clean_line, re.IGNORECASE)
                            if dates:
                                current_exp["startDate"] = dates[0]
                                if len(dates) > 1:
                                    current_exp["endDate"] = dates[1]
                                elif 'present' in clean_line.lower():
                                    current_exp["endDate"] = 'Present'
                    elif is_likely_experience_title(clean_line) and not is_pure_tech_list(clean_line):
                        if current_exp and (len(current_exp["highlights"]) > 0 or current_exp["company"] != 'Company'):
                            result["experience"].append(current_exp)
                            current_exp = None

                        company = clean_line
                        role = 'Software Engineer'
                        if '@' in clean_line:
                            parts = clean_line.split('@', 1)
                            role = parts[0].strip()
                            company = parts[1].strip()
                        elif '|' in clean_line:
                            parts = clean_line.split('|', 1)
                            company = parts[0].strip()
                            role = parts[1].strip()
                        elif '–' in clean_line:
                            parts = clean_line.split('–', 1)
                            company = parts[0].strip()
                            role = parts[1].strip()
                        elif '-' in clean_line and not re.search(r'(?:19|20)\d{2}\b', clean_line):
                            parts = clean_line.split('-', 1)
                            company = parts[0].strip()
                            role = parts[1].strip()

                        company_clean = clean_timeline_and_skills_from_name_python(company)
                        role_clean = clean_timeline_and_skills_from_name_python(role)
                        role_keywords = re.compile(r'\b(?:engineer|developer|designer|manager|analyst|lead|architect|intern|specialist|consultant|programmer|tester|administrator|exec|executive|director|vp|head)\b', re.IGNORECASE)
                        if role_keywords.search(company_clean) and not role_keywords.search(role_clean):
                            company_clean, role_clean = role_clean, company_clean

                        current_exp = {
                            "company": company_clean,
                            "role": role_clean,
                            "startDate": '',
                            "endDate": '',
                            "location": '',
                            "description": [],
                            "highlights": []
                        }
                    else:
                        if current_exp:
                            if len(current_exp["description"]) > 0:
                                current_exp["description"][-1] += ' ' + clean_line
                                current_exp["highlights"][-1] += ' ' + clean_line
                            else:
                                current_exp["description"].append(clean_line)
                                current_exp["highlights"].append(clean_line)

                if current_exp:
                    result["experience"].append(current_exp)

            elif current_section == 'projects':
                current_proj = None
                for line in section_content:
                    is_bullet = line.startswith(('•', '-', '*', '–', '—', '·')) or bool(re.match(r'^\d+\.\s', line))
                    clean_line = clean_leading_bullets(line)
                    if not clean_line:
                        continue

                    date_regex = re.compile(
                        r'(?:(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-zA-Z]*[\s,.]*\d{4})|\b(?:19|20)\d{2}\b|\bPresent\b',
                        re.IGNORECASE
                    )
                    date_match = date_regex.findall(clean_line)
                    is_timeline = bool(date_match) and len(clean_line) < 40
                    is_tech_list = is_pure_tech_list(clean_line)

                    link_match = re.search(r'(?:https?://|www\.)[^\s\)]+|github\.com/[a-zA-Z0-9_\-\./]+', clean_line, re.IGNORECASE)
                    extracted_link = link_match.group(0).strip() if link_match else ''

                    if is_timeline:
                        if current_proj:
                            current_proj["date"] = clean_line
                        continue

                    if is_bullet or not is_new_project_start(clean_line, current_proj):
                        if not current_proj:
                            current_proj = {
                                "name": 'Project',
                                "description": [],
                                "technologies": [],
                                "highlights": [],
                                "link": '',
                                "date": ''
                            }
                        if extracted_link and not current_proj.get("link"):
                            current_proj["link"] = extracted_link

                        if is_tech_list:
                            techs = [t.strip() for t in re.split(r'[,/–-]', clean_line) if t.strip()]
                            techs = [t for t in techs if len(t) > 1 and len(t) < 25]
                            current_proj["technologies"] = list(set(current_proj["technologies"] + techs))
                        else:
                            if len(current_proj["description"]) > 0 and not is_bullet and not line.startswith(' ') and not clean_line[0].isupper():
                                current_proj["description"][-1] += ' ' + clean_line
                                current_proj["highlights"][-1] += ' ' + clean_line
                            else:
                                current_proj["description"].append(clean_line)
                                current_proj["highlights"].append(clean_line)
                    else:
                        if current_proj and (len(current_proj["highlights"]) > 0 or current_proj["name"] != 'Project'):
                            result["projects"].append(current_proj)
                            current_proj = None

                        name_line = clean_line
                        proj_link = ''
                        if extracted_link:
                            proj_link = extracted_link
                            name_line = name_line.replace(extracted_link, '')
                            name_line = re.sub(r'\(\s*\)', '', name_line)
                            name_line = re.sub(r'\[\s*\]', '', name_line)
                            name_line = re.sub(r'^[•\-\*\–\—\·\s|:,\/()\[\]]+|[•\-\*\–\—\·\s|:,\/()\[\]]+$', '', name_line)
                            name_line = re.sub(r'\s+', ' ', name_line).strip()

                        # Extract date/timeline from nameLine if any (matches JS)
                        proj_date = ''
                        title_date_matches = date_regex.findall(name_line)
                        if title_date_matches:
                            proj_date = ' – '.join(title_date_matches)
                            name_line = date_regex.sub('', name_line)
                            name_line = re.sub(r'^[•\-\*\–\—\·\s|:,\/()\[\]\–\-]+|[•\-\*\–\—\·\s|:,\/()\[\]\–\-]+$', '', name_line)
                            name_line = re.sub(r'\s+', ' ', name_line).strip()

                        name = name_line
                        technologies = []
                        if '|' in name_line:
                            parts = name_line.split('|', 1)
                            name = parts[0].strip()
                            tech_part = parts[1].strip()
                            technologies = [t.strip() for t in re.split(r'[,/]', tech_part) if t.strip()]
                        elif ':' in name_line:
                            parts = name_line.split(':', 1)
                            name = parts[0].strip()
                            tech_part = parts[1].strip()
                            technologies = [t.strip() for t in re.split(r'[,/]', tech_part) if t.strip()]

                        current_proj = {
                            "name": clean_timeline_and_skills_from_name_python(name),
                            "description": [],
                            "technologies": technologies,
                            "highlights": [],
                            "link": proj_link,
                            "date": proj_date
                        }

                if current_proj:
                    result["projects"].append(current_proj)

            elif current_section == 'certifications':
                cert_list = []
                current_cert_text = ''
                for line in section_content:
                    is_bullet = line.strip().startswith(('•', '-', '*', '–', '—', '·'))
                    clean_line = re.sub(r'^[•\-\*\–\—\·\s]+', '', line).strip()
                    if is_bullet:
                        if current_cert_text:
                            cert_list.append(current_cert_text)
                            current_cert_text = ''
                        if clean_line:
                            current_cert_text = clean_line
                    else:
                        if clean_line:
                            if current_cert_text:
                                current_cert_text += ' ' + clean_line
                            else:
                                current_cert_text = clean_line
                if current_cert_text:
                    cert_list.append(current_cert_text)

                for cert_text in cert_list:
                    name = cert_text
                    issuer = ''
                    date = ''
                    if '–' in cert_text:
                        parts = cert_text.split('–', 1)
                        name = parts[0].strip()
                        issuer = parts[1].strip()
                    elif '-' in cert_text and not re.search(r'(?:19|20)\d{2}\b', cert_text):
                        parts = cert_text.split('-', 1)
                        name = parts[0].strip()
                        issuer = parts[1].strip()

                    date_match = re.search(r'(?:Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:tember)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?)\b|(?:19|20)\d{2}\b', cert_text, re.IGNORECASE)
                    if date_match:
                        date = date_match.group(0)
                        name = re.sub(r'[\(\),\-\–\—\s]+$', '', name.replace(date, '')).strip()
                        if issuer:
                            issuer = re.sub(r'[\(\),\-\–\—\s]+$', '', issuer.replace(date, '')).strip()
                    result["certifications"].append({"name": name, "issuer": issuer, "date": date})

            elif current_section == 'achievements':
                ach_list = []
                current_ach = ''
                for line in section_content:
                    is_bullet = line.strip().startswith(('•', '-', '*', '–', '—', '·'))
                    clean_line = re.sub(r'^[•\-\*\–\—\·\s]+', '', line).strip()
                    if is_bullet:
                        if current_ach:
                            ach_list.append(current_ach)
                            current_ach = ''
                        if clean_line:
                            current_ach = clean_line
                    else:
                        if clean_line:
                            if current_ach:
                                current_ach += ' ' + clean_line
                            else:
                                current_ach = clean_line
                if current_ach:
                    ach_list.append(current_ach)
                result["achievements"] = ach_list

            elif current_section == 'summary':
                result["summary"] = ' '.join([l.strip() for l in section_content if l.strip()])

            section_content = []

        # Iterate lines and group into sections
        for line in lines:
            detected = is_section_header(line)
            if detected:
                flush_section()
                current_section = detected
            elif current_section:
                section_content.append(line)
            else:
                pre_header_lines.append(line)
        flush_section()

        # Handle summary fallback from pre-header
        if not result["summary"] and pre_header_lines:
            local_email_regex = re.compile(r'[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}')
            local_phone_regex = re.compile(r'(?:\+?\d{1,3}[ -]?)?\(?\d{3}\)?[ -]?\d{3}[ -]?\d{4}')
            clean_summary_lines = []
            for line in pre_header_lines:
                lower = line.lower()
                if '@' in lower or local_email_regex.search(line) or local_phone_regex.search(line):
                    continue
                if 'linkedin.com' in lower or 'github.com' in lower or re.search(r'https?://', line, re.IGNORECASE):
                    continue
                if result["name"] and result["name"].lower() in lower:
                    continue
                if len(line) < 20:
                    continue
                if re.match(r'^[•\-\*\–\—\·\s\|]+$', line):
                    continue
                if is_pure_tech_list(line):
                    continue
                clean_summary_lines.append(line)
            if clean_summary_lines:
                result["summary"] = ' '.join(clean_summary_lines)

        # Post-process projects to clean bullets and extract technologies
        if result["projects"]:
            processed_projects = []
            for proj in result["projects"]:
                cleaned_info = clean_project_bullets_and_extract_techs(proj.get("description", []), proj.get("technologies", []))
                processed_projects.append({
                    "name": proj.get("name", "Project"),
                    "description": cleaned_info["cleanedBullets"],
                    "technologies": cleaned_info["technologies"],
                    "highlights": cleaned_info["cleanedBullets"],
                    "link": proj.get("link", ""),
                    "date": proj.get("date", "")
                })
            result["projects"] = processed_projects

        # Post-process experience to clean bullets and format properly
        if result["experience"]:
            processed_experience = []
            for exp in result["experience"]:
                cleaned_info = clean_project_bullets_and_extract_techs(exp.get("description", []), [])
                processed_experience.append({
                    "company": exp.get("company", "Company"),
                    "role": exp.get("role", "Software Engineer"),
                    "startDate": exp.get("startDate", ""),
                    "endDate": exp.get("endDate", ""),
                    "location": exp.get("location", ""),
                    "description": cleaned_info["cleanedBullets"],
                    "highlights": cleaned_info["cleanedBullets"]
                })
            result["experience"] = processed_experience

        result["skills"] = list(found_skills)
        return result
    
    def _calculate_keyword_score(self, resume_text: str, role_config: Dict) -> float:
        """Calculate keyword match score"""
        all_keywords = (
            role_config.get("required_skills", []) +
            role_config.get("preferred_skills", []) +
            role_config.get("keywords", []) +
            role_config.get("technologies", [])
        )
        
        if not all_keywords:
            return 50.0
        
        found = sum(1 for kw in all_keywords if kw.lower() in resume_text)
        return min(100, (found / len(all_keywords)) * 150)  # Scale up for partial matches
    
    def _calculate_skills_score(self, skills: List[str], role_config: Dict) -> float:
        """Calculate skills match score"""
        required = role_config.get("required_skills", [])
        preferred = role_config.get("preferred_skills", [])
        technologies = role_config.get("technologies", [])
        
        skills_lower = [s.lower() for s in skills]
        
        required_found = sum(1 for s in required if any(s.lower() in skill for skill in skills_lower))
        preferred_found = sum(1 for s in preferred if any(s.lower() in skill for skill in skills_lower))
        tech_found = sum(1 for t in technologies if any(t.lower() in skill for skill in skills_lower))
        
        # Weight: required (50%), preferred (30%), technologies (20%)
        score = 0
        if required:
            score += (required_found / len(required)) * 50
        if preferred:
            score += (preferred_found / len(preferred)) * 30
        if technologies:
            score += (tech_found / len(technologies)) * 20
        
        return min(100, score)
    
    def _analyze_format(self, resume_text: str) -> float:
        """Analyze resume format and structure"""
        score = 50  # Base score
        
        # Check for key sections
        for section in RESUME_SECTIONS:
            if section.lower() in resume_text.lower():
                score += 5
        
        # Check length (ideal: 500-2000 words)
        word_count = len(resume_text.split())
        if 500 <= word_count <= 2000:
            score += 10
        elif word_count < 300:
            score -= 15
        elif word_count > 3000:
            score -= 10
        
        # Check for contact info patterns
        if re.search(r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b', resume_text):
            score += 5
        if re.search(r'linkedin\.com|github\.com', resume_text, re.IGNORECASE):
            score += 5
        
        return min(100, max(0, score))
    
    def _analyze_experience(self, resume_text: str, extracted_data: Dict) -> float:
        """Analyze work experience section"""
        score = 40  # Base score
        
        # Check for experience section
        if re.search(r'experience|work history|employment', resume_text, re.IGNORECASE):
            score += 15
        
        # Check for date ranges (indicates proper formatting)
        date_patterns = re.findall(r'\b(20\d{2}|19\d{2})\b', resume_text)
        if len(date_patterns) >= 2:
            score += 10
        
        # Check for company names followed by roles
        if re.search(r'(?:at|@|,)\s*(?:Inc|LLC|Corp|Ltd|Company)', resume_text, re.IGNORECASE):
            score += 10
        
        # Check for bullet points (good formatting)
        bullet_count = len(re.findall(r'[•\-\*]\s', resume_text))
        if bullet_count >= 5:
            score += 15
        elif bullet_count >= 3:
            score += 10
        
        return min(100, score)
    
    def _analyze_projects(self, projects: List[Dict], role_config: Dict) -> float:
        """Analyze projects section"""
        if not projects:
            return 30  # Base score without projects
        
        score = 50  # Base score with projects
        
        # Score based on number of projects
        score += min(20, len(projects) * 5)
        
        # Check for technology mentions
        technologies = role_config.get("technologies", [])
        for project in projects:
            highlights = project.get("highlights", [])
            for tech in technologies:
                if any(tech.lower() in h.lower() for h in highlights):
                    score += 3
        
        return min(100, score)
    
    def _analyze_education(self, education: List[Dict]) -> float:
        """Analyze education section"""
        if not education:
            return 40
        
        score = 60  # Base score with education
        
        # Check for relevant degrees
        relevant_degrees = ["computer science", "software", "information technology", "data science", "engineering"]
        for edu in education:
            degree = edu.get("degree", "").lower()
            if any(rd in degree for rd in relevant_degrees):
                score += 15
                break
        
        return min(100, score)
    
    def _analyze_action_verbs(self, resume_text: str) -> float:
        """Analyze use of action verbs"""
        all_verbs = []
        for verbs in ACTION_VERBS.values():
            all_verbs.extend(verbs)
        
        found = sum(1 for verb in all_verbs if verb in resume_text)
        
        # Score based on action verb density
        if found >= 15:
            return 100
        elif found >= 10:
            return 85
        elif found >= 5:
            return 70
        elif found >= 3:
            return 55
        return 40
    
    def _analyze_quantification(self, resume_text: str) -> float:
        """Check for quantified achievements"""
        # Look for numbers with context
        patterns = [
            r'\d+%',  # Percentages
            r'\$\d+',  # Dollar amounts
            r'\d+\+?\s*(?:users?|customers?|clients?|team members?|developers?)',  # User counts
            r'(?:increased|decreased|improved|reduced|grew|saved)\s*(?:by\s*)?\d+',  # Quantified results
            r'\d+x\s*(?:faster|better|more|improvement)',  # Multipliers
        ]
        
        found = sum(1 for p in patterns if re.search(p, resume_text, re.IGNORECASE))
        
        if found >= 5:
            return 100
        elif found >= 3:
            return 80
        elif found >= 2:
            return 65
        elif found >= 1:
            return 50
        return 35
    
    def _calculate_ats_score(self, scores: Dict[str, float]) -> float:
        """Calculate weighted ATS score"""
        weights = {
            "keyword": 0.20,
            "skills": 0.20,
            "format": 0.10,
            "experience": 0.15,
            "projects": 0.15,
            "education": 0.05,
            "action_verbs": 0.08,
            "quantification": 0.07
        }
        
        total = sum(scores.get(key, 50) * weight for key, weight in weights.items())
        return min(100, max(0, total))
    
    def _generate_section_analysis(
        self,
        resume_text: str,
        role_config: Dict,
        scores: Dict[str, float]
    ) -> List[Dict]:
        """Generate detailed section-by-section analysis"""
        sections = []
        
        # Skills Section
        skill_score = scores.get("skills", 50)
        skill_feedback = []
        if skill_score >= 80:
            skill_feedback.append("Excellent skill alignment with target role")
        elif skill_score >= 60:
            skill_feedback.append("Good skills listed, but consider adding more role-specific technologies")
        else:
            skill_feedback.append("Add more relevant technical skills for your target role")
        sections.append({
            "name": "Skills & Technologies",
            "score": round(skill_score),
            "feedback": skill_feedback,
            "icon": "code"
        })
        
        # Keywords Section
        keyword_score = scores.get("keyword", 50)
        keyword_feedback = []
        if keyword_score >= 80:
            keyword_feedback.append("Strong keyword optimization for ATS systems")
        else:
            keyword_feedback.append("Include more industry-specific keywords to improve ATS matching")
        sections.append({
            "name": "Keywords & ATS Optimization",
            "score": round(keyword_score),
            "feedback": keyword_feedback,
            "icon": "search"
        })
        
        # Experience Section
        experience_score = scores.get("experience", 50)
        exp_feedback = []
        if experience_score >= 80:
            exp_feedback.append("Well-structured experience section with good detail")
        elif experience_score >= 60:
            exp_feedback.append("Experience section could use more quantified achievements")
        else:
            exp_feedback.append("Add more detail to your experience with measurable results")
        sections.append({
            "name": "Work Experience",
            "score": round(experience_score),
            "feedback": exp_feedback,
            "icon": "briefcase"
        })
        
        # Projects Section
        project_score = scores.get("projects", 50)
        proj_feedback = []
        if project_score >= 80:
            proj_feedback.append("Strong project portfolio demonstrating practical skills")
        elif project_score >= 60:
            proj_feedback.append("Good projects, consider adding more technical details")
        else:
            proj_feedback.append("Add 2-3 relevant projects with technologies and impact")
        sections.append({
            "name": "Projects",
            "score": round(project_score),
            "feedback": proj_feedback,
            "icon": "folder"
        })
        
        # Format Section
        format_score = scores.get("format", 50)
        format_feedback = []
        if format_score >= 80:
            format_feedback.append("Clean, professional formatting")
        else:
            format_feedback.append("Consider improving resume structure and organization")
        sections.append({
            "name": "Format & Structure",
            "score": round(format_score),
            "feedback": format_feedback,
            "icon": "layout"
        })
        
        return sections
    
    def _find_missing_keywords(self, resume_text: str, role_config: Dict) -> List[str]:
        """Find important keywords missing from resume"""
        missing = []
        
        all_keywords = (
            role_config.get("required_skills", []) +
            role_config.get("technologies", [])
        )
        
        for kw in all_keywords:
            if kw.lower() not in resume_text:
                missing.append(kw)
        
        return missing[:10]  # Return top 10 missing
    
    def _find_present_keywords(self, resume_text: str, role_config: Dict) -> List[str]:
        """Find keywords present in resume"""
        found = []
        
        all_keywords = (
            role_config.get("required_skills", []) +
            role_config.get("preferred_skills", []) +
            role_config.get("technologies", [])
        )
        
        for kw in all_keywords:
            if kw.lower() in resume_text:
                found.append(kw)
        
        return found
    
    def _generate_suggestions(
        self,
        resume_text: str,
        extracted_data: Dict,
        role_config: Dict,
        missing_keywords: List[str],
        scores: Dict[str, float]
    ) -> List[str]:
        """Generate actionable improvement suggestions"""
        suggestions = []
        
        # Keyword suggestions
        if missing_keywords:
            suggestions.append(f"Add these keywords to improve ATS matching: {', '.join(missing_keywords[:5])}")
        
        # Skills suggestions
        if scores.get("skills", 0) < 70:
            suggestions.append("Include more technical skills relevant to your target role in a dedicated Skills section")
        
        # Quantification suggestions
        if scores.get("quantification", 0) < 60:
            suggestions.append("Add measurable achievements (e.g., 'Increased performance by 30%', 'Served 10K+ users')")
        
        # Action verb suggestions
        if scores.get("action_verbs", 0) < 70:
            suggestions.append("Start bullet points with strong action verbs like 'Developed', 'Implemented', 'Optimized', 'Led'")
        
        # Project suggestions
        projects = extracted_data.get("projects", [])
        if len(projects) < 2:
            suggestions.append("Add 2-3 portfolio projects showcasing your technical skills and real-world impact")
        
        # General suggestions
        if "summary" not in resume_text.lower() and "objective" not in resume_text.lower():
            suggestions.append("Add a professional summary highlighting your key strengths and career goals")
        
        if not re.search(r'github\.com', resume_text, re.IGNORECASE):
            suggestions.append("Include a link to your GitHub profile to showcase your code")
        
        if not re.search(r'linkedin\.com', resume_text, re.IGNORECASE):
            suggestions.append("Add your LinkedIn profile URL for professional networking")
        
        return suggestions[:8]  # Return top 8 suggestions
    
    def _generate_improved_lines(self, resume_text: str, role_config: Dict) -> List[Dict]:
        """Generate AI-improved versions of weak resume lines"""
        improved = []
        
        # Find weak patterns and suggest improvements
        weak_patterns = [
            {
                "pattern": r"worked on ([a-z\s]+)",
                "original": "Worked on {match}",
                "improved": "Developed and delivered {match} using modern technologies, improving user experience by X%",
                "reason": "Use specific action verbs and quantify impact"
            },
            {
                "pattern": r"responsible for ([a-z\s]+)",
                "original": "Responsible for {match}",
                "improved": "Led {match}, achieving measurable results in efficiency and quality",
                "reason": "Replace passive language with active, impact-focused statements"
            },
            {
                "pattern": r"helped (?:with |in )?([a-z\s]+)",
                "original": "Helped with {match}",
                "improved": "Contributed to {match}, specifically by implementing key features",
                "reason": "Be specific about your contributions rather than using vague helping language"
            },
            {
                "pattern": r"did ([a-z\s]+)",
                "original": "Did {match}",
                "improved": "Executed {match} resulting in improved outcomes",
                "reason": "Use professional action verbs instead of casual language"
            }
        ]
        
        resume_lower = resume_text.lower()
        for wp in weak_patterns:
            match = re.search(wp["pattern"], resume_lower)
            if match:
                matched_text = match.group(1) if match.groups() else ""
                improved.append({
                    "original": wp["original"].replace("{match}", matched_text),
                    "improved": wp["improved"].replace("{match}", matched_text),
                    "reason": wp["reason"]
                })
        
        # Add general improvement suggestions
        if len(improved) < 3:
            improved.extend([
                {
                    "original": "Built a web application",
                    "improved": "Architected and developed a scalable web application using React and Node.js, serving 1000+ daily active users",
                    "reason": "Add technologies used and quantify impact"
                },
                {
                    "original": "Good communication skills",
                    "improved": "Excellent communication skills demonstrated through client presentations and cross-functional team collaboration",
                    "reason": "Provide evidence of soft skills rather than just listing them"
                }
            ])
        
        return improved[:5]
    
    def _generate_summary_suggestion(
        self,
        extracted_data: Dict,
        target_role: str,
        user_profile: Optional[Dict]
    ) -> str:
        """Generate a professional summary suggestion"""
        skills = extracted_data.get("skills", [])[:5]
        skills_text = ", ".join(skills) if skills else "technical expertise"
        
        # Get additional context from user profile
        degree = ""
        if user_profile:
            degree = user_profile.get("degree", "")
            if user_profile.get("fieldOfStudy"):
                degree = f"{user_profile.get('fieldOfStudy')} {degree}".strip()
        
        degree_text = f"{degree} graduate" if degree else "motivated professional"
        
        summary = (
            f"Results-driven {degree_text} with strong expertise in {skills_text}. "
            f"Seeking to leverage technical skills and problem-solving abilities as a {target_role}. "
            f"Passionate about building scalable solutions and delivering high-quality software. "
            f"Strong foundation in data structures, algorithms, and software engineering best practices."
        )
        
        return summary
    
    def _calculate_job_match(
        self,
        skills: List[str],
        role_config: Dict,
        target_role: str
    ) -> Dict:
        """Calculate job match percentage"""
        required = role_config.get("required_skills", [])
        preferred = role_config.get("preferred_skills", [])
        
        skills_lower = [s.lower() for s in skills]
        
        required_match = []
        for skill in required:
            found = any(skill.lower() in s for s in skills_lower)
            required_match.append({
                "skill": skill,
                "found": found,
                "importance": "required"
            })
        
        preferred_match = []
        for skill in preferred:
            found = any(skill.lower() in s for s in skills_lower)
            preferred_match.append({
                "skill": skill,
                "found": found,
                "importance": "preferred"
            })
        
        # Calculate match percentage
        required_found = sum(1 for m in required_match if m["found"])
        preferred_found = sum(1 for m in preferred_match if m["found"])
        
        total_weight = len(required) * 2 + len(preferred)  # Required weighted 2x
        found_weight = required_found * 2 + preferred_found
        
        match_percentage = (found_weight / total_weight * 100) if total_weight > 0 else 50
        
        return {
            "targetRole": target_role,
            "matchPercentage": round(match_percentage),
            "requiredSkillsMatch": required_match + preferred_match
        }
    
    def _identify_skill_gaps(self, skills: List[str], role_config: Dict) -> List[Dict]:
        """Identify skill gaps with learning recommendations"""
        gaps = []
        skills_lower = [s.lower() for s in skills]
        
        # Check required skills
        for skill in role_config.get("required_skills", []):
            if not any(skill.lower() in s for s in skills_lower):
                gaps.append({
                    "skill": skill,
                    "importance": "critical",
                    "description": f"{skill} is essential for this role and frequently tested in interviews",
                    "certifications": self._get_certification_recommendations(skill)
                })
        
        # Check preferred skills
        for skill in role_config.get("preferred_skills", []):
            if not any(skill.lower() in s for s in skills_lower):
                gaps.append({
                    "skill": skill,
                    "importance": "high",
                    "description": f"{skill} will give you a competitive advantage",
                    "certifications": self._get_certification_recommendations(skill)
                })
        
        return gaps[:5]  # Return top 5 gaps
    
    def _get_certification_recommendations(self, skill: str) -> List[Dict]:
        """Get certification recommendations for a skill"""
        # Simplified certification database
        cert_db = {
            "python": {"name": "Python Developer Certificate", "provider": "Google", "url": "https://grow.google/certificates/", "duration": "3 months", "difficulty": "intermediate"},
            "java": {"name": "Oracle Java Certification", "provider": "Oracle", "url": "https://education.oracle.com/", "duration": "2 months", "difficulty": "intermediate"},
            "aws": {"name": "AWS Certified Solutions Architect", "provider": "Amazon", "url": "https://aws.amazon.com/certification/", "duration": "3 months", "difficulty": "advanced"},
            "docker": {"name": "Docker Certified Associate", "provider": "Docker", "url": "https://training.mirantis.com/dca", "duration": "2 months", "difficulty": "intermediate"},
            "kubernetes": {"name": "CKA: Certified Kubernetes Administrator", "provider": "CNCF", "url": "https://training.linuxfoundation.org/", "duration": "3 months", "difficulty": "advanced"},
            "machine learning": {"name": "TensorFlow Developer Certificate", "provider": "Google", "url": "https://www.tensorflow.org/certificate", "duration": "2 months", "difficulty": "intermediate"},
            "system design": {"name": "System Design Interview Course", "provider": "Educative", "url": "https://www.educative.io/", "duration": "1 month", "difficulty": "advanced"},
            "data structures": {"name": "Data Structures & Algorithms", "provider": "Coursera", "url": "https://www.coursera.org/", "duration": "2 months", "difficulty": "intermediate"},
        }
        
        skill_lower = skill.lower()
        for key, cert in cert_db.items():
            if key in skill_lower:
                return [{
                    "name": cert["name"],
                    "provider": cert["provider"],
                    "url": cert["url"],
                    "duration": cert["duration"],
                    "difficulty": cert["difficulty"],
                    "skills": [skill],
                    "price": "Free - $300",
                    "rating": 4.5
                }]
        
        # Default recommendation
        return [{
            "name": f"{skill} Fundamentals",
            "provider": "Coursera/Udemy",
            "url": "https://www.coursera.org/",
            "duration": "1-2 months",
            "difficulty": "beginner",
            "skills": [skill],
            "price": "Free - $50",
            "rating": 4.2
        }]
    
    def _detailed_format_analysis(self, resume_text: str) -> List[Dict]:
        """Detailed format and structure analysis"""
        analysis = []
        
        # Check sections
        has_summary = "summary" in resume_text.lower() or "objective" in resume_text.lower()
        analysis.append({
            "category": "Professional Summary",
            "status": "good" if has_summary else "warning",
            "message": "Has a professional summary" if has_summary else "Missing professional summary",
            "tip": "Add a 2-3 sentence summary highlighting your key strengths" if not has_summary else "Keep it concise and impactful"
        })
        
        # Check contact info
        has_email = bool(re.search(r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b', resume_text))
        analysis.append({
            "category": "Contact Information",
            "status": "good" if has_email else "error",
            "message": "Email address found" if has_email else "No email address found",
            "tip": "Ensure your email and phone number are prominently displayed"
        })
        
        # Check for LinkedIn/GitHub
        has_links = bool(re.search(r'linkedin\.com|github\.com', resume_text, re.IGNORECASE))
        analysis.append({
            "category": "Professional Links",
            "status": "good" if has_links else "warning",
            "message": "Professional profile links included" if has_links else "Missing LinkedIn/GitHub links",
            "tip": "Add your LinkedIn and GitHub profiles to showcase your professional presence"
        })
        
        # Check bullet points
        bullet_count = len(re.findall(r'[•\-\*]\s', resume_text))
        analysis.append({
            "category": "Bullet Points",
            "status": "good" if bullet_count >= 5 else "warning",
            "message": f"Found {bullet_count} bullet points" if bullet_count >= 5 else "Consider using more bullet points",
            "tip": "Use bullet points for easy scanning by recruiters and ATS systems"
        })
        
        # Check length
        word_count = len(resume_text.split())
        if 500 <= word_count <= 2000:
            length_status = "good"
            length_msg = f"Resume length ({word_count} words) is optimal"
        elif word_count < 300:
            length_status = "error"
            length_msg = f"Resume too short ({word_count} words)"
        else:
            length_status = "warning"
            length_msg = f"Resume may be too long ({word_count} words)"
        
        analysis.append({
            "category": "Length",
            "status": length_status,
            "message": length_msg,
            "tip": "Aim for 1-2 pages (500-1000 words for freshers, 1000-2000 for experienced)"
        })
        
        return analysis
    
    def _create_improvement_plan(
        self,
        suggestions: List[str],
        skill_gaps: List[Dict],
        missing_keywords: List[str],
        scores: Dict[str, float]
    ) -> List[Dict]:
        """Create prioritized improvement plan"""
        plan = []
        priority = 1
        
        # Critical: Low keyword score
        if scores.get("keyword", 100) < 60:
            plan.append({
                "priority": priority,
                "action": f"Add missing keywords: {', '.join(missing_keywords[:3])}",
                "impact": "high",
                "timeToComplete": "15 minutes",
                "details": "These keywords are essential for passing ATS screening"
            })
            priority += 1
        
        # High: Skill gaps
        critical_gaps = [g for g in skill_gaps if g.get("importance") == "critical"]
        if critical_gaps:
            plan.append({
                "priority": priority,
                "action": f"Learn {critical_gaps[0]['skill']}",
                "impact": "high",
                "timeToComplete": "2-4 weeks",
                "details": critical_gaps[0].get("description", "This is a required skill for your target role")
            })
            priority += 1
        
        # Medium: Format improvements
        if scores.get("format", 100) < 70:
            plan.append({
                "priority": priority,
                "action": "Improve resume formatting",
                "impact": "medium",
                "timeToComplete": "30 minutes",
                "details": "Add clear section headers, bullet points, and consistent formatting"
            })
            priority += 1
        
        # Add suggestions as plan items
        for suggestion in suggestions[:3]:
            plan.append({
                "priority": priority,
                "action": suggestion,
                "impact": "medium",
                "timeToComplete": "1 hour",
                "details": "Following this suggestion will improve your resume score"
            })
            priority += 1
        
        return plan[:6]
    
    def _generate_industry_comparison(
        self,
        ats_score: float,
        scores: Dict[str, float]
    ) -> List[Dict]:
        """Generate industry comparison metrics"""
        return [
            {
                "metric": "Overall ATS Score",
                "yourScore": round(ats_score),
                "average": 65,
                "topPerformers": 85
            },
            {
                "metric": "Keyword Optimization",
                "yourScore": round(scores.get("keyword", 50)),
                "average": 60,
                "topPerformers": 90
            },
            {
                "metric": "Skills Match",
                "yourScore": round(scores.get("skills", 50)),
                "average": 70,
                "topPerformers": 95
            },
            {
                "metric": "Project Quality",
                "yourScore": round(scores.get("projects", 50)),
                "average": 55,
                "topPerformers": 85
            }
        ]
    
    def _analyze_strengths_weaknesses(
        self,
        resume_text: str,
        extracted_data: Dict,
        role_config: Dict,
        scores: Dict[str, float]
    ) -> tuple:
        """Analyze resume strengths and weaknesses"""
        strengths = []
        weaknesses = []
        
        # Check skills score
        if scores.get("skills", 0) >= 70:
            strengths.append("Strong technical skill set aligned with target role")
        else:
            weaknesses.append("Limited technical skills listed for target role")
        
        # Check keyword score
        if scores.get("keyword", 0) >= 70:
            strengths.append("Good use of industry keywords for ATS optimization")
        else:
            weaknesses.append("Missing important keywords that ATS systems look for")
        
        # Check projects
        projects = extracted_data.get("projects", [])
        if len(projects) >= 2:
            strengths.append("Portfolio projects demonstrate hands-on experience")
        else:
            weaknesses.append("Weak project section - add more portfolio projects")
        
        # Check experience
        if scores.get("experience", 0) >= 70:
            strengths.append("Well-structured experience section")
        else:
            weaknesses.append("Experience section needs more detail and quantification")
        
        # Check quantification
        if re.findall(r'\d+%|\$\d+|\d+\+?\s*users?', resume_text, re.IGNORECASE):
            strengths.append("Good use of quantified achievements")
        else:
            weaknesses.append("Missing quantifiable achievements and metrics")
        
        return strengths[:4], weaknesses[:4]


# Singleton instance
_analyzer_instance = None

def get_resume_analyzer(model_service=None) -> ResumeAnalyzer:
    """Get or create resume analyzer instance"""
    global _analyzer_instance
    if _analyzer_instance is None:
        _analyzer_instance = ResumeAnalyzer(model_service)
    return _analyzer_instance
