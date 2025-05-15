import React from "react";
interface Props {
  goTo: string;
  text: string;
}
const GoBtn = ({ goTo = "/", text = "Explorar" }: Props) => {
  return <a href={`${goTo}`}>{text}</a>;
};

export default GoBtn;
