"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollToPlugin from "gsap/ScrollToPlugin";
import ScrollSmoother from "gsap/src/ScrollSmoother";
import ScrollTrigger from "gsap/src/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, ScrollSmoother, ScrollToPlugin);
}

export { ScrollTrigger, ScrollSmoother, gsap, useGSAP };

export const animationManager = {
  // *ScrollSmoother
  initScrollSmoother() {
    let mm = gsap.matchMedia();
    mm.add("(min-width: 1024px)", () => {
      ScrollSmoother.create({
        wrapper: ".smooth-wrapper",
        content: ".smooth-content",
        smooth: 1,
        effects: true,
      });
    });

    mm.add("(max-width: 1023px)", () => {});

    ScrollTrigger.refresh();
  },
  // *Batch Animations
  initBatchAnimations() {
    const stagger = 0.1;

    requestAnimationFrame(() => {
      // Seleccionar elementos para animaciones
      const elements = [
        ".fadeInOut h3",
        ".fadeInOut h2",
        ".fadeInOut p",
        ".fadeInOut picture.imgContainer",
      ];

      // Configurar estado inicial para todos los elementos
      elements.forEach((selector) => {
        const axis =
          selector.includes("picture") || selector.includes("p") ? "y" : "x";
        gsap.set(selector, { opacity: 0, [axis]: axis === "y" ? 50 : -50 });
      });

      // Configuración común para ScrollTrigger.batch
      const batchConfig = {
        start: "top 80%",
        end: "top 80%",
        stagger: stagger,
        overwrite: true,
        force3D: true,
        onEnter: (batch) =>
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            x: 0,
          }),
        onLeave: (batch) =>
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            x: 0,
          }),
        onEnterBack: (batch) =>
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            x: 0,
          }),
        onLeaveBack: (batch) =>
          gsap.to(batch, {
            opacity: 0,
            y: 50,
          }),
      };

      // Crear batch ScrollTrigger
      ScrollTrigger.batch(elements, batchConfig);
    });

    ScrollTrigger.refresh();
  },

  // *Toggle Modal
  toggleModal({ open, className }) {
    gsap.to(`.${className}`, {
      duration: 0.5,
      ease: "power2.inOut",
      opacity: open ? 1 : 0,
      pointerEvents: open ? "auto" : "none",
    });

    ScrollTrigger.refresh();
  },

  // *ScrollTo
  scrollTo(target) {
    const tl = gsap.timeline();

    tl.to(window, {
      duration: 1,
      scrollTo: target,
      ease: "none",
      immediateRender: true,
    });

    ScrollTrigger.refresh();
  },
};
