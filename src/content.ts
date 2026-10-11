// Single source of truth for everything the page says.
// The page is a showcase, not a CV: short, factual, outcome-first.
// The detailed version lives in the private resume repo.

// Every technology the page can show a logo for. A tech is either a Simple
// Icons slug or a lettermark for brands Simple Icons does not ship.
interface Tech {
  icon?: string; // simple-icons slug, e.g. "apachekafka"
  mark?: string; // lettermark fallback, e.g. "aws"
  color?: string; // lettermark colour (hex, no #)
}

export const tech = {
  Java: { icon: "openjdk" },
  "Spring Boot": { icon: "springboot" },
  Hibernate: { icon: "hibernate" },
  "Apache Camel": { mark: "Ca", color: "E97826" },
  Camunda: { icon: "camunda" },
  "Node.js": { icon: "nodedotjs" },
  Express: { icon: "express" },
  Kafka: { icon: "apachekafka" },
  RabbitMQ: { icon: "rabbitmq" },
  PostgreSQL: { icon: "postgresql" },
  Elasticsearch: { icon: "elasticsearch" },
  Redis: { icon: "redis" },
  MongoDB: { icon: "mongodb" },
  Kubernetes: { icon: "kubernetes" },
  OpenShift: { icon: "redhatopenshift" },
  Docker: { icon: "docker" },
  AWS: { mark: "aws", color: "FF9900" },
  "Google Cloud": { icon: "googlecloud" },
  DigitalOcean: { icon: "digitalocean" },
  Terraform: { icon: "terraform" },
  Jenkins: { icon: "jenkins" },
  "GitHub Actions": { icon: "githubactions" },
  Cloudflare: { icon: "cloudflare" },
  Tailscale: { icon: "tailscale" },
  Grafana: { icon: "grafana" },
  "OpenID Connect": { icon: "openid" },
  JWT: { icon: "jsonwebtokens" },
  JMeter: { icon: "apachejmeter" },
  Locust: { icon: "locust" },
  Selenium: { icon: "selenium" },
  Angular: { icon: "angular" },
  TypeScript: { icon: "typescript" },
  Razorpay: { icon: "razorpay" },
  Discord: { icon: "discord" },
} satisfies Record<string, Tech>;

export type TechName = keyof typeof tech;

export interface Work {
  tag: string;
  title: string;
  summary: string;
  results: string[];
  tech: TechName[];
  links?: { label: string; href: string }[];
  wide?: boolean; // spans the full row
  id?: string; // anchor target
}

export interface Role {
  period: string;
  title: string;
  where: string;
}

export const profile = {
  name: "Karan Shete",
  role: "Senior Backend Engineer",
  headline: "I build the backend systems enterprises run on.",
  lead:
    "Java and distributed systems engineer with 7+ years at TCS. Since 2024 I have worked on-site " +
    "with an enterprise client, alongside its stakeholders, building the APIs behind a multi-tenant portal " +
    "for its customers and modernising legacy integrations.",
  location: "Zurich, Switzerland",
  email: "shetekaran50@gmail.com",
  // Public one-page CV (built in the private resume repo: npm run publish:web).
  cv: "/cv/karan-shete-cv.pdf",
  links: {
    github: "https://github.com/karan-sss",
    linkedin: "https://www.linkedin.com/in/karan-shete-311966140",
    status: "https://status.karan-s.com",
  },
  stats: [
    { value: "7+ years", label: "backend & enterprise systems" },
    { value: "4× Best Performer", label: "awards at TCS" },
  ],
};

export const stack: { group: string; items: TechName[] }[] = [
  { group: "Backend", items: ["Java", "Spring Boot", "Hibernate", "Apache Camel", "Camunda", "Node.js"] },
  { group: "Data & messaging", items: ["Kafka", "RabbitMQ", "PostgreSQL", "Elasticsearch", "Redis", "MongoDB"] },
  { group: "Platform", items: ["Kubernetes", "OpenShift", "Docker", "AWS", "Google Cloud", "DigitalOcean", "Terraform", "Jenkins", "GitHub Actions"] },
];

