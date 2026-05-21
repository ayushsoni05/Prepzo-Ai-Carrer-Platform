const TECH_REG = /\b(?:react(?:\.js)?|angular|vue(?:\.js)?|svelte|next\.js|nuxt\.js|node(?:\.js)?|express(?:\.js)?|koa|django|flask|fastapi|spring\s*boot|laravel|asp\.net|rails|ruby\s*on\s*rails|mongodb|postgres(?:ql)?|mysql|sqlite|redis|cassandra|dynamodb|firebase|supabase|oracle|mssql|docker|kubernetes|k8s|aws|gcp|azure|heroku|vercel|netlify|digital\s*ocean|html(?:5)?|css(?:3)?|javascript|js|typescript|ts|python|java|c\+\+|c\#|go|golang|rust|ruby|php|swift|kotlin|scala|perl|bash|shell|git|github|gitlab|rest\s*apis?|restful|graphql|grpc|socket\.io|jwt|oauth|redux|mobx|recoil|tailwind|bootstrap|material\-ui|mui|chakra|sass|less|webpack|vite|babel|gulp|jest|mocha|cypress|selenium|playwright|jenkins|travis|circleci|github\s*actions|tensorflow|pytorch|keras|scikit\-learn|numpy|pandas|opencv|mediapipe|nltk|spacy|hugging\s*face|transformers|nlp|llm|gan|cnn|rnn|lstm|bert|gpt|gemini|openai|s3|ec2|lambda|serverless|microservices|ci\/cd|dsa|oop|dbms)\b/i;

const NON_TECH_PROJECT_WORDS = /\b(?:platform|system|application|app|website|portal|software|tool|dashboard|extension|game|detector|classifier|generator|engine|management|tracker|detection|control|gaming|commerce|executive|professional|experience|project|internship|student|education|university|college|role|engineer|developer|designer|manager|analyst|lead|architect|intern|specialist|consultant|programmer|tester|administrator|exec|executive|director|vp|head|building|scaling|developing|implementing|managing|predict(?:or|ion)?|recommend(?:er|ation)?|solve(?:r)?|recognition|analysis|learning|smart|automatic|smart|intelligent|helper|utility|portfolio|blog)\b/i;

const isPureTechListImproved = (line) => {
  const trimmed = (line || '').trim();
  if (!trimmed) return false;

  const cleanLine = trimmed.replace(/^[•\-\*\–\—\·\d\.\s]+/, '').replace(/[\-–—\s]+$/, '').trim();
  if (!cleanLine) return false;

  // If it contains non-tech project words, it's not a pure tech list
  if (NON_TECH_PROJECT_WORDS.test(cleanLine)) return false;

  // Split by common delimiters: comma, pipe, slash, semicolon, or "and"
  const parts = cleanLine.split(/[,/|;]|\s+and\s+|\s*&\s*/i).map(p => p.trim()).filter(Boolean);
  if (parts.length === 0) return false;

  if (parts.length === 1) {
    return TECH_REG.test(parts[0]);
  }

  // Count how many parts contain a known tech keyword
  const techMatches = parts.filter(p => TECH_REG.test(p)).length;
  const ratio = techMatches / parts.length;

  return ratio >= 0.5;
};

const testCases = [
  "Python, OpenCV, MediaPipe, NumPy, Computer Vision -",
  "Glimmr - Jewelry E-Commerce Platform - React.js, Node.js, Express.js, MongoDB, REST APIs, JWT",
  "EmoVision - Emotion & Gender Detection -",
  "React, Node, Express, MongoDB, Tailwind CSS",
  "Prepzo AI",
  "Hand Gesture Control for Gaming -",
  "Jan 2025 - May 2025",
  "Jun 2024 - Dec 2024",
  "Object Detection using YOLOv8",
  "React, Node, MongoDB"
];

console.log("--- TEST RESULTS ---");
testCases.forEach(tc => {
  console.log(`\nLine: "${tc}"`);
  console.log(`  isPureTechListImproved: ${isPureTechListImproved(tc)}`);
});
