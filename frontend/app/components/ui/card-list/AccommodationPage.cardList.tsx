"use client";
import { Room } from "@/app/types/room.types";
import React from "react";
import RoomCard from "../cards/RoomCard";
import { useSearchRoomStore } from "@/app/stores/searchRoom.stores";
import { useLanguage } from "@/app/hooks/useLanguage";

interface Props {
  locale: string;
  roomData: Room[];
}

const AccommodationPageCardList = ({ locale, roomData }: Props) => {
  const { getNavUrl } = useLanguage(locale);
  const { searchResults }: { searchResults: Room[] } = useSearchRoomStore();

  const roomsToDisplay = searchResults.length > 0 ? searchResults : roomData;

  return (
    <ul role="list" className="listado__x2">
      {roomsToDisplay.map((room, idx) => (
        <li key={idx}>
          <RoomCard
            goToUrl={getNavUrl(1, room.slug.current)}
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
