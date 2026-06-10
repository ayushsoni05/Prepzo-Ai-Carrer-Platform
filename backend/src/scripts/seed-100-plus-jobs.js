import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import Company from '../models/Company.model.js';
import Job from '../models/Job.model.js';
import User from '../models/User.model.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let MONGO_URI = process.env.MONGODB_URI;

console.log(`🚀 Targeting Database configured in MONGODB_URI`);
const DEFAULT_ADMIN_ID = '69a590f221db2e23dc9e1e11';

// 25 Top Companies Definition
const companiesData = [
  { name: 'Google', industry: 'Software Development', companyType: 'MNC', headquarterCity: 'Mountain View', description: 'Google LLC is an American multinational technology company focusing on search engine technology, online advertising, cloud computing, computer software, quantum computing, e-commerce, artificial intelligence, and consumer electronics.' },
  { name: 'Microsoft', industry: 'Software Development', companyType: 'MNC', headquarterCity: 'Redmond', description: 'Microsoft Corporation is an American multinational technology corporation producing computer software, consumer electronics, personal computers, and social services.' },
  { name: 'Amazon', industry: 'E-commerce', companyType: 'MNC', headquarterCity: 'Seattle', description: 'Amazon.com, Inc. is an American multinational technology company focusing on e-commerce, cloud computing, online advertising, digital streaming, and artificial intelligence.' },
  { name: 'Meta', industry: 'Software Development', companyType: 'MNC', headquarterCity: 'Menlo Park', description: 'Meta Platforms, Inc., doing business as Meta, is an American multinational technology conglomerate based in Menlo Park, California, owning Facebook, Instagram, and WhatsApp.' },
  { name: 'Apple', industry: 'Software Development', companyType: 'MNC', headquarterCity: 'Cupertino', description: 'Apple Inc. is an American multinational technology company headquartered in Cupertino, California, that designs, develops, and sells consumer electronics, computer software, and online services.' },
  { name: 'Netflix', industry: 'Media & Entertainment', companyType: 'MNC', headquarterCity: 'Los Gatos', description: 'Netflix, Inc. is an American media company based in Los Gatos, California, offering subscription-based video on demand streaming services and original productions.' },
  { name: 'Uber', industry: 'Software Development', companyType: 'MNC', headquarterCity: 'San Francisco', description: 'Uber Technologies, Inc., commonly referred to as Uber, provides ride-hailing, food delivery, package delivery, couriers, freight transportation, and electric bicycle rental.' },
  { name: 'Airbnb', industry: 'Hospitality', companyType: 'MNC', headquarterCity: 'San Francisco', description: 'Airbnb, Inc. operates an online marketplace for lodging, primarily homestays for vacation rentals, and tourism activities.' },
  { name: 'Stripe', industry: 'Finance & Banking', companyType: 'MNC', headquarterCity: 'San Francisco', description: 'Stripe, Inc. is an Irish-American financial services and software as a service company dual-headquartered in South San Francisco, California, and Dublin, Ireland.' },
  { name: 'Coinbase', industry: 'Finance & Banking', companyType: 'MNC', headquarterCity: 'San Francisco', description: 'Coinbase Global, Inc., branded Coinbase, is an American company that operates a cryptocurrency exchange platform.' },
  { name: 'TCS', industry: 'Information Technology', companyType: 'MNC', headquarterCity: 'Mumbai', description: 'Tata Consultancy Services is an Indian multinational information technology services and consulting company headquartered in Mumbai.' },
  { name: 'Infosys', industry: 'Information Technology', companyType: 'MNC', headquarterCity: 'Bengaluru', description: 'Infosys Limited is an Indian multinational information technology company that provides business consulting, information technology and outsourcing services.' },
  { name: 'Wipro', industry: 'Information Technology', companyType: 'MNC', headquarterCity: 'Bengaluru', description: 'Wipro Limited is an Indian multinational corporation that provides information technology, consultant, and business process services.' },
  { name: 'Razorpay', industry: 'Finance & Banking', companyType: 'Startup', headquarterCity: 'Bengaluru', description: 'Razorpay is a leading fintech platform in India providing payment gateway services, business banking solutions, and working capital loans.' },
  { name: 'Paytm', industry: 'Finance & Banking', companyType: 'Startup', headquarterCity: 'Noida', description: 'One97 Communications Limited, widely known as Paytm, is an Indian multinational technology company specializing in digital payment systems, e-commerce, and financial services.' },
  { name: 'Swiggy', industry: 'E-commerce', companyType: 'Startup', headquarterCity: 'Bengaluru', description: 'Swiggy is India\'s leading on-demand convenience platform, offering food delivery, quick commerce (Instamart), and dining out services.' },
  { name: 'Zomato', industry: 'E-commerce', companyType: 'Startup', headquarterCity: 'Gurugram', description: 'Zomato is an Indian multinational restaurant aggregator and food delivery company offering information, user reviews, and food delivery options.' },
  { name: 'CRED', industry: 'Finance & Banking', companyType: 'Startup', headquarterCity: 'Bengaluru', description: 'CRED is an Indian fintech company that offers credit card reward services, payment features, and personal loans.' },
  { name: 'Zepto', industry: 'E-commerce', companyType: 'Startup', headquarterCity: 'Mumbai', description: 'Zepto is India\'s fastest-growing quick commerce application delivering groceries, fresh produce, and daily essentials in under 10 minutes.' },
  { name: 'Flipkart', industry: 'E-commerce', companyType: 'MNC', headquarterCity: 'Bengaluru', description: 'Flipkart Private Limited is an Indian e-commerce company, headquartered in Bangalore, and incorporated in Singapore as a private limited company.' },
  { name: 'Meesho', industry: 'E-commerce', companyType: 'Startup', headquarterCity: 'Bengaluru', description: 'Meesho is an Indian social commerce platform that enables small businesses and individuals to start online stores via social channels.' },
  { name: 'Groww', industry: 'Finance & Banking', companyType: 'Startup', headquarterCity: 'Bengaluru', description: 'Groww is an online investment platform that allows users to invest in mutual funds, stocks, US stocks, ETFs, and gold.' },
  { name: 'InMobi', industry: 'Software Development', companyType: 'Startup', headquarterCity: 'Bengaluru', description: 'InMobi is an Indian multinational technology company that specializes in mobile advertising and mobile marketing platforms.' },
  { name: 'PhonePe', industry: 'Finance & Banking', companyType: 'MNC', headquarterCity: 'Bengaluru', description: 'PhonePe is an Indian digital payments and financial services company headquartered in Bengaluru, Karnataka, India.' },
  { name: 'OLA', industry: 'Other', companyType: 'Startup', headquarterCity: 'Bengaluru', description: 'Ola Cabs is an Indian multinational ridesharing company, offering services including vehicle for hire and food delivery, and pioneering electric vehicles.' }
];

