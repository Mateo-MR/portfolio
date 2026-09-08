// Reveal sections and cards on scroll
const revealTargets = document.querySelectorAll(
    'section, .project-card, .timeline-entry, .skill-group'
);
revealTargets.forEach((el) => el.classList.add('reveal'));

const revealObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                revealObserver.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
);
revealTargets.forEach((el) => revealObserver.observe(el));

// If the page loads directly on an anchor (e.g. a bookmarked #contact link),
// the jump is instant and sections scrolled past would never intersect the
// viewport, leaving them permanently hidden. Skip the animation in that case.
if (window.location.hash) {
    revealTargets.forEach((el) => el.classList.add('is-visible'));
}

// Highlight active nav link based on scroll position
const sections = document.querySelectorAll('main section[id]');
const navLinks = document.querySelectorAll('nav a[href^="#"]');

const navObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach((link) => {
                    link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
                });
            }
        });
    },
    { rootMargin: '-40% 0px -50% 0px' }
);
sections.forEach((section) => navObserver.observe(section));
