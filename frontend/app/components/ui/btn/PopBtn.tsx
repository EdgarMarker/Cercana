import React from "react";

interface Props {
  iconDirection: string;
  text: string;
}
const PopBtn = ({ iconDirection, text }: Props) => {
  return <button className={`btn ${iconDirection}`}>{text}</button>;
};

export default PopBtn;