// Perks list
const perksList = [
  'Hybrid Working Model',
  'Premium Health Insurance (Family Cover)',
  'Annual Learning & Development Allowance',
  'Home Office Setup Allowance',
  'Flexible Paid Time Off (PTO)',
  'Complimentary Healthy Meals & Snacks',
  'Gym Membership & Wellness Allowance',
  'Equity Options (ESOPs)',
  'Parental Leave & Support Plans'
];

// Role templates
const roleTemplates = [
  {
    roleCategory: 'Software Engineer',
    department: 'Engineering',
    title: 'Software Engineer (AI/ML)',
    experienceLevel: 'entry',
    salaryMin: 1200000,
    salaryMax: 2200000,
    description: `As a Software Engineer in the AI/ML division, you will design and develop core machine learning pipelines, optimize deep learning models for production, and integrate intelligent features into our core product suite. You will work closely with Data Scientists and Platform Engineers to build highly scalable services.

Key Focus Areas:
- Designing end-to-end data processing pipelines for machine learning models.
- Optimizing model inference latencies and scaling infrastructure.
- Collaborative product design to launch AI-driven capabilities.`,
    responsibilities: [
      'Design, implement, and maintain production-grade machine learning pipelines.',
      'Collaborate with product and design teams to identify and execute AI/ML opportunities.',
      'Optimize neural networks and machine learning models for low latency and high scalability.',
      'Build robust API endpoints and microservices to serve model predictions.',
      'Conduct rigorous performance evaluations and diagnostic tests on production models.'
    ],
    requiredSkills: [
      { skill: 'Python', importance: 'required' },
      { skill: 'PyTorch', importance: 'required' },
      { skill: 'Machine Learning', importance: 'required' },
      { skill: 'SQL', importance: 'required' }
    ],
    preferredSkills: ['Kubernetes', 'Docker', 'TensorFlow', 'FastAPI'],
    hiringProcess: [
      { order: 1, stage: 'Technical Assessment', description: '60-minute coding and algorithmic challenge focusing on data structures and basic ML concepts.' },
      { order: 2, stage: 'System Design Interview', description: 'Deep dive into machine learning systems engineering, scaling model deployments, and data pipelines.' },
      { order: 3, stage: 'ML & Coding Panel', description: 'Live coding session implementing a machine learning algorithm from scratch followed by deep technical questions.' },
      { order: 4, stage: 'Managerial & Cultural Fit', description: 'Discussion on past projects, collaboration style, and alignment with company core values.' }
    ]
  },
  {
    roleCategory: 'Backend Developer',
    department: 'Engineering',
    title: 'Senior Backend Engineer (Node.js/Go)',
    experienceLevel: 'senior',
    salaryMin: 2400000,
    salaryMax: 4500000,
    description: `We are looking for a Senior Backend Engineer to own the architecture, development, and scaling of our distributed financial settlement services. You will build high-throughput APIs, ensure absolute system reliability, and lead database schema design.

Key Focus Areas:
- Designing event-driven architectures with high throughput and data consistency.
- Mentoring junior engineers and executing code reviews.
- Migrating legacy monolith endpoints to Go-based microservices.`,
    responsibilities: [
      'Architect and build resilient microservices using Node.js and Golang.',
      'Optimize SQL and NoSQL database queries for maximum performance and cost efficiency.',
      'Implement asynchronous queue-based flows for background processing.',
      'Ensure high security standards, encryption-at-rest, and data privacy.',
      'Monitor, debug, and troubleshoot production systems under heavy load.'
    ],
    requiredSkills: [
      { skill: 'Node.js', importance: 'required' },
      { skill: 'Go', importance: 'required' },
      { skill: 'MongoDB', importance: 'required' },
      { skill: 'Redis', importance: 'required' }
    ],
    preferredSkills: ['Kafka', 'PostgreSQL', 'AWS', 'gRPC'],
    hiringProcess: [
      { order: 1, stage: 'Screening Call', description: '30-minute introductory call discussing technical background and core backend knowledge.' },
      { order: 2, stage: 'Backend Coding Challenge', description: 'Build a production-ready microservice module with tests and containerization in 90 minutes.' },
      { order: 3, stage: 'Architecture Design Interview', description: 'Design a highly available, fault-tolerant ledger and processing system.' },
      { order: 4, stage: 'Director Round', description: 'Discuss engineering vision, leadership experiences, and technical tradeoffs.' }
    ]
  },
  {
    roleCategory: 'Frontend Developer',
    department: 'Engineering',
    title: 'Frontend Engineer (React/TypeScript)',
    experienceLevel: 'mid',
    salaryMin: 1000000,
    salaryMax: 1800000,
    description: `Join our team to build next-generation user interfaces that feel responsive and alive. You will craft pixel-perfect, premium user dashboards, optimize UI performance, and establish reusable component design systems.

Key Focus Areas:
- Translating intricate UI/UX prototypes into clean React code.
- Streamlining page load times, asset caching, and bundles.
- Maintaining component-level state and custom hooks.`,
    responsibilities: [
      'Develop modular, accessible, and performant React applications using TypeScript.',
      'Collaborate with UI/UX designers to implement design system tokens.',
      'Manage global state architectures using Redux Toolkit or Zustand.',
      'Write comprehensive unit and integration tests using Jest and Testing Library.',
      'Optimize user interactions for diverse screen dimensions and mobile viewports.'
    ],
    requiredSkills: [
      { skill: 'React', importance: 'required' },
      { skill: 'TypeScript', importance: 'required' },
      { skill: 'TailwindCSS', importance: 'required' },
      { skill: 'JavaScript', importance: 'required' }
    ],
    preferredSkills: ['Next.js', 'Framer Motion', 'GraphQL', 'Webpack'],
    hiringProcess: [
      { order: 1, stage: 'Frontend Challenge', description: 'Interactive exercise to build a interactive dashboard UI from a mockup with full API integration.' },
      { order: 2, stage: 'JavaScript Core Review', description: 'Deep dive into DOM event loops, closures, asynchronous flows, and React rendering loops.' },
      { order: 3, stage: 'System Design & Integration', description: 'Discussing state management, API contract designs, security, and performance.' }
    ]
  },
  {
    roleCategory: 'Full Stack Developer',
    department: 'Engineering',
    title: 'Full Stack Developer (MERN)',
    experienceLevel: 'mid',
    salaryMin: 1200000,
    salaryMax: 2200000,
    description: `We are looking for a versatile Full Stack Developer to build end-to-end features. You will design responsive client interfaces in React and build matching backend endpoints in Node.js, taking complete ownership of feature modules from database schemas to client deployment.

Key Focus Areas:
- Rapid prototyping and feature development.
- Maintaining cohesive data flows between database and client.
- Creating secure user authentication and authorization logic.`,
    responsibilities: [
      'Build scalable web applications using React, Express, and Node.js.',
      'Design Mongoose schemas and write optimized database aggregation queries.',
      'Create and integrate secure RESTful APIs with JSON Web Tokens.',
      'Implement responsive layouts using custom CSS/Tailwind.',
      'Identify bottlenecks and optimize backend API latency and client render cycles.'
    ],
    requiredSkills: [
      { skill: 'React', importance: 'required' },
      { skill: 'Node.js', importance: 'required' },
      { skill: 'MongoDB', importance: 'required' },
      { skill: 'Express', importance: 'required' }
    ],
    preferredSkills: ['TypeScript', 'Mongoose', 'Docker', 'AWS'],
    hiringProcess: [
      { order: 1, stage: 'Coding Assessment', description: 'Algorithms and API development task completed on our browser sandbox.' },
      { order: 2, stage: 'Full Stack Technical Round', description: 'Build a small full stack app in real time with focus on database schemas and component state.' },
      { order: 3, stage: 'Cultural Fitment', description: 'Discussing remote work best practices, project ownership, and team values.' }
    ]
  },
  {
    roleCategory: 'DevOps Engineer',
    department: 'DevOps',
    title: 'DevOps & Infrastructure Engineer',
    experienceLevel: 'mid',
    salaryMin: 1400000,
    salaryMax: 2500000,
    description: `As a DevOps Engineer, you will own the cloud infrastructure, CI/CD deployment automation, and monitoring pipelines. You will build highly available clusters, manage container deployments, and ensure absolute platform stability.

Key Focus Areas:
- Streamlining code deployments with automated CI/CD pipelines.
- Managing Infrastructure as Code (IaC) templates.
- Monitoring system health, latency, and log pipelines.`,
    responsibilities: [
      'Design, configure, and maintain cloud infrastructure on AWS/GCP.',
      'Deploy and orchestrate containerized applications using Kubernetes.',
      'Build robust CI/CD pipelines using GitHub Actions or GitLab.',
      'Manage Infrastructure as Code using Terraform or CloudFormation.',
      'Configure logs and monitoring dashboards using Prometheus, Grafana, or ELK.'
    ],
    requiredSkills: [
      { skill: 'Docker', importance: 'required' },
      { skill: 'Kubernetes', importance: 'required' },
      { skill: 'Terraform', importance: 'required' },
      { skill: 'AWS', importance: 'required' }
    ],
    preferredSkills: ['Linux', 'Bash', 'Helm', 'Prometheus'],
    hiringProcess: [
      { order: 1, stage: 'Infra Coding Test', description: 'Terraform and shell scripting exercise to deploy a basic containerized app.' },
      { order: 2, stage: 'Infrastructure Design', description: 'Design a multi-region deployment layout for a stateful SaaS platform.' },
      { order: 3, stage: 'Hiring Manager Round', description: 'Discussing operational challenges, on-call experience, and cost optimization.' }
    ]
  },
  {
    roleCategory: 'Data Scientist',
    department: 'Data Science',
    title: 'Data Scientist – Product & Growth Analytics',
    experienceLevel: 'mid',
    salaryMin: 1400000,
    salaryMax: 2600000,
    description: `Join us as a Data Scientist to drive product intelligence and growth decisions. You will build user propensity models, run complex A/B test experiments, and query massive data lakes to uncover deep user behavioral patterns.

Key Focus Areas:
- Building machine learning models for recommendation, churn, and LTV.
- Designing experimental frameworks for statistical A/B testing.
- Analyzing data vectors to inform product design roadmaps.`,
    responsibilities: [
      'Develop machine learning models to forecast user engagement and retention.',
      'Design, run, and analyze statistically rigorous A/B tests on key product features.',
      'Query big data warehouses (BigQuery/Snowflake) to extract growth insights.',
      'Build interactive analytics dashboards in Tableau or Looker.',
      'Collaborate with Product Managers to define and measure success metrics.'
    ],
    requiredSkills: [
      { skill: 'Python', importance: 'required' },
      { skill: 'SQL', importance: 'required' },
      { skill: 'Statistics', importance: 'required' },
      { skill: 'Pandas', importance: 'required' }
    ],
    preferredSkills: ['Snowflake', 'BigQuery', 'Tableau', 'Scikit-Learn'],
    hiringProcess: [
      { order: 1, stage: 'Data Case Study', description: 'Take-home assessment analyzing user event logs to recommend growth opportunities.' },
      { order: 2, stage: 'Technical & Statistics Round', description: 'Deep dive into regression models, probability theory, hypothesis testing, and SQL queries.' },
      { order: 3, stage: 'Behavioral Fit', description: 'Discussion on cross-functional collaboration and data storytelling.' }
    ]
  },
  {
    roleCategory: 'Product Manager',
    department: 'Product',
    title: 'Product Manager – Core platform',
    experienceLevel: 'mid',
    salaryMin: 1800000,
    salaryMax: 3000000,
    description: `We are looking for a Product Manager to define the roadmap for our core developer-facing APIs and platform services. You will act as the bridge between engineering, business, and customers, translating user pain points into technical product specifications.

Key Focus Areas:
- Writing comprehensive PRDs and specifying functional APIs.
- Managing sprint planning and backlog prioritization.
- Defining product telemetry and analytics instrumentation.`,
    responsibilities: [
      'Define the platform vision, strategy, and roadmap for API developer tools.',
      'Write detailed Product Requirement Documents (PRDs) and API blueprints.',
      'Collaborate with Engineering Leads to prioritize tasks and resolve blocks.',
      'Track and analyze developer onboarding metrics, API latency impact, and usage.',
      'Engage with enterprise clients to gather feedback and refine features.'
    ],
    requiredSkills: [
      { skill: 'Product Management', importance: 'required' },
      { skill: 'API Design', importance: 'required' },
      { skill: 'Agile Methodology', importance: 'required' },
      { skill: 'Jira', importance: 'required' }
    ],
    preferredSkills: ['SQL', 'Postman', 'Figma', 'Amplitude'],
    hiringProcess: [
      { order: 1, stage: 'Product Design Round', description: 'Interactive case interview focusing on building a developer platform product from scratch.' },
      { order: 2, stage: 'Analytical Case Round', description: 'Discussing metrics, telemetry data, and prioritizing engineering efforts.' },
      { order: 3, stage: 'Executive Alignment Round', description: 'Strategic discussion on business impact, pricing models, and stakeholder management.' }
    ]
  },
  {
    roleCategory: 'UI/UX Designer',
    department: 'Design',
    title: 'Product Designer (UI/UX)',
    experienceLevel: 'mid',
    salaryMin: 900000,
    salaryMax: 1600000,
    description: `We are seeking a Product Designer to design beautiful, user-centered product flows. You will create user journeys, build interactive wireframes in Figma, test user prototypes, and maintain our premium UI design system.

Key Focus Areas:
- Creating intuitive UI patterns and dashboard visual systems.
- Conducting user interviews and validation tests.
- Partnering with developers to guarantee implementation quality.`,
    responsibilities: [
      'Design interface mockups, wireframes, and prototype interactions using Figma.',
      'Conduct qualitative user testing sessions and distill actionable insights.',
      'Collaborate with frontend developers to govern design system tokens.',
      'Create high-fidelity animations, micro-interactions, and visual layouts.',
      'Build detailed user journey maps and process flowcharts.'
    ],
    requiredSkills: [
      { skill: 'Figma', importance: 'required' },
      { skill: 'UI Design', importance: 'required' },
      { skill: 'Prototyping', importance: 'required' },
      { skill: 'User Research', importance: 'required' }
    ],
    preferredSkills: ['Adobe Illustrator', 'Framer', 'CSS', 'Micro-interactions'],
    hiringProcess: [
      { order: 1, stage: 'Portfolio Review', description: 'Walkthrough of past designs, focusing on user problem statement and design system structure.' },
      { order: 2, stage: 'Design Challenge', description: 'Whiteboarding session to design a complex user dashboard flow in real time.' },
      { order: 3, stage: 'Collaboration Review', description: 'Discussing designer-developer handoff, critique meetings, and visual feedback loops.' }
    ]
  },
  {
    roleCategory: 'QA Engineer',
    department: 'QA',
    title: 'QA Automation Engineer',
    experienceLevel: 'entry',
    salaryMin: 600000,
    salaryMax: 1200000,
    description: `We are looking for a QA Automation Engineer to build automated integration and end-to-end testing frameworks. You will write robust test scripts, execute regression suites, and track bugs to ensure top product quality.

Key Focus Areas:
- Building test scripts for APIs and web client dashboards.
- Incorporating automation suites into CI/CD build runs.
- Reviewing product specifications to outline clear test cases.`,
    responsibilities: [
      'Write and execute automated test scripts using Selenium or Cypress.',
      'Develop backend API tests using Postman, Supertest, or Python.',
      'Identify, document, log, and monitor system bugs in Jira.',
      'Perform detailed regression test cycles during release pushes.',
      'Collaborate with software engineers to implement test plans.'
    ],
    requiredSkills: [
      { skill: 'Selenium', importance: 'required' },
      { skill: 'Cypress', importance: 'required' },
      { skill: 'JavaScript', importance: 'required' },
      { skill: 'Manual Testing', importance: 'required' }
    ],
    preferredSkills: ['Jest', 'Postman', 'Jira', 'GitHub Actions'],
    hiringProcess: [
      { order: 1, stage: 'QA Practical Challenge', description: 'Write automated Cypress test scripts for a mockup login and checkout application.' },
      { order: 2, stage: 'Testing Methodology Round', description: 'Discuss black-box vs white-box testing, boundary values, and API test parameters.' },
      { order: 3, stage: 'Team Panel', description: 'Discussing bugs communication, release cycle timelines, and automation strategies.' }
    ]
  },
  {
    roleCategory: 'Security Engineer',
    department: 'Security',
    title: 'Security & Compliance Analyst',
    experienceLevel: 'mid',
    salaryMin: 1200000,
    salaryMax: 2200000,
    description: `Join us as a Security Engineer to protect our customer database and maintain strict SOC2/ISO compliance. You will conduct penetration tests, scan code dependencies for vulnerabilities, and monitor firewalls.

Key Focus Areas:
- Managing audit compliance guidelines (SOC2, ISO27001, GDPR).
- Conducting static and dynamic code vulnerability scanning.
- Reviewing firewall logs and user access logs.`,
    responsibilities: [
      'Monitor and secure cloud applications against external threats.',
      'Conduct security code reviews and coordinate penetration testing.',
      'Establish and maintain company security policies for audit compliance.',
      'Implement data encryption mechanisms, secure key vaults, and MFA.',
      'Assess third-party library vulnerabilities and manage updates.'
    ],
    requiredSkills: [
      { skill: 'Cybersecurity', importance: 'required' },
      { skill: 'SOC2', importance: 'required' },
      { skill: 'Penetration Testing', importance: 'required' },
      { skill: 'OAuth', importance: 'required' }
    ],
    preferredSkills: ['AWS Security', 'OWASP Top 10', 'ISO27001', 'SSL/TLS'],
    hiringProcess: [
      { order: 1, stage: 'Security Scenario Challenge', description: 'Examine a mockup system architecture and list all potential security gaps and vulnerabilities.' },
      { order: 2, stage: 'Security Technical Round', description: 'Deep dive into authorization protocols, cross-site scripting (XSS), SQL Injection, and audit requirements.' },
      { order: 3, stage: 'Cultural Fit', description: 'Discussing company security protocols, user awareness training, and compliance checks.' }
    ]
  },
  {
    roleCategory: 'Growth Marketing Manager',
    department: 'Marketing',
    title: 'Growth Marketing Manager',
    experienceLevel: 'mid',
    salaryMin: 900000,
    salaryMax: 1500000,
    description: `We are looking for a data-driven Growth Marketer to lead customer acquisition across search, social, and referral loops. You will build marketing campaigns, manage search engine ads (SEM), and optimize conversion landing pages.

Key Focus Areas:
- Launching paid ad campaigns on Google Ads, Meta, and LinkedIn.
- Analyzing client acquisition costs (CAC) and customer lifetime value (LTV).
- Executing A/B tests on conversion funnels and copywriting.`,
    responsibilities: [
      'Design, build, and optimize paid acquisition campaigns across digital media.',
      'Track, monitor, and report key performance indicators (ROI, CTR, CAC).',
      'Optimize web landing pages and signup funnels for conversion.',
      'Collaborate with copywriters and designers to produce visual ad creatives.',
      'Coordinate referral marketing and viral loop features within the app.'
    ],
    requiredSkills: [
      { skill: 'Digital Marketing', importance: 'required' },
      { skill: 'Google Ads', importance: 'required' },
      { skill: 'Google Analytics', importance: 'required' },
      { skill: 'Copywriting', importance: 'required' }
    ],
    preferredSkills: ['Meta Ads', 'SEO', 'A/B Testing', 'HTML/CSS'],
    hiringProcess: [
      { order: 1, stage: 'Marketing Case Challenge', description: 'Draft a full growth marketing campaign launch document with target CAC, CPC, and ad copies.' },
      { order: 2, stage: 'Analytical Review', description: 'Deep dive into customer acquisition funnels, retention cohorts, and attribution modeling.' }
    ]
  },
  {
    roleCategory: 'Talent Acquisition Specialist',
    department: 'HR',
    title: 'Talent Acquisition & HR Lead',
    experienceLevel: 'mid',
    salaryMin: 800000,
    salaryMax: 1400000,
    description: `We are seeking a Talent Acquisition Lead to scale our product engineering and sales teams. You will source candidate profiles, build interview pipelines, manage recruitment processes, and coordinate onboarding.

Key Focus Areas:
- Sourcing candidates on LinkedIn, GitHub, and hiring platforms.
- Hosting interview loops and coordinating candidate feedback.
- Coordinating employee onboarding, benefits, and engagement programs.`,
    responsibilities: [
      'Manage end-to-end recruitment processes for engineering and business teams.',
      'Source candidate pipelines using passive search methods (LinkedIn Recruiter).',
      'Conduct initial screening rounds and assess cultural alignment.',
      'Coordinate candidate interview loops and compile feedback reports.',
      'Coordinate employee onboarding, orientation, and policy reviews.'
    ],
    requiredSkills: [
      { skill: 'Recruiting', importance: 'required' },
      { skill: 'Sourcing', importance: 'required' },
      { skill: 'HR Policies', importance: 'required' },
      { skill: 'Communication', importance: 'required' }
    ],
    preferredSkills: ['LinkedIn Recruiter', 'ATS Systems', 'Employee Relations', 'Negotiation'],
    hiringProcess: [
      { order: 1, stage: 'Introductory Interview', description: 'Discuss recruiting methods, hiring target metrics, and background.' },
      { order: 2, stage: 'Sourcing & Scenario Simulation', description: 'Simulate sourcing for a difficult SDE role and outline communication strategies.' }
    ]
  },
  {
    roleCategory: 'Operations Manager',
    department: 'Operations',
    title: 'Operations & Program Manager',
    experienceLevel: 'mid',
    salaryMin: 1000000,
    salaryMax: 1800000,
    description: `We are looking for an Operations Manager to lead operational workflows and coordinate cross-functional projects. You will optimize supply chain steps, manage merchant onboarding, and resolve customer delivery blocks.

Key Focus Areas:
- Building workflow manuals for operations teams.
- Tracking operational costs, delivery latencies, and service levels.
- Directing partner relations and vendor contract alignments.`,
    responsibilities: [
      'Oversee day-to-day operations and execute critical program goals.',
      'Analyze workflow data to identify bottlenecks and optimize overhead costs.',
      'Coordinate with vendor partners and manage service level agreements (SLAs).',
      'Define operational manuals and standard operating procedures (SOPs).',
      'Resolve logistics, delivery, and system issues under tight deadlines.'
    ],
    requiredSkills: [
      { skill: 'Operations', importance: 'required' },
      { skill: 'SQL', importance: 'required' },
      { skill: 'Excel', importance: 'required' },
      { skill: 'Project Management', importance: 'required' }
    ],
    preferredSkills: ['Tableau', 'Negotiation', 'Logistics', 'Agile'],
    hiringProcess: [
      { order: 1, stage: 'Operational Case Study', description: 'Analyze a mock delivery log and propose optimizations to reduce average latency by 15%.' },
      { order: 2, stage: 'Data & SQL Assessment', description: 'Check data querying skills using complex joins, aggregations, and Excel analysis.' }
    ]
  },
  {
    roleCategory: 'Business Analyst',
    department: 'Finance',
    title: 'Financial & Business Analyst',
    experienceLevel: 'mid',
    salaryMin: 900000,
    salaryMax: 1600000,
    description: `We are seeking a Business Analyst to build financial models, track company budget distributions, and guide capital investment plans. You will work closely with the leadership team to review operational budgets and build ROI reports.

Key Focus Areas:
- Formulating operational budgets and tracking cost targets.
- Creating financial forecasts, dashboards, and profit margin analysis.
- Reporting business metrics to external stakeholders.`,
    responsibilities: [
      'Build financial models to analyze business metrics and project future profits.',
      'Prepare monthly financial reviews, budget trackers, and variance sheets.',
      'Collaborate with business heads to review and optimize operational budgets.',
      'Query databases using SQL to extract transaction cohorts and user trends.',
      'Prepare pitch books and presentations for board members.'
    ],
    requiredSkills: [
      { skill: 'Excel', importance: 'required' },
      { skill: 'SQL', importance: 'required' },
      { skill: 'Finance', importance: 'required' },
      { skill: 'Data Analysis', importance: 'required' }
    ],
    preferredSkills: ['Financial Modeling', 'PowerBI', 'Python', 'Corporate Finance'],
    hiringProcess: [
      { order: 1, stage: 'Financial Modeling Exercise', description: 'Build a standard 3-statement financial model and forecast revenue growth.' },
      { order: 2, stage: 'Analytical SQL Round', description: 'Live coding session solving business queries using complex SQL joins.' }
    ]
  }
];

