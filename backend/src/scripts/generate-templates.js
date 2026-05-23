import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import Template from '../models/template.model.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '../../.env') });

const COLORS = [
  { name: 'Emerald', hex: '#10b981', latexHex: '10b981' },
  { name: 'Slate', hex: '#64748b', latexHex: '64748b' },
  { name: 'Crimson', hex: '#e11d48', latexHex: 'e11d48' },
  { name: 'Violet', hex: '#8b5cf6', latexHex: '8b5cf6' },
  { name: 'Ocean', hex: '#0ea5e9', latexHex: '0ea5e9' },
  { name: 'Classic Black', hex: '#000000', latexHex: '000000' }
];

const FONTS = [
  { name: 'Helvetica', package: '\\usepackage{helvet}\\renewcommand{\\familydefault}{\\sfdefault}' },
  { name: 'Times', package: '\\usepackage{mathptmx}' },
  { name: 'Palatino', package: '\\usepackage{palatino}' },
  { name: 'Roboto', package: '\\usepackage[sfdefault]{roboto}' },
  { name: 'Fira Sans', package: '\\usepackage[sfdefault]{FiraSans}' }
];

const HEADERS = [
  {
    name: 'Centered Classic',
    code: `
\\begin{center}
    {\\huge \\textbf{\\color{primary}{{NAME}}}} \\\\
    \\vspace{4pt}
    \\textcolor{secondary}{{{LOCATION}} $|$ {{PHONE}} $|$ \\href{mailto:{{EMAIL}}}{{{EMAIL}}}} \\\\
    \\textcolor{secondary}{\\href{https://linkedin.com/in/{{LINKEDIN}}}{LinkedIn} $|$ \\href{https://github.com/{{GITHUB}}}{GitHub}}
\\end{center}
`
  },
  {
    name: 'Modern Left-Aligned',
    code: `
\\begin{flushleft}
    {\\Huge \\textbf{\\color{primary}{{NAME}}}} \\\\
    \\vspace{6pt}
    \\textcolor{secondary}{
      {{LOCATION}} $\\bullet$ {{PHONE}} \\\\
      \\href{mailto:{{EMAIL}}}{{{EMAIL}}} $\\bullet$ \\href{https://linkedin.com/in/{{LINKEDIN}}}{LinkedIn} $\\bullet$ \\href{https://github.com/{{GITHUB}}}{GitHub}
    }
\\end{flushleft}
\\vspace{-10pt}
`
  },
  {
    name: 'Executive Split',
    code: `
\\noindent
\\begin{minipage}[t]{0.5\\textwidth}
    {\\Huge \\textbf{\\color{primary}{{NAME}}}}
\\end{minipage}
\\hfill
\\begin{minipage}[t]{0.45\\textwidth}
    \\raggedleft
    \\small\\textcolor{secondary}{
        {{PHONE}} \\\\
        \\href{mailto:{{EMAIL}}}{{{EMAIL}}} \\\\
        \\href{https://linkedin.com/in/{{LINKEDIN}}}{LinkedIn}
    }
\\end{minipage}
\\vspace{10pt}
`
  },
  {
    name: 'Tech Block',
    code: `
\\begin{center}
    \\colorbox{primary}{
      \\parbox{\\dimexpr\\textwidth-2\\fboxsep\\relax}{
        \\centering
        \\vspace{6pt}
        {\\Huge \\textbf{\\color{white}{{NAME}}}} \\\\
        \\vspace{4pt}
        \\textcolor{white}{{{LOCATION}} $|$ {{PHONE}} $|$ \\href{mailto:{{EMAIL}}}{{{EMAIL}}}}
        \\vspace{6pt}
      }
    }
\\end{center}
\\vspace{-5pt}
`
  }
];

