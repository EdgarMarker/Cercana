// middleware.ts (Ejemplo con next-intl)
import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";

const routeRewrites = {
  'alojamiento': "accommodation",
  'desarrollo': "develop",
  'nosotros': "about",
  'contacto': "contact",
};

const intlMiddleware = createMiddleware({
  locales: ["en", "es"],
  defaultLocale: "es",
});

export default function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Verificar si necesita rewrite de ruta
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length >= 2 && segments[0] === "es") {
    const route = segments[1];

    if (routeRewrites[route as keyof typeof routeRewrites]) {
      const englishRoute = routeRewrites[route as keyof typeof routeRewrites];
      const newPath = pathname.replace(`/es/${route}`, `/es/${englishRoute}`);
      return NextResponse.rewrite(new URL(newPath, request.url));
    }
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: [
    "/((?!_next|api|favicon.ico|.*\\.(?:png|jpg|jpeg|gif|webp|svg|eot|ttf|woff|woff2)).*)",
    "/",
  ],
};
