import SlideShow from "@/components/slide-show";
import { Button } from "@/components/ui/button";
import { TypographyH3, TypographyP } from "@/components/ui/typography";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";

const BASE_PATH = "/assets/projects-screenshots";

/**
 * Renders a monochrome technology icon.
 * Icons are loaded from Devicon so we don't need to maintain
 * individual SVG files inside /public.
 */
const MaskIcon = ({
  src,
  title,
}: {
  src: string;
  title?: string;
}) => (
  <span
    role="img"
    aria-label={title}
    title={title}
    className="block bg-current"
    style={{
      width: "1em",
      height: "1em",
      WebkitMaskImage: `url(${src})`,
      maskImage: `url(${src})`,
      WebkitMaskRepeat: "no-repeat",
      maskRepeat: "no-repeat",
      WebkitMaskPosition: "center",
      maskPosition: "center",
      WebkitMaskSize: "contain",
      maskSize: "contain",
    }}
  />
);

/**
 * Project links
 */
const ProjectsLinks = ({
  live,
  repo,
}: {
  live?: string;
  repo?: string;
}) => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-start gap-3 my-3 mb-8">
      {live && live !== "#" && (
        <Link
          className="font-mono underline flex gap-2"
          rel="noopener noreferrer"
          target="_blank"
          href={live}
        >
          <Button variant="default" size="sm">
            Visit Website
            <ArrowUpRight className="ml-3 w-5 h-5" />
          </Button>
        </Link>
      )}

      {repo && repo !== "#" && (
        <Link
          className="font-mono underline flex gap-2"
          rel="noopener noreferrer"
          target="_blank"
          href={repo}
        >
          <Button variant="default" size="sm">
            GitHub
            <ArrowUpRight className="ml-3 w-5 h-5" />
          </Button>
        </Link>
      )}
    </div>
  );
};

export type Skill = {
  title: string;
  bg: string;
  fg: string;
  icon: ReactNode;
};

/**
 * Technology badge helper
 */
const brand = (
  title: string,
  iconUrl: string,
  bg = "black",
  fg = "white"
): Skill => ({
  title,
  bg,
  fg,
  icon: <MaskIcon src={iconUrl} title={title} />,
});

/**
 * Project technology definitions
 */
const PROJECT_SKILLS = {
  java: brand(
    "Java",
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg"
  ),

  springBoot: brand(
    "Spring Boot",
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg"
  ),

  python: brand(
    "Python",
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg"
  ),

  fastapi: brand(
    "FastAPI",
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg"
  ),

  django: brand(
    "Django",
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg"
  ),

  react: brand(
    "React",
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg"
  ),

  typescript: brand(
    "TypeScript",
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg"
  ),

  javascript: brand(
    "JavaScript",
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg"
  ),

  node: brand(
    "Node.js",
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg"
  ),

  express: brand(
    "Express.js",
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg"
  ),

  postgresql: brand(
    "PostgreSQL",
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg"
  ),

  mysql: brand(
    "MySQL",
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg"
  ),

  mongodb: brand(
    "MongoDB",
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg"
  ),

  hibernate: brand(
    "Hibernate",
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/hibernate/hibernate-original.svg"
  ),

  docker: brand(
    "Docker",
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg"
  ),

  git: brand(
    "Git",
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg"
  ),

  maven: brand(
    "Maven",
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/maven/maven-original.svg"
  ),

  sql: brand(
    "SQL",
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg"
  ),

  html: brand(
    "HTML",
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg"
  ),

  css: brand(
    "CSS",
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg"
  ),

  langgraph: {
    title: "LangGraph",
    bg: "black",
    fg: "white",
    icon: (
      <span className="text-[10px] font-bold tracking-tight">
        LG
      </span>
    ),
  },

  ai: {
    title: "AI / ML",
    bg: "black",
    fg: "white",
    icon: (
      <span className="text-xs font-bold">
        AI
      </span>
    ),
  },

  gis: {
    title: "GIS",
    bg: "black",
    fg: "white",
    icon: (
      <span className="text-xs font-bold">
        GIS
      </span>
    ),
  },

  rest: {
    title: "REST API",
    bg: "black",
    fg: "white",
    icon: (
      <span className="text-[10px] font-bold">
        API
      </span>
    ),
  },

  jwt: {
    title: "JWT",
    bg: "black",
    fg: "white",
    icon: (
      <span className="text-[10px] font-bold">
        JWT
      </span>
    ),
  },
};

