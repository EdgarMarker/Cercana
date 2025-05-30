"use client";

import "../../styles/nav.style.css";
import React, { useEffect, useState } from "react";
import CustomImg from "../ui/img/CustomImg";
import { usePathname } from "next/navigation";
import Link from "next/link";

interface Props {
  srcNavIcon: string;
  language: string;
}
const Nav = ({ srcNavIcon, language }: Props) => {
  //todo: Add a function to change the highlight between the current page and the nav
  const pathname = usePathname(); //return es/
  //todo---------------------------------------------------------------------------
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const availableLangs = language === "es" ? ["en"] : ["es"];

  const urlsEs = [
    { name: "Inicio", url: "/" },
    { name: "Alojamiento", url: "/alojamiento" },
    { name: "Desarrollo", url: "/desarrollo" },
    { name: "Nosotros", url: "/nosotros" },
    { name: "Contacto", url: "/contacto" },
  ];

  const urlsEn = [
    { name: "Home", url: "/" },
    { name: "Accommodation", url: "/accommodation" },
    { name: "Development", url: "/develop" },
    { name: "About", url: "/about" },
    { name: "Contact", url: "/contact" },
  ];

  const urls = language === "es" ? urlsEs : urlsEn;

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

  const getLangUrl = (newLang: string) => {
    // Mapeo de rutas
    const routeMap = {
      alojamiento: "accommodation",
      desarrollo: "develop",
      nosotros: "about",
      contacto: "contact",
      accommodation: "alojamiento",
      develop: "desarrollo",
      about: "nosotros",
      contact: "contacto",
    };

    const segments = pathname.split("/").filter(Boolean);

    if (segments.length === 0) return `/${newLang}`; // Raíz

    const currentLang = segments[0];
    const currentRoute = segments[1];

    // Si hay idioma en la URL
    if (currentLang === "es" || currentLang === "en") {
      const translatedRoute =
        currentRoute && routeMap[currentRoute as keyof typeof routeMap]
          ? routeMap[currentRoute as keyof typeof routeMap]
          : currentRoute;

      return translatedRoute ? `/${newLang}/${translatedRoute}` : `/${newLang}`;
    }

    // Si no hay idioma, traducir la ruta directamente
    const translatedRoute =
      routeMap[segments[0] as keyof typeof routeMap] || segments[0];
    return `/${newLang}/${translatedRoute}`;
  };

  //* Desktop Nav
  const desktopNav = (
    <header className="nav__desktopHeader">
      <nav className="radius__10">
        <ul role="list">
          {urls.slice(0, 3).map((url, idx) => (
            <li key={idx}>
              <a href={url.url}>{url.name}</a>
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
          {urls.slice(3).map((url, idx) => (
            <li key={idx}>
              <a href={url.url}>{url.name}</a>
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
                  <a
                    className={`lang__${lang}`}
                    href={getLangUrl(lang)}
                    key={idx}
                  >
                    {" "}
                    {lang}{" "}
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
                    <a
                      className={`lang__${lang}`}
                      href={getLangUrl(lang)}
                      key={idx}
                    >
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
            {urls.map((url, idx) => (
              <li key={idx}>
                <a href={url.url}>{url.name}</a>
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
