import React from "react";
import CustomImg from "../img/CustomImg";
import GoBtn from "../btn/GoBtn";

interface Props {
  src?: string;
  alt?: string;
  title?: string;
  excerpt?: string;
  guests?: number;
  rooms?: number;
  baths?: number;
  idx?: number;
  goToUrl?: string;
}
const RoomCard = ({ src, alt, title, excerpt, guests, rooms, baths, idx, goToUrl }: Props) => {
  return (
    <div className="card card__room" key={idx}>
      <GoBtn hasScroll={false} goToUrl={goToUrl || "/"}>
        <div className="card__img column__1">
          <CustomImg
            src={src || "/images/room-default.jpg"}
            alt={alt || "Room Image"}
            category="regular"
            width={150}
            height={100}
          />
        </div>
        <div className="card__name column__1">
          <h3>{title}</h3>
        </div>
        <div className="card__content column__2">
          <div className="col__left">
            <p>{excerpt}</p>
            <ul role="list">
              <li>{guests}</li>
              <li>{rooms}</li>
              <li>{baths}</li>
            </ul>
          </div>
          <div className="col__right">
            <div className="btnlink">Ver propiedad</div>
          </div>
        </div>
      </GoBtn>
    </div>
  );
};

export default RoomCard;
