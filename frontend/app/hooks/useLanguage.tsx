"use client";

import { useEffect, useState } from "react";
import { getMessages } from "@/messages/getMessages";

export const useLanguage = (initialLanguage: string) => {
  const [selectedLanguage, setSelectedLanguage] = useState<string>(initialLanguage);

  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferredLanguage');
    if (savedLanguage && (savedLanguage === 'es' || savedLanguage === 'en')) {
      setSelectedLanguage(savedLanguage);
    } else {
      setSelectedLanguage(initialLanguage);
      localStorage.setItem('preferredLanguage', initialLanguage);
    }
  }, [initialLanguage]);

  const L = getMessages(selectedLanguage);
  
  const getUrl = (path: string) => {
    return `/${selectedLanguage}${path}`;
  };

  const getNavUrl = (navIndex: number, slug?: string) => {
    const basePath = L.nav[navIndex]?.url || '';
    return slug ? `/${selectedLanguage}${basePath}/${slug}` : `/${selectedLanguage}${basePath}`;
  };

  return {
    selectedLanguage,
    L,
    getUrl,
    getNavUrl
  };
};