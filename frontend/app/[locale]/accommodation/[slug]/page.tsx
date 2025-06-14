import SliderAccommodationDetail from "@/app/components/ui/slider/SliderAccommodationDetailHero";
import "../../../styles/roomDetailPage.styles.css";
import { getRoomDataBySlug } from "@/app/data/room.data";
import { getMessages } from "@/messages/getMessages";
import React from "react";
import PopBtn from "@/app/components/ui/btn/PopBtn";
import CustomImg from "@/app/components/ui/img/CustomImg";
import SliderAccommodationDetailRooms from "@/app/components/ui/slider/SliderAccommodationDetailRooms";
import AccommodationDetailDistanceTab from "@/app/components/ui/tabs/AccommodationDetailDistanceTab";
import GoBtn from "@/app/components/ui/btn/GoBtn";
import TestyCard from "@/app/components/ui/cards/TestyCard";
import DayPickerComponent from "@/app/components/hero/DayPickerComponent";
import GoogleMapView from "@/app/components/ui/map/GoogleMapView";

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
      <section id="contentDetail" className="content">
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
                iconDirection="btn--down"
                className="btn__primary"
                showModal={true}
                whichModal="accommodationTextModal"
                text={data.page.intro.string_btn}
                modalDataText={fullText}
              />
            </article>
            <article className="content__amenity">
              <div className="column__1">
                <h3>{data.page.amenities.string_h3}</h3>
                <ul className="amenity__list" role="list">
                  {data.page.amenities.arrRef_amenity
                    .slice(0, 12)
                    .map((amenity, idx) => (
                      <li key={idx}>
                        <CustomImg
                          containerClassName="amenity__icon"
                          src={amenity.img_icon.media.url}
                          alt="amenity icon"
                          category="small"
                          width={50}
                          height={50}
                        />
                        {amenity.title}
                      </li>
                    ))}
                </ul>
                <PopBtn
                  iconDirection="btn--down"
                  className="btn__primary"
                  showModal={true}
                  whichModal="accommodationAmenityModal"
                  text={data.page.amenities.string_btn}
                  modalDataArray={data.page.amenities.arrRef_amenity}
                />
              </div>
            </article>
            <article className="content__rooms">
              <h3>{data.page.rooms.string_h3}</h3>
              <SliderAccommodationDetailRooms data={data} />
            </article>
            <article className="content__distance">
              <h3>{data.page.distance.string_h3}</h3>
              <AccommodationDetailDistanceTab
                data={data}
                LWalking={
                  L.accommodationDetailPage.page.distance.distanceWalking
                }
                LDriving={
                  L.accommodationDetailPage.page.distance.distanceDriving
                }
              />
              <div className="google__block">
                <GoogleMapView
                  lat={data.general.string_latitud}
                  lng={data.general.string_longitud}
                  title={data.string_title}
                  pinIconUrl="/pin.png" // Personaliza tu ícono aquí
                />
              </div>
              
              <GoBtn
                iconDirection="btn--right"
                className="btn__primary"
                hasScroll={false}
                goToUrl={data.general.string_urlLocation}
                target="_blank"
              >
                {data.page.distance.string_btn}
              </GoBtn>
            </article>
          </div>
          <div className="col__right">
            <div className="cards__checkout follower">
              <div className="card__price">
                <ul role="list">
                  <li className="cp__number">$12,528 mxn</li>
                  <li className="cp__days">por 1 noche</li>
                </ul>
                <DayPickerComponent locale={locale} />
                <button className="btn btn-reservar">Reservar</button>
              </div>
              <div className="card__contact">

              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="testy fadeInOut">
        <h2>{data.page.testy.string_h2}</h2>
        <ul role="list" className="listado__x2">
          {data.page.testy.arrRef_testimonial.map((item, idx) => (
            <li key={idx}>
              <TestyCard data={item} />
            </li>
          ))}
        </ul>
      </section>
    </>
  );
};

export default page;
