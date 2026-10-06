export enum SkillNames {
  JAVA = "java",
  PYTHON = "python",
  JAVASCRIPT = "javascript",
  TYPESCRIPT = "typescript",
  HTML = "html",
  CSS = "css",
  REACT = "react",
  SPRING_BOOT = "spring-boot",
  DJANGO = "django",
  FASTAPI = "fastapi",
  NODEJS = "nodejs",
  EXPRESS = "express",
  POSTGRES = "postgres",
  MYSQL = "mysql",
  MONGODB = "mongodb",
  SQLALCHEMY = "sqlalchemy",
  JPA = "jpa",
  HIBERNATE = "hibernate",
  GIT = "git",
  GITHUB = "github",
  LINUX = "linux",
  MAVEN = "maven",
  DOCKER = "docker",
  POSTMAN = "postman",
  FIREBASE = "firebase",
  LANGGRAPH = "langgraph",
  AI_ML = "ai-ml",
}

export type Skill = {
  id: number;
  name: string;
  label: string;
  shortDescription: string;
  color: string;
  icon: string;
};

export const SKILLS: Record<SkillNames, Skill> = {
  [SkillNames.JAVA]: {
    id: 1,
    name: "java",
    label: "Java",
    shortDescription:
      "My primary language for building backend systems, APIs, and distributed applications.",
    color: "#f89820",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
  },

  [SkillNames.PYTHON]: {
    id: 2,
    name: "python",
    label: "Python",
    shortDescription:
      "Used for backend services, automation, data processing, and AI/ML applications.",
    color: "#3776ab",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
  },

  [SkillNames.JAVASCRIPT]: {
    id: 3,
    name: "javascript",
    label: "JavaScript",
    shortDescription:
      "Building interactive web applications and full-stack JavaScript systems.",
    color: "#f7df1e",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  },

  [SkillNames.TYPESCRIPT]: {
    id: 4,
    name: "typescript",
    label: "TypeScript",
    shortDescription:
      "Typed JavaScript for building maintainable frontend and full-stack applications.",
    color: "#3178c6",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
  },

  [SkillNames.HTML]: {
    id: 5,
    name: "html",
    label: "HTML",
    shortDescription:
      "Semantic structure and accessible foundations for the web.",
    color: "#e34f26",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
  },

  [SkillNames.CSS]: {
    id: 6,
    name: "css",
    label: "CSS",
    shortDescription:
      "Responsive interfaces, visual systems, animations, and polished interactions.",
    color: "#1572b6",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
  },

  [SkillNames.REACT]: {
    id: 7,
    name: "react",
    label: "React",
    shortDescription:
      "Building component-driven interfaces with rich interactions and reusable UI.",
    color: "#61dafb",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  },

  [SkillNames.SPRING_BOOT]: {
    id: 8,
    name: "spring-boot",
    label: "Spring Boot",
    shortDescription:
      "Building production-style Java backends, REST APIs, and distributed services.",
    color: "#6db33f",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg",
  },

  [SkillNames.DJANGO]: {
    id: 9,
    name: "django",
    label: "Django",
    shortDescription:
      "Python backend framework used for APIs, data processing, and rapid application development.",
    color: "#092e20",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg",
  },

  [SkillNames.FASTAPI]: {
    id: 10,
    name: "fastapi",
    label: "FastAPI",
    shortDescription:
      "High-performance Python APIs with validation, authentication, and clean service boundaries.",
    color: "#009688",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg",
  },

  [SkillNames.NODEJS]: {
    id: 11,
    name: "nodejs",
    label: "Node.js",
    shortDescription:
      "JavaScript runtime for building APIs, services, and full-stack applications.",
    color: "#339933",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
  },

  [SkillNames.EXPRESS]: {
    id: 12,
    name: "express",
    label: "Express.js",
    shortDescription:
      "Lightweight Node.js framework for building REST APIs and backend services.",
    color: "#ffffff",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
  },

  [SkillNames.POSTGRES]: {
    id: 13,
    name: "postgres",
    label: "PostgreSQL",
    shortDescription:
      "Relational database used extensively for transactional and data-intensive systems.",
    color: "#4169e1",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
  },

  [SkillNames.MYSQL]: {
    id: 14,
    name: "mysql",
    label: "MySQL",
    shortDescription:
      "Relational database for structured application data and backend systems.",
    color: "#4479a1",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
  },

  [SkillNames.MONGODB]: {
    id: 15,
    name: "mongodb",
    label: "MongoDB",
    shortDescription:
      "Document database used for flexible data models and MERN applications.",
    color: "#47a248",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
  },

  [SkillNames.SQLALCHEMY]: {
    id: 16,
    name: "sqlalchemy",
    label: "SQLAlchemy",
    shortDescription:
      "Python ORM and SQL toolkit used for robust database access and persistence.",
    color: "#d71f00",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sqlalchemy/sqlalchemy-original.svg",
  },

  [SkillNames.JPA]: {
    id: 17,
    name: "jpa",
    label: "JPA",
    shortDescription:
      "Java persistence abstraction used for transactional application data.",
    color: "#59666c",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
  },

  [SkillNames.HIBERNATE]: {
    id: 18,
    name: "hibernate",
    label: "Hibernate",
    shortDescription:
      "ORM framework used to model and persist relational data in Java applications.",
    color: "#59666c",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/hibernate/hibernate-original.svg",
  },

  [SkillNames.GIT]: {
    id: 19,
    name: "git",
    label: "Git",
    shortDescription:
      "Version control for managing development workflows and collaborative projects.",
    color: "#f05032",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
  },

  [SkillNames.GITHUB]: {
    id: 20,
    name: "github",
    label: "GitHub",
    shortDescription:
      "Code hosting, collaboration, version control, and open-source work.",
    color: "#ffffff",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
  },

  [SkillNames.LINUX]: {
    id: 21,
    name: "linux",
    label: "Linux",
    shortDescription:
      "Development environment and operating system fundamentals for backend engineering.",
    color: "#fcc624",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg",
  },

  [SkillNames.MAVEN]: {
    id: 22,
    name: "maven",
    label: "Maven",
    shortDescription:
      "Build and dependency management for Java applications.",
    color: "#c71a36",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/maven/maven-original.svg",
  },

  [SkillNames.DOCKER]: {
    id: 23,
    name: "docker",
    label: "Docker",
    shortDescription:
      "Containerizing applications and creating reproducible development environments.",
    color: "#2496ed",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
  },

  [SkillNames.POSTMAN]: {
    id: 24,
    name: "postman",
    label: "Postman",
    shortDescription:
      "API development, testing, and debugging.",
    color: "#ff6c37",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg",
  },

  [SkillNames.FIREBASE]: {
    id: 25,
    name: "firebase",
    label: "Firebase",
    shortDescription:
      "Authentication and application services used in full-stack projects.",
    color: "#ffca28",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg",
  },

  [SkillNames.LANGGRAPH]: {
    id: 26,
    name: "langgraph",
    label: "LangGraph",
    shortDescription:
      "Building stateful, multi-step AI agent workflows and orchestration.",
    color: "#7c3aed",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
  },

  [SkillNames.AI_ML]: {
    id: 27,
    name: "ai-ml",
    label: "AI / ML",
    shortDescription:
      "Applied AI and machine learning for intelligent workflows and data-driven applications.",
    color: "#06b6d4",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
  },
};

