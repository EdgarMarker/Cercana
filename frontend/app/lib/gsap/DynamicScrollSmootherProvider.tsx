"use client";

import dynamic from 'next/dynamic';
import React from 'react';

// Carga dinámica sin SSR
const ScrollSmootherProvider = dynamic(
  () => import('./ScrollSmoother'),
  { ssr: false }
);

export default function DynamicScrollSmootherProvider({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  return <ScrollSmootherProvider>{children}</ScrollSmootherProvider>;
}