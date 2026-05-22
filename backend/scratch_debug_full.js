import fs from 'fs';

// Helper utilities matching the proposed changes

export const cleanTimelineAndSkillsFromName = (name) => {
  if (typeof name !== 'string') return '';
  let cleaned = name;
  
  // 1. Remove parenthesized blocks containing dates/months
  const parenthesizedDateRegex = /\([\s\-\–\—a-zA-Z0-9\/\.]*(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec|Present|20\d\d)\b[\s\-\–\—a-zA-Z0-9\/\.]*\)/gi;
  cleaned = cleaned.replace(parenthesizedDateRegex, '');

  // 2. Remove standard month patterns with optional year (no left boundary check to handle PlatformJun)
  const monthRegex = /(?:Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:tember)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?)\b\s*\d{0,4}/gi;
  cleaned = cleaned.replace(monthRegex, '');

  // 3. Remove standalone year or Present markers
  const presentOrYearRegex = /\b(?:Present)\b|(?:19|20)\d{2}\b/gi;
  cleaned = cleaned.replace(presentOrYearRegex, '');

  // 4. Clean up any double spaces, trailing brackets, dashes or dangling dividers
  cleaned = cleaned.replace(/^[\s\-\–\—\|,\(\)•\·\*\+]+|[\s\-\–\—\|,\(\)•\·\*\+]+$/g, '').replace(/\s+/g, ' ').trim();
  return cleaned || name;
};

const extractDatesFromText = (text) => {
  const dates = text.match(/(?:Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:tember)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?)\b|(?:19|20)\d{2}\b/gi);
  let startDate = '';
  let endDate = '';
  if (dates && dates.length > 0) {
    startDate = dates[0];
    if (dates.length > 1) {
      endDate = dates[1];
      if (text.toLowerCase().includes('expected') && !endDate.toLowerCase().includes('expected')) {
        endDate += ' (Expected)';
      }
    } else if (text.toLowerCase().includes('present')) {
      endDate = 'Present';
    } else if (text.toLowerCase().includes('expected')) {
      endDate = dates[0] + ' (Expected)';
    }
  }
  return { startDate, endDate };
};

const cleanDatesFromText = (text) => {
  if (typeof text !== 'string') return '';
  return text
    .replace(/(?:Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:tember)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?)\b|(?:19|20)\d{2}\b/gi, '')
    .replace(/\bexpected\b/gi, '')
    .replace(/[\s\-\–\—\|,\(\)•\·\*\+]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
};

