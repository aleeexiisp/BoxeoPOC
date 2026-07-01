import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function setupReveal() {
  const targets = document.querySelectorAll<HTMLElement>("[data-reveal]");
  if (!targets.length) return;

  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    targets.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
  );

  targets.forEach((el) => observer.observe(el));
}

function setupCounters() {
  const counters = document.querySelectorAll<HTMLElement>("[data-counter]");
  if (!counters.length) return;

  const animate = (el: HTMLElement) => {
    const target = parseFloat(el.dataset.counterTarget || "0");
    if (prefersReducedMotion || Number.isNaN(target)) {
      el.textContent = el.dataset.counterTarget ?? "0";
      return;
    }
    const state = { val: 0 };
    gsap.to(state, {
      val: target,
      duration: 1.6,
      ease: "power2.out",
      onUpdate() {
        el.textContent = String(Math.round(state.val));
      },
    });
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animate(entry.target as HTMLElement);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.4 },
  );

  counters.forEach((el) => observer.observe(el));
}

function setupCurtain() {
  const curtain = document.getElementById("curtain");
  if (!curtain) return;

  // JS ha arrancado: cancelamos la animación de respaldo por CSS y tomamos el control.
  curtain.style.animation = "none";
  curtain.style.opacity = "1";
  curtain.style.visibility = "visible";

  if (prefersReducedMotion) {
    curtain.remove();
    return;
  }

  const logo = curtain.querySelector<HTMLElement>("[data-curtain-logo]");
  const tl = gsap.timeline({ onComplete: () => curtain.remove() });
  if (logo) {
    tl.to(logo, { opacity: 1, duration: 0.5, ease: "power2.out" }).to(logo, { opacity: 1, duration: 0.35 });
  }
  tl.to(curtain, { yPercent: -100, duration: 0.9, ease: "power4.inOut" }, logo ? "+=0.05" : 0);
}

function setupSmoothScrollAndParallax() {
  if (prefersReducedMotion) return;

  gsap.registerPlugin(ScrollTrigger);

  const lenis = new Lenis({
    duration: 1.1,
    easing: (t: number) => 1 - Math.pow(1 - t, 3),
  });

  function raf(time: number) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);
  lenis.on("scroll", ScrollTrigger.update);

  const heroBg = document.querySelector<HTMLElement>("[data-parallax-bg]");
  if (heroBg) {
    gsap.to(heroBg, {
      yPercent: 18,
      ease: "none",
      scrollTrigger: {
        trigger: heroBg.closest("section") ?? heroBg,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });
  }

  const timelineProgress = document.querySelector<HTMLElement>("[data-timeline-progress]");
  if (timelineProgress) {
    gsap.fromTo(
      timelineProgress,
      { scaleY: 0 },
      {
        scaleY: 1,
        ease: "none",
        transformOrigin: "top",
        scrollTrigger: {
          trigger: timelineProgress.closest("[data-timeline]") ?? timelineProgress,
          start: "top 70%",
          end: "bottom 85%",
          scrub: true,
        },
      },
    );
  }

  ScrollTrigger.refresh();
}

function init() {
  setupReveal();
  setupCounters();
  setupCurtain();
  setupSmoothScrollAndParallax();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
