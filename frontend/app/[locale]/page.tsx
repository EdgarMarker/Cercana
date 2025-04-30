// app/[locale]/page.tsx

import { getMessages } from "@/messages/getMessages";
import { getDataPage } from "../data/page.data";

// Define la interfaz de Props correctamente para Next.js 15
interface HomePageProps {
  // params ahora es una Promesa en Next.js 15
  params: Promise<{
    locale: string;
  }>;
}

// El componente debe ser asíncrono para poder usar await
export default async function HomePage({
  params,
}: HomePageProps) {

  // !!! Debes esperar la promesa de params para acceder a su valor !!!
  const resolvedParams = await params;
  const { locale } = resolvedParams;

  const supportedLocales = ["en", "es"];
  if (!supportedLocales.includes(locale)) {
    // Considera usar notFound() de next/navigation para manejar locales no soportados
    throw new Error("Function not implemented."); // O una mejor gestión de error/redirección
  }

  const data = await getDataPage(locale);
  const t = getMessages(locale);

  return (
    <h1>
      local: {locale} {data.title} {t.button.submit}
    </h1>
  );
}