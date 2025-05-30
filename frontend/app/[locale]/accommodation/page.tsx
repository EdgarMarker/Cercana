"use client";
import "../../styles/accommodationPage.styles.css";
import Dashboard from "@/app/components/hero/Dashboard";
import RoomCard from "@/app/components/ui/cards/RoomCard";
import PortableTextCustom from "@/app/components/ui/portableText/PortableTextCustom";
import { getAccommodationData } from "@/app/data/accommodationPage.data";
import { getRoomData } from "@/app/data/room.data";
import { useSearchRoomStore } from "@/app/stores/searchRoom.stores";
import { Accommodation } from "@/app/types/accommodationPage.types";
import { Room } from "@/app/types/room.types";
import React, { useEffect, use, useState } from "react";

interface Props {
  params: Promise<{
    locale: string;
  }>;
}

const page = ({ params }: Props) => {
  const [roomData, setRoomData] = useState<Room[]>([]);
  const [pageData, setPageData] = useState<Accommodation>();

  const { searchResults }: { searchResults: Room[] } = useSearchRoomStore();
  const { locale } = use(params);
  const urlCurrent = locale === "es" ? "es/alojamiento" : "en/accommodation";

  useEffect(() => {
    const fetchPageData = async () => {
      const data = await getAccommodationData({ locale });
      setPageData(data);
    };
    fetchPageData();
  }, [locale]);
  
  useEffect(() => {
    const giveRooms = async () => {
      if (!searchResults || searchResults.length === 0) {
        const data = await getRoomData(locale);
        setRoomData(data);
      } else {
        setRoomData(searchResults);
      }
    };
    giveRooms();
  }, [searchResults]);

  console.log(roomData)

  return (
    <>
      <section className="hero">
        <div className="column__1">
          <h1>{pageData?.string_h1}</h1>
          <PortableTextCustom
            hasImg={false}
            data={pageData?.block_info || []}
          />
          <Dashboard locale={locale} />
        </div>
      </section>
      <section className="content">
        <div className="column__1">
          <ul role="list" className="listado__x2">
            {roomData.map((room, idx) => (
              <li key={idx}>
                <RoomCard
                  goToUrl={`/${urlCurrent}/${room.slug.current}`}
                  src={room.card.img_card.media.url}
                  alt={room.string_title}
                  title={room.string_title}
                  excerpt={room.card.text_excerpt}
                />
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
};

export default page;
