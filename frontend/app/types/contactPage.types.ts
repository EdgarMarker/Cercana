import { Block, Image, SEO } from "./globals.types";

export interface ContactPage {
  language: string;
  seo: SEO;
  hero: {
    string_h1: string;
    block_info: Block[];
    string_btn: string;
    img_hero1: Image;
    img_hero2: Image;
  };
  form: {
    string_h3: string;
    text_info: string;
    string_btn: string;
  };
}
