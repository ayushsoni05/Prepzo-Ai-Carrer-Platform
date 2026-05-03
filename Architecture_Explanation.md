# Prepzo AI Career Platform: Technical Architecture & AI Explanation

Welcome to the technical explanation of the Prepzo AI Career Platform. This document is designed to help you, the evaluator, understand the core technologies powering our platform in simple, easy-to-understand language. We will explore what the **Backend** does, how the **AI** works, what the technical terms mean, and show exactly where they are used in the codebase.

---

## Part 1: The Backend Ecosystem

### What is a "Backend"?
Imagine a restaurant. The frontend is the dining area and the menu—it's what the customer sees and interacts with. The **Backend** is the kitchen. It processes orders, manages the ingredients (data), and prepares the food (responses) to send back to the customer. 

In our project, the backend is built using **Node.js** and **Express.js**.
- **Node.js**: Node.js is free, open-source, cross-platform javascript runtime environment that allows developer to execute the code outside the web browser(means in servers).
- **Express.js**: A framework for Node.js that makes it easy to handle web traffic, like deciding what happens when a user asks to log in or view a job.

### Key Backend Terms Explained

1. **API (Application Programming Interface)**: It is a set of rules and protocols that allow different software applications to communicate and share data with one another. It acts as a middleman, enabling developers to use existing functions from other software instead of building them from scratch
      *How an API Works*
API communication is typically described as a request-response cycle between a client and a server: 

Request: A client (like a mobile app) sends an instruction to an API endpoint (a specific URL).
Processing: The API takes the request, translates it for the server, and triggers the necessary actions.
Response: The server processes the request and sends the data back through the API to the client.
   - *Example in project*: When a user signs in, the frontend sends an API request to the backend.

2. **MongoDB**: MongoDB is a popular, open-source, NoSQL document-oriented database designed for high performance, high availability, and easy scalability.

Our database. Think of it as a massive digital filing cabinet where we store user profiles, job postings, and interview scores. It stores data in flexible, document-like formats (JSON) rather than rigid tables.

3. **JWT (JSON Web Token)**: A JSON Web Token (JWT) is an open standard (RFC 7519) that defines a compact, URL-safe way to securely transmit information between parties as a JSON object. It is primarily used for stateless authentication and authorization in web apps, where a digitally signed token proves user identity without requiring server-side session lookups

A digital VIP pass. When a user logs in successfully, the backend gives them a JWT. For all future requests, the user shows this token so the backend knows who they are without asking for a password every time.

4. **Middleware**: Middleware is software that acts as a bridge or "glue" between different applications, tools, or databases, allowing them to communicate and work together seamlessly.

Security guards and inspectors. These are functions that run *before* the main task. For example, before letting a user view their private dashboard, an "Auth Middleware" checks if their JWT VIP pass is valid.

### Where is it used in the code?
If you look at `backend/src/server.js`, you'll see the core of our backend.
```javascript
// This is where we create the "kitchen" (Express application)
const app = express();

// Security Guards (Middleware) protecting the server
app.use(helmetConfig); 
app.use(ipBlocker);
app.use('/api', generalLimiter); // Prevents users from spamming the server

// Waiters (Routes) handling specific requests
app.use('/api/auth', authRoutes); // Handles Login & Signup
app.use('/api/jobs', jobRoutes); // Handles Job postings
```

### More Backend Concepts (From Small to Big)

To keep our kitchen (backend) organized, we use a pattern called **MVC (Model-View-Controller)**. Although we don't have traditional "Views" (since our React frontend handles that), the concept still applies:
1. **Routes (The Host)**: When a request comes in (e.g., `/api/jobs`), the route decides which Controller should handle it.
2. **Controllers (The Chef)**: The actual brain of the operation. The controller receives the request, processes the business logic, and decides what to do.
3. **Models (The Recipe/Pantry)**: Models define how data should look. For example, a `User` model dictates that every user *must* have an email and a password. When the controller needs to save a user, it uses the Model to talk to MongoDB.

### How Pages Connect (Frontend to Backend Communication)

If an evaluator asks how the whole system connects:
1. **React Router**: In our frontend code, we use React Router to connect pages. When a user clicks "Jobs", React Router instantly swaps out the screen to show the Jobs page without reloading the web browser.
2. **Axios (The Delivery Truck)**: Once the Jobs page loads, it uses a tool called `Axios` to send a fast internet request to our backend (e.g., `GET /api/jobs`).
3. **The Response**: The backend controller talks to MongoDB, gets the list of jobs, and sends it back to the frontend as JSON data. The React page then takes that data and beautifully renders it as Job Cards on the screen.

### How is the Website Secured?

Security is critical. Here is how we protect our application in simple words:
1. **CORS (Cross-Origin Resource Sharing)**: This is like a bouncer at the door. It ensures that *only* our official frontend website is allowed to talk to our backend. If a hacker tries to send requests from their own random website, CORS blocks them.
2. **Rate Limiting**: This prevents DDoS attacks. If someone tries to spam our login page 1,000 times in a second, the Rate Limiter cuts them off, protecting the server from crashing.
3. **Helmet**: A tool that automatically adds invisible "security headers" to all our web traffic, protecting users from common attacks like Cross-Site Scripting (XSS).
4. **Sanitization**: Before we save any user input (like a resume text or a job application) to our database, we "sanitize" it. This means we strip out any malicious code or database commands the user might have secretly typed in.
5. **Password Hashing (Bcrypt)**: We never save raw passwords (like "password123"). Instead, we scramble them into unrecognizable text (hashes) using a tool called `bcryptjs`. Even if the database is stolen, the passwords remain safe.

