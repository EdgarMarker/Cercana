import { ReactNode } from "react";
import Nav from "../components/nav/Nav";
import { getCompanyData } from "../data/company.data";
import DynamicScrollSmootherProvider from "../lib/gsap/DynamicScrollSmootherProvider";
import FormModal from "../components/ui/modal/FormModal";

interface Props {
  children: ReactNode;
  params: Promise<{
    locale: string;
  }>;
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  const company = await getCompanyData();
  return (
    <div>
      <Nav language={locale} srcNavIcon={company.img_logoNav.media.url} />
      <DynamicScrollSmootherProvider>{children}</DynamicScrollSmootherProvider>
      <FormModal />
    </div>
  );
}
