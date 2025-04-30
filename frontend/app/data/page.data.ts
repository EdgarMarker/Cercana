import { client } from "@/app/lib/sanity/client";
import { Page } from "../types/page.types";

const MODEL_PAGE = `
    language,
    title,
    text
`;

export const getDataPage = async (locale: string): Promise<Page> => {
  const QUERY = `*[_type == 'page' && language == '${locale}']{${MODEL_PAGE}}`;
  const data = await client.fetch(QUERY);
  return data[0];
};
