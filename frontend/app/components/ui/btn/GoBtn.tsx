"use client";

import { animationManager, useGSAP } from "@/app/lib/gsap/animation-manager";
import { ta } from "date-fns/locale";
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
  className?: string;
  children?: React.ReactNode;
  target?: string;
}

const LinkBtn = ({
  url,
  children,
  className,
  target,
}: {
  url: string;
  children?: React.ReactNode;
  className: string;
  target?: string;
}) => {
  return (
    <Link href={url} className={`btn ${className}`} target={target}>
      {children}
    </Link>
  );
};
const ScrollBtn = ({
  children,
  target,
  className,
}: {
  children: React.ReactNode | string;
  target: string;
  className: string;
}) => {
  const { contextSafe } = useGSAP();

  const handleScroll = contextSafe(() => {
    animationManager.scrollTo(target);
  });
  return (
    <button className={`btn ${className}`} onClick={() => handleScroll()}>
      {children}
    </button>
  );
};

const GoBtn = ({
  hasScroll = true,
  goToUrl = "/",
  goToSection = "#Hero",
  children,
  target = "",
  className = "btn",
}: Props) => {
  return hasScroll ? (
    <ScrollBtn target={goToSection} className={className}>
      {children}
    </ScrollBtn>
  ) : (
    <LinkBtn url={goToUrl} className={className} target={target}>
      {children}
    </LinkBtn>
  );
};

export default GoBtn;
