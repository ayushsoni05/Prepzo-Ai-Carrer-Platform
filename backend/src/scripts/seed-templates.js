import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import Template from '../models/template.model.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '../../.env') });

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

const cleanAtsSource = `\\documentclass[a4paper,11pt]{article}
\\usepackage[margin=0.75in]{geometry}
\\usepackage{enumitem}
\\usepackage[hidelinks]{hyperref}
\\usepackage{titlesec}
\\usepackage{xcolor}

\\definecolor{primary}{HTML}{000000}
\\definecolor{secondary}{HTML}{333333}

\\titleformat{\\section}{\\large\\bfseries\\color{primary}}{}{0em}{}[\\titlerule]
\\titlespacing{\\section}{0pt}{12pt}{8pt}

\\setlength{\\parindent}{0pt}
\\begin{document}

\\begin{center}
    {\\huge \\textbf{{{NAME}}}} \\\\
    \\vspace{4pt}
    \\textcolor{secondary}{{{LOCATION}} $|$ {{PHONE}} $|$ \\href{mailto:{{EMAIL}}}{{{EMAIL}}}} \\\\
    \\textcolor{secondary}{\\href{https://linkedin.com/in/{{LINKEDIN}}}{LinkedIn} $|$ \\href{https://github.com/{{GITHUB}}}{GitHub}}
\\end{center}

\\section{Professional Summary}
{{SUMMARY}}

\\section{Experience}
{{EXPERIENCE_ITEMS}}

\\section{Education}
{{EDUCATION_ITEMS}}

\\section{Skills}
{{SKILLS_ITEMS}}

\\end{document}`;

const templatesToSeed = [
  {
    templateId: 'jakes-resume',
    name: "Jake's Resume",
    description: "The gold standard ATS-friendly resume template. Clean, professional, and heavily tested across major recruiting systems. Excellent for software engineers.",
    author: "Jake Gutierrez",
    tags: ['Software', 'ATS', 'Engineering', 'Classic'],
    accent: '#5ed29c',
    badge: 'Most Popular',
    sourceCode: jakesResumeSource
  },
  {
    templateId: 'clean-ats',
    name: "Clean ATS Minimal",
    description: "A highly optimized minimalist template designed strictly for ATS parsers. No complex tables or columns, just pure parseable text.",
    author: "Prepzo Native",
    tags: ['ATS', 'Minimal', 'Business', 'Formal letters'],
    accent: '#3b82f6',
    badge: 'Highest ATS Score',
    sourceCode: cleanAtsSource
  }
];

const seedTemplates = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI is undefined in .env');
    }
    
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing
    await Template.deleteMany({});
    console.log('Cleared existing templates');

    // Insert new
    await Template.insertMany(templatesToSeed);
    console.log(`Successfully seeded ${templatesToSeed.length} templates!`);

    process.exit(0);
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
};

seedTemplates();
