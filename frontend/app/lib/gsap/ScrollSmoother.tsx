"use client";
import React, { useRef } from "react";
import { animationManager, useGSAP } from "./animation-manager.js";

interface Props {
  children: React.ReactNode;
}

const ScrollSmootherProvider = ({ children }: Props) => {
  const wrapper = useRef<HTMLDivElement>(null);
  const content = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (typeof window === "undefined") return;
    animationManager.initScrollSmoother();
    animationManager.initBatchAnimations();
    animationManager.initHeroHome();
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
