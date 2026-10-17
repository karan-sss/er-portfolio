// Renders src/content.ts into static HTML. Runs in Node at build time via the
// plugin in vite.config.ts, so it must not touch the DOM.
import * as simpleIcons from "simple-icons";
import { alsoUsed, approach, profile, projects, projectsAlso, roles, stack, tech, work, workAlso, type TechName, type Work } from "./content.ts";

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

// esc() plus a visible marker for unfilled "[TODO: ...]" metric placeholders.
let todos = 0;
const rich = (s: string) =>
  esc(s).replace(/\[TODO:[^\]]*\]/g, (m) => {
    todos++;
    return `<span class="todo-metric">${m}</span>`;
  });

// Email as numeric character references: browsers render it normally, naive
// scrapers that grep the HTML for "@" do not see it.
const obf = (s: string) => [...s].map((c) => `&#${c.codePointAt(0)};`).join("");
const mailto = obf(`mailto:${profile.email}`);

const ext = (href: string, label: string, cls = "") =>
  `<a href="${esc(href)}"${cls ? ` class="${cls}"` : ""} rel="noopener">${label}</a>`;

// --- logos -----------------------------------------------------------------

interface SimpleIcon {
  slug: string;
  path: string;
  hex: string;
}
const iconsBySlug = new Map<string, SimpleIcon>(
  Object.values(simpleIcons as unknown as Record<string, SimpleIcon>)
    .filter((i) => i && typeof i === "object" && "slug" in i)
    .map((i) => [i.slug, i]),
);

