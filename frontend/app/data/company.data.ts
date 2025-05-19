import { client } from "@/app/lib/sanity/client";
import { Company } from "../types/company.types";

const MODEL_COMPANY = `
  img_logoNav{
    "media": asset->{url}
  },
  string_name,
  contact{
    string_email,
    string_phone,
    string_lada,
    string_address,
    string_addressLink
  },
  social{
    string_fb,
    string_fbLink,
    string_ig,
    string_igLink,
    string_yt,
    string_ytLink
  }
`;

export const getCompanyData = async (): Promise<Company> => {
  const QUERY = `*[_type == 'company'][0]{${MODEL_COMPANY}}`;
  const data = await client.fetch(QUERY);
  return data;
};
