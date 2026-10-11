// Runs before first paint (classic blocking script, not inline, so a strict
// CSP can be added later). Applies a saved light/dark choice; otherwise the
// CSS follows prefers-color-scheme.
try {
  var t = localStorage.getItem("theme");
  if (t === "light" || t === "dark") document.documentElement.dataset.theme = t;
} catch (e) {}
