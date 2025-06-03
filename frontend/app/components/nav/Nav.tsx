"use client";

import "../../styles/nav.style.css";
import React, { useEffect, useState } from "react";
import CustomImg from "../ui/img/CustomImg";
import { usePathname } from "next/navigation";
import { getMessages } from "@/messages/getMessages";

interface Props {
  srcNavIcon: string;
  language: string;
}
const Nav = ({ srcNavIcon, language }: Props) => {

  const L = getMessages(language);

  const pathname = usePathname();
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const availableLangs = language === "es" ? ["en"] : ["es"];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (
        !target.closest(".nav__mobileLangBox") &&
        !target.closest(".nav__desktopLangBox") &&
        !target.closest("button")
      ) {
        setIsLangOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleLangToggle = () => {
    setIsLangOpen(!isLangOpen);
  };

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Función simple para generar URL
  const getLanguageUrl = (targetLang: string) => {
    const currentPath = pathname.replace(/^\/(es|en)/, "");
    return `/${targetLang}${currentPath}`;
  };

  //* Desktop Nav
  const desktopNav = (
    <header className="nav__desktopHeader">
      <nav className="radius__10">
        <ul role="list">
          {L.nav.slice(0, 3).map((nav, idx) => (
            <li key={idx}>
              <a href={nav.url}>{nav.name}</a>
            </li>
          ))}
        </ul>

        <a className="logo" href="/">
          <CustomImg
            category="small"
            src={srcNavIcon}
            alt="Logo de la empresa"
            width={100}
            height={100}
          />
        </a>

        <ul role="list">
          {L.nav.slice(3).map((nav, idx) => (
            <li key={idx}>
              <a href={nav.url}>{nav.name}</a>
            </li>
          ))}
          <li>
            <button
              className="desktopPanelInner__langButton"
              onClick={() => handleLangToggle()}
            >
              {language}
            </button>
            {isLangOpen && (
              <ul className="nav__desktopLangBox" role="list">
                {availableLangs.map((lang, idx) => (
                  <a className={`lang__${lang}`} href={`/${lang}`} key={idx}>
                    {lang}
                  </a>
                ))}
              </ul>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );

  //* Mobile Nav
  const mobileNav = (
    <header className="nav__mobileHeader">
      <nav className="radius__10">
        <div className="nav__mobilePanel" role="list">
          <a href="/" className="mobilePanelInner--left">
            <CustomImg
              category="small"
              src={srcNavIcon}
              alt="Logo de la empresa"
              width={80}
              height={80}
            />
          </a>

          <div className="mobilePanelInner--right">
            <button
              className="mobilePanelInner__langButton"
              onClick={() => handleLangToggle()}
            >
              {language}
              {/* Language dropdown */}
              {isLangOpen && (
                <ul className="nav__mobileLangBox" role="list">
                  {availableLangs.map((lang, idx) => (
                    <a className={`lang__${lang}`} href={`/${lang}`} key={idx}>
                      {lang}
                    </a>
                  ))}
                </ul>
              )}
            </button>

            <a
              className="mobilePanelInner__menuButton"
              onClick={() => handleMobileMenuToggle()}
            >
              <span className={isMobileMenuOpen ? "open" : ""}></span>
            </a>
          </div>
        </div>

        {/* Mobile menu when open */}
        {isMobileMenuOpen && (
          <ul className="nav__mobileMenuBox" role="list">
            {L.nav.map((nav, idx) => (
              <li key={idx}>
                <a href={nav.url}>{nav.name}</a>
              </li>
            ))}
          </ul>
        )}
      </nav>
    </header>
  );

  return (
    <>
      {desktopNav}
      {mobileNav}
    </>
  );
};

export default Nav;
