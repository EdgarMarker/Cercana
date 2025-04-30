// next.config.js
const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
    // Puedes añadir otras opciones aquí si es necesario, consulta la doc del analizador
    // por ejemplo: analyzerMode: 'server' para abrir solo el reporte del servidor
  });
  
  /** @type {import('next').NextConfig} */
  const nextConfig = {
    // ... pon aquí cualquier otra configuración de Next.js que ya tengas (ej. i18n)
    // i18n: { locales: ['en', 'es'], defaultLocale: 'es' }, // Ejemplo si usas la configuración i18n aquí
  };
  
  // Exporta la configuración envuelta por el analizador
  module.exports = withBundleAnalyzer(nextConfig);