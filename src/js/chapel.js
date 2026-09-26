/* chapel.js — the minimal liturgy: dark mode, scroll progress, mobile menu.
   Nothing else. Amen. */
(function () {
  "use strict";

  var html = document.documentElement;

  /* ---------- 1. Midnight Vespers (dark mode) ---------- */
  var toggle = document.getElementById("theme-toggle");

  function setTheme(dark) {
    html.classList.toggle("dark-mode", dark);
    localStorage.setItem("tfe-theme", dark ? "dark" : "light");
    if (toggle) toggle.setAttribute("aria-pressed", String(dark));
  }

  if (toggle) {
    toggle.setAttribute(
      "aria-pressed",
      String(html.classList.contains("dark-mode"))
    );
    toggle.addEventListener("click", function () {
      setTheme(!html.classList.contains("dark-mode"));
    });
  }

  /* ---------- 2. Scroll progress bar ---------- */
  var bar = document.getElementById("progress-bar");
  var ticking = false;

  function updateProgress() {
    ticking = false;
    if (!bar) return;
    var max = html.scrollHeight - html.clientHeight;
    bar.style.width = (max > 0 ? (window.scrollY / max) * 100 : 0) + "%";
  }

  /* ---------- 3. Header: solid after 50px of pilgrimage ---------- */
  var header = document.getElementById("site-header");

  function updateHeader() {
    if (header) header.classList.toggle("is-scrolled", window.scrollY > 50);
  }

  window.addEventListener(
    "scroll",
    function () {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(function () {
          updateProgress();
          updateHeader();
        });
      }
    },
    { passive: true }
  );
  updateProgress();
  updateHeader();

  /* ---------- 4. Mobile menu (the great doors) ---------- */
  var openBtn = document.getElementById("menu-open");
  var closeBtn = document.getElementById("menu-close");
  var overlay = document.getElementById("mobile-overlay");

  function setMenu(open) {
    if (!overlay || !openBtn) return;
    overlay.classList.toggle("open", open);
    overlay.setAttribute("aria-hidden", String(!open));
    openBtn.setAttribute("aria-expanded", String(open));
    document.body.style.overflow = open ? "hidden" : "";
    if (open && closeBtn) closeBtn.focus();
    if (!open && openBtn) openBtn.focus();
  }

  if (openBtn) openBtn.addEventListener("click", function () { setMenu(true); });
  if (closeBtn) closeBtn.addEventListener("click", function () { setMenu(false); });

  if (overlay) {
    overlay.addEventListener("click", function (e) {
      var link = e.target.closest("a");
      if (link) setMenu(false);
    });
  }

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && overlay && overlay.classList.contains("open")) {
      setMenu(false);
    }
  });

  /* ---------- 5. The footer year, lest the scribes forget ---------- */
  var yearEl = document.getElementById("footer-year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
})();
