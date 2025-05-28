import { getRoomDataBySlug } from "@/app/data/room.data";
import React from "react";

interface Props {
  params: { slug: string; locale: string };
}

const page = async ({ params }: Props) => {
  const { slug, locale } = params;
  const data = await getRoomDataBySlug(locale, slug);
  return <h2>{data.string_title}</h2>;
};

export default page;
