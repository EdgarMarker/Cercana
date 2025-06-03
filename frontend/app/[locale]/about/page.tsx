import "../../styles/aboutPage.styles.css";
import CustomImg from "@/app/components/ui/img/CustomImg";
import PortableTextCustom from "@/app/components/ui/portableText/PortableTextCustom";
import { getAboutPageData } from "@/app/data/aboutPage.data";
import React from "react";

interface Props {
  params: Promise<{ locale: string }>;
}
const page = async ({ params }: Props) => {
  const { locale } = await params;
  const pageData = await getAboutPageData(locale);

  return (
    <>
      <section className="hero">
        <div className="column__2">
          <div className="col__left">
            <h1>{pageData.hero.string_h1}</h1>
            <PortableTextCustom
              hasImg={false}
              data={pageData.hero.block_info || []}
            />
          </div>
          <div className="col__right">
            <div className="hero__img">
              <CustomImg
                src={pageData.hero.img_hero.media.url}
                alt={pageData.hero.img_hero.alt?.altText || "Hero Image"}
                width={800}
                height={600}
                category="xl"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default page;
