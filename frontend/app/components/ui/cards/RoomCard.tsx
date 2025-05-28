import React from "react";
import CustomImg from "../img/CustomImg";
import GoBtn from "../btn/GoBtn";

interface Props {
  src?: string;
  alt?: string;
  title?: string;
  excerpt?: string;
  idx?: number;
  goToUrl?: string;
}
const RoomCard = ({ src, alt, title, excerpt, idx, goToUrl }: Props) => {
  return (
    <div className="card card__room" key={idx}>
      <GoBtn hasScroll={false} goToUrl={goToUrl || "/"}>
        <h3>{title}</h3>
        <p>{excerpt}</p>
        <CustomImg
          src={src || "/images/room-default.jpg"}
          alt={alt || "Room Image"}
          category="regular"
          width={150}
          height={100}
        />
      </GoBtn>
    </div>
  );
};

export default RoomCard;
