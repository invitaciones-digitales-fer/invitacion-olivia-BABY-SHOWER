/* ===== Scroll Animation Kit ====================== */
/* Observa TODO lo que tenga las clases declaradas. */
const revealObserver = new IntersectionObserver(
  entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('appear');
        revealObserver.unobserve(e.target); // dispara solo 1 vez
      }
    });
  },
  { threshold: 0.15 }            // 15 % visible = dispara
);

/* Lista de clases soportadas (agregá las que inventes). */
const animClasses = [
  '.fade-up', '.fade-down', '.fade-left', '.fade-right',
  '.fade-zoom', '.pop-in', '.fade-in', '.slide-up',
  '.flip-in', '.bounce-in', '.fade-scale',
  '.rotate-in', '.skew-in', '.blur-in', '.typewriter', 'typewriter-loop'
].join(',');

document.querySelectorAll(animClasses).forEach(el => revealObserver.observe(el));
/* ===== Fin del kit ================================= */

