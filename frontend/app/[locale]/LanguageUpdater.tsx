"use client";

import { useEffect } from "react";

interface Props {
  locale: string;
}

export default function LanguageUpdater({ locale }: Props) {
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return null; 
}