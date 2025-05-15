import { client } from "@/app/lib/sanity/client";
import { Home } from "../types/home.types";

const MODEL_PAGE = `
  language,
  seo{
    title,
    dsc,
    keywords
  },
  hero{
    string_h1,
    string_h2,
    string_btn,
    img_bg{
      "media": asset->{url}
    }
  },
  intro{
    block_info,
    img{
      "media": asset->{url}
    },
    block_imgAndInfo
  },
  catalogue{
    string_h2,
    text_desc,
    string_btn
  },
  explore{
    block_info,
    string_btn,
    img_1{
      "media": asset->{url}
    },
    img_2{
      "media": asset->{url}
    }
  },
  testy{
    string_h2,
    ref_testimonials[]->{
      string_name,
      block_info,
      img_stars[]{
        "media": asset->{url}
      }
    }
  }
`;

export const getDataPage = async (locale: string): Promise<Home> => {
  const QUERY = `*[_type == 'home' && language == '${locale}']{${MODEL_PAGE}}`;
  const data = await client.fetch(QUERY);
  return data[0];
};
