import { Project, Skill, TimelineItem, Achievement } from '@/types';

export const PERSONAL_INFO = {
  name: "Muhammad Shahbaz",
  title: "Software Engineer",
  email: "shahbaz4462@gmail.com",
  tagline: "Building scalable web applications, modern UIs, and intelligent digital solutions.",
  heroBio: "Passionate Software Engineer focused on building scalable web applications, modern user interfaces, and user-friendly digital experiences. I enjoy transforming ideas into high-quality software solutions using modern technologies.",
  aboutBio: "I am pursuing a Bachelor of Science in Software Engineering (2023 - 2027) with a deep passion for architectural clean code, algorithmic problem-solving, and building high-impact software systems.",
  qualification: "BS Software Engineering (2023 - 2027)",
  githubUsername: "Shahbaz4462",
  githubUrl: "https://github.com/Shahbaz4462",
  location: "Pakistan",
  availability: "Available for Full-time Roles & High-Impact Projects",
  metrics: [
    { label: "Production Projects", value: "10+" },
    { label: "Core Competency", value: "Full Stack & AI" },
    { label: "Uptime & Quality Focus", value: "99.9%" },
    { label: "Continuous Learning", value: "24/7" },
  ]
};

export const PROJECTS: Project[] = [
  {
    id: "e-blood-bank",
    title: "E-Blood Bank Management System",
    shortDescription: "A complete blood bank management platform where donors, recipients, and organizations can efficiently manage blood donations, requests, and inventories with an intuitive interface.",
    fullDescription: "E-Blood Bank is a full-featured web-based healthcare platform built to connect blood donors, recipients, and healthcare organizations in real time. It automates inventory updates, processes urgent blood requests, provides geographical donor search, and enforces secure authorization roles to streamline emergency response times when saving lives.",
    image: "/projects/blood-bank-preview.svg",
    screenshots: [
      "/projects/blood-bank-preview.svg",
      "/projects/blood-bank-detail-1.svg",
      "/projects/blood-bank-detail-2.svg"
    ],
    category: "Full Stack",
    techStack: ["React", "TypeScript", "Node.js", "Express", "MongoDB", "Tailwind CSS", "Vercel"],
    features: [
      "Real-time blood stock & inventory management",
      "Interactive donor registration and location mapping",
      "Emergency blood request broadcast system",
      "Multi-role dashboard for Admins, Donors, and Hospitals",
      "Automated email notifications & SMS alerts integration",
      "Responsive design with high contrast emergency mode"
    ],
    challengesSolved: [
      "Engineered an automated matching algorithm to notify nearest blood donors based on blood group compatibility.",
      "Optimized database queries for real-time inventory updates under concurrent emergency request spikes."
    ],
    architectureOverview: "Client-Server architecture utilizing React & TypeScript for a fast single-page app frontend, communicating via REST APIs to a Node.js microservice backed by MongoDB for persistent donor records.",
    liveDemoUrl: "https://e-blood-bank-flax.vercel.app/",
    githubUrl: "https://github.com/Shahbaz4462/E-Blood-Bank",
    featured: true
  },
  {
    id: "sargodha-sweets",
    title: "Sargodha Sweets POS & Store",
    shortDescription: "A responsive modern sweets shop website showcasing products, categories, promotions, and an elegant shopping & Point-of-Sale experience.",
    fullDescription: "Sargodha Sweets is an end-to-end POS and e-commerce platform designed specifically for bakeries, sweet shops, and confectionery retail. It handles daily inventory tracking, fast checkout billing, printable invoice generation, customer history records, and dynamic product catalog showcasing.",
    image: "/projects/sargodha-sweets-preview.svg",
    screenshots: [
      "/projects/sargodha-sweets-preview.svg",
      "/projects/sargodha-sweets-detail-1.svg",
      "/projects/sargodha-sweets-detail-2.svg"
    ],
    category: "POS System",
    techStack: ["React", "TypeScript", "Tailwind CSS", "Vite", "Lucide Icons", "Vercel"],
    features: [
      "Point of Sale (POS) checkout interface with quick keyboard shortcuts",
      "Categorized product catalog with custom weight & pricing tiers",
      "Automated invoice generator with thermal receipt print format",
      "Daily, weekly, and monthly sales reporting dashboard",
      "Stock inventory threshold alerts for reordering items",
      "Sleek dark and light mode UI tailor-made for cashier ergonomics"
    ],
    challengesSolved: [
      "Developed offline-capable local state caching for POS operations to ensure zero billing interruption during network dropouts.",
      "Optimized component rendering for sub-100ms item search filtering across multi-thousand SKU inventories."
    ],
    architectureOverview: "Built using React & TypeScript with Zustand/Context API state management for atomic billing updates, leveraging browser LocalStorage for offline persistence and Tailwind CSS for rapid responsive styling.",
    liveDemoUrl: "https://sargodha-sweets.vercel.app/",
    githubUrl: "https://github.com/Shahbaz4462/Billing-System",
    featured: true
  },
  {
    id: "credit-scoring-system",
    title: "ML Credit Scoring System",
    shortDescription: "A machine learning based credit scoring web application that predicts customer creditworthiness using predictive analytics and interactive visualizations.",
    fullDescription: "The Credit Scoring System leverages advanced machine learning classification algorithms to calculate creditworthiness metrics for consumer loan applicants. By parsing historical transaction trends, debt-to-income ratios, and payment consistency, it produces probabilistic risk scores alongside explanatory feature importance charts.",
    image: "/projects/credit-scoring-preview.svg",
    screenshots: [
      "/projects/credit-scoring-preview.svg",
      "/projects/credit-scoring-detail-1.svg",
      "/projects/credit-scoring-detail-2.svg"
    ],
    category: "Machine Learning",
    techStack: ["Python", "Jupyter Notebook", "Scikit-Learn", "Pandas", "NumPy", "React", "Chart.js"],
    features: [
      "Interactive risk score calculator with parameter sliders",
      "Ensemble learning classifier for credit decision forecasting",
      "Feature importance visual breakdown for transparent model explainability",
      "Data preprocessing pipeline with SMOTE class balancing",
      "Interactive data charts and risk category classification (Low/Medium/High Risk)",
      "Instant PDF decision report export capability"
    ],
    challengesSolved: [
      "Addressed extreme dataset class imbalance using synthetic minority oversampling (SMOTE) to prevent high-risk false negatives.",
      "Streamlined Python ML inference pipeline for sub-second REST API prediction responses."
    ],
    architectureOverview: "Data modeling trained in Python (Scikit-Learn/Pandas), deployed as an inference microservice REST endpoint supplying predictive vectors to an interactive React dashboard with Chart.js analytics.",
    liveDemoUrl: "https://code-alpha-credit-scoring.vercel.app/",
    githubUrl: "https://github.com/Shahbaz4462/CodeAlpha-Credit-Scoring-",
    featured: true
  },
  {
    id: "speech-emotion-recognition",
    title: "Speech Emotion Recognition Platform",
    shortDescription: "An end-to-end Speech Emotion Recognition platform designed to detect vocal affect from audio signals with balanced confidence metrics.",
    fullDescription: "An advanced machine learning application that analyzes human speech input to classify emotional states (Joy, Anger, Sadness, Neutral, Fear) from acoustic spectrograph features. Features live microphone recording and file upload capabilities.",
    image: "/projects/emotion-recognition-preview.svg",
    screenshots: [
      "/projects/emotion-recognition-preview.svg",
      "/projects/emotion-recognition-detail-1.svg"
    ],
    category: "Machine Learning",
    techStack: ["Python", "Librosa", "Scikit-Learn", "React", "TypeScript", "Tailwind CSS"],
    features: [
      "Real-time audio signal parsing & MFCC feature extraction",
      "Interactive spectrograph audio waveform visualization",
      "Multi-class emotion confidence scoring with breakdown breakdown",
      "Vocal sample recording & instant audio file drag-and-drop"
    ],
    challengesSolved: [
      "Extracted Mel-Frequency Cepstral Coefficients (MFCC) to isolate vocal timbre from background ambient audio noise."
    ],
    architectureOverview: "Python Librosa feature extraction pipeline coupled with neural network classification, powering a React frontend dashboard.",
    liveDemoUrl: "https://code-alpha-emotion-recognition.vercel.app/",
    githubUrl: "https://github.com/Shahbaz4462/CodeAlpha-Emotion-Recognition",
    featured: false
  }
];

