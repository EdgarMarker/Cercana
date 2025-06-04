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
                category="xl"
              />
            </div>
          </div>
        </div>
      </section>
      <section className="intro">
        <div className="column__2">
          <div className="col__left">
            <PortableTextCustom
              hasImg={false}
              data={pageData.intro.block_info || []}
            />
          </div>
          <div className="col__right">
            <PortableTextCustom
              hasImg={true}
              data={pageData.intro.block_infoImg || []}
              category="regular"
            />
            <div className="intro__img">
              <CustomImg
                src={pageData.intro.img_intro.media.url}
                alt={pageData.intro.img_intro.alt?.altText || "Intro Image"}
                category="regular"
              />
            </div>
          </div>
        </div>
      </section>
      <section className="founders">
        <div className="column__1">
          {pageData.founders.arr_founders.map((founder, index) => (
            <div key={index} className="founder">
              <CustomImg
                src={founder.img_founder.media.url}
                alt={founder.img_founder.alt?.altText || "Founder Image"}
                category="regular"
              />
              <article className="founder__info">
                <h3>{founder.string_quote}</h3>
                <p>{founder.string_name}</p>
              </article>
            </div>
          ))}
        </div>
      </section>
      <section className="values">
        <div className="column__2">
          <div className="col__left">
            <h3>{pageData.values.string_h3}</h3>
          </div>
          <div className="col__right">
            <p>{pageData.values.text_values}</p>
          </div>
        </div>
        <div className="column__1">
          <ul role="list" className="values__list listado__x3">
            {pageData.values.arr_values.map((value, index) => (
              <li key={index}>
                <CustomImg
                  src={value.img_iconValue.media.url}
                  alt={value.img_iconValue.alt?.altText || "Value Image"}
                  category="small"
                />
                <PortableTextCustom
                  hasImg={false}
                  data={value.block_info || []}
                />
              </li>
            ))}
          </ul>
        </div>
      </section>
      <section className="promises">
        <div className="column__2">
          <div className="col__left">
            <PortableTextCustom
              hasImg={false}
              data={pageData.promises.block_info || []}
            />
          </div>
          <div className="col__right">
            <div className="promises__img1">
              <CustomImg
                src={pageData.promises.img_promises1.media.url}
                alt={
                  pageData.promises.img_promises1.alt?.altText ||
                  "Promise Image 1"
                }
                width={200}
                height={200}
                category="regular"
              />
            </div>
            <div className="promises__img2">
              <CustomImg
                src={pageData.promises.img_promises2.media.url}
                alt={
                  pageData.promises.img_promises2.alt?.altText ||
                  "Promise Image 2"
                }
                category="regular"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default page;