export const alsoUsed =
  "Angular, React, TypeScript, Python, Selenium, JMeter, Locust, OIDC / JWT, Linux. " +
  "Learning offensive security on Hack The Box.";

export const work: Work[] = [
  {
    tag: "Enterprise client · on-site · current",
    title: "Multi-service API orchestration",
    summary:
      "Lead developer for one tenant's backend in a multi-tenant portal, working directly with client stakeholders. " +
      "Requests fan out to several services in parallel, protected by Resilience4j and Redis/Caffeine caching; " +
      "Locust load tests drove the move to horizontal scaling.",
    results: ["Parallel fan-out", "Isolated from slow dependencies", "Load-tested, scales horizontally"],
    tech: ["Java", "Spring Boot", "Redis", "JWT", "Kubernetes", "Locust"],
  },
  {
    tag: "Enterprise client · on-site",
    title: "Messaging modernisation: IBM MQ to Kafka",
    summary:
      "Replaced a legacy IBM MQ integration with Kafka, PostgreSQL and Elasticsearch phonetic search, with a daily " +
      "Apache Camel job that pushes unverified addresses to Kafka. I developed the services, saw them through " +
      "JMeter load tests and analysed and fixed defects through to production.",
    results: ["~50M records scanned daily", "mTLS → OIDC / JWT", "Best Performer award"],
    tech: ["Kafka", "Apache Camel", "PostgreSQL", "Elasticsearch", "Kubernetes", "OpenID Connect", "JMeter"],
  },
  {
    tag: "TCS · enterprise product",
    title: "Multi-tenant ITSM platform",
    summary:
      "A ServiceNow-style product for incident, problem, change and major-incident tickets, with approvals, " +
      "change windows and CI management, orchestrated in Camunda BPMN over hierarchical tenants. " +
      "I also migrated its frontend from AngularJS 1.6 to Angular 14.",
    results: ["Camunda ticket orchestration", "Hierarchical multi-tenancy", "AngularJS → Angular 14", "Best Performer award"],
    tech: ["Java", "Spring Boot", "Camunda", "Angular", "TypeScript"],
  },
];

export const workAlso =
  "Test execution platform: one microservice runner for load, UI and API suites (Selenium, JMeter).";

export const projects: Work[] = [
  {
    id: "platform",
    tag: "Open source · runs this site",
    title: "Self-hosted production platform",
    summary:
      "The platform behind this site: a Terraform-built ARM64 server behind Cloudflare with VPN-only admin access " +
      "and signed, scanned images. A CI cost guard, encrypted backups with a monthly restore drill, and an ADR for every major decision.",
    results: ["€7 / month", "14 ADRs", "Monthly restore drill"],
    tech: ["Terraform", "Cloudflare", "Tailscale", "Docker", "Grafana", "GitHub Actions"],
    links: [
      { label: "Repository", href: "https://github.com/karan-sss/project-infra" },
      { label: "Live status", href: "https://status.karan-s.com" },
    ],
    wide: true,
  },
  {
    tag: "Personal project",
    title: "Esports slot-booking bot",
    summary:
      "A Discord bot that runs slot registration for gaming communities: the first 20 players get slots, " +
      "a waiting list is promoted on cancellations by cron jobs, and confirmed players receive a Razorpay payment link.",
    results: ["15,000+ users", "Manual sign-ups down 95%", "Waiting list with auto-promotion"],
    tech: ["Node.js", "Discord", "Razorpay"],
    wide: true,
  },
];

export const projectsAlso =
  "Event-driven Node.js microservices over RabbitMQ and MongoDB, with Razorpay payments.";

export const roles: Role[] = [
  { period: "2024 — now", title: "Developer Lead, on-site", where: "TCS · enterprise client · Zurich, Switzerland" },
  { period: "2023 — 2024", title: "Senior Developer", where: "TCS · Pune, India" },
  { period: "2019 — 2022", title: "Software Developer", where: "TCS · Pune, India" },
];
