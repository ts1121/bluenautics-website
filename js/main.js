// Blue Nautics - main.js (Single-page behavior)

document.addEventListener("DOMContentLoaded", () => {
    const navbar = document.getElementById("navbar");
    const navToggle = document.getElementById("navToggle");
    const navMenu = document.getElementById("navMenu");
    const navLinks = document.querySelectorAll(".nav-link");

    // ---------------------------
    // Sticky navbar shadow on scroll
    // ---------------------------
    const handleNavbarShadow = () => {
        if (!navbar) return;
        if (window.scrollY > 8) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    };

    window.addEventListener("scroll", handleNavbarShadow);
    handleNavbarShadow();

    // ---------------------------
    // Mobile nav toggle
    // ---------------------------
    const closeMobileMenu = () => {
        if (!navToggle || !navMenu) return;
        navToggle.classList.remove("active");
        navMenu.classList.remove("active");
        navToggle.setAttribute("aria-expanded", "false");
    };

    const openMobileMenu = () => {
        if (!navToggle || !navMenu) return;
        navToggle.classList.add("active");
        navMenu.classList.add("active");
        navToggle.setAttribute("aria-expanded", "true");
    };

    if (navToggle) {
        navToggle.addEventListener("click", () => {
            const isOpen = navMenu.classList.contains("active");
            if (isOpen) closeMobileMenu();
            else openMobileMenu();
        });
    }

    // Close mobile menu when clicking a nav link
    navLinks.forEach((link) => {
        link.addEventListener("click", () => {
            closeMobileMenu();
        });
    });

    // Close menu on Escape
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            closeMobileMenu();
        }
    });

    // ---------------------------
    // Scroll Reveal
    // ---------------------------
    const revealElements = document.querySelectorAll(".reveal");

    const revealOnScroll = () => {
        const triggerPoint = window.innerHeight * 0.88;

        revealElements.forEach((el) => {
            const rect = el.getBoundingClientRect();
            if (rect.top < triggerPoint) {
                el.classList.add("active");
            }
        });
    };

    window.addEventListener("scroll", revealOnScroll);
    revealOnScroll();

    // ---------------------------
    // Active link highlighting (based on scroll position)
    // ---------------------------
    const sectionIds = ["home", "about", "services", "business-profile", "contact"];
    const sections = sectionIds
        .map((id) => document.getElementById(id))
        .filter(Boolean);

    const setActiveLink = (id) => {
        navLinks.forEach((link) => {
            const href = link.getAttribute("href");
            if (href === `#${id}`) {
                link.classList.add("active");
            } else {
                link.classList.remove("active");
            }
        });
    };

    const handleActiveSection = () => {
        const scrollPos = window.scrollY + 120; // offset for sticky navbar
        let current = "home";

        sections.forEach((section) => {
            if (section.offsetTop <= scrollPos) {
                current = section.id;
            }
        });

        setActiveLink(current);
    };

    window.addEventListener("scroll", handleActiveSection);
    handleActiveSection();
});
