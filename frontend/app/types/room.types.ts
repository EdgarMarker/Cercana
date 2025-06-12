import { Block, Image, SEO, SLUG } from "./globals.types";

export interface RoomCategory {
  string_name: string;
  slug: SLUG;
  img: Image;
}
export interface RoomLocation {
  string_name: string;
}
export interface General {
  arr_category: RoomCategory[];
  ref_location: RoomLocation;
  number_guests: number;
  string_location: string;
  string_urlLocation: string;
  number_rooms: number;
  number_beds: number;
  number_baths: number;
}
export interface Card {
  text_excerpt: string;
  img_card: Image;
}

export interface Page {
  hero: {
    arr_img: Image[];
  };
  intro: {
    text_dsc: string;
    string_btn: string;
  };
  amenities: {
    string_h3: string;
    arrRef_amenity: {
      title: string;
      img_icon: Image;
    }[];
    string_btn: string;
  };
  rooms: {
    string_h3: string;
    arrObject_room: {
      string_name: string;
      string_dsc: string;
      img_room: Image;
    }[];
  };
  distance: {
    string_h3: string;
    block_distanceWalking: Block[];
    block_distanceDriving: Block[];
    string_btn: string;
  };
  testy: {
    string_h2: string;
    arrRef_testimonial: {
      string_name: string;
      block_info: Block[];
      img_stars: Image[];
    }[];
  };
}

export interface Room {
  language: string;
  string_title: string;
  slug: SLUG;
  general: General;
  card: Card;
  seo: SEO;
  page: Page;
}
