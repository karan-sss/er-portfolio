// Renders src/content.ts into static HTML. Runs in Node at build time via the
// plugin in vite.config.ts, so it must not touch the DOM.
import { jobs, profile, projects, skills, type Engagement, type Project } from "./content.ts";

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const ext = (href: string, label: string) =>
  `<a href="${esc(href)}" rel="noopener">${esc(label)}</a>`;

const list = (items: string[]) =>
  items.length ? `<ul>${items.map((i) => `<li>${esc(i)}</li>`).join("")}</ul>` : "";

const chips = (items: string[]) =>
  `<ul class="chips">${items.map((i) => `<li>${esc(i)}</li>`).join("")}</ul>`;

const engagement = (e: Engagement) => `
  <div class="engagement">
    <div class="row"><h4>${esc(e.where)}</h4><span class="mono muted">${esc(e.period)}</span></div>
    ${e.highlights.map((h) => `<div class="highlight"><h5>${esc(h.title)}</h5>${list(h.points)}</div>`).join("")}
    ${chips(e.stack)}
  </div>`;

const project = (p: Project) => `
  <article class="card">
    <div class="row"><h3>${esc(p.name)}</h3><span class="mono muted">${esc(p.period)}</span></div>
    <p>${esc(p.summary)}</p>
    ${list(p.points)}
    ${p.links.length ? `<p class="links">${p.links.map((l) => ext(l.href, l.label)).join("")}</p>` : ""}
  </article>`;

export function renderPage(): string {
  const { links } = profile;
  return `
<header class="hero">
  <p class="eyebrow mono">${esc(profile.role)} · ${esc(profile.focus)}</p>
  <h1>${esc(profile.name)}</h1>
  <p class="lead">${esc(profile.lead)}</p>
  <ul class="facts mono">${profile.facts.map((f) => `<li>${esc(f)}</li>`).join("")}</ul>
  <p class="actions">
    <a class="btn primary" href="mailto:${esc(profile.email)}">Email me</a>
    <a class="btn" href="${esc(links.github)}" rel="noopener">GitHub</a>
    <a class="btn" href="${esc(links.linkedin)}" rel="noopener">LinkedIn</a>
  </p>
</header>

<section id="experience" aria-labelledby="h-exp">
  <h2 id="h-exp">Experience</h2>
  ${jobs
    .map(
      (j) => `
  <article class="card">
    <div class="row"><h3>${esc(j.company)}</h3><span class="mono muted">${esc(j.period)}</span></div>
    <p class="muted">${esc(j.role)}</p>
    ${j.engagements.map(engagement).join("")}
  </article>`,
    )
    .join("")}
</section>

<section id="projects" aria-labelledby="h-proj">
  <h2 id="h-proj">Projects</h2>
  <div class="grid">${projects.map(project).join("")}</div>
</section>

<section id="skills" aria-labelledby="h-skills">
  <h2 id="h-skills">Skills</h2>
  <dl class="skills">
    ${skills.map((g) => `<div><dt>${esc(g.name)}</dt><dd>${chips(g.items)}</dd></div>`).join("")}
  </dl>
</section>

<footer>
  <p>CV available on request: <a href="mailto:${esc(profile.email)}">${esc(profile.email)}</a></p>
  <p class="links">
    ${ext(links.github, "GitHub")}${ext(links.linkedin, "LinkedIn")}${ext(links.status, "Status")}
  </p>
  <p class="muted mono">© <span id="year">${new Date().getFullYear()}</span> ${esc(profile.name)}</p>
</footer>`;
}
