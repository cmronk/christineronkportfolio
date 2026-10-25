// Scroll reveal: elements below the fold pop up into place as they scroll into view.
// Anything already on screen when the page loads is left alone, so nothing flashes.
// Add data-reveal to any element to opt it in.

const SELECTOR = [
  '[data-reveal]',
  '.section-head',
  '.lift:not(.btn):not(.slide .lift)', // cards (carousel slides reveal with the carousel instead)
  '.featured > *',
  '.about > *',
  '.contact > *',
  '.overview > *',
  '.quote',
].join(',');

const STAGGER = 90; // ms between siblings that appear together
const DURATION = 700; // keep in sync with .reveal in global.css

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!reduceMotion && 'IntersectionObserver' in window) {
  const els = Array.from(document.querySelectorAll<HTMLElement>(SELECTOR));
  const below = els.filter((el) => el.getBoundingClientRect().top > window.innerHeight * 0.92);

  below.forEach((el) => el.classList.add('reveal'));

  const observer = new IntersectionObserver(
    (entries) => {
      // Group what's entering now by parent, so cards in one grid ripple in order
      const entering = entries.filter((e) => e.isIntersecting).map((e) => e.target as HTMLElement);
      const byParent = new Map<Element | null, HTMLElement[]>();
      entering.forEach((el) => {
        const list = byParent.get(el.parentElement) ?? [];
        list.push(el);
        byParent.set(el.parentElement, list);
      });

      byParent.forEach((list) => {
        list.forEach((el, i) => {
          const delay = i * STAGGER;
          el.style.transitionDelay = `${delay}ms`;
          el.classList.add('is-in');
          observer.unobserve(el);
          // Hand the element back to its normal styles (like hover) once it lands
          window.setTimeout(() => {
            el.classList.remove('reveal', 'is-in');
            el.style.transitionDelay = '';
          }, DURATION + delay + 50);
        });
      });
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.12 },
  );

  below.forEach((el) => observer.observe(el));
}
