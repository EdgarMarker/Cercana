import { client } from "../lib/sanity/client";
import { ContactPage } from "../types/contactPage.types";

const CONTACT_PAGE_FIELDS = `
    language,
    seo {
      title,
      dsc,
      keywords
    },
    hero{
      string_h1,
      block_info,
      string_btn,
      img_hero1{
        "media": asset->{url},
        "alt": asset->{altText}
      },
      img_hero2{
        "media": asset->{url},
        "alt": asset->{altText}
      }
    },
    form {
      string_h3,
      text_info,
      string_btn
    }
`;

export const getContactPageData = async (locale: string): Promise<ContactPage> => {
  const QUERY = `*[_type == "contact" && language == '${locale}'][0]{
      ${CONTACT_PAGE_FIELDS}
    }`;
  const data = await client.fetch(QUERY);
  return data;
};
