/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        port: "",
      },
    ],
    unoptimized: true,
  },
  // Configuración para permitir solicitudes de origen cruzado durante desarrollo
  allowedDevOrigins: ["192.168.1.90", "localhost"],
};

export default nextConfig;
