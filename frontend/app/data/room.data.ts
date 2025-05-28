import { client } from "@/app/lib/sanity/client";
import { Room, RoomCategory, RoomLocation } from "../types/room.types";
const CATEGORY = `
    string_name,
`;
const LOCATION = `
    string_name,
`;
const ROOM_FIELDS = `
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
    },
    card {
        text_excerpt,
        img_card {
            "media": asset->{url}
        }
    }
`;

export const getRoomData = async (locale: string): Promise<Room[]> => {
  const QUERY = `*[_type == 'room-detail' && language == '${locale}']{${ROOM_FIELDS}}`;
  const data = await client.fetch(QUERY);
  return data; 
};

export const getRoomDataBySlug = async (
  locale: string,
  slug: string
): Promise<Room> => {
  const QUERY = `*[_type == 'room-detail' && language == '${locale}' && slug.current == '${slug}']{${ROOM_FIELDS}}`;
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
  QUERY += `]{${ROOM_FIELDS}}`;

  const data = await client.fetch(QUERY);

  if (!data || data.length === 0) {
    throw new Error("No rooms found for the given selection.");
  }
  return data;
};