export const SKILLS: Skill[] = [
  // Frontend
  { name: "React / Next.js", category: "Frontend", level: "Experienced", icon: "Code2", description: "Building modern SSR/SSG web applications with clean component design patterns." },
  { name: "TypeScript", category: "Frontend", level: "Experienced", icon: "FileCode2", description: "Writing strictly typed, robust, and scalable JavaScript applications." },
  { name: "Tailwind CSS", category: "Frontend", level: "Experienced", icon: "Palette", description: "Crafting modern glassmorphic, responsive, accessible UI designs." },
  { name: "HTML5 & CSS3 / SASS", category: "Frontend", level: "Experienced", icon: "Layout", description: "Semantic markup, CSS Grid, Flexbox, keyframe animations, responsive design." },
  { name: "Framer Motion", category: "Frontend", level: "Advanced", icon: "Sparkles", description: "Creating smooth layout animations, gestures, and fluid UI micro-interactions." },
  { name: "State Management (Redux/Zustand)", category: "Frontend", level: "Advanced", icon: "Layers", description: "Managing complex global app states and atomic reactivity efficiently." },

  // Backend
  { name: "Node.js & Express", category: "Backend", level: "Experienced", icon: "Server", description: "Developing fast RESTful APIs, middleware architecture, and microservices." },
  { name: "Python & FastAPI", category: "Backend", level: "Advanced", icon: "Terminal", description: "Building high-performance data microservices and machine learning backends." },
  { name: "RESTful API Design", category: "Backend", level: "Experienced", icon: "Network", description: "Architecting clean, versioned, documented, and secure API endpoints." },

  // Programming Languages
  { name: "JavaScript (ES6+)", category: "Programming Languages", level: "Experienced", icon: "FileCode", description: "Deep understanding of event loops, asynchronous promises, and functional concepts." },
  { name: "TypeScript", category: "Programming Languages", level: "Experienced", icon: "ShieldCheck", description: "Advanced generic interfaces, utility types, and strict type safety." },
  { name: "Python", category: "Programming Languages", level: "Experienced", icon: "Cpu", description: "Data manipulation, ML scripting, OOP algorithms, and backend tooling." },
  { name: "C++", category: "Programming Languages", level: "Intermediate", icon: "Binary", description: "Data structures, memory management, and algorithmic complexity fundamentals." },

  // Databases
  { name: "MongoDB", category: "Databases", level: "Experienced", icon: "Database", description: "Document modeling, aggregation pipelines, indexing, and Mongoose ORM." },
  { name: "PostgreSQL & SQL", category: "Databases", level: "Intermediate", icon: "Table", description: "Relational database schema normalization, foreign keys, and query optimization." },

  // Tools & Deployment
  { name: "Git & GitHub", category: "Tools & Deployment", level: "Experienced", icon: "GitBranch", description: "Version control workflows, branching strategies, PR code reviews, CI/CD." },
  { name: "Vercel / Netlify", category: "Tools & Deployment", level: "Experienced", icon: "Cloud", description: "Continuous integration deployment, environment configuration, edge routes." },
  { name: "Vite & Webpack", category: "Tools & Deployment", level: "Advanced", icon: "Zap", description: "Fast module bundling, tree-shaking, and development tooling." },
  { name: "Machine Learning (Scikit-Learn)", category: "Tools & Deployment", level: "Advanced", icon: "Brain", description: "Predictive modeling, data classification, preprocessing, and model evaluation." }
];

