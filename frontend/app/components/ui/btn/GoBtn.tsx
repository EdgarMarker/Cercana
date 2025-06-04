"use client";

import { animationManager, useGSAP } from "@/app/lib/gsap/animation-manager";
import { ta } from "date-fns/locale";
import Link from "next/link";
type SectionType =
  | "#Hero"
  | "#Intro"
  | "#Catalogue"
  | "#Explore"
  | "#Testimonials"
  | "#Form";
interface Props {
  hasScroll: boolean;
  goToSection?: SectionType;
  goToUrl?: string;
  className?: string;
  children?: React.ReactNode;
  target?: string;
  iconDirection?: string;
}

const LinkBtn = ({
  url,
  children,
  className,
  target,
  iconDirection = "btn--right",
}: {
  url: string;
  children?: React.ReactNode;
  className: string;
  target?: string;
  iconDirection?: string;
}) => {
  return (
    <a href={url} className={`btn ${className} ${iconDirection}`} target={target}>
      {children}
    </a>
  );
};
const ScrollBtn = ({
  children,
  target,
  className,
  iconDirection = "btn--right",
}: {
  children: React.ReactNode | string;
  target: string;
  className: string;
  iconDirection?: string;
}) => {
  const { contextSafe } = useGSAP();

  const handleScroll = contextSafe(() => {
    animationManager.scrollTo(target);
  });
  return (
    <button className={`btn ${className} ${iconDirection}`} onClick={() => handleScroll()}>
      {children}
    </button>
  );
};

const GoBtn = ({
  iconDirection = "btn--right",
  hasScroll = true,
  goToUrl = "/",
  goToSection = "#Hero",
  children,
  target = "",
  className = "btn",
}: Props) => {
  return hasScroll ? (
    <ScrollBtn target={goToSection} className={className} iconDirection={iconDirection}>
      {children}
    </ScrollBtn>
  ) : (
    <LinkBtn url={goToUrl} className={className} target={target} iconDirection={iconDirection}>
      {children}
    </LinkBtn>
  );
};

export default GoBtn;
