import { Block, Image, SEO } from "./globals.types";

export interface AboutPage {
  language: string;
  seo: SEO;
  hero: {
    string_h1: string;
    block_info: Block[];
    img_hero: Image;
  };
}
