// Progressive enhancement only: the page is complete without this script.

type Theme = "light" | "dark";

const root = document.documentElement;
const toggle = document.getElementById("theme-toggle");

function current(): Theme {
  const set = root.dataset.theme;
  if (set === "light" || set === "dark") return set;
  return matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function label() {
  if (toggle) toggle.textContent = current() === "dark" ? "light" : "dark";
}

toggle?.addEventListener("click", () => {
  const next: Theme = current() === "dark" ? "light" : "dark";
  root.dataset.theme = next;
  try {
    localStorage.setItem("theme", next);
  } catch {
    // Storage blocked (private mode): the choice lasts for this page view only.
  }
  label();
});

label();

const year = document.getElementById("year");
if (year) year.textContent = String(new Date().getFullYear());

