// js/main.js
document.addEventListener("DOMContentLoaded", function () {
  // -----------------------------
  // Mobile nav toggle
  // -----------------------------
  const navToggle = document.getElementById("navToggle");
  const navMenu = document.getElementById("navMenu");
  const navLinks = document.querySelectorAll(".nav-link");

  if (navToggle && navMenu) {
    navToggle.addEventListener("click", function () {
      navMenu.classList.toggle("active");
    });

    // Close mobile menu when a link is clicked (only if menu is open)
    navLinks.forEach((link) => {
      link.addEventListener("click", function () {
        if (navMenu.classList.contains("active")) {
          navMenu.classList.remove("active");
        }
      });
    });

    // Close menu when clicking outside the nav
    document.addEventListener("click", function (e) {
      const clickedInsideNav =
        navMenu.contains(e.target) || navToggle.contains(e.target);
      if (!clickedInsideNav && navMenu.classList.contains("active")) {
        navMenu.classList.remove("active");
      }
    });
  }

  // -----------------------------
  // Active nav link highlighting
  // -----------------------------
  // Works for:
  // - local testing (index.html)
  // - GitHub Pages project URLs (.../repo/index.html)
  // - Custom domain (/index.html)
  const path = window.location.pathname;
  const currentPage = path.split("/").pop() || "index.html";

  navLinks.forEach((link) => {
    const href = link.getAttribute("href");
    if (!href) return;

    // Normalize home link
    const normalizedHref = href === "/" ? "index.html" : href;

    if (normalizedHref === currentPage) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });

  // -----------------------------
  // Navbar scroll style (safe-guarded)
  // -----------------------------
  const navbar = document.getElementById("navbar");
  if (navbar) {
    window.addEventListener("scroll", function () {
      navbar.classList.toggle("scrolled", window.scrollY > 50);
    });
  }

  // -----------------------------
  // Scroll reveal (debounced)
  // -----------------------------
  const revealElements = document.querySelectorAll(".reveal");

  function revealOnScroll() {
    const windowHeight = window.innerHeight;
    const revealPoint = 80; // smaller = reveals later; larger = reveals earlier

    revealElements.forEach((el) => {
      const rectTop = el.getBoundingClientRect().top;
      if (rectTop < windowHeight - revealPoint) {
        el.classList.add("active");
      }
    });
  }

  function debounce(fn, delay) {
    let timer = null;
    return function () {
      if (timer) clearTimeout(timer);
      timer = setTimeout(fn, delay);
    };
  }

  const debouncedReveal = debounce(revealOnScroll, 10);
  window.addEventListener("scroll", debouncedReveal);
  revealOnScroll(); // run once on load

  // -----------------------------
  // Media page: show video if it loads; otherwise keep "coming soon"
  // -----------------------------
  const video = document.querySelector("video.profile-video");
  const overlay = document.querySelector(".coming-soon-overlay");

  if (video && overlay) {
    // If the file exists and loads, show it
    video.addEventListener("loadeddata", function () {
      overlay.style.display = "none";
      video.style.display = "block";
    });

    // If the file is missing/unloadable, keep overlay visible
    video.addEventListener("error", function () {
      overlay.style.display = "flex";
      video.style.display = "none";
    });
  }
});
