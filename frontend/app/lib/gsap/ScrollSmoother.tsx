"use client";
import React, { useRef } from "react";
import { animationManager, useGSAP } from "./animation-manager.js";
import { useRouter } from "next/compat/router";

interface Props {
  children: React.ReactNode;
}

const ScrollSmootherProvider = ({ children }: Props) => {
  const wrapper = useRef<HTMLDivElement>(null);
  const content = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useGSAP(
    () => {
      if (typeof window === "undefined") return;
      animationManager.initScrollSmoother();
      animationManager.initBatchAnimations();
      animationManager.initHeroHome();
      const handleRouteChange = () => {
        animationManager.initScrollSmoother();
        animationManager.initBatchAnimations();
        animationManager.initHeroHome();
      };
      router?.events.on("routeChangeComplete", handleRouteChange);

      return () => {
        router?.events.off("routeChangeComplete", handleRouteChange);
      };
    },
    { scope: wrapper, dependencies: [router] }
  );

  return (
    <div ref={wrapper} className="smooth-wrapper">
      <div ref={content} className="smooth-content">
        {children}
      </div>
    </div>
  );
};

export default ScrollSmootherProvider;
