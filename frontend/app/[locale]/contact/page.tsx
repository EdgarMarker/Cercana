import "../../styles/contactPage.styles.css";
import GoBtn from "@/app/components/ui/btn/GoBtn";
import ContactPageForm from "@/app/components/ui/forms/ContactPage.form";
import CustomImg from "@/app/components/ui/img/CustomImg";
import PortableTextCustom from "@/app/components/ui/portableText/PortableTextCustom";
import { getCompanyData } from "@/app/data/company.data";
import { getContactPageData } from "@/app/data/contactPage.data";
import React from "react";
interface Props {
  params: Promise<{
    locale: string;
  }>;
}
const page = async ({ params }: Props) => {
  const { locale } = await params;
  const dataPage = await getContactPageData(locale);
  const companyData = await getCompanyData();

  return (
    <>
      <section className="hero">
        <div className="column__2">
          <div className="col__left">
            <h1>{dataPage.hero.string_h1}</h1>
            <PortableTextCustom
              hasImg={false}
              data={dataPage.hero.block_info || []}
            />
            <GoBtn hasScroll={true} goToSection="#Form">
              {dataPage.hero.string_btn}
            </GoBtn>
          </div>
          <div className="col__right">
            <CustomImg
              containerClassName="img__hero1"
              src={dataPage.hero.img_hero1.media.url}
              alt={dataPage.hero.img_hero1.alt?.altText || ""}
              width={250}
              height={300}
              category="regular"
            />
            <CustomImg
              containerClassName="img__hero2"
              src={dataPage.hero.img_hero2.media.url}
              alt={dataPage.hero.img_hero2.alt?.altText || ""}
              width={250}
              height={300}
              category="regular"
            />
          </div>
        </div>
      </section>
      <section className="form" id="Form">
        <div className="column__2">
          <div className="col__left">
            <h3>{dataPage.form.string_h3}</h3>
            <p>{dataPage.form.text_info}</p>
            <ul role="list">
              <li>
                <GoBtn
                  hasScroll={false}
                  goToUrl={`telto:${companyData.contact.string_phone}`}
                >
                  {companyData.contact.string_phone}
                </GoBtn>
              </li>
              <li>
                <GoBtn
                  hasScroll={false}
                  goToUrl={`mailto:${companyData.contact.string_email}`}
                  target="_blank"
                >
                  {companyData.contact.string_email}
                </GoBtn>
              </li>
              <li>
                <GoBtn
                  hasScroll={false}
                  goToUrl={companyData.contact.string_addressLink}
                  target="_blank"
                >
                  {companyData.contact.string_address}
                </GoBtn>
              </li>
            </ul>
          </div>
          <div className="col__right">
            <ContactPageForm
              textBtn={dataPage.form.string_btn}
              locale={locale}
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default page;
