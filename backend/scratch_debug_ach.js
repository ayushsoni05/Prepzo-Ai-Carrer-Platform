import fs from 'fs';

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

const resumeText = fs.readFileSync('raw_resume.txt', 'utf8');
const lines = resumeText.split('\n').map(l => l.trim()).filter(Boolean);

console.log('Testing header detection on all lines:');
lines.forEach(line => {
  const detected = isSectionHeader(line);
  if (detected) {
    console.log(`Detected: "${line}" -> ${detected}`);
  }
});
