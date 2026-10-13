const config = {
  title: "Samruddhi Badgujar | Backend & AI Engineer",
  description: {
    long: "Explore the portfolio of Samruddhi Badgujar, a backend and AI engineer and final-year Information Technology student at Bharati Vidyapeeth's College of Engineering for Women, Pune — building distributed systems with Java/Spring Boot and Python/FastAPI, and AI-agent products with LangGraph.",
    short:
      "Portfolio of Samruddhi Badgujar, a backend and AI engineer building distributed systems and AI-powered products.",
  },

  keywords: [
    "Samruddhi Badgujar",
    "Samruddhi",
    "backend engineer",
    "AI engineer",
    "Java developer",
    "Python developer",
    "Spring Boot",
    "FastAPI",
    "Django",
    "LangGraph",
    "React",
    "AI agents",
    "Machine Learning",
    "system design",
    "distributed systems",
    "REST APIs",
    "PostgreSQL",
    "MongoDB",
    "portfolio",
    "Information Technology",
  ],

  author: "Samruddhi Badgujar",
  email: "samruddhi.10@outlook.com",

  // Temporary until you have a custom domain.
  // We'll update this before deployment.
  site: "https://samruddhi-badgujar.vercel.app",

  // GitHub profile
  githubUsername: "samruddhi2006",

  // We'll change this later if we want the GitHub stars button
  // to point to one of your projects.
  githubRepo: "distributed-job-scheduler",

  get ogImg() {
    return this.site + "/assets/seo/og-image.png";
  },

  social: {
    // Not provided — hidden in UI. Uncomment and fill to enable.
    twitter: undefined as string | undefined,
    instagram: undefined as string | undefined,
    facebook: undefined as string | undefined,
    linkedin: "https://www.linkedin.com/in/samruddhi10/",
    github: "https://github.com/samruddhi2006",
  },
};

export { config };