export type Project = {
  id: string;
  category: string;
  title: string;
  src: string;
  screenshots: string[];
  skills: {
    frontend: Skill[];
    backend: Skill[];
  };
  content: React.ReactNode | any;
  github?: string;
  live?: string;
};

const projects: Project[] = [
  /**
   * =========================================================
   * DISTRIBUTED JOB SCHEDULER
   * =========================================================
   */
  {
    id: "distributed-job-scheduler",
    category: "Backend Engineering",
    title: "Distributed Job Scheduler",
    src: `${BASE_PATH}/distributed-job-scheduler/landing.png`,
    screenshots: [
      "landing.png",
      "scheduler.png",
      "execution-history.png",
    ],
    github:
      "https://github.com/samruddhi2006/distributed-job-scheduler",
    skills: {
      frontend: [],
      backend: [
        PROJECT_SKILLS.java,
        PROJECT_SKILLS.springBoot,
        PROJECT_SKILLS.hibernate,
        PROJECT_SKILLS.maven,
        PROJECT_SKILLS.postgresql,
        PROJECT_SKILLS.rest,
      ],
    },

    get content() {
      return (
        <div>
          <TypographyP className="font-mono text-2xl text-center">
            A distributed scheduler-worker system for scheduling, executing,
            monitoring, and retrying background jobs.
          </TypographyP>

          <TypographyP className="font-mono">
            Built using Java and Spring Boot with separate scheduling and
            execution services. The system exposes REST APIs for job
            management and uses Spring Data JPA/Hibernate for transactional
            persistence and execution history.
          </TypographyP>

          <ProjectsLinks repo={this.github} />

          <TypographyH3 className="my-4 mt-8">
            Distributed scheduler architecture
          </TypographyH3>

          <p className="font-mono mb-2">
            The system separates scheduling responsibilities from job
            execution through dedicated scheduler and worker services. Jobs
            can be scheduled using cron expressions and dispatched to
            registered workers for execution.
          </p>

          <p className="font-mono mb-2">
            Worker registration and heartbeat tracking provide visibility into
            worker availability, while the scheduler can detect failed or
            unavailable workers and handle job execution accordingly.
          </p>

          <SlideShow
            images={[
              `${BASE_PATH}/distributed-job-scheduler/landing.png`,
              `${BASE_PATH}/distributed-job-scheduler/scheduler.png`,
            ]}
          />

          <TypographyH3 className="my-4 mt-8">
            Retry and failure handling
          </TypographyH3>

          <p className="font-mono mb-2">
            Jobs support configurable retry limits and failure handling.
            Execution state transitions are persisted so the system can track
            successful executions, failed attempts, retries, and exhausted
            jobs.
          </p>

          <p className="font-mono mb-2">
            End-to-end success and failure workflows were validated,
            including retry exhaustion, state transitions, and persisted
            execution history.
          </p>

          <TypographyH3 className="my-4 mt-8">
            Executor design
          </TypographyH3>

          <p className="font-mono mb-2">
            The execution layer uses Factory and Strategy design patterns to
            support multiple executor types without coupling the scheduler to
            individual execution implementations.
          </p>

          <p className="font-mono mb-2">
            Current executor types include API, Script, and Database
            execution, making the system extensible without changing the core
            orchestration logic.
          </p>

          <SlideShow
            images={[
              `${BASE_PATH}/distributed-job-scheduler/execution-history.png`,
            ]}
          />
        </div>
      );
    },
  },

  /**
   * =========================================================
   * LEDGERLENS
   * =========================================================
   */
  {
    id: "ledgerlens",
    category: "FinTech / Backend Engineering",
    title: "LedgerLens",
    src: `${BASE_PATH}/ledgerlens/landing.png`,
    screenshots: [
      "landing.png",
      "reconciliation.png",
      "dashboard.png",
    ],
    skills: {
      frontend: [
        PROJECT_SKILLS.react,
        PROJECT_SKILLS.typescript,
      ],
      backend: [
        PROJECT_SKILLS.python,
        PROJECT_SKILLS.fastapi,
        PROJECT_SKILLS.postgresql,
        PROJECT_SKILLS.docker,
        PROJECT_SKILLS.sql,
        PROJECT_SKILLS.rest,
      ],
    },

    get content() {
      return (
        <div>
          <TypographyP className="font-mono text-2xl text-center">
            An evidence-first financial reconciliation platform for
            transaction matching, discrepancy diagnosis, and auditable
            reconciliation workflows.
          </TypographyP>

          <TypographyP className="font-mono">
            LedgerLens combines a FastAPI backend, PostgreSQL database,
            SQLAlchemy, Alembic, and a React/TypeScript frontend to provide a
            structured reconciliation workflow with authentication,
            authorization, validation, and tenant isolation.
          </TypographyP>

          <ProjectsLinks />

          <TypographyH3 className="my-4 mt-8">
            Secure financial data management
          </TypographyH3>

          <p className="font-mono mb-2">
            The backend implements Firebase authentication and
            role-based-access control with ownership isolation. REST APIs are
            protected by authorization and validation rules to ensure users
            can only access resources within their permitted scope.
          </p>

          <p className="font-mono mb-2">
            Database migrations are managed through Alembic while SQLAlchemy
            provides the persistence layer and transaction management.
          </p>

          <SlideShow
            images={[
              `${BASE_PATH}/ledgerlens/landing.png`,
              `${BASE_PATH}/ledgerlens/dashboard.png`,
            ]}
          />

          <TypographyH3 className="my-4 mt-8">
            Reliable CSV ingestion
          </TypographyH3>

          <p className="font-mono mb-2">
            The ingestion pipeline validates and normalizes CSV transaction
            data before persistence. Dates, amounts, currencies,
            debit/credit values, and descriptions are normalized into a
            consistent representation.
          </p>

          <p className="font-mono mb-2">
            Exact Decimal values are preserved for financial calculations,
            avoiding floating-point precision problems when processing
            monetary values.
          </p>

          <TypographyH3 className="my-4 mt-8">
            Deterministic reconciliation engine
          </TypographyH3>

          <p className="font-mono mb-2">
            LedgerLens implements deterministic transaction reconciliation
            using exact matching and date-tolerance matching strategies.
            Matched transactions and exceptions are persisted for later
            inspection and auditability.
          </p>

          <p className="font-mono mb-2">
            Reconciliation runs maintain their own lifecycle and summary
            metrics while supporting discrepancy diagnosis, filtering,
            pagination, idempotency, and tenant isolation.
          </p>

          <SlideShow
            images={[
              `${BASE_PATH}/ledgerlens/reconciliation.png`,
            ]}
          />
        </div>
      );
    },
  },

  /**
   * =========================================================
   * MERN JOB PORTAL
   * =========================================================
   */
  {
    id: "mern-job-portal",
    category: "Full-Stack Web Application",
    title: "MERN Job Portal",
    src: `${BASE_PATH}/job-portal/landing.png`,
    screenshots: [
      "landing.png",
      "jobs.png",
      "profile.png",
    ],
    github:
      "https://github.com/samruddhi2006/Job-Portal-Website",
    skills: {
      frontend: [
        PROJECT_SKILLS.react,
        PROJECT_SKILLS.javascript,
        PROJECT_SKILLS.html,
        PROJECT_SKILLS.css,
      ],
      backend: [
        PROJECT_SKILLS.node,
        PROJECT_SKILLS.express,
        PROJECT_SKILLS.mongodb,
        PROJECT_SKILLS.jwt,
        PROJECT_SKILLS.rest,
      ],
    },

    get content() {
      return (
        <div>
          <TypographyP className="font-mono text-2xl text-center">
            A full-stack job portal connecting recruiters and job seekers
            through secure, role-based workflows.
          </TypographyP>

          <TypographyP className="font-mono">
            Developed using MongoDB, Express.js, React, and Node.js with JWT
            authentication and role-based authorization.
          </TypographyP>

          <ProjectsLinks repo={this.github} />

          <TypographyH3 className="my-4 mt-8">
            Recruiter and job-seeker workflows
          </TypographyH3>

          <p className="font-mono mb-2">
            The application provides separate workflows for recruiters and
            job seekers. Recruiters can create and manage job postings,
            while job seekers can browse opportunities, manage their
            profiles, and submit applications.
          </p>

          <SlideShow
            images={[
              `${BASE_PATH}/job-portal/landing.png`,
              `${BASE_PATH}/job-portal/jobs.png`,
            ]}
          />

          <TypographyH3 className="my-4 mt-8">
            Authentication and authorization
          </TypographyH3>

          <p className="font-mono mb-2">
            JWT-based authentication secures user sessions while
            role-based authorization prevents users from accessing
            functionality outside their assigned role.
          </p>

          <p className="font-mono mb-2">
            REST APIs provide the communication layer between the React
            frontend and Node.js/Express backend, with MongoDB schemas
            managing application data.
          </p>

          <TypographyH3 className="my-4 mt-8">
            Full-stack architecture
          </TypographyH3>

          <p className="font-mono mb-2">
            The project covers the complete application lifecycle, from
            frontend interfaces and REST API design to authentication,
            database modeling, authorization, and user management.
          </p>

          <SlideShow
            images={[
              `${BASE_PATH}/job-portal/profile.png`,
            ]}
          />
        </div>
      );
    },
  },

  /**
   * =========================================================
   * JOURNALIST RISK GUARDIAN
   * =========================================================
   */
  {
    id: "journalist-risk-guardian",
    category: "AI / ML & Geospatial Systems",
    title: "Journalist Risk Guardian",
    src: `${BASE_PATH}/journalist-risk-guardian/landing.png`,
    screenshots: [
      "landing.png",
      "risk-analysis.png",
      "alerts.png",
    ],
    skills: {
      frontend: [],
      backend: [
        PROJECT_SKILLS.python,
        PROJECT_SKILLS.django,
        PROJECT_SKILLS.postgresql,
        PROJECT_SKILLS.ai,
        PROJECT_SKILLS.gis,
        PROJECT_SKILLS.rest,
      ],
    },

    get content() {
      return (
        <div>
          <TypographyP className="font-mono text-2xl text-center">
            A location-aware risk analysis platform designed to help identify
            and classify threats relevant to journalists.
          </TypographyP>

          <TypographyP className="font-mono">
            Developed during my AI &amp; ML internship at Passion Infotech,
            Journalist Risk Guardian uses Django/Python, PostgreSQL, REST APIs,
            and GIS APIs to transform external event and geospatial data into
            location-level risk information.
          </TypographyP>

          <TypographyH3 className="my-4 mt-8">
            Data ingestion and processing
          </TypographyH3>

          <p className="font-mono mb-2">
            Built data ingestion pipelines to collect external event datasets,
            clean and normalize incoming information, and persist the
            processed data in PostgreSQL for downstream analysis.
          </p>

          <p className="font-mono mb-2">
            The processing pipeline separates data collection and analysis
            workloads from request handling, allowing geospatial processing
            to run independently of API requests.
          </p>

          <SlideShow
            images={[
              `${BASE_PATH}/journalist-risk-guardian/landing.png`,
              `${BASE_PATH}/journalist-risk-guardian/risk-analysis.png`,
            ]}
          />

          <TypographyH3 className="my-4 mt-8">
            Risk scoring
          </TypographyH3>

          <p className="font-mono mb-2">
            Implemented rule-based and AI-assisted risk scoring workflows that
            transform event and geospatial information into location-level
            threat classifications.
          </p>

          <p className="font-mono mb-2">
            The resulting risk information can be used by the application to
            surface relevant alerts and support safer route planning.
          </p>

          <TypographyH3 className="my-4 mt-8">
            REST API architecture
          </TypographyH3>

          <p className="font-mono mb-2">
            Developed REST APIs covering journalist profiles, alerts, risk
            analysis, and safe route management. GIS integrations provide the
            geospatial capabilities required by the platform.
          </p>

          <SlideShow
            images={[
              `${BASE_PATH}/journalist-risk-guardian/alerts.png`,
            ]}
          />
        </div>
      );
    },
  },

  /**
   * =========================================================
   * MULTI-AGENT TRAVEL PLANNER
   * =========================================================
   */
  {
    id: "multi-agent-travel-planner",
    category: "AI / Multi-Agent Systems",
    title: "Multi-Agent Travel Planner",
    src: `${BASE_PATH}/travel-planner/landing.png`,
    screenshots: [
      "landing.png",
    ],
    github:
      "https://github.com/samruddhi2006/A-Multi-Agent-Travel-Planner-With-LangGraph",
    skills: {
      frontend: [],
      backend: [
        PROJECT_SKILLS.python,
        PROJECT_SKILLS.langgraph,
        PROJECT_SKILLS.ai,
      ],
    },

    get content() {
      return (
        <div>
          <TypographyP className="font-mono text-2xl text-center">
            An AI-powered multi-agent travel planning project built with
            LangGraph.
          </TypographyP>

          <TypographyP className="font-mono">
            This project explores agent-based orchestration for travel
            planning, using multiple specialized AI components to break down
            the planning process into smaller tasks and coordinate their
            results into a final travel plan.
          </TypographyP>

          <ProjectsLinks repo={this.github} />

          <TypographyH3 className="my-4 mt-8">
            Multi-agent orchestration
          </TypographyH3>

          <p className="font-mono mb-2">
            Instead of relying on a single model response, the application
            uses a graph-based workflow to organize different stages of the
            travel planning process.
          </p>

          <p className="font-mono mb-2">
            LangGraph provides the orchestration layer for managing the flow
            between agents and coordinating intermediate results.
          </p>

          <SlideShow
            images={[
              `${BASE_PATH}/travel-planner/landing.png`,
            ]}
          />

          <TypographyH3 className="my-4 mt-8">
            AI-assisted planning
          </TypographyH3>

          <p className="font-mono mb-2">
            The project demonstrates how structured agent workflows can be
            used to transform user requirements into a more complete,
            context-aware travel plan.
          </p>
        </div>
      );
    },
  },

  /**
   * =========================================================
   * AI RESUME ANALYZER
   * =========================================================
   */
  {
    id: "ai-resume-analyzer",
    category: "AI Application",
    title: "AI Resume Analyzer",
    src: `${BASE_PATH}/ai-resume-analyzer/landing.png`,
    screenshots: [
      "landing.png",
    ],
    github:
      "https://github.com/samruddhi2006/ai_resume-analyzer",
    skills: {
      frontend: [],
      backend: [
        PROJECT_SKILLS.python,
        PROJECT_SKILLS.ai,
      ],
    },

    get content() {
      return (
        <div>
          <TypographyP className="font-mono text-2xl text-center">
            An AI-powered application for analyzing resumes and extracting
            useful insights from candidate information.
          </TypographyP>

          <TypographyP className="font-mono">
            The project explores the use of artificial intelligence for
            understanding resume content and assisting with resume analysis.
          </TypographyP>

          <ProjectsLinks repo={this.github} />

          <TypographyH3 className="my-4 mt-8">
            Resume analysis
          </TypographyH3>

          <p className="font-mono mb-2">
            The application processes resume information and uses AI-based
            analysis to identify relevant information from the document.
          </p>

          <SlideShow
            images={[
              `${BASE_PATH}/ai-resume-analyzer/landing.png`,
            ]}
          />
        </div>
      );
    },
  },

  /**
   * =========================================================
   * AI IMAGE CAPTION GENERATOR
   * =========================================================
   */
  {
    id: "ai-image-caption-generator",
    category: "AI / Computer Vision",
    title: "AI Image Caption Generator",
    src: `${BASE_PATH}/ai-image-caption-generator/landing.png`,
    screenshots: [
      "landing.png",
    ],
    github:
      "https://github.com/samruddhi2006/ai-image-caption-generator",
    skills: {
      frontend: [],
      backend: [
        PROJECT_SKILLS.python,
        PROJECT_SKILLS.ai,
      ],
    },

    get content() {
      return (
        <div>
          <TypographyP className="font-mono text-2xl text-center">
            An AI project exploring automatic image understanding and caption
            generation.
          </TypographyP>

          <TypographyP className="font-mono">
            The project uses machine learning techniques to generate natural
            language descriptions for visual content.
          </TypographyP>

          <ProjectsLinks repo={this.github} />

          <TypographyH3 className="my-4 mt-8">
            Image understanding
          </TypographyH3>

          <p className="font-mono mb-2">
            The project explores the connection between computer vision and
            natural language generation by transforming visual information
            into descriptive text.
          </p>

          <SlideShow
            images={[
              `${BASE_PATH}/ai-image-caption-generator/landing.png`,
            ]}
          />
        </div>
      );
    },
  },

  /**
   * =========================================================
   * SIP CALCULATOR
   * =========================================================
   */
  {
    id: "sip-calculator",
    category: "Web Application",
    title: "SIP Calculator",
    src: `${BASE_PATH}/sip-calculator/landing.png`,
    screenshots: [
      "landing.png",
    ],
    github:
      "https://github.com/samruddhi2006/sipcalculator",
    skills: {
      frontend: [
        PROJECT_SKILLS.html,
        PROJECT_SKILLS.css,
        PROJECT_SKILLS.javascript,
      ],
      backend: [],
    },

    get content() {
      return (
        <div>
          <TypographyP className="font-mono text-2xl text-center">
            A simple investment calculator for estimating returns from
            systematic investment plans.
          </TypographyP>

          <TypographyP className="font-mono">
            A lightweight project focused on implementing financial
            calculations and presenting the results through a simple web
            interface.
          </TypographyP>

          <ProjectsLinks repo={this.github} />

          <SlideShow
            images={[
              `${BASE_PATH}/sip-calculator/landing.png`,
            ]}
          />
        </div>
      );
    },
  },
];

export default projects;
