"use client";
import { Room } from "@/app/types/room.types";
import { getMessages } from "@/messages/getMessages";
import React from "react";
import RoomCard from "../cards/RoomCard";
import { useSearchRoomStore } from "@/app/stores/searchRoom.stores";
interface Props {
  locale: string;
  roomData: Room[];
}
const AccommodationPageCardList = ({ locale, roomData }: Props) => {
  const L = getMessages(locale);
  const currentLocale = L.nav[1].url;
  
  const { searchResults }: { searchResults: Room[] } = useSearchRoomStore();

  const roomsToDisplay = searchResults.length > 0 ? searchResults : roomData;
  return (
    <ul role="list" className="listado__x2">
      {roomsToDisplay.map((room, idx) => (
        <li key={idx}>
          <RoomCard
            goToUrl={`${currentLocale}/${room.slug.current}`}
            src={room.card.img_card.media.url}
            alt={room.card.img_card.alt?.altText || ""}
            title={room.string_title}
            excerpt={room.card.text_excerpt}
          />
        </li>
      ))}
    </ul>
  );
};

export default AccommodationPageCardList;
