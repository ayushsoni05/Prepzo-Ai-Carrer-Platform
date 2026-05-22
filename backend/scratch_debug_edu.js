import fs from 'fs';

const extractDatesFromText = (text) => {
  const dates = text.match(/\b(?:Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:tember)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?)\b|(?:19|20)\d{2}\b/gi);
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
    .replace(/\b(?:Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:tember)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?)\b|(?:19|20)\d{2}\b/gi, '')
    .replace(/\bexpected\b/gi, '')
    .replace(/[\s\-\–\—\|,\(\)•\·\*\+]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
};

const resumeText = fs.readFileSync('raw_resume.txt', 'utf8');
const lines = resumeText.split('\n').map(l => l.trim()).filter(Boolean);

let eduLines = [];
let capture = false;
for (const line of lines) {
  if (line.toLowerCase() === 'education') {
    capture = true;
    continue;
  }
  if (capture && line.toLowerCase().includes('technical skills')) {
    capture = false;
  }
  if (capture) {
    eduLines.push(line);
  }
}

let educationEntries = [];
let currentEdu = null;

eduLines.forEach(line => {
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

const cleanedResult = educationEntries.map(edu => {
  if (edu.degree === 'Degree') edu.degree = '';
  if (edu.institution === 'Institution') edu.institution = '';
  return edu;
}).filter(edu => edu.degree || edu.institution);

console.log('\nFinal entries:', JSON.stringify(cleanedResult, null, 2));
