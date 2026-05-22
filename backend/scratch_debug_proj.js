import fs from 'fs';

const isPureTechList = (line) => {
  const trimmed = (line || '').trim();
  if (!trimmed) return false;
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

const isLikelyProjectTitle = (line) => {
  const trimmed = (line || '').trim();
  if (!trimmed) return false;
  if (/^[a-z]/.test(trimmed)) return false;
  if (/^[%&\+\/]/.test(trimmed)) return false;
  const words = trimmed.split(/\s+/);
  if (words.length <= 1) return false;
  if (/[%,.]$/.test(trimmed)) return false;
  if (/^\b(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec|20\d\d)\b/i.test(trimmed) && trimmed.length < 30) return false;
  return true;
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
  
  if (clean.includes('|') || clean.includes('–') || (clean.includes(' - ') && !/\b(?:19|20)\d{2}\b/.test(clean)) || clean.includes(':')) {
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

const resumeText = fs.readFileSync('raw_resume.txt', 'utf8');
const lines = resumeText.split('\n').map(l => l.trim()).filter(Boolean);

let projLines = [];
let capture = false;
for (const line of lines) {
  if (line.toLowerCase() === 'projects') {
    capture = true;
    continue;
  }
  if (capture && line.toLowerCase().includes('certifications')) {
    capture = false;
  }
  if (capture) {
    projLines.push(line);
  }
}

console.log('Project Lines:', projLines);

let projects = [];
let currentProj = null;

projLines.forEach(line => {
  const isBullet = line.startsWith('•') || line.startsWith('-') || line.startsWith('*') || line.startsWith('–') || line.startsWith('—') || line.startsWith('·') || /^\d+\.\s/.test(line);
  const cleanLine = line.replace(/^[•\-\*\–\—\·\d\.\s]+/, '').trim();
  if (!cleanLine) return;

  const isTimeline = /\b(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec|20\d\d)\b/i.test(cleanLine) && cleanLine.length < 40;
  const isTechList = isPureTechList(cleanLine);
  const isLink = cleanLine.toLowerCase().includes('github.com') || cleanLine.toLowerCase().includes('http');

  const startNew = isNewProjectStart(cleanLine, currentProj);
  console.log(`\nLine: "${line}" -> isBullet: ${isBullet}, isTimeline: ${isTimeline}, isTechList: ${isTechList}, isNewProjectStart: ${startNew}`);

  if (isBullet || !startNew) {
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
      // Keep timeline
    } else {
      currentProj.description.push(cleanLine);
      currentProj.highlights.push(cleanLine);
    }
  } else {
    if (currentProj) {
      projects.push(currentProj);
    }
    currentProj = { name: cleanLine, description: [], technologies: [], highlights: [], link: '' };
  }
});

if (currentProj) {
  projects.push(currentProj);
}

console.log('\nFinal Projects:', JSON.stringify(projects, null, 2));
