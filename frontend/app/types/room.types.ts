import { Image, SLUG } from "./globals.types";

export interface RoomCategory {
  string_name: string;
}
export interface RoomLocation {
  string_name: string;
}
export interface General {
  arr_category: RoomCategory[];
  ref_location: RoomLocation;
  number_guests: number;
}
export interface Card {
  text_excerpt: string;
  img_card: Image;
}
export interface Room {
  language: string;
  string_title: string;
  slug: SLUG;
  general: General;
  card: Card;
}
