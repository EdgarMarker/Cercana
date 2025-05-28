import { client } from "../lib/sanity/client";
import { Accommodation } from "../types/accommodationPage.types";

const PAGE_FIELDS = `
    language,
    string_h1,
    block_info
`;

export const getAccommodationData = async ({
  locale = "es",
}: {
  locale: string;
}): Promise<Accommodation> => {
  const query = `*[_type == "accommodations" && language == '${locale}']{
    ${PAGE_FIELDS}
  }`;
  const data = await client.fetch(query);
  return data[0];
};
