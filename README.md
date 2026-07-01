# Prepzo — Next-Gen AI Career Acceleration Platform 🚀

Prepzo is an advanced, industry-grade career acceleration and technical diagnostic ecosystem built for modern developers. It combines automated assessment engines, dynamic skill profiling, gamified learning loops, and interactive developer sandboxes into a premium, unified dashboard. 

Prepzo bridges the gap between academic capabilities and hyper-competitive software engineering recruitment expectations.

---

## 🏛️ System Architecture & Workflow

Below is the workflow and communications architecture of the Prepzo platform:

```
                  ┌──────────────────────────────────────────────┐
                  │                 PREPZO CLIENT                │
                  │   React 18 + Vite + Tailwind + Framer Motion  │
                  └───────────────┬──────────────┬───────────────┘
                                  │              ▲
                     REST Calls   │              │  Live State
                     & API Events │              │  & UI Updates
                                  ▼              │
                  ┌──────────────────────────────┴───────────────┐
                  │                CORE API GATEWAY              │
                  │             Node.js + Express.js             │
                  └───────────────┬──────────────┬───────────────┘
                                  │              ▲
                    Query / Write │              │  Structured
                    Mongoose      │              │  Document JSON
                                  ▼              │
                  ┌──────────────────────────────┴───────────────┐
                  │                DATABASE LAYER                │
                  │                   MongoDB                    │
                  └──────────────────────────────┬───────────────┘
                                                 │
                                                 │ Microservice Sync
                                                 ▼
                  ┌──────────────────────────────────────────────┐
                  │               AI ORCHESTRATION               │
                  │    Python + FastAPI + Groq LLM Inference     │
                  └──────────────────────────────────────────────┘
```

---

## 🌟 Core Features & Modules

### 1. ⚡ Daily Sprint
A fast-paced, Duolingo-style daily learning loop designed to build consistency.
*   **Timed Assessment Rounds**: 3 progressive rounds covering Data Structures, Behavioral concepts, and System Design.
*   **Circular Countdown Engine**: Visual ring depletion using SVG stroke-dash geometry with red-pulsing speed feedback under 10 seconds.
*   **Streak & Freezes**: Keeps tracks of consistency streaks. Supports Streak Freezes to protect contribution records.
*   **League Rank Transitions**: Automatically shifts players across Bronze, Silver, Gold, Platinum, and Diamond divisions based on weekly XP velocity.

### 2. 🧬 Placement DNA (Employability Gauge)
A visual score dashboard representing candidates' real-time job readiness.
*   **Readiness Gauge**: Circular SVG gauge displaying the overall employability percentage with dynamic color gradients.
*   **Skill Gaps & Heatmaps**: Breakdown of competencies (Resume, Tech Skills, STAR Interviewing, Project Portfolio, Activity consistency) showing required vs. current skill thresholds.
*   **Predictive Targets**: Computes matching odds for companies like Google, Amazon, Microsoft, and Stripe.

### 3. 🗺️ Career Roadmap
AI-orchestrated week-by-week timelines engineered to prepare candidates for targets.
*   **Tailored Milestones**: Renders interactive roadmap tracks customized for FAANG, Mid-tier, Product-focused, or Startup tracks.
*   **Integrated Task Routing**: Links each milestone directly to corresponding sandbox exercises (e.g. Code Golf, System Design Whiteboards).
*   **Interactive Node Checkpoints**: Auto-advances roadmap stages as individual tasks are completed.

### 4. 🎬 Interview Replay Theater
Post-interview analytics dashboard for reviewing AI proctored recordings.
*   **Acoustic & Structural Telemetry**: Auto-tracks words-per-minute pacing, confidence scores, and eye contact integrity.
*   **Filler Word Flagging**: Highlights placement of filler phrases (like "um", "like", "you know") with exact video timestamps.
*   **Moment-by-Moment Timeline**: Graphically maps positive and negative highlights to the playhead for quick feedback.

### 5. 🏢 Company Prep Track
Preparation tracks mapping the interview loops of target employers.
*   **Recruitment Funnel Overview**: Lists salary brackets, round counts, and duration metrics.
*   **Phased Guidance Paths**: Divides preparation into Foundation, Deep Dive, and Final Mock sprints.
*   **Insider Guides**: Actionable tactics tailored to company interview loops.

### 6. 💻 Live Coding Room
Collaborative interview environment allowing real-time workspace collaboration.
*   **Multiplayer Workspace**: Split editor panels to coordinate coding sessions.
*   **Hints System**: Integrated dynamic hint engine which tracks assistance frequency.
*   **Session Diagnostics**: Measures elapsed time and records test case success.

---

## 🚀 Newly Integrated Developer Utilities

*   **AI Cover Letter Matcher**: Creates targeted cover letters matching the candidate's profile to any selected job posting.
*   **ATS Match Optimizer**: Analyzes job descriptions to generate resume keyword heatmaps.
*   **DSA Pattern Flashcards**: Gamified spaced-repetition cards to master core patterns (sliding window, two pointers, cycle detection).
*   **Cyberpunk Portfolio Builder**: Exports portfolio websites directly from Prepzo performance data.
*   **STAR Method Audio Coach**: Real-time microphone capture analyzing STAR structure (Situation, Task, Action, Result) in behavioral responses.
*   **System Design Topology Simulator**: Connects Load Balancers, Web Servers, and Databases in a visual canvas to calculate throughput bottlenecks.

---

## 🛠️ Technology Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | React 18 (Vite), TypeScript, Tailwind CSS, Framer Motion, Zustand |
| **Backend** | Node.js, Express.js, Mongoose, Python, FastAPI, LangGraph |
| **Database** | MongoDB |
| **Inference Layer**| Groq API (llama-3.1-70b-versatile, gemma2-9b-it) |

---

## ⚙️ Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/ayushsoni05/Prepzo-Ai-Carrer-Platform.git
cd Prepzo-Ai-Carrer-Platform
```

### 2. Configure Backend Services
```bash
cd backend
npm install
# Create a .env file containing:
# MONGODB_URI=your_mongodb_connection_string
# JWT_SECRET=your_jwt_secret
npm run dev
```

### 3. Configure Frontend Development Server
```bash
cd ../frontend
npm install
npm run dev
```

The application is now accessible at `http://localhost:5173`.
