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
  description: 'The most popular ATS-optimised LaTeX resume. Clean single-column layout with tight spacing for a single page fit.',
  badge: 'Most Popular',
  accent: '#6366f1',
  source: String.raw`%-------------------------
% Resume in LaTeX
% Based on Jake's Resume template
%-------------------------
\documentclass[letterpaper,10pt]{article}
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

\addtolength{\oddsidemargin}{-0.65in}
\addtolength{\evensidemargin}{-0.65in}
\addtolength{\textwidth}{1.3in}
\addtolength{\topmargin}{-.65in}
\addtolength{\textheight}{1.3in}

\urlstyle{same}
\raggedbottom
\raggedright
\setlength{\tabcolsep}{0in}

\titleformat{\section}{
  \vspace{-10pt}\scshape\raggedright\large
}{}{0em}{}[\color{black}\titlerule \vspace{-7pt}]

\newcommand{\resumeItem}[1]{\item\small{#1 \vspace{-1pt}}}
\newcommand{\resumeSubheading}[4]{
  \item
    \begin{tabular*}{0.97\textwidth}[t]{l@{\extracolsep{\fill}}r}
      \textbf{#1} & #2 \\
      \textit{\small#3} & \textit{\small #4} \\
    \end{tabular*}\vspace{-3pt}
}
\newcommand{\resumeProjectHeading}[2]{
  \item
    \begin{tabular*}{0.97\textwidth}[t]{l@{\extracolsep{\fill}}r}
      \parbox[t]{0.83\textwidth}{\small#1} & #2 \\
    \end{tabular*}\vspace{-3pt}
}
\newcommand{\resumeSubItem}[1]{\resumeItem{#1}\vspace{-2pt}}
\renewcommand\labelitemii{$\vcenter{\hbox{\tiny$\bullet$}}$}
\newcommand{\resumeSubHeadingListStart}{\begin{itemize}[leftmargin=0.15in, label={}, nosep]}
\newcommand{\resumeSubHeadingListEnd}{\end{itemize}}
\newcommand{\resumeItemListStart}{\begin{itemize}[nosep, topsep=0pt, partopsep=0pt, parsep=0pt]}
\newcommand{\resumeItemListEnd}{\end{itemize}\vspace{-2pt}}
\setlist[itemize]{nosep}

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
 \begin{itemize}[leftmargin=0.15in, label={}, nosep]
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
  description: 'Ultra-clean, single-column layout designed to pass every ATS system and fit on one page.',
  badge: 'ATS Safe',
  accent: '#10b981',
  source: String.raw`\documentclass[a4paper,10pt]{article}
\usepackage[utf8]{inputenc}
\usepackage[empty]{fullpage}
\usepackage{titlesec}
\usepackage{enumitem}
\usepackage[hidelinks]{hyperref}
\usepackage{fancyhdr}

\pagestyle{fancy}
\fancyhf{}
\renewcommand{\headrulewidth}{0pt}

\addtolength{\oddsidemargin}{-0.65in}
\addtolength{\evensidemargin}{-0.65in}
\addtolength{\textwidth}{1.3in}
\addtolength{\topmargin}{-0.65in}
\addtolength{\textheight}{1.3in}

\titleformat{\section}{\large\bfseries\scshape}{}{0em}{}[\titlerule \vspace{-3pt}]
\titlespacing*{\section}{0pt}{4pt}{2pt}
\setlist[itemize]{nosep}

\begin{document}

\begin{center}
  {\LARGE\bfseries {{NAME}}} \\[3pt]
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
  description: 'Modern two-column layout with colour accent sidebar. Highly compact for single page layout.',
  badge: 'Modern',
  accent: '#8b5cf6',
  source: String.raw`\documentclass[9pt,a4paper]{article}
\usepackage[utf8]{inputenc}
\usepackage[margin=0.45in]{geometry}
\usepackage{titlesec}
\usepackage{enumitem}
\usepackage[hidelinks]{hyperref}
\usepackage{multicol}
\usepackage{xcolor}
\usepackage{fancyhdr}

\definecolor{accent}{HTML}{6C63FF}
\pagestyle{empty}

\titleformat{\section}{\color{accent}\large\bfseries\scshape}{}{0em}{}[\color{accent}\titlerule \vspace{-3pt}]
\titlespacing*{\section}{0pt}{4pt}{2pt}
\setlist[itemize]{nosep}

\begin{document}

\begin{center}
  {\Huge\bfseries\color{accent} {{NAME}}} \\[4pt]
  \small {{EMAIL}} \enspace|\enspace {{PHONE}} \enspace|\enspace {{LOCATION}} \\[2pt]
  \href{https://linkedin.com/in/{{LINKEDIN}}}{LinkedIn} \enspace|\enspace
  \href{https://github.com/{{GITHUB}}}{GitHub}
\end{center}

\vspace{2pt}

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
  description: 'Formal serif layout suitable for academic and research positions, optimized for single page.',
  badge: 'Academic',
  accent: '#0369a1',
  source: String.raw`\documentclass[10pt,a4paper]{article}
