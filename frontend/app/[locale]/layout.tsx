import { ReactNode } from "react";
import Nav from "../components/nav/Nav";
import { getCompanyData } from "../data/company.data";
import DynamicScrollSmootherProvider from "../lib/gsap/DynamicScrollSmootherProvider";
import FormModal from "../components/ui/modal/FormModal";
import { Toaster } from "sonner";
import Footer from "../components/footer/Footer";
import AccommodationTextModal from "../components/ui/modal/AccommodationTextModal";

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
      <DynamicScrollSmootherProvider>
        {children}
        <Footer language={locale} />
      </DynamicScrollSmootherProvider>
      {/* Modals */}
      <FormModal />
      <AccommodationTextModal />
      <Toaster position="bottom-right" richColors closeButton={true} />
    </div>
  );
}
