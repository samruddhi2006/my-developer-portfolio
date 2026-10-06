const config = {
  title: "Samruddhi Badgujar | Software Engineer",
  description: {
    long: "Explore the portfolio of Samruddhi Badgujar, a software engineer and final-year Information Technology student building reliable backend systems, full-stack applications, and intelligent AI-powered products.",
    short:
      "Portfolio of Samruddhi Badgujar, a software engineer building reliable systems, full-stack applications, and AI-powered products.",
  },

  keywords: [
    "Samruddhi Badgujar",
    "Samruddhi",
    "software engineer",
    "backend developer",
    "full-stack developer",
    "Java developer",
    "Python developer",
    "Spring Boot",
    "React",
    "FastAPI",
    "Django",
    "AI",
    "Machine Learning",
    "system design",
    "distributed systems",
    "REST APIs",
    "PostgreSQL",
    "MongoDB",
    "portfolio",
    "Pune developer",
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
    // TODO: Replace these placeholders with your actual profiles.
    twitter: "",
    linkedin: "https://www.linkedin.com/in/samruddhi10/",
    instagram: "",
    facebook: "",
    github: "https://github.com/samruddhi2006",
  },
};

export { config };