export type Experience = {
  id: number;
  startDate: string;
  endDate: string;
  title: string;
  company: string;
  description: string[];
  skills: SkillNames[];
};

export const EXPERIENCE: Experience[] = [
  {
    id: 1,
    startDate: "Dec 2024",
    endDate: "Jan 2025",
    title: "AI & ML Intern",
    company: "Passion Infotech · Pune",
    description: [
      "Developed Journalist Risk Guardian, a Django/Python backend for location-based journalist risk analysis using PostgreSQL, REST APIs, and GIS APIs.",
      "Built data ingestion pipelines to collect, clean, normalize, and persist external event datasets for downstream analysis.",
      "Implemented rule-based and AI-assisted risk scoring workflows that transformed geospatial and event data into location-level threat classifications.",
      "Developed REST APIs for journalist profiles, alerts, risk analysis, and safe route management.",
      "Integrated GIS APIs and background processing to automate geospatial analysis while separating processing workloads from request handling.",
    ],
    skills: [
      SkillNames.PYTHON,
      SkillNames.DJANGO,
      SkillNames.POSTGRES,
      SkillNames.AI_ML,
      SkillNames.LINUX,
    ],
  },
];

export const themeDisclaimers = {
  light: [
    "Light mode enabled. Clean, bright, and ready to explore.",
    "Welcome to the brighter side.",
    "A little extra brightness never hurt a good interface.",
  ],
  dark: [
    "Dark mode activated. Welcome to the portfolio.",
    "The dark side looks better anyway.",
    "Systems online. Explore away.",
  ],
};
