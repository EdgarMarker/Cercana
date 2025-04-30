import { getMessages } from "@/messages/getMessages";
import { getDataPage } from "../data/page.data";

export default async function HomePage({
  params,
}: {
  params: { locale: string };
}) {
  const { locale } = params;

  const supportedLocales = ["en", "es"];
  if (!supportedLocales.includes(locale)) {
    throw new Error("Function not implemented.");
  }
  const data = await getDataPage(locale);
  const t = getMessages(locale);
  return (
    <h1>
      local: {locale} {data.title} {t.button.submit}
    </h1>
  );
}
