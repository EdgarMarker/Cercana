import { client } from "@/app/lib/sanity/client";
import { Room, RoomCategory, RoomLocation } from "../types/room.types";
const TESTY = `
  string_name,
  block_info,
  img_stars[]{
    "media": asset->{url}
  }
`;

const CATEGORY = `
    string_name,
    slug{
        current
    },
    img {
        "media": asset->{url}
    }
`;

const LOCATION = `
    string_name,
`;

const setAmenitiesFields = (locale: string) => `
    "title": title.string_${locale},
    img_icon {
        "media": asset->{url}
    }
`;

const setRoomFields = (locale: string) => `
    language,
    string_title,
    slug{
        current
    },
    general {
        arrRef_category[]->{
            ${CATEGORY}
        },
        ref_location->{
            ${LOCATION}
        },
        number_guests,
        string_location,
        string_urlLocation,
        number_guests,
        number_rooms,
        number_beds,
        number_baths
    },
    card {
        text_excerpt,
        img_card {
            "media": asset->{url}
        }
    },
    seo {
        title,
        dsc,
        keywords
    },
    page {
        hero {
            arr_img[]{
              "media": asset->{url}
            }
        },
        intro {
            text_dsc,
            string_btn
        },
        amenities {
            string_h3,
            arrRef_amenity[]->{
                ${setAmenitiesFields(locale)}
            },
            string_btn
        },
        rooms {
            string_h3,
            arrObject_room[] {
                string_name,
                string_dsc,
                img_room {
                    "media": asset->{url}
                }
            }
        },
        distance {
            string_h3,
            block_distanceWalking,
            block_distanceDriving,
            string_btn
        },
        testy {
            string_h2,
            arrRef_testimonial[]->{
                ${TESTY}
            }
        }
    }
`;

export const getRoomData = async (locale: string): Promise<Room[]> => {
  const QUERY = `*[_type == 'room-detail' && language == '${locale}']{${setRoomFields(
    locale
  )}}`;
  const data = await client.fetch(QUERY);
  return data;
};

export const getRoomDataBySlug = async (
  locale: string,
  slug: string
): Promise<Room> => {
  const QUERY = `*[_type == 'room-detail' && language == '${locale}' && slug.current == '${slug}']{${setRoomFields(
    locale
  )}}`;
  const data = await client.fetch(QUERY);
  return data[0];
};

export const getAllRoomCategories = async (): Promise<RoomCategory[]> => {
  const QUERY = `*[_type == 'room-category']{${CATEGORY}}`;
  const data = await client.fetch(QUERY);
  return data;
};

export const getAllRoomLocations = async (): Promise<RoomLocation[]> => {
  const QUERY = `*[_type == 'room-location']{${LOCATION}}`;
  const data = await client.fetch(QUERY);
  return data;
};

// Nueva función para obtener todas las amenidades
export const getAllAmenities = async (locale: string) => {
  const QUERY = `*[_type == 'amenities']{${setAmenitiesFields(locale)}}`;
  const data = await client.fetch(QUERY);
  return data;
};

export const searchRooms = async (
  locale: string,
  criteria: {
    category: string;
    location: string;
  }
): Promise<Room[]> => {
  let QUERY = `*[_type == 'room-detail' && language == '${locale}'`;

  if (criteria.category) {
    QUERY += ` && '${criteria.category}' in general.arrRef_category[]->string_name`;
  }
  if (criteria.location) {
    QUERY += ` && general.ref_location->string_name == '${criteria.location}'`;
  }
  QUERY += `]{${setRoomFields(locale)}}`;

  const data = await client.fetch(QUERY);

  if (!data || data.length === 0) {
    throw new Error("No rooms found for the given selection.");
  }
  return data;
};

export const getCategoriesByLocation = async (
  locale: string,
  location: string
): Promise<RoomCategory[]> => {
  const QUERY = `
    *[_type == 'room-detail' 
      && language == '${locale}' 
      && general.ref_location->string_name == '${location}'
    ].general.arrRef_category[]->{
      ${CATEGORY}
    } | order(string_name asc)
  `;

  const data = await client.fetch(QUERY);

  // Eliminar duplicados basándose en string_name
  const uniqueCategories = data.filter(
    (category: RoomCategory, index: number, self: RoomCategory[]) =>
      index === self.findIndex((c) => c.string_name === category.string_name)
  );

  return uniqueCategories;
};
