// Ano no rodapé
document.getElementById("year").textContent = new Date().getFullYear();

// Preloader
window.addEventListener("load", () => {
  setTimeout(() => {
    const pre = document.getElementById("preloader");
    if (pre) pre.classList.add("is-done");
  }, 1100);
});

// Nav com scroll
const nav = document.getElementById("nav");
window.addEventListener("scroll", () => {
  if (window.scrollY > 40) nav.classList.add("is-scrolled");
  else nav.classList.remove("is-scrolled");
});

// Menu mobile
const burger = document.getElementById("burger");
const mobileMenu = document.getElementById("mobileMenu");
function toggleMenu(open) {
  burger.classList.toggle("is-open", open);
  mobileMenu.classList.toggle("is-open", open);
  burger.setAttribute("aria-expanded", String(open));
  mobileMenu.setAttribute("aria-hidden", String(!open));
}
burger.addEventListener("click", () =>
  toggleMenu(!mobileMenu.classList.contains("is-open"))
);
mobileMenu.querySelectorAll("a").forEach((a) =>
  a.addEventListener("click", () => toggleMenu(false))
);

// Reveal on scroll
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        entry.target.style.transitionDelay = `${(i % 5) * 60}ms`;
        entry.target.classList.add("is-in");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);
document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

// Contadores animados
const countObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.dataset.count, 10);
      let cur = 0;
      const step = Math.max(1, Math.round(target / 40));
      const tick = () => {
        cur += step;
        if (cur >= target) {
          el.textContent = target;
        } else {
          el.textContent = cur;
          requestAnimationFrame(tick);
        }
      };
      tick();
      countObserver.unobserve(el);
    });
  },
  { threshold: 0.5 }
);
document.querySelectorAll("[data-count]").forEach((el) => countObserver.observe(el));

// Cursor personalizado
const cursor = document.querySelector(".cursor");
let mouseX = 0, mouseY = 0, curX = 0, curY = 0;
window.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});
function renderCursor() {
  curX += (mouseX - curX) * 0.18;
  curY += (mouseY - curY) * 0.18;
  if (cursor) cursor.style.transform = `translate(${curX}px, ${curY}px) translate(-50%, -50%)`;
  requestAnimationFrame(renderCursor);
}
renderCursor();

document
  .querySelectorAll("a, button, .service, .work")
  .forEach((el) => {
    el.addEventListener("mouseenter", () => cursor && cursor.classList.add("is-hover"));
    el.addEventListener("mouseleave", () => cursor && cursor.classList.remove("is-hover"));
  });

// Parallax leve no título do hero
const heroTitle = document.querySelector(".hero__title");
window.addEventListener("mousemove", (e) => {
  if (!heroTitle) return;
  const x = (e.clientX / window.innerWidth - 0.5) * 20;
  const y = (e.clientY / window.innerHeight - 0.5) * 20;
  heroTitle.style.transform = `translate(${x}px, ${y}px)`;
});
