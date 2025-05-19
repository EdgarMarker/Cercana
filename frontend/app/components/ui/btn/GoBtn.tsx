"use client";

import { animationManager, useGSAP } from "@/app/lib/gsap/animation-manager";
import Link from "next/link";
type SectionType =
  | "#Hero"
  | "#Intro"
  | "#Catalogue"
  | "#Explore"
  | "#Testimonials";
interface Props {
  hasScroll: boolean;
  goToSection?: SectionType;
  goToUrl?: string;
  text: string;
  className?: string;
}

const LinkBtn = ({
  url,
  text,
  className,
}: {
  url: string;
  text: string;
  className: string;
}) => {
  return (
    <Link href={url} className={`btn ${className}`}>
      {text}
    </Link>
  );
};
const ScrollBtn = ({
  text,
  target,
  className,
}: {
  text: string;
  target: string;
  className: string;
}) => {
  const { contextSafe } = useGSAP();

  const handleScroll = contextSafe(() => {
    animationManager.scrollTo(target);
  });
  return (
    <button className={`btn ${className}`} onClick={() => handleScroll()}>
      {text}
    </button>
  );
};

const GoBtn = ({
  hasScroll = true,
  goToUrl = "/",
  goToSection = "#Hero",
  text = "Explorar",
  className = "btn",
}: Props) => {
  return hasScroll ? (
    <ScrollBtn target={goToSection} text={text} className={className} />
  ) : (
    <LinkBtn url={goToUrl} text={text} className={className} />
  );
};

export default GoBtn;