---

## Part 2: The AI Ecosystem

### What is "AI" in our platform?
We use AI as a highly intelligent assistant that can read, understand, and generate text to help users prepare for their careers. Our platform uses a combination of **Google Gemini API** (a powerful language model like ChatGPT) and a **Custom Python FastAPI Service** to handle specialized AI tasks.

### Key AI Terms Explained

1. **LLM (Large Language Model)**: An AI trained on vast amounts of text data. It can understand context, answer questions, and generate human-like text.
   - *Example in project*: We use Google's Gemini LLM to conduct mock technical interviews and evaluate a user's answers.

2. **Python FastAPI Service**: While the main backend is in Node.js, we built a separate, dedicated "microservice" in Python. Python is the industry standard for AI and data science. FastAPI is just a very fast way to build a web server in Python.
   - *Where is it?* Look in `ai-service/app/main.py`. This service runs alongside the main backend and handles heavy AI tasks.

3. **Vector Database / FAISS**: Normal databases search for exact word matches (e.g., search "apple", find "apple"). Vector databases search by *meaning*. It turns text into numbers (called **Embeddings**) and finds numbers that are mathematically close. 
   - *Example in project*: If a user searches for "Frontend Developer", FAISS can understand that a "React UI Engineer" job means the exact same thing, even if the words are completely different.

4. **RAG (Retrieval-Augmented Generation)**: Giving the AI an open-book test. Instead of relying solely on the AI's built-in knowledge (which might be outdated), we first *Retrieve* relevant facts from our own database, and give them to the AI to *Generate* a perfect, personalized answer.

### Where is it used in the code?

**1. AI Mock Interviews (Backend & Gemini)**
When a user takes a mock interview, the backend uses the Gemini API to analyze their answer and provide a score.
```javascript
// Found in backend routes/controllers
// The AI analyzes the user's answer against the expected answer
const aiEvaluation = await gemini.generateContent(`
  Evaluate this answer: "${userAnswer}"
  For this question: "${question}"
  Give a score out of 10 and actionable feedback.
`);
```

**2. Smart AI Service (Python FastAPI)**
In `ai-service/app/main.py`, you can see the specialized AI routes:
```python
# The Python AI Service handles deep semantic tasks
app.include_router(resume.router, prefix="/api/resume") # AI reads and scores resumes
app.include_router(recommendations.router, prefix="/api/recommendations") # AI matches users to jobs
```

### More AI Concepts (From Small to Big)

To understand how our AI operates, here are a few more critical concepts:
1. **Tokens**: AI doesn't read words; it reads tokens. A token is a chunk of letters (usually 3-4 letters). When we send a resume to the AI, it breaks it down into tokens. AI models charge money based on how many tokens you send and receive.
2. **Prompts & System Instructions**: A prompt is what we ask the AI. A System Instruction is a hidden rule we give the AI beforehand. For example, "You are an expert career counselor. Always be encouraging." This forces the AI to behave in a specific way behind the scenes.
3. **Embeddings**: When we want the AI to understand relationships between words (like matching a user's skills to a job description), we use an embedding model. It turns text into a long list of numbers. If the numbers for the user's resume are mathematically close to the numbers for a job description, it's a match!
4. **Endpoint Specialization**: Instead of one massive AI brain, our Python service has different "endpoints" (specific URLs) for different tasks. `/api/resume` focuses purely on analyzing PDFs, while `/api/recommendations` focuses purely on math-based embedding matches.

### How Does the AI Mock Interview Work?

If the evaluator asks how our flagship AI mock interview works, here is the detailed technical flow:

**1. Speaking the Question (Text-to-Speech)**
When an interview starts, the platform doesn't just show the question; it *speaks* it. We use the browser's built-in **Web Speech API (`window.speechSynthesis`)**. It takes the text of the question, finds the best-sounding natural human voice available on the user's computer, and plays the audio aloud. This ensures a realistic interview experience without relying on heavy external audio servers!

**2. Capturing the User's Answer (Speech-to-Text)**
The user can type their answer or speak directly into their microphone. If they choose to speak, we use the **Web Speech API (`SpeechRecognition`)**. As the user talks, the browser listens and instantly transcribes their voice into a text string in real-time.

**3. The AI Evaluation Process**
Once the user's spoken answer is captured as text, it is sent to our Node.js backend. The backend is securely connected to the **Google Gemini API**.

To evaluate the answer, we don't just ask Gemini if it's "good." We use a highly specific **Prompt Engineering** technique. We send a hidden instruction that looks like this:
> *"You are an expert technical interviewer. The question asked was: X. The perfect expected answer covers these points: Y. The user's actual answer was: Z. Compare the user's answer to the expected points. Give a score out of 10, and provide exactly 2 sentences of constructive feedback explaining what they missed."*

**4. The Result**
Gemini reads this prompt, logically compares the concepts in the user's answer to the expected answer, and generates a structured score and feedback. The backend saves this data into MongoDB and sends it back to the React frontend to display to the user instantly.

---

## Summary for the Evaluator

If your evaluator asks: **"How does the platform work under the hood?"**

You can confidently say:
> "Our platform uses a **Node.js/Express backend** to handle core business logic, user authentication (via JWT), and data storage in **MongoDB**. Because AI operations can be heavy, we split our architecture. We rely on the **Google Gemini API** for generative tasks like dynamic study notes and interview evaluations. Furthermore, we built a specialized **Python FastAPI Microservice** that handles advanced AI features like semantic resume parsing and intelligent job matching using **Vector Embeddings**."
