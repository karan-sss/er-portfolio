// Single source of truth for everything the page says.
// Keep every claim factual; the detailed, metric-heavy version lives in the CV.

export interface Link {
  label: string;
  href: string;
}

export interface Highlight {
  title: string;
  points: string[];
}

export interface Engagement {
  where: string;
  period: string;
  highlights: Highlight[];
  stack: string[];
}

export interface Job {
  company: string;
  role: string;
  period: string;
  engagements: Engagement[];
}

export interface Project {
  name: string;
  period: string;
  summary: string;
  points: string[];
  links: Link[];
}

export interface SkillGroup {
  name: string;
  items: string[];
}

export const profile = {
  name: "Karan Shete",
  role: "Senior Backend Engineer",
  focus: "Java · distributed systems · cloud",
  lead:
    "I build backend systems for enterprise clients and run them in production. " +
    "Since 2023 I have worked on-site in Switzerland for an insurance client, " +
    "replacing a legacy messaging platform and building the APIs behind its multi-tenant portal.",
  facts: ["Based in Switzerland", "7+ years experience", "Open to roles in Switzerland, the EU and India"],
  email: "shetekaran50@gmail.com",
  links: {
    github: "https://github.com/karan-sss",
    linkedin: "https://www.linkedin.com/in/karan-shete-311966140",
    status: "https://status.karan-s.com",
  },
};

export const jobs: Job[] = [
  {
    company: "Tata Consultancy Services",
    role: "Software Developer",
    period: "Feb 2019 – present",
    engagements: [
      {
        where: "On-site · Swiss insurance client · Switzerland",
        period: "Mar 2023 – present",
        highlights: [
          {
            title: "Legacy messaging modernisation",
            points: [
              "Replaced an IBM MQ integration with Kafka, PostgreSQL and a new orchestration service.",
              "Added phonetic name search on Elasticsearch.",
              "Moved service authentication from mTLS to OIDC with JWT.",
              "Load-tested with JMeter and Locust, found a single-pod memory ceiling at ~100 RPS and moved the service to horizontal pod scaling.",
            ],
          },
          {
            title: "Multi-tenant portal APIs",
            points: [
              "Own the backend for one tenant of a central multi-tenant UI.",
              "Each request fans out to two or more downstream APIs in parallel (CompletableFuture on dedicated executors), without shared mutable state.",
              "Resilience4j timeouts, retries and circuit breakers keep a slow dependency from taking the page down; Redis and Caffeine cache hot responses.",
            ],
          },
        ],
        stack: ["Java", "Spring Boot", "Kafka", "PostgreSQL", "Elasticsearch", "Resilience4j", "Redis", "OIDC / JWT", "Kubernetes", "JMeter", "Locust"],
      },
      {
        where: "Pune, India",
        period: "Feb 2019 – Mar 2023",
        highlights: [
          {
            title: "Test execution platform",
            points: [
              "Microservices that run load, UI and API test suites from a central script store, with role-based access and job scheduling.",
              "A CLI client that caches test files locally to cut network round-trips; services scale horizontally and independently.",
            ],
          },
          {
            title: "AngularJS 1.6 → Angular 14 migration",
            points: ["Assessed the legacy app, planned the migration and rewrote controllers and services as Angular components."],
          },
          {
            title: "IT service management tool",
            points: ["ITIL workflows modelled in Camunda BPMN on a microservice backend, with service and database performance tuning."],
          },
        ],
        stack: ["Java", "Spring Boot", "Camunda", "Angular", "MS SQL", "Jenkins"],
      },
    ],
  },
];

export const projects: Project[] = [
  {
    name: "project-infra",
    period: "2026",
    summary: "The self-hosted production platform that runs this site, for about €7 a month.",
    points: [
      "Terraform for Hetzner ARM64, Cloudflare (DNS, WAF, R2) and Tailscale, applied only from CI.",
      "Signed, scanned images (cosign, SBOM, Trivy); no public SSH.",
      "A CI guard prices every plan and fails anything over €7.50.",
      "Nightly encrypted backups with a monthly restore drill, Grafana monitoring and 14 ADRs.",
    ],
    links: [
      { label: "Repository", href: "https://github.com/karan-sss/project-infra" },
      { label: "Status page", href: "https://status.karan-s.com" },
    ],
  },
  {
    name: "Microservices sandbox",
    period: "2022 – 2023",
    summary: "Dockerised Express services behind an API gateway, talking over RabbitMQ with MongoDB storage.",
    points: [],
    links: [],
  },
  {
    name: "Discord registration bot",
    period: "2021",
    summary: "Scheduled sign-ups for an esports community.",
    points: ["15,000+ registrations over three months; manual sign-ups down 95%."],
    links: [],
  },
];

export const skills: SkillGroup[] = [
  { name: "Backend", items: ["Java", "Spring Boot", "Spring Data JPA / Hibernate", "REST / OpenAPI", "Node.js / Express", "Python"] },
  { name: "Distributed systems", items: ["Kafka", "RabbitMQ", "IBM MQ / JMS", "Resilience4j", "Async fan-out", "Camunda BPMN"] },
  { name: "Data", items: ["PostgreSQL", "MS SQL", "MongoDB", "Redis", "Caffeine", "Elasticsearch"] },
  {
    name: "Cloud & platform",
    items: ["Kubernetes / OpenShift", "Docker", "AWS (Lambda, API Gateway, EC2, S3, RDS)", "GCP (App Engine, Cloud Run)", "Terraform", "Jenkins", "GitLab CI", "Azure DevOps", "GitHub Actions"],
  },
  { name: "Frontend", items: ["Angular", "AngularJS", "React", "TypeScript"] },
  { name: "Security", items: ["OIDC / OAuth 2.0", "JWT", "mTLS", "Supply-chain signing", "Learning offensive security on Hack The Box"] },
  { name: "Testing", items: ["JMeter", "Locust", "Unit & integration tests"] },
];
