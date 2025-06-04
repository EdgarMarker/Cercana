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
    },
    intro {
      block_info,
      img_intro {
        "media": asset -> {url},
        "alt": asset -> altText
      },
      block_infoImg
    },
    founders {
      arr_founders[]{
        img_founder {
          "media": asset -> {url},
          "alt": asset -> altText
        },
        string_name,
        string_quote
      }
    },
    values {
      string_h3,
      text_values,
      arr_values[]{
        img_iconValue {
          "media": asset -> {url},
          "alt": asset -> altText
        },
        block_info
      }
    },
     promises {
      block_info,
      img_promises1 {
        "media": asset -> {url},
        "alt": asset -> altText
      },
      img_promises2 {
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
