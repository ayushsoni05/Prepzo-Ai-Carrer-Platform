/**
 * LaTeX Resume Templates
 * Each template contains the full .tex source with placeholder tokens
 * that the AI or a local function fills in from user profile data.
 *
 * Placeholder tokens:
 *   {{NAME}}, {{EMAIL}}, {{PHONE}}, {{LINKEDIN}}, {{GITHUB}}, {{LOCATION}},
 *   {{SUMMARY}}, {{EXPERIENCE_ITEMS}}, {{EDUCATION_ITEMS}},
 *   {{PROJECT_ITEMS}}, {{SKILLS_ITEMS}}
 */

// 1. Jake's Resume
const jakesResume = {
  id: 'jakes-resume',
  name: "Jake's ATS Resume",
  description: 'The most popular ATS-optimised LaTeX resume. Clean single-column layout with no graphics.',
  badge: 'Most Popular',
  accent: '#6366f1',
  source: String.raw`%-------------------------
% Resume in LaTeX
% Based on Jake's Resume template
%-------------------------
\documentclass[letterpaper,11pt]{article}
\usepackage[utf8]{inputenc}
\usepackage{latexsym}
\usepackage[empty]{fullpage}
\usepackage{titlesec}
\usepackage[usenames,dvipsnames]{color}
\usepackage{enumitem}
\usepackage[hidelinks]{hyperref}
\usepackage{fancyhdr}
\usepackage{tabularx}

\pagestyle{fancy}
\fancyhf{}
\fancyfoot{}
\renewcommand{\headrulewidth}{0pt}
\renewcommand{\footrulewidth}{0pt}

\addtolength{\oddsidemargin}{-0.5in}
\addtolength{\evensidemargin}{-0.5in}
\addtolength{\textwidth}{1in}
\addtolength{\topmargin}{-.5in}
\addtolength{\textheight}{1.0in}

\urlstyle{same}
\raggedbottom
\raggedright
\setlength{\tabcolsep}{0in}

\titleformat{\section}{
  \vspace{-4pt}\scshape\raggedright\large
}{}{0em}{}[\color{black}\titlerule \vspace{-5pt}]

\newcommand{\resumeItem}[1]{\item\small{#1 \vspace{-2pt}}}
\newcommand{\resumeSubheading}[4]{
  \vspace{-2pt}\item
    \begin{tabular*}{0.97\textwidth}[t]{l@{\extracolsep{\fill}}r}
      \textbf{#1} & #2 \\
      \textit{\small#3} & \textit{\small #4} \\
    \end{tabular*}\vspace{-7pt}
}
\newcommand{\resumeProjectHeading}[2]{
    \item
    \begin{tabular*}{0.97\textwidth}{l@{\extracolsep{\fill}}r}
      \small#1 & #2 \\
    \end{tabular*}\vspace{-7pt}
}
\newcommand{\resumeSubItem}[1]{\resumeItem{#1}\vspace{-4pt}}
\renewcommand\labelitemii{$\vcenter{\hbox{\tiny$\bullet$}}$}
\newcommand{\resumeSubHeadingListStart}{\begin{itemize}[leftmargin=0.15in, label={}]}
\newcommand{\resumeSubHeadingListEnd}{\end{itemize}}
\newcommand{\resumeItemListStart}{\begin{itemize}}
\newcommand{\resumeItemListEnd}{\end{itemize}\vspace{-5pt}}

\begin{document}

%----------HEADING----------
\begin{center}
    \textbf{\Huge \scshape {{NAME}}} \\ \vspace{1pt}
    \small {{PHONE}} $|$
    \href{mailto:{{EMAIL}}}{\underline{{{EMAIL}}}} $|$
    \href{https://linkedin.com/in/{{LINKEDIN}}}{\underline{linkedin.com/in/{{LINKEDIN}}}} $|$
    \href{https://github.com/{{GITHUB}}}{\underline{github.com/{{GITHUB}}}}
\end{center}

%-----------SUMMARY-----------
\section{Summary}
\small {{SUMMARY}}

%-----------EDUCATION-----------
\section{Education}
  \resumeSubHeadingListStart
{{EDUCATION_ITEMS}}
  \resumeSubHeadingListEnd

%-----------EXPERIENCE-----------
\section{Experience}
  \resumeSubHeadingListStart
{{EXPERIENCE_ITEMS}}
  \resumeSubHeadingListEnd

%-----------PROJECTS-----------
\section{Projects}
    \resumeSubHeadingListStart
{{PROJECT_ITEMS}}
    \resumeSubHeadingListEnd

%-----------TECHNICAL SKILLS-----------
\section{Technical Skills}
 \begin{itemize}[leftmargin=0.15in, label={}]
    \small{\item{
{{SKILLS_ITEMS}}
    }}
 \end{itemize}

\end{document}
`,
};

