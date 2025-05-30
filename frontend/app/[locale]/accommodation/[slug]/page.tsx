import SliderAccommodationDetail from "@/app/components/ui/slider/SliderAccommodationDetail";
import "../../../styles/roomDetailPage.styles.css";
import { getRoomDataBySlug } from "@/app/data/room.data";
import { getMessages } from "@/messages/getMessages";
import React from "react";
import PortableTextCustom from "@/app/components/ui/portableText/PortableTextCustom";
import PopBtn from "@/app/components/ui/btn/PopBtn";

interface Props {
  params: Promise<{ slug: string; locale: string }>;
}

const page = async ({ params }: Props) => {
  const { slug, locale } = await params;
  /** Language*/
  const L = getMessages(locale);

  const data = await getRoomDataBySlug(locale, slug);

  const fullText = data.page.intro.text_dsc;
  const previewText =
    fullText.length > 150 ? fullText.substring(0, 300) + "..." : fullText;

  const generalData = [
    {
      name: L.accommodationDetailPage.general.guest,
      value: data.general.number_guests,
    },
    {
      name: L.accommodationDetailPage.general.rooms,
      value: data.general.number_rooms,
    },
    {
      name: L.accommodationDetailPage.general.beds,
      value: data.general.number_beds,
    },
    {
      name: L.accommodationDetailPage.general.baths,
      value: data.general.number_baths,
    },
  ];
  return (
    <>
      <section className="hero">
        <div className="column__1">
          <h1>{data.string_title}</h1>
          <p>{data.general.string_location}</p>
          <SliderAccommodationDetail images={data.page.hero.arr_img} />
        </div>
      </section>
      <section className="content">
        <div className="column__2">
          <div className="col__left">
            <article className="content__intro">
              <ul role="list" className="intro__list">
                {generalData.map((item, index) => (
                  <li key={index}>
                    <span className="value">{item.value}</span>
                    <span className="name">{item.name}</span>
                  </li>
                ))}
              </ul>
              <p>{previewText}</p>
              <PopBtn
                showModal={true}
                whichModal="accommodationTextModal"
                text={data.page.intro.string_btn}
                modalTextData={fullText}
              />
            </article>
            <article></article>
            <article></article>
            <article></article>
          </div>
          <div className="col__right"></div>
        </div>
      </section>
    </>
  );
};

export default page;
