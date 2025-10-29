// podfoldern/fade-in.js
// Dodaje klasę .visible elementom z klasą .fade-in-on-scroll gdy są widoczne na ekranie

document.addEventListener("DOMContentLoaded", function() {
  const fadeEls = document.querySelectorAll('.fade-in-on-scroll');
  if (!fadeEls || fadeEls.length === 0) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.2 // element musi być w 20% widoczny
  });

  fadeEls.forEach(el => observer.observe(el));
});
