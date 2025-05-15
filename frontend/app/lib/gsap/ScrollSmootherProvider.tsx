"use client";
import React, { useRef } from "react";
import {
  ScrollSmoother,
  ScrollTrigger,
  animationManager,
  gsap,
  useGSAP,
} from "./animation-manager";

interface Props {
  children: React.ReactNode;
}

const ScrollSmootherProvider = ({ children }: Props) => {
  const wrapper = useRef<HTMLDivElement>(null);
  const content = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!wrapper.current || !content.current) return;
    const initSmoother = () => {
      let mm = gsap.matchMedia();
      mm.add("(min-width: 1023px)", () => {
        ScrollSmoother.create({
          wrapper: wrapper.current,
          content: content.current,
          smooth: 1,
          effects: true,
          smoothTouch: 0.1,
        });
      });
      mm.add("(max-width: 1023px)", () => {});

      ScrollTrigger.addEventListener("refreshInit", () => {
        if (document.body.getAttribute("style") === "") {
          document.body.removeAttribute("style");
        }
      });
    };

    initSmoother();
    animationManager.initBatchAnimations();
  });

  return (
    <div ref={wrapper} className="smooth-wrapper">
      <div ref={content} className="smooth-content">
        {children}
      </div>
    </div>
  );
};

export default ScrollSmootherProvider;
