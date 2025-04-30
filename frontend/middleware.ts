// middleware.ts (Ejemplo con next-intl)
import createMiddleware from "next-intl/middleware";

export default createMiddleware({
  locales: ["en", "es"],

  defaultLocale: "es",
});

export const config = {
  matcher: [
    "/((?!_next|api|favicon.ico|.*\\.(?:png|jpg|jpeg|gif|webp|svg|eot|ttf|woff|woff2)).*)",
    "/",
  ],
};