export const isPureTechList = (line) => {
  const trimmed = (line || '').trim();
  if (!trimmed) return false;

  if (trimmed.includes('|')) {
    const firstPart = trimmed.split('|')[0].trim().toLowerCase();
    const techKeywords = new Set([
      'javascript', 'typescript', 'python', 'java', 'c++', 'c#', 'go', 'rust', 'ruby', 'php', 'swift', 'kotlin',
      'html', 'css', 'sass', 'react', 'react.js', 'angular', 'vue', 'vue.js', 'next.js', 'node.js', 'node', 'express', 'express.js', 'django', 'flask',
      'mongodb', 'postgresql', 'mysql', 'sqlite', 'redis', 'firebase', 'supabase', 'docker', 'kubernetes', 'aws', 'git', 'github', 'rest api', 'graphql'
    ]);
    if (!techKeywords.has(firstPart) && !Array.from(techKeywords).some(k => firstPart === k || firstPart.includes(' ' + k) || firstPart.includes(k + ' '))) {
      return false;
    }
  }

  const parts = trimmed.split(/[,/|;]/).map(p => p.trim().toLowerCase()).filter(Boolean);
  if (parts.length > 1) {
    const techKeywords = new Set([
      'javascript', 'typescript', 'python', 'java', 'c++', 'c#', 'go', 'rust', 'ruby', 'php', 'swift', 'kotlin',
      'html', 'css', 'sass', 'react', 'react.js', 'angular', 'vue', 'vue.js', 'next.js', 'node.js', 'node', 'express', 'express.js', 'django', 'flask',
      'mongodb', 'postgresql', 'mysql', 'sqlite', 'redis', 'firebase', 'supabase', 'docker', 'kubernetes', 'aws', 'git', 'github', 'rest api', 'graphql',
      'jwt', 'apis', 'rest apis', 'computer vision', 'opencv', 'mediapipe', 'numpy', 'scipy', 'pandas', 'scikit-learn'
    ]);
    const matchCount = parts.filter(p => {
      const cleanPart = p.replace(/\(.*\)/g, '').replace(/[\d\.]+/g, '').replace(/[^a-z\+\#\s]/g, '').trim();
      return techKeywords.has(cleanPart) || Array.from(techKeywords).some(k => cleanPart === k || cleanPart.startsWith(k + ' ') || cleanPart.endsWith(' ' + k));
    }).length;
    if (matchCount >= parts.length * 0.7 && matchCount >= 2) {
      return true;
    }
  }
  return false;
};

export const isLikelyProjectTitle = (line) => {
  const trimmed = (line || '').trim();
  if (!trimmed) return false;
  if (/^[a-z]/.test(trimmed)) return false;
  if (/^[%&\+\/]/.test(trimmed)) return false;
  const words = trimmed.split(/\s+/);
  if (words.length <= 1) return false;
  if (/[%,.]$/.test(trimmed)) return false;
  if (/(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\b/i.test(trimmed) && trimmed.length < 30) return false;
  return true;
};

export const isLikelyExperienceTitle = (line) => {
  return isLikelyProjectTitle(line);
};

const isNewProjectStart = (cleanLine, currentProj) => {
  const clean = cleanLine.replace(/^[•\-\*\–\—\·\d\.\s]+/, '').trim();
  if (!isLikelyProjectTitle(clean)) return false;
  if (/^(repo|github|link|http|url|demo|website|source)/i.test(clean)) return false;
  
  const ACTION_VERBS = /^(?:engineered|designed|integrated|developed|implemented|optimized|built|trained|led|completed|created|spearheaded|architected|pioneered|managed|formulated|automated|collaborated|conducted|established|improved|enhanced|formulated|contributed|delivered)/i;
  if (ACTION_VERBS.test(clean)) return false;

  if (!currentProj) return true;
  
  if (currentProj.description.length === 0 && currentProj.highlights.length === 0) {
    return false;
  }
  
  if (clean.includes('|') || clean.includes('–') || (clean.includes(' - ') && !/(?:19|20)\d{2}\b/.test(clean)) || clean.includes(':')) {
    const divider = clean.includes('|') ? '|' : (clean.includes(':') ? ':' : '–');
    const firstPart = clean.split(divider)[0].trim();
    if (firstPart.split(/\s+/).length <= 8) {
      return true;
    }
  }
  
  const words = clean.split(/\s+/);
  const isShortTitle = words.length >= 1 && words.length <= 8 && /^[A-Z]/.test(clean);
  return isShortTitle;
};

const isSectionHeader = (line) => {
  const clean = line.trim();
  if (!clean) return null;
  if (clean.length > 50) return null;
  if (/^[•\-\*\–\—\·]/.test(clean)) return null;
  if (clean.includes(',')) return null;
  if (clean.endsWith('.')) return null;
  if (clean.includes(':') && clean.split(':')[1].trim().length > 3) return null;
  if (/^[a-z]/.test(clean)) return null;

  const lower = clean.toLowerCase();

  if (/^(?:education|academic|academics|qualifications|schooling)(?:\s+\&\s+\w+)?$/i.test(lower) || 
      /^(?:academic\s+)?qualifications$/i.test(lower)) {
    return 'education';
  }
  if (/^(?:experience|employment|work\s+history|career|professional\s+background|professional\s+experience|work\s+experience)(?:\s+\&\s+\w+)?$/i.test(lower)) {
    return 'experience';
  }
  if (/^(?:projects|personal\s+projects|academic\s+projects|key\s+projects|featured\s+projects)(?:\s+\&\s+\w+)?$/i.test(lower)) {
    return 'projects';
  }
  if (/^(?:skills|technologies|tech\s+stack|technical\s+skills|technical\s+expertise|skills\s+\&\s+expertise|languages|programming\s+languages)$/i.test(lower)) {
    return 'skills';
  }
  if (/^(?:certifications|courses|licenses|credentials|certified)(?:\s+\&\s+\w+)?$/i.test(lower)) {
    return 'certifications';
  }
  if (/^(?:achievements|awards|extracurriculars?|extra-curriculars?|leadership|interests|publications|co-curriculars?|activities|honors|volunteer|volunteering)(?:\s+\&\s+[\w\-]+)*$/i.test(lower) ||
      lower.includes('achievements') || lower.includes('extracurricular') || lower.includes('activities') || lower.includes('awards') || lower.includes('leadership')) {
    
    if (lower.includes('solving') || lower.includes('team') || lower.includes('workshop') || lower.includes('dsa') || lower.includes('contest') || lower.includes('participants')) {
      return null;
    }
    return 'achievements';
  }
  if (/^(?:summary|objective|profile|about\s+me)$/i.test(lower)) {
    return 'summary';
  }

  return null;
};

export const extractLocalFallback = (resumeText) => {
  const lines = (resumeText || '').split('\n').map(l => l.trim()).filter(Boolean);
  const result = {
    name: '',
    email: '',
    phone: '',
    linkedin: '',
    github: '',
    summary: '',
    education: [],
    experience: [],
    projects: [],
    skills: [],
    certifications: [],
    achievements: []
  };

  if (lines.length === 0) return result;

  result.name = lines[0].replace(/[^a-zA-Z\s.-]/g, '').trim();
  if (result.name.length > 50 || result.name.split(' ').length > 4) {
    result.name = '';
  }

  const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
  const phoneRegex = /(?:\+?\d{1,3}[ -]?)?\(?\d{3}\)?[ -]?\d{3}[ -]?\d{4}/g;
  const linkedinRegex = /linkedin\.com\/in\/[a-zA-Z0-9_-]+/i;
  const githubRegex = /github\.com\/[a-zA-Z0-9_-]+/i;

  const emailMatch = resumeText.match(emailRegex);
  if (emailMatch) result.email = emailMatch[0];

  const phoneMatch = resumeText.match(phoneRegex);
  if (phoneMatch) result.phone = phoneMatch[0];

  const linkedinMatch = resumeText.match(linkedinRegex);
  if (linkedinMatch) result.linkedin = 'https://' + linkedinMatch[0];

  const githubMatch = resumeText.match(githubRegex);
  if (githubMatch) result.github = 'https://' + githubMatch[0];

  const foundSkills = new Set();

  const COMMON_SKILLS = [
    'JavaScript', 'TypeScript', 'Python', 'Java', 'C\\+\\+', 'C#', 'Go', 'Rust', 'Ruby', 'PHP', 'Swift', 'Kotlin',
    'HTML', 'CSS', 'Sass', 'React', 'Angular', 'Vue', 'Next.js', 'Nuxt.js', 'Node.js', 'Express', 'Django', 'Flask',
    'Spring Boot', 'ASP.NET', 'Laravel', 'MongoDB', 'PostgreSQL', 'MySQL', 'SQLite', 'Redis', 'Firebase', 'Supabase',
    'Docker', 'Kubernetes', 'AWS', 'Azure', 'GCP', 'Git', 'GitHub', 'CI/CD', 'Jenkins', 'REST API', 'GraphQL',
    'Machine Learning', 'Deep Learning', 'Data Structures', 'Algorithms', 'System Design'
  ];
  COMMON_SKILLS.forEach(skillPattern => {
    const regex = new RegExp(`\\b${skillPattern}\\b`, 'i');
    if (regex.test(resumeText)) {
      foundSkills.add(skillPattern.replace('\\+', '+'));
    }
  });

  let currentSection = null;
  let sectionContent = [];
  
  const flushSection = () => {
    if (!currentSection || sectionContent.length === 0) return;

    if (currentSection === 'education') {
      let educationEntries = [];
      let currentEdu = null;

      sectionContent.forEach(line => {
        let cleanLine = line.replace(/^[•\-\*\–\—\·\s]+/, '').trim();
        if (!cleanLine) return;

        const dateInfo = extractDatesFromText(cleanLine);
        
        let gpa = '';
        const gpaRegex = /\b(?:c?gpa|gpa|score)\b\s*[:\-–—\s]*\s*(\d+(?:\.\d+)?(?:\s*[\/\-–—]\s*\d+(?:\.\d+)?)?)/i;
        const gpaMatch = cleanLine.match(gpaRegex);
        if (gpaMatch) {
          gpa = gpaMatch[1].trim();
          cleanLine = cleanLine.replace(gpaMatch[0], '').trim();
        } else {
          const standaloneGpaRegex = /\b\d+(?:\.\d+)?\s*\/\s*\d+(?:\.\d+)?\b/;
          const standaloneGpaMatch = cleanLine.match(standaloneGpaRegex);
          if (standaloneGpaMatch) {
            gpa = standaloneGpaMatch[0].trim();
            cleanLine = cleanLine.replace(standaloneGpaMatch[0], '').trim();
          }
        }

        let location = '';
        const locMatch = cleanLine.match(/\b(Baddi|Himachal Pradesh|Didwana|Rajasthan|India|Delhi|Baddi,\s*Himachal Pradesh|Didwana,\s*Rajasthan)\b/gi);
        if (locMatch) {
          const idx = cleanLine.toLowerCase().indexOf(locMatch[0].toLowerCase());
          location = cleanLine.substring(idx).replace(/^[\s,\|-]+/, '').trim();
          cleanLine = cleanLine.substring(0, idx).replace(/[\s,\|-]+$/, '').trim();
        }

        cleanLine = cleanDatesFromText(cleanLine).replace(/^[\s,\|-]+|[\s,\|-]+$/g, '').trim();

        if (!cleanLine) return;

        const isDegree = /\b(?:B\.?Tech|B\.?E\.?|B\.?Sc|B\.?A|B\.?B\.?A|M\.?Tech|M\.?E\.?|M\.?S|M\.?Sc|M\.?A|Bachelor|Master|Ph\.?D|Graduate|Postgraduate|Secondary|Senior Secondary|High School|Matriculation|CBSE|RBSE|ICSE|Diploma|Class XII|Class X|10th|12th)\b/i.test(cleanLine);
        const isInstitution = /\b(?:School|University|College|Institute|Academy|Vidhyalaya|Vidyalaya|Public School|EduSystem)\b/i.test(cleanLine);

        const hasInst = currentEdu && currentEdu.institution && currentEdu.institution !== 'Institution';
        const hasDeg = currentEdu && currentEdu.degree && currentEdu.degree !== 'Degree';

        const shouldStartNew = !currentEdu || 
                               (isInstitution && hasInst) || 
                               (isDegree && hasDeg) || 
                               (hasInst && hasDeg);

        if (shouldStartNew) {
          if (currentEdu) {
            educationEntries.push(currentEdu);
          }
          currentEdu = {
            degree: 'Degree',
            fieldOfStudy: '',
            institution: 'Institution',
            location: '',
            gpa: '',
            startDate: '',
            endDate: ''
          };
        }

        const currentHasInst = currentEdu && currentEdu.institution && currentEdu.institution !== 'Institution';
        const currentHasDeg = currentEdu && currentEdu.degree && currentEdu.degree !== 'Degree';

        if (isDegree) {
          currentEdu.degree = cleanLine;
        } else if (isInstitution) {
          currentEdu.institution = cleanLine;
        } else {
          if (!currentHasInst) {
            currentEdu.institution = cleanLine;
          } else if (!currentHasDeg) {
            currentEdu.degree = cleanLine;
          } else if (!currentEdu.fieldOfStudy) {
            currentEdu.fieldOfStudy = cleanLine;
          }
        }

        if (location) currentEdu.location = location;
        if (gpa) currentEdu.gpa = gpa;
        if (dateInfo.startDate) {
          currentEdu.startDate = dateInfo.startDate;
          currentEdu.endDate = dateInfo.endDate;
        }
      });

      if (currentEdu) {
        educationEntries.push(currentEdu);
      }

      result.education = educationEntries.map(edu => {
        if (edu.degree === 'Degree') edu.degree = '';
        if (edu.institution === 'Institution') edu.institution = '';
        return edu;
      }).filter(edu => edu.degree || edu.institution);

    } else if (currentSection === 'skills') {
      sectionContent.forEach(line => {
        let cleanLine = line.replace(/^[a-zA-Z\s&/\\|():\-\–\—]+:/, '').trim();
        const parts = cleanLine.split(/[,;|•·\*\t]|\s{2,}/);
        parts.forEach(part => {
          const skill = part.replace(/^[•\-\*\–\—\·\s]+/, '').trim();
          if (skill && (skill.length > 1 || skill.toLowerCase() === 'c' || skill.toLowerCase() === 'r') && skill.length < 40 && !/(?:19|20)\d{2}\b/.test(skill)) {
            foundSkills.add(skill);
          }
        });
      });

    } else if (currentSection === 'experience') {
      let currentExp = null;
      sectionContent.forEach(line => {
        const isBullet = line.startsWith('•') || line.startsWith('-') || line.startsWith('*') || line.startsWith('–') || line.startsWith('—') || line.startsWith('·') || /^\d+\.\s/.test(line);
        const cleanLine = line.replace(/^[•\-\*\–\—\·\d\.\s]+/, '').trim();
        if (!cleanLine) return;

        const isTimeline = /(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\b|(?:19|20)\d{2}\b/i.test(cleanLine) && cleanLine.length < 40;
        const isTechList = isPureTechList(cleanLine);

        if (isBullet || (cleanLine.length >= 60 && !isLikelyExperienceTitle(cleanLine))) {
          if (!currentExp) {
            currentExp = { company: 'Company', role: 'Software Engineer', startDate: '', endDate: '', location: '', description: [], highlights: [] };
          }
          if (currentExp.description.length > 0 && !isBullet && !line.startsWith(' ') && !/^[A-Z]/.test(cleanLine)) {
            const lastIdx = currentExp.description.length - 1;
            currentExp.description[lastIdx] += ' ' + cleanLine;
            currentExp.highlights[lastIdx] += ' ' + cleanLine;
          } else {
            currentExp.description.push(cleanLine);
            currentExp.highlights.push(cleanLine);
          }
        } else if (isTimeline || isTechList) {
          if (!currentExp) {
            currentExp = { company: 'Company', role: 'Software Engineer', startDate: '', endDate: '', location: '', description: [], highlights: [] };
          }
          if (isTimeline) {
            const dates = cleanLine.match(/(?:Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:tember)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?)\b|(?:19|20)\d{2}\b/gi);
            if (dates && dates.length > 0) {
              currentExp.startDate = dates[0];
              if (dates.length > 1) {
                currentExp.endDate = dates[1];
              } else if (cleanLine.toLowerCase().includes('present')) {
                currentExp.endDate = 'Present';
              }
            }
          }
        } else if (isLikelyExperienceTitle(cleanLine) && !isPureTechList(cleanLine)) {
          if (currentExp && (currentExp.highlights.length > 0 || currentExp.company !== 'Company')) {
            result.experience.push(currentExp);
            currentExp = null;
          }

          let company = cleanLine;
          let role = 'Software Engineer';
          if (cleanLine.includes('@')) {
            const parts = cleanLine.split('@');
            role = parts[0].trim();
            company = parts[1].trim();
          } else if (cleanLine.includes('|')) {
            const parts = cleanLine.split('|');
            company = parts[0].trim();
            role = parts[1].trim();
          } else if (cleanLine.includes('–')) {
            const parts = cleanLine.split('–');
            company = parts[0].trim();
            role = parts[1].trim();
          } else if (cleanLine.includes('-') && !/(?:19|20)\d{2}\b/.test(cleanLine)) {
            const parts = cleanLine.split('-');
            company = parts[0].trim();
            role = parts[1].trim();
          }

          let companyClean = cleanTimelineAndSkillsFromName(company);
          let roleClean = cleanTimelineAndSkillsFromName(role);
          const roleKeywords = /\b(?:engineer|developer|designer|manager|analyst|lead|architect|intern|specialist|consultant|programmer|tester|administrator|exec|executive|director|vp|head)\b/i;
          if (roleKeywords.test(companyClean) && !roleKeywords.test(roleClean)) {
            const temp = companyClean;
            companyClean = roleClean;
            roleClean = temp;
          }

          if (!currentExp) {
            currentExp = {
              company: companyClean,
              role: roleClean,
              startDate: '',
              endDate: '',
              location: '',
              description: [],
              highlights: []
            };
          } else {
            currentExp.company = companyClean;
            currentExp.role = roleClean;
          }
        } else {
          if (currentExp) {
            if (currentExp.description.length > 0) {
              const lastIdx = currentExp.description.length - 1;
              currentExp.description[lastIdx] += ' ' + cleanLine;
              currentExp.highlights[lastIdx] += ' ' + cleanLine;
            } else {
              currentExp.description.push(cleanLine);
              currentExp.highlights.push(cleanLine);
            }
          }
        }
      });
      if (currentExp) {
        result.experience.push(currentExp);
      }

    } else if (currentSection === 'projects') {
      let currentProj = null;
      sectionContent.forEach(line => {
        const isBullet = line.startsWith('•') || line.startsWith('-') || line.startsWith('*') || line.startsWith('–') || line.startsWith('—') || line.startsWith('·') || /^\d+\.\s/.test(line);
        const cleanLine = line.replace(/^[•\-\*\–\—\·\d\.\s]+/, '').trim();
        if (!cleanLine) return;

        const isTimeline = /(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\b|(?:19|20)\d{2}\b/i.test(cleanLine) && cleanLine.length < 40;
        const isTechList = isPureTechList(cleanLine);
        const isLink = cleanLine.toLowerCase().includes('github.com') || cleanLine.toLowerCase().includes('http');

        if (isBullet || !isNewProjectStart(cleanLine, currentProj)) {
          if (!currentProj) {
            currentProj = { name: 'Project', description: [], technologies: [], highlights: [], link: '' };
          }
          
          if (isTechList) {
            const techs = cleanLine.split(/[,/|–-]/).map(t => t.trim()).filter(t => t.length > 1 && t.length < 25);
            currentProj.technologies = [...new Set([...currentProj.technologies, ...techs])];
          } else if (isLink) {
            const linkMatch = cleanLine.match(/https?:\/\/[^\s]+|github\.com\/[^\s]+/i);
            if (linkMatch) {
              currentProj.link = linkMatch[0];
            }
          } else if (isTimeline) {
            // Keep date info if needed
          } else {
            if (currentProj.description.length > 0 && !isBullet && !line.startsWith(' ') && !/^[A-Z]/.test(cleanLine)) {
              const lastIdx = currentProj.description.length - 1;
              currentProj.description[lastIdx] += ' ' + cleanLine;
              currentProj.highlights[lastIdx] += ' ' + cleanLine;
            } else {
              currentProj.description.push(cleanLine);
              currentProj.highlights.push(cleanLine);
            }
          }
        } else {
          if (currentProj && (currentProj.highlights.length > 0 || currentProj.name !== 'Project')) {
            result.projects.push(currentProj);
            currentProj = null;
          }

          let name = cleanLine;
          let technologies = [];
          if (cleanLine.includes('|')) {
            const parts = cleanLine.split('|');
            name = parts[0].trim();
            const techPart = parts[1].trim();
            technologies = techPart.split(/[,/]/).map(t => t.trim()).filter(Boolean);
          } else if (cleanLine.includes(':')) {
            const parts = cleanLine.split(':');
            name = parts[0].trim();
            const techPart = parts[1].trim();
            technologies = techPart.split(/[,/]/).map(t => t.trim()).filter(Boolean);
          }

          currentProj = {
            name: cleanTimelineAndSkillsFromName(name),
            description: [],
            technologies,
            highlights: [],
            link: ''
          };
        }
      });
      if (currentProj) {
        result.projects.push(currentProj);
      }

    } else if (currentSection === 'certifications') {
      let certList = [];
      let currentCertText = '';
      
      sectionContent.forEach(line => {
        const isBullet = /^[•\-\*\–\—\·]/.test(line.trim());
        const cleanLine = line.replace(/^[•\-\*\–\—\·\s]+/, '').trim();
        
        if (isBullet) {
          if (currentCertText) {
            certList.push(currentCertText);
            currentCertText = '';
          }
          if (cleanLine) {
            currentCertText = cleanLine;
          }
        } else {
          if (cleanLine) {
            if (currentCertText) {
              currentCertText += ' ' + cleanLine;
            } else {
              currentCertText = cleanLine;
            }
          }
        }
      });
      if (currentCertText) {
        certList.push(currentCertText);
      }

      certList.forEach(certText => {
        let name = certText;
        let issuer = '';
        let date = '';
        if (certText.includes('|')) {
          const parts = certText.split('|');
          name = parts[0].trim();
          issuer = parts[1].trim();
        } else if (certText.includes('by')) {
          const parts = certText.split(/\bby\b/i);
          name = parts[0].trim();
          issuer = parts[1].trim();
        } else if (certText.includes('–')) {
          const parts = certText.split('–');
          name = parts[0].trim();
          issuer = parts[1].trim();
        } else if (certText.includes('-')) {
          if (!/\d{4}\s*-\s*\d{4}/.test(certText)) {
            const parts = certText.split('-');
            name = parts[0].trim();
            issuer = parts[1].trim();
          }
        }
        
        const dateMatch = certText.match(/(?:Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:tember)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?)\b|(?:19|20)\d{2}\b/i);
        if (dateMatch) {
          date = dateMatch[0];
          name = name.replace(date, '').replace(/[\(\),\-\–\—\s]+$/, '').trim();
          if (issuer) {
            issuer = issuer.replace(date, '').replace(/[\(\),\-\–\—\s]+$/, '').trim();
          }
        }
        result.certifications.push({ name, issuer, date });
      });

    } else if (currentSection === 'achievements') {
      let achList = [];
      let currentAch = '';
      sectionContent.forEach(line => {
        const isBullet = /^[•\-\*\–\—\·]/.test(line.trim());
        const cleanLine = line.replace(/^[•\-\*\–\—\·\s]+/, '').trim();
        
        if (isBullet) {
          if (currentAch) {
            achList.push(currentAch);
            currentAch = '';
          }
          if (cleanLine) {
            currentAch = cleanLine;
          }
        } else {
          if (cleanLine) {
            if (currentAch) {
              currentAch += ' ' + cleanLine;
            } else {
              currentAch = cleanLine;
            }
          }
        }
      });
      if (currentAch) {
        achList.push(currentAch);
      }
      result.achievements = achList;

    } else if (currentSection === 'summary') {
      result.summary = sectionContent.map(l => l.trim()).filter(Boolean).join(' ');
    }
    sectionContent = [];
  };

  lines.forEach(line => {
    const detected = isSectionHeader(line);
    if (detected) {
      flushSection();
      currentSection = detected;
    } else if (currentSection) {
      sectionContent.push(line);
    }
  });
  flushSection();

  if (result.experience.length === 0 && result.education.length === 0 && result.projects.length === 0) {
    const descLines = lines.slice(1, 10).filter(l => l.length > 10 && !l.includes('@'));
    if (descLines.length > 0) {
      result.experience.push({
        company: 'Resume Import',
        role: 'Candidate Profile Details',
        startDate: '',
        endDate: '',
        location: '',
        description: descLines,
        highlights: descLines
      });
    }
  }

  result.skills = Array.from(foundSkills);
  return result;
};

// Execution test
const resumeText = fs.readFileSync('raw_resume.txt', 'utf8');
const finalResult = extractLocalFallback(resumeText);
console.log('FINAL PARSER RESULT:');
console.log(JSON.stringify(finalResult, null, 2));