// 2. Clean ATS
const cleanAts = {
  id: 'clean-ats',
  name: 'Clean ATS Minimal',
  description: 'Ultra-clean, single-column layout designed to pass every ATS system.',
  badge: 'ATS Safe',
  accent: '#10b981',
  source: String.raw`\documentclass[a4paper,11pt]{article}
\usepackage[utf8]{inputenc}
\usepackage[empty]{fullpage}
\usepackage{titlesec}
\usepackage{enumitem}
\usepackage[hidelinks]{hyperref}
\usepackage{fancyhdr}

\pagestyle{fancy}
\fancyhf{}
\renewcommand{\headrulewidth}{0pt}

\addtolength{\oddsidemargin}{-0.5in}
\addtolength{\evensidemargin}{-0.5in}
\addtolength{\textwidth}{1in}
\addtolength{\topmargin}{-0.5in}
\addtolength{\textheight}{1in}

\titleformat{\section}{\large\bfseries\scshape}{}{0em}{}[\titlerule]
\titlespacing*{\section}{0pt}{6pt}{4pt}

\begin{document}

\begin{center}
  {\LARGE\bfseries {{NAME}}} \\[4pt]
  {{EMAIL}} \quad $\cdot$ \quad {{PHONE}} \quad $\cdot$ \quad {{LOCATION}} \\
  \href{https://linkedin.com/in/{{LINKEDIN}}}{linkedin.com/in/{{LINKEDIN}}}
  \quad $\cdot$ \quad
  \href{https://github.com/{{GITHUB}}}{github.com/{{GITHUB}}}
\end{center}

\section{Professional Summary}
{{SUMMARY}}

\section{Education}
{{EDUCATION_ITEMS}}

\section{Experience}
{{EXPERIENCE_ITEMS}}

\section{Projects}
{{PROJECT_ITEMS}}

\section{Skills}
{{SKILLS_ITEMS}}

\end{document}
`,
};

// 3. Modern Two-Column
const modernTwoColumn = {
  id: 'modern-two-col',
  name: 'Modern Two-Column',
  description: 'Modern two-column layout with colour accent sidebar. Inspired by AltaCV.',
  badge: 'Modern',
  accent: '#8b5cf6',
  source: String.raw`\documentclass[10pt,a4paper]{article}
\usepackage[utf8]{inputenc}
\usepackage[margin=0.6in]{geometry}
\usepackage{titlesec}
\usepackage{enumitem}
\usepackage[hidelinks]{hyperref}
\usepackage{multicol}
\usepackage{xcolor}
\usepackage{fancyhdr}

\definecolor{accent}{HTML}{6C63FF}
\pagestyle{empty}

\titleformat{\section}{\color{accent}\large\bfseries\scshape}{}{0em}{}[\color{accent}\titlerule]
\titlespacing*{\section}{0pt}{8pt}{4pt}

\begin{document}

\begin{center}
  {\Huge\bfseries\color{accent} {{NAME}}} \\[6pt]
  \small {{EMAIL}} \enspace|\enspace {{PHONE}} \enspace|\enspace {{LOCATION}} \\[2pt]
  \href{https://linkedin.com/in/{{LINKEDIN}}}{LinkedIn} \enspace|\enspace
  \href{https://github.com/{{GITHUB}}}{GitHub}
\end{center}

\vspace{4pt}

\begin{multicols}{2}

\section{Summary}
\small {{SUMMARY}}

\section{Experience}
{{EXPERIENCE_ITEMS}}

\columnbreak

\section{Education}
{{EDUCATION_ITEMS}}

\section{Projects}
{{PROJECT_ITEMS}}

\section{Skills}
{{SKILLS_ITEMS}}

\end{multicols}

\end{document}
`,
};

// 4. Academic CV
const academicCv = {
  id: 'academic-cv',
  name: 'Academic CV',
  description: 'Formal serif layout suitable for academic and research positions.',
  badge: 'Academic',
  accent: '#0369a1',
  source: String.raw`\documentclass[11pt,a4paper]{article}
\usepackage[utf8]{inputenc}
\usepackage[margin=0.75in]{geometry}
\usepackage{titlesec}
\usepackage{enumitem}
\usepackage[hidelinks]{hyperref}
\usepackage{fancyhdr}
\usepackage{xcolor}

\definecolor{heading}{HTML}{003366}
\pagestyle{fancy}
\fancyhf{}
\renewcommand{\headrulewidth}{0pt}
\fancyfoot[C]{\thepage}

\titleformat{\section}{\color{heading}\large\bfseries}{}{0em}{}[\color{heading}\titlerule]
\titlespacing*{\section}{0pt}{10pt}{6pt}

\begin{document}

\begin{center}
  {\LARGE\bfseries\color{heading} {{NAME}}} \\[6pt]
  \small {{EMAIL}} \quad|\quad {{PHONE}} \quad|\quad {{LOCATION}} \\[2pt]
  \href{https://linkedin.com/in/{{LINKEDIN}}}{LinkedIn}
  \quad|\quad
  \href{https://github.com/{{GITHUB}}}{GitHub}
\end{center}

\vspace{6pt}

\section{Research Summary}
{{SUMMARY}}

\section{Education}
{{EDUCATION_ITEMS}}

\section{Research \& Professional Experience}
{{EXPERIENCE_ITEMS}}

\section{Selected Projects}
{{PROJECT_ITEMS}}

\section{Technical Competencies}
{{SKILLS_ITEMS}}

\end{document}
`,
};

