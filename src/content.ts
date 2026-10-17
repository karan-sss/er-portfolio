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
  decisions?: string[]; // key decision → why
  results: (string | { label: string; href: string })[];
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
  role: "Senior Distributed Systems & Forward-Deployed Engineer",
  headline: "I untangle complex enterprise architecture and ship high-throughput systems.",
  lead:
    "7+ years architecting mission-critical distributed systems, event-driven pipelines, and cloud infrastructure. " +
    "Embedded on-site with enterprise stakeholders in Zurich, taking ambiguous business problems from whiteboard to load-tested production.",
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
    { value: "4× Best Performer", label: "across enterprise deliveries" },
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

export const approach: { title: string; body: string }[] = [
  {
    title: "On-site stakeholder alignment",
    body: "I work directly with client VPs and architects, turning messy business requirements into concrete system designs, trade-offs and delivery plans.",
  },
  {
    title: "Legacy-to-modern cutovers",
    body: "I replace entrenched enterprise bottlenecks (IBM MQ, monoliths, AngularJS) in live production, with no downtime and no feature freeze.",
  },
  {
    title: "End-to-end production ownership",
    body: "From the Java / Node.js service to Terraform provisioning, load testing with Locust and JMeter, and Grafana observability. I own it after it ships.",
  },
];

export const work: Work[] = [
  {
    tag: "Enterprise client · on-site · current",
    title: "Multi-service API orchestration",
    summary:
      "Lead developer for one tenant's backend in a multi-tenant customer portal, designed directly with client architects. " +
      "A bounded-context API layer fans requests out in parallel to several downstream services, including slow legacy systems, " +
      "while keeping each tenant's traffic and failures isolated.",
    decisions: [
      "Two-tier cache (L1 Caffeine in-process, L2 Redis shared) shields slow legacy downstreams: ~90% hit rate, cutting p95 latency by ~70%.",
      "Resilience4j circuit breakers and bulkheads per downstream, so one degraded dependency cannot exhaust shared threads or take down the tenant.",
      "Locust load tests exposed the bottleneck and drove horizontal pod autoscaling, sustaining 2,000 concurrent users (~400 RPS across 4 pods).",
    ],
    results: ["Parallel bounded-context fan-out", "L1 Caffeine + L2 Redis", "Circuit breakers & bulkheads", "Autoscaled on load-test data"],
    tech: ["Java", "Spring Boot", "Redis", "JWT", "Kubernetes", "Locust"],
  },
  {
    tag: "Enterprise client · on-site",
    title: "Messaging modernisation: IBM MQ to Kafka",
    summary:
      "Replaced a legacy IBM MQ integration with an event-driven Kafka pipeline over PostgreSQL and Elasticsearch, cut over without data loss. " +
      "A daily Apache Camel job scans ~50M records and publishes unverified addresses to Kafka.",
    decisions: [
      "Zero-data-loss cutover: a new Kafka consumer first reloaded the full dataset, then the live line switched over and only the remaining delta flowed through the new pipeline.",
      "Backpressure-aware consumers with dead-letter topics, so poison messages are isolated and replayable instead of blocking the stream.",
      "Elasticsearch phonetic analysers for fuzzy name and address matching, at sub-100 ms.",
      "Security hardened from legacy mTLS to OIDC / JWT service-to-service auth.",
    ],
    results: ["~50M records / day", "Zero data loss", "mTLS → OIDC / JWT", "Best Performer award"],
    tech: ["Kafka", "Apache Camel", "PostgreSQL", "Elasticsearch", "Kubernetes", "OpenID Connect", "JMeter"],
  },
  {
    tag: "TCS · enterprise product",
    title: "Multi-tenant ITSM platform",
    summary:
      "A ServiceNow-style product for incident, problem, change and major-incident management, with approvals, " +
      "change windows and CI management, serving 10+ tenants.",
    decisions: [
      "Hierarchical multi-tenancy with data isolation enforced at every level of the tenant tree.",
      "Stateful ticket lifecycles orchestrated as Camunda BPMN workflows, so approvals and change windows are explicit, auditable state machines.",
      "Led a strangler-fig frontend migration from AngularJS 1.6 to Angular 14, module by module, without halting feature delivery.",
    ],
    results: ["Camunda BPMN orchestration", "Hierarchical multi-tenancy", "AngularJS → Angular 14, no freeze", "Best Performer award"],
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
      "The platform behind this site, run with production SRE discipline: a Terraform-built ARM64 server behind Cloudflare, " +
      "zero-trust admin access over Tailscale only, and signed, vulnerability-scanned container images. " +
      "Encrypted backups are proven by automated monthly restore drills, a CI cost guard holds it at €7 / month, and every major decision is an ADR.",
    results: [
      "€7 / month, CI cost guard",
      { label: "14 ADRs", href: "https://github.com/karan-sss/project-infra/tree/main/docs/adr" },
      "Automated restore drills",
      "Zero-trust admin (Tailscale)",
      "Signed & scanned images",
    ],
    tech: ["Terraform", "Cloudflare", "Tailscale", "Docker", "Grafana", "GitHub Actions"],
    links: [
      { label: "Repository", href: "https://github.com/karan-sss/project-infra" },
      { label: "Live status", href: "https://status.karan-s.com" },
      { label: "ADRs", href: "https://github.com/karan-sss/project-infra/tree/main/docs/adr" },
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
  { period: "2024 — now", title: "Developer Lead, on-site", where: "TCS · enterprise client · distributed APIs & Kafka modernisation · Zurich, Switzerland" },
  { period: "2023 — 2024", title: "Senior Developer", where: "TCS · enterprise backend & platform delivery · Pune, India" },
  { period: "2019 — 2022", title: "Software Developer", where: "TCS · multi-tenant ITSM & Camunda orchestration · Pune, India" },
];
