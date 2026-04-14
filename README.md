# Prepzo: AI-Driven Career Readiness Platform

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)
![Tailwind](https://img.shields.io/badge/Tailwind-v4-38B2AC?logo=tailwind-css)
![AI](https://img.shields.io/badge/AI-Powered-FF6F61?logo=google-gemini)

**Prepzo** is a premium, high-fidelity career development platform designed to empower students and job seekers through artificial intelligence. By integrating advanced assessment engines, personalized mentorship, and professional career tools, Prepzo provides a roadmap to placement readiness.

## 🚀 Key Features

- **AI Assessment Hub**: A mandatory two-stage assessment pipeline (Field-specific and Skill-based) that validates user expertise before unlocking the dashboard.
- **Global AI Mentor**: A ChatGPT-style real-time mentor available across the platform to provide instant career guidance, technical help, and motivation.
- **Placement Readiness Scoring**: A dynamic scoring system that tracks progress, identifies skill gaps, and measures ATS compatibility.
- **Resume Lab**: An ATS-compliant resume builder featuring professional templates inspired by industry standards, complete with AI-driven optimization tips.
- **Intelligent Job & Company Board**: Personalized recommendations based on assessment performance and user skills.
- **Premium UI/UX**: Built with a sleek, dark-mode aesthetic using Aceternity UI components, Framer Motion animations, and Three.js visual effects.

## 🛠️ Technology Stack

### Frontend
- **Framework**: React 19 (Vite)
- **Styling**: Tailwind CSS (v4), Vanilla CSS
- **Animations**: Framer Motion, GSAP
- **3D Graphics**: Three.js (React Three Fiber/Drei)
- **State Management**: Zustand
- **Form Handling**: React Hook Form + Zod

### Backend
- **Core**: Node.js, Express
- **API Communication**: Axios
- **Validation**: Zod
- **Security**: JWT Authentication, HTTP-only cookies

### AI Service
- **Engine**: Python, FastAPI
- **LLM Integration**: Ollama (Llama 3), Gemini Pro
- **Processing**: Specialized endpoints for assessment generation and career mentorship.

## 📂 Project Structure

```bash
├── frontend/          # React + Vite application
├── backend/           # Node.js + Express server
├── ai-service/        # FastAPI Python service for AI logic
└── models/            # Shared database models and schemas
```

## ⚙️ Getting Started

### Prerequisites
- Node.js (v18+)
- Python (v3.10+)
- Ollama (for local AI model execution)

### Setup Instructions

1. **Clone the Repository**
   ```bash
   git clone https://github.com/your-username/prepzo.git
   cd prepzo
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   npm run dev
   ```

3. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

4. **AI Service Setup**
   ```bash
   cd ai-service
   pip install -r requirements.txt
   python -m uvicorn app.main:app --reload
   ```

## 📄 License
This project is developed for institutional career development and placement optimization. 
© 2026 Prepzo Team. All Rights Reserved.
