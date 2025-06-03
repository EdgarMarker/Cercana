import { client } from "../lib/sanity/client";
import { AboutPage } from "../types/aboutPage.types";

const ABOUT_PAGE_FIELDS = `
    language,
    seo {
      title,
      dsc,
      keywords
    },
    hero {
      string_h1,
      block_info,
      img_hero {
        "media": asset -> {url},
        "alt": asset -> altText
      }
    }
`;

export const getAboutPageData = async (locale: string): Promise<AboutPage> => {
  const QUERY = `*[_type == "us" && language == '${locale}'][0]{${ABOUT_PAGE_FIELDS}}`;
  const data = await client.fetch(QUERY);
  return data;
};