// Helper to select random elements
const getRandomElements = (arr, num) => {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, num);
};

async function seed100Jobs() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGO_URI);
    console.log('Connected.');

    // Ensure Admin User exists
    let admin = await User.findById(DEFAULT_ADMIN_ID);
    if (!admin) {
      console.log('Default admin not found, searching for any admin...');
      admin = await User.findOne({ role: 'admin' });
      if (!admin) {
        console.error('CRITICAL: No admin user found. Creating one...');
        admin = await User.create({
          _id: new mongoose.Types.ObjectId(DEFAULT_ADMIN_ID),
          fullName: 'System Admin',
          email: 'admin@prepzo.com',
          password: 'AdminPassword123!',
          role: 'admin',
          isOnboarded: true,
          targetRole: 'SDE',
          yearOfStudy: '4',
          fieldOfStudy: 'Computer Science',
          degree: 'B.Tech',
          collegeName: 'System University',
          gender: 'Other',
          dateOfBirth: new Date('2000-01-01'),
          phone: '0000000000'
        });
      }
    }
    console.log(`Attributing jobs to: ${admin.email}`);

    // CLEAR EXISTING DATA
    console.log('Clearing existing jobs and companies...');
    await Job.deleteMany({});
    await Company.deleteMany({});
    console.log('Cleared.');

    const companyIds = [];
    const companyCache = new Map();

    // Create 25 Companies
    console.log('Creating 25 companies...');
    for (const comp of companiesData) {
      const company = await Company.create({
        name: comp.name,
        industry: comp.industry,
        companyType: comp.companyType,
        description: comp.description,
        status: 'approved',
        addedBy: admin._id,
        hiringStatus: 'actively_hiring',
        headquarters: { city: comp.headquarterCity, country: 'India' },
        logo: `https://ui-avatars.com/api/?name=${encodeURIComponent(comp.name)}&background=random&size=200`
      });
      companyIds.push(company._id);
      companyCache.set(comp.name, company._id);
    }
    console.log(`Created ${companyIds.length} companies.`);

    // Generate exactly 100 jobs (4 per company across 25 companies = 100 jobs)
    console.log('Creating 100 detailed jobs...');
    let jobCount = 0;
    
    // Shuffle role templates to distribute randomly
    let roleIndex = 0;

    for (const companyName of companyCache.keys()) {
      const companyId = companyCache.get(companyName);

      // Create 4 jobs for each company to hit exactly 100 jobs
      for (let i = 0; i < 4; i++) {
        // Pick role template sequentially to ensure uniform distribution
        const template = roleTemplates[roleIndex % roleTemplates.length];
        roleIndex++;

        // Add company name suffix or tweak titles occasionally for variation
        let finalTitle = template.title;
        if (i === 1) finalTitle = `${template.title} - Payments Platform`;
        if (i === 2) finalTitle = `${template.title} (Core Infrastructure)`;
        if (i === 3) finalTitle = `Associate ${template.title}`;

        // Locations distribution
        const locationsList = [
          { city: 'Bengaluru', state: 'Karnataka', country: 'India' },
          { city: 'Hyderabad', state: 'Telangana', country: 'India' },
          { city: 'Pune', state: 'Maharashtra', country: 'India' },
          { city: 'Noida', state: 'Uttar Pradesh', country: 'India' },
          { city: 'Gurugram', state: 'Haryana', country: 'India' }
        ];
        // Select random city or remote
        const locations = Math.random() > 0.8 ? [{ city: 'Remote', country: 'India' }] : [locationsList[jobCount % locationsList.length]];

        // Education degree requirements
        const degrees = ["Bachelor's", "Master's", "Any"];
        const fields = [['Computer Science', 'Information Technology', 'Software Engineering'], ['Business Administration', 'Marketing', 'Commerce'], ['Any']];
        const selectedDegree = template.department === 'Engineering' || template.department === 'Data Science' ? degrees[0] : degrees[2];
        const selectedFields = template.department === 'Engineering' || template.department === 'Data Science' ? fields[0] : fields[2];

        // Random deadline (rolling or 30-90 days in future)
        const applicationDeadline = Math.random() > 0.5 ? null : new Date(Date.now() + (30 + (jobCount % 60)) * 24 * 60 * 60 * 1000);

        // Required and preferred skills formatting
        const requiredSkills = template.requiredSkills.map(sk => ({
          skill: sk.skill,
          importance: 'required'
        }));
        
        // Select 3-4 random perks
        const jobPerks = getRandomElements(perksList, 4);

        await Job.create({
          title: finalTitle,
          company: companyId,
          description: template.description,
          responsibilities: template.responsibilities,
          jobType: 'full_time',
          workMode: locations[0].city === 'Remote' ? 'remote' : (Math.random() > 0.5 ? 'hybrid' : 'onsite'),
          experienceLevel: template.experienceLevel,
          experienceRequired: {
            min: template.experienceLevel === 'entry' ? 0 : template.experienceLevel === 'mid' ? 2 : 5,
            max: template.experienceLevel === 'entry' ? 2 : template.experienceLevel === 'mid' ? 5 : 10
          },
          locations: locations,
          applicationLink: 'https://prepzo.ai/careers',
          applicationDeadline: applicationDeadline,
          status: 'active',
          isApproved: true,
          postedBy: admin._id,
          approvedBy: admin._id,
          approvedAt: new Date(),
          salary: {
            min: template.salaryMin,
            max: template.salaryMax,
            currency: 'INR',
            period: 'yearly'
          },
          requiredSkills: requiredSkills,
          preferredSkills: template.preferredSkills,
          educationRequired: {
            degree: selectedDegree,
            fields: selectedFields,
            minCGPA: template.department === 'Engineering' ? 7.0 : 6.0
          },
          hiringProcess: template.hiringProcess,
          benefits: jobPerks.slice(0, 2),
          perks: jobPerks.slice(2, 4),
          tags: [template.roleCategory, template.department, companyName]
        });

        jobCount++;
      }
    }

    console.log('\n✅ SEEDING COMPLETE!');
    console.log(`Summary: Created 25 companies and ${jobCount} highly detailed jobs.`);
    
    // Update company job counts
    console.log('Updating job counts in companies...');
    for (const companyId of companyIds) {
      const count = await Job.countDocuments({ company: companyId });
      await Company.findByIdAndUpdate(companyId, { jobCount: count });
    }
    console.log('Update complete.');

    process.exit(0);
  } catch (error) {
    console.error('Seeding failed:', error);
    process.exit(1);
  }
}

seed100Jobs();
