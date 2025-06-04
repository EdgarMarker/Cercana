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
      const elements = [
        ".fadeInOut h3",
        ".fadeInOut h2",
        ".fadeInOut p",
        ".fadeInOut li",
        ".fadeInOut picture.imgContainer",
      ];

      // Filtrar elementos que existen en el DOM
      const validElements = elements.filter((selector) => {
        const el = document.querySelectorAll(selector);
        return el.length > 0; // Solo incluir selectores con elementos existentes
      });

      if (validElements.length === 0) {
        console.warn("No se encontraron elementos para animar.");
        return; // Salir si no hay elementos válidos
      }

      // Configurar estado inicial para todos los elementos válidos
      validElements.forEach((selector) => {
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

      // Crear batch ScrollTrigger solo con elementos válidos
      ScrollTrigger.batch(validElements, batchConfig);
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

  // *Hero Home
  initHeroHome() {
    const fadeDuration = 1;
    const stayDuration = 7;
    const tl = gsap.timeline({ repeat: -1 });

    // Seleccionar los elementos y validar su existencia
    const elements = [
      ".hero__bgContainer:nth-child(2)",
      ".hero__bgContainer:nth-child(3)",
      ".hero__bgContainer:nth-child(4)",
    ];

    const validElements = elements.filter((selector) => {
      const el = document.querySelector(selector);
      return el !== null; // Solo incluir selectores con elementos existentes
    });

    if (validElements.length === 0) {
      console.warn("No se encontraron elementos para animar en initHeroHome.");
      return; // Salir si no hay elementos válidos
    }

    // Animaciones solo para elementos válidos
    tl.to(validElements[0], {
      autoAlpha: 1,
      duration: fadeDuration,
      onStart: () =>
        gsap.fromTo(
          validElements[0],
          { scale: 1 },
          {
            scale: 1.3,
            duration: fadeDuration + stayDuration + 4,
            ease: "power2.inOut",
          }
        ),
    })
      .to(
        validElements[1],
        {
          autoAlpha: 1,
          duration: fadeDuration,
          onStart: () =>
            gsap.fromTo(
              validElements[1],
              { scale: 1.3 },
              {
                scale: 1,
                duration: fadeDuration + stayDuration + 4,
                ease: "power2.inOut",
              }
            ),
        },
        `+=${stayDuration}`
      )
      .to(validElements[0], { autoAlpha: 0, duration: fadeDuration }, "<")
      .to(
        validElements[2],
        {
          autoAlpha: 1,
          duration: fadeDuration,
          onStart: () =>
            gsap.fromTo(
              validElements[2],
              { scale: 1 },
              {
                scale: 1.3,
                duration: fadeDuration + stayDuration + 4,
                ease: "power2.inOut",
              }
            ),
        },
        `+=${stayDuration}`
      )
      .to(validElements[1], { autoAlpha: 0, duration: fadeDuration }, "<")
      .to(
        validElements[2],
        { autoAlpha: 0, duration: fadeDuration },
        `+=${stayDuration} - 0.3`
      );

    ScrollTrigger.refresh();
  },
};
