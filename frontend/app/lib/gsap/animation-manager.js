"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
}

export { ScrollTrigger, ScrollSmoother, gsap, useGSAP };

export const animationManager = {
  // Batch Animations
  initBatchAnimations() {
    const stagger = 0.1;
    if (typeof window === "undefined") return;

    requestAnimationFrame(() => {
      // Seleccionar elementos para animaciones
      const elements = {
        h2: document.querySelectorAll(".fadeInOut h2"),
        h3: document.querySelectorAll(".fadeInOut h3"),
        p: document.querySelectorAll(".fadeInOut p"),
        img: document.querySelectorAll(".fadeInOut img.img"),
      };

      // Configurar estado inicial
      if (elements.h2.length) gsap.set(elements.h2, { opacity: 0, x: -50 });
      if (elements.h3.length) gsap.set(elements.h3, { opacity: 0, x: -50 });
      if (elements.p.length) gsap.set(elements.p, { opacity: 0, y: 50 });
      if (elements.img.length) gsap.set(elements.img, { opacity: 0, y: 50 });

      // Crear batch ScrollTrigger
      ScrollTrigger.batch(
        [
          ".fadeInOut h3",
          ".fadeInOut h2",
          ".fadeInOut p",
          ".fadeInOut img.img",
        ],
        {
          start: "top 80%",
          end: "top 80%",
          onEnter: (batch) =>
            gsap.to(batch, {
              opacity: 1,
              y: 0,
              x: 0,
              stagger: stagger,
              overwrite: true,
              force3D: true,
            }),
          onLeave: (batch) =>
            gsap.to(batch, {
              opacity: 1,
              y: 0,
              x: 0,
              stagger: stagger,
              overwrite: true,
              force3D: true,
            }),
          onEnterBack: (batch) =>
            gsap.to(batch, {
              opacity: 1,
              y: 0,
              x: 0,
              stagger: stagger,
              overwrite: true,
              force3D: true,
            }),
          onLeaveBack: (batch) =>
            gsap.to(batch, {
              opacity: 0,
              y: 50,
              stagger: stagger,
              overwrite: true,
              force3D: true,
            }),
        }
      );
    });
  },
};