// 5. Deedy CV
const deedyCv = {
  id: 'deedy-cv',
  name: 'Deedy Tech CV',
  description: 'Compact, information-dense layout favoured in tech and startup circles.',
  badge: 'Tech',
  accent: '#ec4899',
  source: String.raw`\documentclass[a4paper,10pt]{article}
\usepackage[utf8]{inputenc}
\usepackage[margin=0.5in]{geometry}
\usepackage{titlesec}
\usepackage{enumitem}
\usepackage[hidelinks]{hyperref}
\usepackage{xcolor}
\usepackage{multicol}
\usepackage{fontenc}

\definecolor{primary}{HTML}{2D3748}
\definecolor{accent}{HTML}{E53E3E}

\pagestyle{empty}

\titleformat{\section}{\color{primary}\large\bfseries\uppercase}{}{0em}{}[\color{accent}\titlerule]
\titlespacing*{\section}{0pt}{6pt}{4pt}

\setlength{\columnsep}{1.5em}

\begin{document}

\begin{center}
  {\huge\bfseries\color{primary} {{NAME}}} \\[4pt]
  \footnotesize
  \href{mailto:{{EMAIL}}}{{{EMAIL}}} $\cdot$
  {{PHONE}} $\cdot$
  \href{https://linkedin.com/in/{{LINKEDIN}}}{LinkedIn} $\cdot$
  \href{https://github.com/{{GITHUB}}}{GitHub}
\end{center}

\vspace{2pt}

\section{Summary}
\small {{SUMMARY}}

\begin{multicols}{2}

\section{Education}
{{EDUCATION_ITEMS}}

\section{Skills}
{{SKILLS_ITEMS}}

\columnbreak

\section{Experience}
{{EXPERIENCE_ITEMS}}

\section{Projects}
{{PROJECT_ITEMS}}

\end{multicols}

\end{document}
`,
};

// 6. Executive
const executiveCv = {
  id: 'executive',
  name: 'Executive Professional',
  description: 'Classic professional layout with elegant spacing and serif headings.',
  badge: 'Professional',
  accent: '#7c3aed',
  source: String.raw`\documentclass[11pt,letterpaper]{article}
\usepackage[utf8]{inputenc}
\usepackage[margin=0.75in]{geometry}
\usepackage{titlesec}
\usepackage{enumitem}
\usepackage[hidelinks]{hyperref}
\usepackage{fancyhdr}
\usepackage{xcolor}

\definecolor{navy}{HTML}{1E3A5F}
\pagestyle{fancy}
\fancyhf{}
\renewcommand{\headrulewidth}{0pt}
\fancyfoot[C]{\footnotesize Page \thepage}

\titleformat{\section}{\color{navy}\Large\scshape}{}{0em}{}[\color{navy}\rule{\linewidth}{0.8pt}]
\titlespacing*{\section}{0pt}{12pt}{6pt}

\begin{document}

\begin{center}
  {\fontsize{28}{34}\selectfont\bfseries\color{navy} {{NAME}}} \\[8pt]
  \normalsize
  {{EMAIL}} \enspace$\diamond$\enspace {{PHONE}} \enspace$\diamond$\enspace {{LOCATION}} \\[3pt]
  \href{https://linkedin.com/in/{{LINKEDIN}}}{linkedin.com/in/{{LINKEDIN}}}
\end{center}

\vspace{8pt}

\section{Executive Summary}
{{SUMMARY}}

\section{Professional Experience}
{{EXPERIENCE_ITEMS}}

\section{Education}
{{EDUCATION_ITEMS}}

\section{Key Projects \& Initiatives}
{{PROJECT_ITEMS}}

\section{Core Competencies}
{{SKILLS_ITEMS}}

\end{document}
`,
};

export const latexTemplates = [
  jakesResume,
  cleanAts,
  modernTwoColumn,
  academicCv,
  deedyCv,
  executiveCv,
];

export const getTemplateById = (id) =>
  latexTemplates.find((t) => t.id === id);

export const defaultTemplateId = 'jakes-resume';