\usepackage[utf8]{inputenc}
\usepackage[margin=0.45in]{geometry}
\usepackage{titlesec}
\usepackage{enumitem}
\usepackage[hidelinks]{hyperref}
\usepackage{fancyhdr}
\usepackage{xcolor}

\definecolor{heading}{HTML}{003366}
\pagestyle{fancy}
\fancyhf{}
\renewcommand{\headrulewidth}{0pt}
\fancyfoot[C]{\footnotesize\thepage}

\titleformat{\section}{\color{heading}\large\bfseries}{}{0em}{}[\color{heading}\titlerule \vspace{-3pt}]
\titlespacing*{\section}{0pt}{4pt}{2pt}
\setlist[itemize]{nosep}

\begin{document}

\begin{center}
  {\LARGE\bfseries\color{heading} {{NAME}}} \\[4pt]
  \small {{EMAIL}} \quad|\quad {{PHONE}} \quad|\quad {{LOCATION}} \\[2pt]
  \href{https://linkedin.com/in/{{LINKEDIN}}}{LinkedIn}
  \quad|\quad
  \href{https://github.com/{{GITHUB}}}{GitHub}
\end{center}

\vspace{2pt}

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
  description: 'Compact, information-dense layout favoured in tech and startup circles, strict 1-page fit.',
  badge: 'Tech',
  accent: '#ec4899',
  source: String.raw`\documentclass[a4paper,9pt]{article}
\usepackage[utf8]{inputenc}
\usepackage[margin=0.45in]{geometry}
\usepackage{titlesec}
\usepackage{enumitem}
\usepackage[hidelinks]{hyperref}
\usepackage{xcolor}
\usepackage{multicol}
\usepackage{fontenc}

\definecolor{primary}{HTML}{2D3748}
\definecolor{PRIMARY}{HTML}{2D3748}
\definecolor{accent}{HTML}{E53E3E}
\definecolor{ACCENT}{HTML}{E53E3E}

\pagestyle{empty}

\titleformat{\section}{\color{primary}\large\bfseries\uppercase}{}{0em}{}[\color{accent}\titlerule \vspace{-3pt}]
\titlespacing*{\section}{0pt}{4pt}{2pt}

\setlength{\columnsep}{1.5em}
\setlist[itemize]{nosep}

\begin{document}

\begin{center}
  {\huge\bfseries\color{primary} {{NAME}}} \\[3pt]
  \footnotesize
  \href{mailto:{{EMAIL}}}{{{EMAIL}}} $\cdot$
  {{PHONE}} $\cdot$
  \href{https://linkedin.com/in/{{LINKEDIN}}}{LinkedIn} $\cdot$
  \href{https://github.com/{{GITHUB}}}{GitHub}
\end{center}

\vspace{1pt}

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
  description: 'Classic professional layout with elegant spacing and serif headings, optimized to stay in one page.',
  badge: 'Professional',
  accent: '#7c3aed',
  source: String.raw`\documentclass[10pt,letterpaper]{article}
\usepackage[utf8]{inputenc}
\usepackage[margin=0.45in]{geometry}
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

\titleformat{\section}{\color{navy}\large\scshape}{}{0em}{}[\color{navy}\rule{\linewidth}{0.6pt}]
\titlespacing*{\section}{0pt}{4pt}{2pt}
\setlist[itemize]{nosep}

\begin{document}

\begin{center}
  {\fontsize{24}{28}\selectfont\bfseries\color{navy} {{NAME}}} \\[4pt]
  \normalsize
  {{EMAIL}} \enspace$\diamond$\enspace {{PHONE}} \enspace$\diamond$\enspace {{LOCATION}} \\[2pt]
  \href{https://linkedin.com/in/{{LINKEDIN}}}{linkedin.com/in/{{LINKEDIN}}}
\end{center}

\vspace{2pt}

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

// 7. Tech Compact (New Template)
const techCompact = {
  id: 'tech-compact',
  name: 'Tech Developer Compact',
  description: 'Ultra-dense developer-focused layout using a tight margin design. Absolutely fits on one page.',
  badge: 'Tech',
  accent: '#3b82f6',
  source: String.raw`\documentclass[9pt,a4paper]{article}
\usepackage[utf8]{inputenc}
\usepackage[margin=0.4in]{geometry}
\usepackage{titlesec}
\usepackage[hidelinks]{hyperref}
\usepackage{enumitem}
\usepackage{xcolor}
\usepackage{tabularx}
\usepackage{fancyhdr}

\definecolor{primary}{HTML}{1E293B}
\definecolor{accent}{HTML}{3B82F6}

\pagestyle{empty}
\setlist[itemize]{nosep,topsep=0pt,parsep=0pt,partopsep=0pt,leftmargin=0.15in}

\titleformat{\section}{\color{primary}\large\bfseries\uppercase}{}{0em}{}[\color{accent}\titlerule \vspace{-3pt}]
\titlespacing*{\section}{0pt}{4pt}{2pt}

\newcommand{\resumeItem}[1]{\item\small{#1}}
\newcommand{\resumeSubheading}[4]{
  \item
    \begin{tabular*}{0.98\textwidth}[t]{l@{\extracolsep{\fill}}r}
      \textbf{#1} & \small #2 \\
      \textit{\small#3} & \textit{\small #4} \\
    \end{tabular*}\vspace{-3pt}
}
\newcommand{\resumeProjectHeading}[2]{
  \item
    \begin{tabular*}{0.98\textwidth}[t]{l@{\extracolsep{\fill}}r}
      \parbox[t]{0.83\textwidth}{\small#1} & \small #2 \\
    \end{tabular*}\vspace{-3pt}
}
\newcommand{\resumeSubHeadingListStart}{\begin{itemize}[label={}, leftmargin=0.15in]}
\newcommand{\resumeSubHeadingListEnd}{\end{itemize}}
\newcommand{\resumeItemListStart}{\begin{itemize}}
\newcommand{\resumeItemListEnd}{\end{itemize}\vspace{-2pt}}

\begin{document}

\begin{center}
  {\Huge\bfseries\color{primary} {{NAME}}} \\[2pt]
  \small {{PHONE}} $\cdot$ \href{mailto:{{EMAIL}}}{{{EMAIL}}} $\cdot$ {{LOCATION}} \\
  \href{https://linkedin.com/in/{{LINKEDIN}}}{linkedin.com/in/{{LINKEDIN}}} $\cdot$ \href{https://github.com/{{GITHUB}}}{github.com/{{GITHUB}}}
\end{center}

\vspace{-8pt}

\section{Summary}
\small {{SUMMARY}}

\section{Education}
  \resumeSubHeadingListStart
{{EDUCATION_ITEMS}}
  \resumeSubHeadingListEnd

\section{Experience}
  \resumeSubHeadingListStart
{{EXPERIENCE_ITEMS}}
  \resumeSubHeadingListEnd

\section{Projects}
  \resumeSubHeadingListStart
{{PROJECT_ITEMS}}
  \resumeSubHeadingListEnd

\section{Technical Skills}
\begin{itemize}[label={}, leftmargin=0.15in]
  \small{\item{
{{SKILLS_ITEMS}}
  }}
\end{itemize}

\end{document}
`,
};

// 8. Corporate Executive (New Template)
const corporateExecutive = {
  id: 'corporate-executive',
  name: 'Corporate Executive',
  description: 'Polished corporate/business template optimized for operations, management, sales, and non-tech profiles.',
  badge: 'Corporate',
  accent: '#475569',
  source: String.raw`\documentclass[10pt,letterpaper]{article}
\usepackage[utf8]{inputenc}
\usepackage[margin=0.45in]{geometry}
\usepackage{titlesec}
\usepackage[hidelinks]{hyperref}
\usepackage{enumitem}
\usepackage{xcolor}
\usepackage{fancyhdr}

\definecolor{slate}{HTML}{334155}
\pagestyle{empty}
\setlist[itemize]{nosep,topsep=0pt,parsep=0pt,partopsep=0pt,leftmargin=0.15in}

\titleformat{\section}{\color{slate}\large\bfseries\uppercase}{}{0em}{}[\color{slate}\titlerule \vspace{-3pt}]
\titlespacing*{\section}{0pt}{4pt}{2pt}

\newcommand{\resumeItem}[1]{\item\small{#1}}
\newcommand{\resumeSubheading}[4]{
  \item
    \begin{tabular*}{0.98\textwidth}[t]{l@{\extracolsep{\fill}}r}
      \textbf{#1} & \small #2 \\
      \textit{\small#3} & \textit{\small #4} \\
    \end{tabular*}\vspace{-3pt}
}
\newcommand{\resumeProjectHeading}[2]{
  \item
    \begin{tabular*}{0.98\textwidth}[t]{l@{\extracolsep{\fill}}r}
      \parbox[t]{0.83\textwidth}{\small#1} & \small #2 \\
    \end{tabular*}\vspace{-3pt}
}
\newcommand{\resumeSubHeadingListStart}{\begin{itemize}[label={}, leftmargin=0.15in]}
\newcommand{\resumeSubHeadingListEnd}{\end{itemize}}
\newcommand{\resumeItemListStart}{\begin{itemize}}
\newcommand{\resumeItemListEnd}{\end{itemize}\vspace{-2pt}}

\begin{document}

\begin{center}
  {\Huge\bfseries\color{slate} {{NAME}}} \\[2pt]
  \small {{PHONE}} $\cdot$ \href{mailto:{{EMAIL}}}{{{EMAIL}}} $\cdot$ {{LOCATION}} \\
  \href{https://linkedin.com/in/{{LINKEDIN}}}{linkedin.com/in/{{LINKEDIN}}}
\end{center}

\vspace{-8pt}

\section{Professional Summary}
\small {{SUMMARY}}

\section{Core Expertise \& Skills}
\begin{itemize}[label={}, leftmargin=0.15in]
  \small{\item{
{{SKILLS_ITEMS}}
  }}
\end{itemize}

\section{Professional Experience}
  \resumeSubHeadingListStart
{{EXPERIENCE_ITEMS}}
  \resumeSubHeadingListEnd

\section{Education}
  \resumeSubHeadingListStart
{{EDUCATION_ITEMS}}
  \resumeSubHeadingListEnd

\section{Key Achievements}
  \resumeSubHeadingListStart
{{PROJECT_ITEMS}}
    \resumeSubHeadingListEnd

\end{document}
`,
};

// 9. Tech Modern Minimalist (New Template)
const techModern = {
  id: 'tech-modern',
  name: 'Tech Modern Minimalist',
  description: 'Clean sans-serif modern layout with tight spacing, optimized for single page software engineering profiles.',
  badge: 'Tech',
  accent: '#2563eb',
  source: String.raw`\documentclass[9pt,letterpaper]{article}
\usepackage[utf8]{inputenc}
\usepackage[margin=0.4in]{geometry}
\usepackage{titlesec}
\usepackage{enumitem}
\usepackage[hidelinks]{hyperref}
\usepackage{xcolor}
\usepackage{fancyhdr}
\usepackage{helvet}
\renewcommand{\familydefault}{\sfdefault}

\definecolor{primary}{HTML}{0F172A}
\definecolor{accent}{HTML}{2563EB}

\pagestyle{empty}
\setlist[itemize]{nosep,topsep=0pt,parsep=0pt,partopsep=0pt,leftmargin=0.15in}

\titleformat{\section}{\color{primary}\large\bfseries}{}{0em}{}[\color{accent}\titlerule \vspace{-3pt}]
\titlespacing*{\section}{0pt}{4pt}{2pt}

\newcommand{\resumeItem}[1]{\item\small{#1}}
\newcommand{\resumeSubheading}[4]{
  \item
    \begin{tabular*}{0.98\textwidth}[t]{l@{\extracolsep{\fill}}r}
      \textbf{\color{primary}#1} & \small #2 \\
      \textit{\small#3} & \textit{\small #4} \\
    \end{tabular*}\vspace{-3pt}
}
\newcommand{\resumeProjectHeading}[2]{
  \item
    \begin{tabular*}{0.98\textwidth}[t]{l@{\extracolsep{\fill}}r}
      \parbox[t]{0.83\textwidth}{\textbf{\small#1}} & \small #2 \\
    \end{tabular*}\vspace{-3pt}
}
\newcommand{\resumeSubHeadingListStart}{\begin{itemize}[label={}, leftmargin=0.15in]}
\newcommand{\resumeSubHeadingListEnd}{\end{itemize}}
\newcommand{\resumeItemListStart}{\begin{itemize}}
\newcommand{\resumeItemListEnd}{\end{itemize}\vspace{-2pt}}

\begin{document}

\begin{center}
  {\Huge\bfseries\color{primary} {{NAME}}} \\[2pt]
  \small {{PHONE}} $\cdot$ \href{mailto:{{EMAIL}}}{{{EMAIL}}} $\cdot$ {{LOCATION}} \\
  \href{https://linkedin.com/in/{{LINKEDIN}}}{linkedin.com/in/{{LINKEDIN}}} $\cdot$ \href{https://github.com/{{GITHUB}}}{github.com/{{GITHUB}}}
\end{center}

\vspace{-8pt}

\section{Summary}
\small {{SUMMARY}}

\section{Experience}
  \resumeSubHeadingListStart
{{EXPERIENCE_ITEMS}}
  \resumeSubHeadingListEnd

\section{Projects}
  \resumeSubHeadingListStart
{{PROJECT_ITEMS}}
  \resumeSubHeadingListEnd

\section{Education}
  \resumeSubHeadingListStart
{{EDUCATION_ITEMS}}
  \resumeSubHeadingListEnd

\section{Skills}
\begin{itemize}[label={}, leftmargin=0.15in]
  \small{\item{
{{SKILLS_ITEMS}}
  }}
\end{itemize}

\end{document}
`,
};

// 10. Creative Marketing Compact (New Template)
const creativeCompact = {
  id: 'creative-compact',
  name: 'Creative Marketing Compact',
  description: 'Elegant layout mixing Palatino serif headings with sans-serif body text, designed for marketing, product management, and creative roles.',
  badge: 'Creative',
  accent: '#db2777',
  source: String.raw`\documentclass[9pt,letterpaper]{article}
\usepackage[utf8]{inputenc}
\usepackage[margin=0.42in]{geometry}
\usepackage{titlesec}
\usepackage{enumitem}
\usepackage[hidelinks]{hyperref}
\usepackage{xcolor}
\usepackage{fancyhdr}
\usepackage{palatino}

\definecolor{primary}{HTML}{1E293B}
\definecolor{accent}{HTML}{DB2777}

\pagestyle{empty}
\setlist[itemize]{nosep,topsep=0pt,parsep=0pt,partopsep=0pt,leftmargin=0.15in}

\titleformat{\section}{\color{primary}\large\fontfamily{ppl}\selectfont\bfseries}{}{0em}{}[\color{accent}\titlerule \vspace{-3pt}]
\titlespacing*{\section}{0pt}{5pt}{3pt}

\newcommand{\resumeItem}[1]{\item\small{#1}}
\newcommand{\resumeSubheading}[4]{
  \item
    \begin{tabular*}{0.98\textwidth}[t]{l@{\extracolsep{\fill}}r}
      \textbf{#1} & \small #2 \\
      \textit{\small#3} & \textit{\small #4} \\
    \end{tabular*}\vspace{-3pt}
}
\newcommand{\resumeProjectHeading}[2]{
  \item
    \begin{tabular*}{0.98\textwidth}[t]{l@{\extracolsep{\fill}}r}
      \parbox[t]{0.83\textwidth}{\textbf{\small#1}} & \small #2 \\
    \end{tabular*}\vspace{-3pt}
}
\newcommand{\resumeSubHeadingListStart}{\begin{itemize}[label={}, leftmargin=0.15in]}
\newcommand{\resumeSubHeadingListEnd}{\end{itemize}}
\newcommand{\resumeItemListStart}{\begin{itemize}}
\newcommand{\resumeItemListEnd}{\end{itemize}\vspace{-2pt}}

\begin{document}

\begin{center}
  {\Huge\fontfamily{ppl}\selectfont\bfseries\color{primary} {{NAME}}} \\[2pt]
  \small {{PHONE}} $\cdot$ \href{mailto:{{EMAIL}}}{{{EMAIL}}} $\cdot$ {{LOCATION}} \\
  \href{https://linkedin.com/in/{{LINKEDIN}}}{linkedin.com/in/{{LINKEDIN}}} $\cdot$ \href{https://github.com/{{GITHUB}}}{github.com/{{GITHUB}}}
\end{center}

\vspace{-8pt}

\section{Creative Profile}
\small {{SUMMARY}}

\section{Core Skills}
\begin{itemize}[label={}, leftmargin=0.15in]
  \small{\item{
{{SKILLS_ITEMS}}
  }}
\end{itemize}

\section{Experience}
  \resumeSubHeadingListStart
{{EXPERIENCE_ITEMS}}
  \resumeSubHeadingListEnd

\section{Education}
  \resumeSubHeadingListStart
{{EDUCATION_ITEMS}}
  \resumeSubHeadingListEnd

\section{Key Achievements \& Projects}
  \resumeSubHeadingListStart
{{PROJECT_ITEMS}}
  \resumeSubHeadingListEnd

\end{document}
`,
};

// 11. Finance & Consulting Premium (New Template)
const financeConsultant = {
  id: 'finance-consultant',
  name: 'Finance & Consulting Premium',
  description: 'Traditional professional layout with dual-line header and elegant formatting, perfect for finance, consulting, and business roles.',
  badge: 'Corporate',
  accent: '#475569',
  source: String.raw`\documentclass[10pt,letterpaper]{article}
\usepackage[utf8]{inputenc}
\usepackage[margin=0.45in]{geometry}
\usepackage{titlesec}
\usepackage{enumitem}
\usepackage[hidelinks]{hyperref}
\usepackage{xcolor}
\usepackage{fancyhdr}

\definecolor{navy}{HTML}{0F172A}
\definecolor{accent}{HTML}{475569}

\pagestyle{empty}
\setlist[itemize]{nosep,topsep=0pt,parsep=0pt,partopsep=0pt,leftmargin=0.15in}

\titleformat{\section}{\color{navy}\large\bfseries\uppercase}{}{0em}{}[\color{navy}\rule{\linewidth}{0.8pt} \vspace{-3pt}]
\titlespacing*{\section}{0pt}{4pt}{2pt}

\newcommand{\resumeItem}[1]{\item\small{#1}}
\newcommand{\resumeSubheading}[4]{
  \item
    \begin{tabular*}{0.98\textwidth}[t]{l@{\extracolsep{\fill}}r}
      \textbf{#1} & \small #2 \\
      \textit{\small#3} & \textit{\small #4} \\
    \end{tabular*}\vspace{-3pt}
}
\newcommand{\resumeProjectHeading}[2]{
  \item
    \begin{tabular*}{0.98\textwidth}[t]{l@{\extracolsep{\fill}}r}
      \parbox[t]{0.83\textwidth}{\textbf{\small#1}} & \small #2 \\
    \end{tabular*}\vspace{-3pt}
}
\newcommand{\resumeSubHeadingListStart}{\begin{itemize}[label={}, leftmargin=0.15in]}
\newcommand{\resumeSubHeadingListEnd}{\end{itemize}}
\newcommand{\resumeItemListStart}{\begin{itemize}}
\newcommand{\resumeItemListEnd}{\end{itemize}\vspace{-2pt}}

\begin{document}

\begin{center}
  {\Huge\scshape\color{navy} {{NAME}}} \\[2pt]
  \small {{PHONE}} $\cdot$ \href{mailto:{{EMAIL}}}{{{EMAIL}}} $\cdot$ {{LOCATION}} \\
  \href{https://linkedin.com/in/{{LINKEDIN}}}{linkedin.com/in/{{LINKEDIN}}}
\end{center}

\vspace{-8pt}

\section{Executive Profile}
\small {{SUMMARY}}

\section{Core Skills \& Expertise}
\begin{itemize}[label={}, leftmargin=0.15in]
  \small{\item{
{{SKILLS_ITEMS}}
  }}
\end{itemize}

\section{Professional Experience}
  \resumeSubHeadingListStart
{{EXPERIENCE_ITEMS}}
  \resumeSubHeadingListEnd

\section{Education}
  \resumeSubHeadingListStart
{{EDUCATION_ITEMS}}
  \resumeSubHeadingListEnd

\section{Projects \& Leadership}
  \resumeSubHeadingListStart
{{PROJECT_ITEMS}}
  \resumeSubHeadingListEnd

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
  techCompact,
  corporateExecutive,
  techModern,
  creativeCompact,
  financeConsultant,
];

export const getTemplateById = (id) =>
  latexTemplates.find((t) => t.id === id);

export const defaultTemplateId = 'jakes-resume';
