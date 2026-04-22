export interface InterviewRole {
  id: string;
  title: string;
  description: string;
  category: string;
  icon: string;
  questions: string[];
}

export const INTERVIEW_ROLES: InterviewRole[] = [
  {
    id: 'frontend',
    title: 'Frontend Developer',
    description: 'Focus on UI/UX, React, JavaScript, and CSS performance.',
    category: 'Engineering',
    icon: 'Layout',
    questions: [
      "Explain the difference between useMemo and useCallback. When should you use each?",
      "How does the Virtual DOM work in React, and how does it improve performance?",
      "What are the different ways to handle state management in a large-scale React application?",
      "Describe the CSS Box Model and the difference between content-box and border-box.",
      "How do you optimize a web application for better Core Web Vitals?"
    ]
  },
  {
    id: 'backend',
    title: 'Backend Developer',
    description: 'System design, APIs, Databases, and Server-side logic.',
    category: 'Engineering',
    icon: 'Server',
    questions: [
      "What is the difference between SQL and NoSQL databases? When would you choose one over the other?",
      "Explain the concept of microservices architecture and its pros and cons.",
      "How do you handle authentication and authorization in a REST API?",
      "What are database indexes and how do they improve query performance? What are the trade-offs?",
      "Describe the CAP theorem and its implications on distributed systems."
    ]
  },
  {
    id: 'fullstack',
    title: 'Full Stack Engineer',
    description: 'End-to-end application development and architecture.',
    category: 'Engineering',
    icon: 'Layers',
    questions: [
      "How do you ensure security across both the frontend and backend of an application?",
      "Describe your process for debugging a complex issue that spans from the client to the database.",
      "What is the difference between Server-Side Rendering (SSR) and Static Site Generation (SSG)?",
      "Explain how WebSockets differ from traditional HTTP requests and when to use them.",
      "How do you manage database migrations in a production environment?"
    ]
  },
  {
    id: 'datascience',
    title: 'Data Scientist',
    description: 'Machine Learning, Statistics, and Data Analysis.',
    category: 'Data',
    icon: 'Database',
    questions: [
      "What is the difference between supervised and unsupervised learning?",
      "Explain the concept of overfitting and how you can prevent it.",
      "How do you handle missing or imbalanced data in a dataset?",
      "Describe the difference between L1 and L2 regularization.",
      "What is a p-value and how is it used in hypothesis testing?"
    ]
  },
  {
    id: 'devops',
    title: 'DevOps Engineer',
    description: 'CI/CD, Cloud Infrastructure, and Scalability.',
    category: 'Infrastructure',
    icon: 'Cloud',
    questions: [
      "What is Infrastructure as Code (IaC) and why is it important?",
      "Explain the difference between continuous integration, continuous delivery, and continuous deployment.",
      "How do you secure a CI/CD pipeline?",
      "What are containers, and how do they differ from virtual machines?",
      "How do you monitor the health and performance of a distributed system in production?"
    ]
  },
  {
    id: 'product',
    title: 'Product Manager',
    description: 'Strategy, Roadmap, and User-centric design.',
    category: 'Management',
    icon: 'Briefcase',
    questions: [
      "How do you prioritize features when you have limited resources and multiple stakeholders?",
      "Describe a time you had to pivot a product strategy based on user feedback.",
      "What metrics do you track to measure the success of a new feature?",
      "How do you handle a situation where the engineering team and design team have conflicting priorities?",
      "How do you define the Minimum Viable Product (MVP) for a new concept?"
    ]
  }
];