function luminance(hex: string): number {
  const [r, g, b] = [0, 2, 4].map((i) => {
    const c = parseInt(hex.slice(i, i + 2), 16) / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

// Near-black brand colours vanish on the dark theme and very light ones on the
// light theme; CSS swaps those to the text colour per theme (see .logo.dk/.lt).
function tone(hex: string): string {
  const l = luminance(hex);
  return l < 0.04 ? " dk" : l > 0.55 ? " lt" : "";
}

const used = new Set<string>();

function brand(slug: string): string {
  const i = iconsBySlug.get(slug);
  if (!i) throw new Error(`simple-icons has no "${slug}"`);
  used.add(slug);
  return `<svg class="logo${tone(i.hex)}" style="--c:#${i.hex}" aria-hidden="true"><use href="#i-${slug}"/></svg>`;
}

function logo(name: TechName): string {
  const t: { icon?: string; mark?: string; color?: string } = tech[name];
  if (t.icon) return brand(t.icon);
  const hex = t.color ?? "888888";
  return `<span class="logo mark${tone(hex)}" style="--c:#${hex}" aria-hidden="true">${esc(t.mark ?? name[0])}</span>`;
}

// One hidden sprite; every logo on the page is a <use> into it.
const sprite = () =>
  `<svg width="0" height="0" style="position:absolute" aria-hidden="true">${[...used]
    .map((s) => `<symbol id="i-${s}" viewBox="0 0 24 24"><path fill="currentColor" d="${iconsBySlug.get(s)!.path}"/></symbol>`)
    .join("")}</svg>`;

// --- inline UI icons (stroke, Lucide-style) --------------------------------

const ui = {
  mail: '<path d="M4 6h16v12H4z"/><path d="m4 7 8 6 8-6"/>',
  arrow: '<path d="M7 17 17 7"/><path d="M8 7h9v9"/>',
  download: '<path d="M12 4v11"/><path d="m7 10 5 5 5-5"/><path d="M5 20h14"/>',
  pin: '<path d="M12 21s-6-5.3-6-11a6 6 0 0 1 12 0c0 5.7-6 11-6 11z"/><circle cx="12" cy="10" r="2"/>',
};
const uiIcon = (k: keyof typeof ui) =>
  `<svg class="ui" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ui[k]}</svg>`;

// --- sections --------------------------------------------------------------

const heading = (n: number, id: string, title: string) =>
  `<h2 id="${id}"><span class="mono">${String(n).padStart(2, "0")}</span> ${esc(title)}</h2>`;

const hero = () => `
<header class="hero">
  <div class="hero-main">
    <p class="who"><img class="avatar" src="/img/avatar.webp" width="320" height="320" alt="Portrait of ${esc(profile.name)}">
      <span><strong>${esc(profile.name)}</strong><br><span class="muted">${esc(profile.role)}</span></span></p>
    <h1>${esc(profile.headline)}</h1>
    <p class="lead">${esc(profile.lead)}</p>
    <p class="actions">
      <a class="btn primary" href="${mailto}">${uiIcon("mail")}Get in touch</a>
      ${ext(profile.links.github, `${brand("github")}GitHub`, "btn")}
      ${ext(profile.links.linkedin, "LinkedIn", "btn")}
      <a class="btn" href="${profile.cv}" download>${uiIcon("download")}CV (PDF)</a>
      <span class="loc mono">${uiIcon("pin")}${esc(profile.location)}</span>
    </p>
    <ul class="stats">
      ${profile.stats.map((s) => `<li><strong>${esc(s.value)}</strong><span>${esc(s.label)}</span></li>`).join("")}
    </ul>
  </div>
</header>`;

const stackSection = (n: number) => `
<section id="stack" aria-labelledby="h-stack">
  ${heading(n, "h-stack", "Stack")}
  <div class="stack">
    ${stack
      .map(
        (g) => `
    <div class="stack-group">
      <h3 class="mono">${esc(g.group)}</h3>
      <ul class="tiles">${g.items.map((t) => `<li class="tile">${logo(t)}<span>${esc(t)}</span></li>`).join("")}</ul>
    </div>`,
      )
      .join("")}
  </div>
  <p class="also-used"><span class="mono">Also</span>${esc(alsoUsed)}</p>
</section>`;

const card = (w: Work) => `
  <article class="work${w.wide ? " wide" : ""}"${w.id ? ` id="${esc(w.id)}"` : ""}>
    <p class="tag mono">${esc(w.tag)}</p>
    <h3>${esc(w.title)}</h3>
    <p class="summary">${rich(w.summary)}</p>
    ${w.decisions ? `<ul class="decisions">${w.decisions.map((d) => `<li>${rich(d)}</li>`).join("")}</ul>` : ""}
    <ul class="results mono">${w.results
      .map((r) => `<li>${typeof r === "string" ? rich(r) : ext(r.href, esc(r.label))}</li>`)
      .join("")}</ul>
    <div class="work-foot">
      <span class="logos" role="list" aria-label="Technologies">${w.tech
        .map((t) => `<span role="listitem" title="${esc(t)}">${logo(t)}<span class="sr">${esc(t)}</span></span>`)
        .join("")}</span>
      ${w.links ? `<span class="work-links">${w.links.map((l) => ext(l.href, `${esc(l.label)}${uiIcon("arrow")}`)).join("")}</span>` : ""}
    </div>
  </article>`;

const approachSection = (n: number) => `
<section id="approach" aria-labelledby="h-approach">
  ${heading(n, "h-approach", "How I work")}
  <div class="approach">
    ${approach.map((a) => `<article class="work"><h3>${esc(a.title)}</h3><p class="summary">${esc(a.body)}</p></article>`).join("")}
  </div>
</section>`;

const workSection = (n: number) => `
<section id="work" aria-labelledby="h-work">
  ${heading(n, "h-work", "Work")}
  <div class="works single">${work.map(card).join("")}</div>
  <p class="also-line"><span class="mono">Also</span>${esc(workAlso)}</p>
</section>`;

const projectsSection = (n: number) => `
<section id="projects" aria-labelledby="h-projects">
  ${heading(n, "h-projects", "Side projects")}
  <div class="works">${projects.map(card).join("")}</div>
  <p class="also-line"><span class="mono">Also</span>${esc(projectsAlso)}</p>
</section>`;

const pathSection = (n: number) => `
<section id="path" aria-labelledby="h-path">
  ${heading(n, "h-path", "Path")}
  <ol class="timeline">
    ${roles
      .map((r) => `<li><span class="mono muted">${esc(r.period)}</span><strong>${esc(r.title)}</strong><span class="where muted">${esc(r.where)}</span></li>`)
      .join("")}
  </ol>
</section>`;

const footer = () => `
<footer>
  <h2 class="cta">Contact</h2>
  <p class="muted"><a class="cv-link" href="${profile.cv}" download>Download the one-page CV</a> · full CV available on request.</p>
  <p class="actions">
    <a class="btn primary" href="${mailto}">${uiIcon("mail")}${obf(profile.email)}</a>
    ${ext(profile.links.github, `${brand("github")}GitHub`, "btn")}
    ${ext(profile.links.linkedin, "LinkedIn", "btn")}
  </p>
  <p class="foot-links mono">
    ${ext(profile.links.status, "Status")}
    <span class="muted">© <span id="year">${new Date().getFullYear()}</span> ${esc(profile.name)}</span>
  </p>
</footer>`;

export function renderPage(): string {
  used.clear();
  todos = 0;
  const live = `<a class="live" href="#platform" title="This site runs on my self-hosted platform">
  <span class="dot" aria-hidden="true"></span><span class="live-label">Live</span><span class="live-text">· self-hosted on my own platform</span></a>`;
  const body = live + hero() + stackSection(1) + approachSection(2) + workSection(3) + projectsSection(4) + pathSection(5) + footer();
  if (todos) console.warn(`render: ${todos} [TODO] placeholders still on the page`);
  return sprite() + body;
}
