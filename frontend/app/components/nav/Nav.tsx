"use client";

import "../../styles/nav.style.css";
import React, { useEffect, useState } from "react";
import CustomImg from "../ui/img/CustomImg";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/app/hooks/useLanguage";
import { getMessages } from "@/messages/getMessages";

interface Props {
  srcNavIcon: string;
  language: string;
}

const Nav = ({ srcNavIcon, language }: Props) => {
  const pathname = usePathname();
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const { selectedLanguage, L, getUrl } = useLanguage(language);
  const availableLangs = selectedLanguage === "es" ? ["en"] : ["es"];

  // Cerrar dropdowns al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest(".nav__mobileLangBox") && !target.closest(".nav__desktopLangBox") && !target.closest("button")) {
        setIsLangOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  // Función para cambio de idioma
  const getLanguageUrl = (targetLang: string, pathname: string): string => {
    const currentPath = pathname.replace(/^\/(es|en)/, "");
    const targetMessages = getMessages(targetLang);
    
    // Manejar páginas normales
    const pathParts = currentPath.split('/');
    if (pathParts.length >= 2) {
      const [, currentNavPath] = pathParts;
      const currentIndex = L.nav.findIndex(nav => nav.url === `/${currentNavPath}`);
      
      if (currentIndex !== -1 && targetMessages.nav[currentIndex]) {
        const translatedNavPath = targetMessages.nav[currentIndex].url;
        return `/${targetLang}${translatedNavPath}`;
      }
    }
    
    return `/${targetLang}${currentPath}`;
  };

  // Cambiar idioma
  const handleLanguageChange = (targetLang: string) => {
    localStorage.setItem('preferredLanguage', targetLang);
    setIsLangOpen(false);
    
    const newUrl = getLanguageUrl(targetLang, pathname);
    window.location.href = newUrl;
  };

  //* Desktop Nav
  const desktopNav = (
    <header className="nav__desktopHeader">
      <nav className="radius__10">
        <ul role="list">
          {L.nav.slice(0, 3).map((nav, idx) => (
            <li key={idx}>
              <a href={getUrl(nav.url)}>{nav.name}</a>
            </li>
          ))}
        </ul>

        <a className="logo" href={getUrl("/")}>
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
              <a href={getUrl(nav.url)}>{nav.name}</a>
            </li>
          ))}
          <li>
            <button
              className="desktopPanelInner__langButton"
              onClick={() => setIsLangOpen(!isLangOpen)}
            >
              {selectedLanguage}
            </button>
            {isLangOpen && (
              <ul className="nav__desktopLangBox" role="list">
                {availableLangs.map((lang, idx) => (
                  <li key={idx}>
                    <a 
                      className={`lang__${lang}`} 
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        handleLanguageChange(lang);
                      }}
                    >
                      {lang}
                    </a>
                  </li>
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
          <a href={getUrl("/")} className="mobilePanelInner--left">
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
              onClick={() => setIsLangOpen(!isLangOpen)}
            >
              {selectedLanguage}
            </button>
            {isLangOpen && (
              <ul className="nav__mobileLangBox" role="list">
                {availableLangs.map((lang, idx) => (
                  <li key={idx}>
                    <a 
                      className={`lang__${lang}`} 
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        handleLanguageChange(lang);
                      }}
                    >
                      {lang}
                    </a>
                  </li>
                ))}
              </ul>
            )}

            <button
              className="mobilePanelInner__menuButton"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <span className={isMobileMenuOpen ? "open" : ""}></span>
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <ul className="nav__mobileMenuBox" role="list">
            {L.nav.map((nav, idx) => (
              <li key={idx}>
                <a href={getUrl(nav.url)}>{nav.name}</a>
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