const BODY_STRUCTURES = [
  {
    name: 'Standard ATS',
    code: `
\\section{Professional Summary}
{{SUMMARY}}

\\section{Experience}
{{EXPERIENCE_ITEMS}}

\\section{Education}
{{EDUCATION_ITEMS}}

\\section{Skills}
{{SKILLS_ITEMS}}
`
  },
  {
    name: 'Education First',
    code: `
\\section{Education}
{{EDUCATION_ITEMS}}

\\section{Skills}
{{SKILLS_ITEMS}}

\\section{Experience}
{{EXPERIENCE_ITEMS}}

\\section{Projects}
{{PROJECT_ITEMS}}
`
  },
  {
    name: 'Skills Forward',
    code: `
\\section{Professional Summary}
{{SUMMARY}}

\\section{Technical Skills}
{{SKILLS_ITEMS}}

\\section{Experience}
{{EXPERIENCE_ITEMS}}

\\section{Education}
{{EDUCATION_ITEMS}}
`
  },
  {
    name: 'Tech Lead',
    code: `
\\section{Experience}
{{EXPERIENCE_ITEMS}}

\\section{Projects}
{{PROJECT_ITEMS}}

\\section{Technical Skills}
{{SKILLS_ITEMS}}

\\section{Education}
{{EDUCATION_ITEMS}}
`
  }
];

const PREAMBLE = `\\documentclass[a4paper,11pt]{article}
\\usepackage[margin=0.75in]{geometry}
\\usepackage{enumitem}
\\usepackage[hidelinks]{hyperref}
\\usepackage{titlesec}
\\usepackage{xcolor}

\\setlength{\\parindent}{0pt}
`;

function generateLatex(font, color, header, body) {
  return `${PREAMBLE}
${font.package}

\\definecolor{primary}{HTML}{${color.latexHex}}
\\definecolor{secondary}{HTML}{333333}

\\titleformat{\\section}{\\large\\bfseries\\color{primary}}{}{0em}{}[\\color{primary}\\titlerule]
\\titlespacing{\\section}{0pt}{12pt}{8pt}

\\begin{document}
${header.code}
${body.code}
\\end{document}`;
}

const adjectives = ['Stanford', 'Harvard', 'Silicon Valley', 'Modern', 'Cambridge', 'MIT', 'Berkeley', 'Oxford', 'Clean', 'Professional', 'Minimalist', 'Executive'];

function getRandomAdjective(index) {
  return adjectives[index % adjectives.length];
}