export const TIMELINE_ITEMS: TimelineItem[] = [
  {
    year: "2023 - 2027",
    title: "BS Software Engineering Degree",
    subtitle: "Higher Academic Qualification",
    description: "Specializing in core software engineering principles, software design patterns, database architecture, algorithms, and web applications.",
    type: "education",
    technologies: ["Software Architecture", "Data Structures", "Algorithms", "Database Design", "OOP"]
  },
  {
    year: "2024 - 2026",
    title: "Full-Stack Web & POS Systems",
    subtitle: "Production Project Engineering",
    description: "Designed and engineered full-stack platforms including E-Blood Bank Management and Sargodha Sweets POS, optimizing client checkout workflows and emergency donor dispatching.",
    type: "project",
    technologies: ["React", "TypeScript", "Node.js", "MongoDB", "Tailwind CSS", "Vercel"]
  },
  {
    year: "2025 - 2026",
    title: "Machine Learning & AI Integration",
    subtitle: "Applied Predictive Analytics",
    description: "Built predictive classification applications for credit scoring and speech emotion recognition with high precision.",
    type: "learning",
    technologies: ["Python", "Scikit-Learn", "Pandas", "Audio Processing", "Computer Vision"]
  },
  {
    year: "2026",
    title: "Open Source & Developer Ecosystem",
    subtitle: "Public Repositories & Tooling",
    description: "Actively publishing structured open source repositories, maintaining clean documentation, and collaborating with developer communities on GitHub.",
    type: "opensource",
    technologies: ["Git", "GitHub Actions", "CI/CD", "Documentation"]
  },
  {
    year: "Future Vision",
    title: "Senior Full Stack & AI Engineer",
    subtitle: "Continuous Innovation & Growth",
    description: "Striving to architect distributed high-performance software systems and empower global enterprises with intelligent, user-centric web applications.",
    type: "goal",
    technologies: ["Distributed Systems", "Cloud Computing", "AI Agents", "Scalable Microservices"]
  }
];

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: "responsive-web",
    title: "Responsive Web Development",
    description: "Crafting pixel-perfect layouts adaptable to mobile, tablet, and ultra-wide screens with zero layout shifts.",
    icon: "Smartphone",
    tag: "UI / UX"
  },
  {
    id: "modern-ui",
    title: "Modern UI/UX Design",
    description: "Designing sleek glassmorphic interfaces, smooth animations, and cohesive typography system.",
    icon: "Sparkles",
    tag: "Design System"
  },
  {
    id: "ml-projects",
    title: "Machine Learning Solutions",
    description: "Building predictive analytics models for credit scoring, emotion recognition, and computer vision.",
    icon: "Brain",
    tag: "AI & ML"
  },
  {
    id: "full-stack",
    title: "Full Stack Software Engineering",
    description: "Architecting end-to-end applications from database schemas to client-side state management.",
    icon: "Layers",
    tag: "Architecture"
  },
  {
    id: "clean-code",
    title: "Clean Code & Best Practices",
    description: "Enforcing strict TypeScript safety, modular components, reusable hooks, and clear documentation.",
    icon: "CheckCircle2",
    tag: "Quality"
  },
  {
    id: "problem-solving",
    title: "Algorithmic Problem Solving",
    description: "Deconstructing complex business requirements into fast, efficient, and maintainable software code.",
    icon: "Cpu",
    tag: "Logic"
  }
];