const generateTemplates = async () => {
  try {
    if (!process.env.MONGODB_URI) throw new Error('MONGODB_URI is undefined in .env');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Wipe existing DB
    await Template.deleteMany({});
    console.log('Cleared existing templates');

    const generated = [];
    let counter = 1;

    // We have 6 colors * 5 fonts * 4 headers * 4 bodies = 480 combinations.
    // Let's generate exactly 120 unique templates for a massive library.

    for (let c = 0; c < COLORS.length; c++) {
      for (let f = 0; f < FONTS.length; f++) {
        for (let h = 0; h < HEADERS.length; h++) {
          for (let b = 0; b < BODY_STRUCTURES.length; b++) {
            
            // Limit to 120 to keep DB lightweight but impressive
            if (generated.length >= 120) break;

            const color = COLORS[c];
            const font = FONTS[f];
            const header = HEADERS[h];
            const body = BODY_STRUCTURES[b];

            const id = `prepzo-template-${counter}`;
            const adj = getRandomAdjective(counter);
            const title = `${adj} ${header.name.split(' ')[0]} - ${color.name}`;
            
            const tags = ['Prepzo Certified'];
            if (font.name === 'Helvetica' || font.name === 'Times') tags.push('ATS');
            if (color.name !== 'Classic Black') tags.push('Creative');
            if (body.name.includes('Tech') || body.name.includes('Skills')) tags.push('Software');
            if (body.name.includes('Education')) tags.push('University');
            if (header.name.includes('Classic')) tags.push('Formal letters');
            
            tags.push(font.name);
            tags.push(color.name);

            generated.push({
              templateId: id,
              name: title,
              description: `A beautifully crafted LaTeX template featuring a ${header.name.toLowerCase()} header, ${font.name} typography, and a ${color.name.toLowerCase()} accent. Perfectly structured for ${body.name.toLowerCase()} flow.`,
              author: "Prepzo Procedural Engine",
              tags: tags,
              accent: color.hex,
              badge: counter <= 5 ? 'Top Rated' : (counter <= 15 ? 'Trending' : null),
              sourceCode: generateLatex(font, color, header, body),
              downloads: Math.floor(Math.random() * 5000)
            });

            counter++;
          }
        }
      }
    }

    // Insert Jake's Resume and Clean ATS as the flagships at the very top
    const jakesResumeSource = `\\documentclass[letterpaper,11pt]{article}
\\usepackage{latexsym}
\\usepackage[empty]{fullpage}
\\usepackage{titlesec}
\\usepackage{marvosym}
\\usepackage[usenames,dvipsnames]{color}
\\usepackage{verbatim}
\\usepackage{enumitem}
\\usepackage[hidelinks]{hyperref}
\\usepackage{fancyhdr}
\\usepackage[english]{babel}
\\usepackage{tabularx}
\\input{glyphtounicode}

\\pagestyle{fancy}
\\fancyhf{} 
\\fancyfoot{}
\\renewcommand{\\headrulewidth}{0pt}
\\renewcommand{\\footrulewidth}{0pt}

\\addtolength{\\oddsidemargin}{-0.5in}
\\addtolength{\\evensidemargin}{-0.5in}
\\addtolength{\\textwidth}{1in}
\\addtolength{\\topmargin}{-.5in}
\\addtolength{\\textheight}{1.0in}

\\urlstyle{same}

\\raggedbottom
\\raggedright
\\setlength{\\tabcolsep}{0in}

\\titleformat{\\section}{
  \\vspace{-4pt}\\scshape\\raggedright\\large
}{}{0em}{}[\\color{black}\\titlerule \\vspace{-5pt}]

\\pdfgentounicode=1

\\newcommand{\\resumeItem}[1]{
  \\item\\small{
    {#1 \\vspace{-2pt}}
  }
}

\\newcommand{\\resumeSubheading}[4]{
  \\vspace{-2pt}\\item
    \\begin{tabular*}{0.97\\textwidth}[t]{l@{\\extracolsep{\\fill}}r}
      \\textbf{#1} & #2 \\\\
      \\textit{\\small#3} & \\textit{\\small #4} \\\\
    \\end{tabular*}\\vspace{-7pt}
}

\\newcommand{\\resumeProjectHeading}[2]{
    \\item
    \\begin{tabular*}{0.97\\textwidth}{l@{\\extracolsep{\\fill}}r}
      \\small#1 & #2 \\\\
    \\end{tabular*}\\vspace{-7pt}
}

\\newcommand{\\resumeSubHeadingListStart}{\\begin{itemize}[leftmargin=0.15in, label={}]}
\\newcommand{\\resumeSubHeadingListEnd}{\\end{itemize}}
\\newcommand{\\resumeItemListStart}{\\begin{itemize}}
\\newcommand{\\resumeItemListEnd}{\\end{itemize}\\vspace{-5pt}}

\\begin{document}

\\begin{center}
    \\textbf{\\Huge \\scshape {{NAME}}} \\\\ \\vspace{1pt}
    \\small {{PHONE}} $|$ \\href{mailto:{{EMAIL}}}{\\underline{{{EMAIL}}}} $|$ 
    \\href{https://linkedin.com/in/{{LINKEDIN}}}{\\underline{linkedin.com/in/{{LINKEDIN}}}} $|$
    \\href{https://github.com/{{GITHUB}}}{\\underline{github.com/{{GITHUB}}}}
\\end{center}

\\section{Education}
  \\resumeSubHeadingListStart
    {{EDUCATION_ITEMS}}
  \\resumeSubHeadingListEnd

\\section{Experience}
  \\resumeSubHeadingListStart
    {{EXPERIENCE_ITEMS}}
  \\resumeSubHeadingListEnd

\\section{Projects}
    \\resumeSubHeadingListStart
      {{PROJECT_ITEMS}}
    \\resumeSubHeadingListEnd

\\section{Technical Skills}
 \\begin{itemize}[leftmargin=0.15in, label={}]
    \\small{\\item{
     {{SKILLS_ITEMS}}
    }}
 \\end{itemize}

\\end{document}`;

    generated.push({
      templateId: 'jakes-resume',
      name: "Jake's Resume",
      description: "The absolute gold standard ATS-friendly resume template. Clean, professional, and heavily tested across major recruiting systems. Excellent for software engineers.",
      author: "Jake Gutierrez",
      tags: ['Software', 'ATS', 'Engineering', 'Classic'],
      accent: '#5ed29c',
      badge: 'Legendary',
      sourceCode: jakesResumeSource,
      downloads: 99999
    });

    await Template.insertMany(generated);
    console.log(`Successfully seeded ${generated.length} unique procedural templates into the database!`);

    process.exit(0);
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
};

generateTemplates();
