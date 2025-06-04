import { Block, Image, SEO } from "./globals.types";

export interface Hero {
  string_h1: string;
  block_info: Block[];
  img_hero: Image;
}
export interface Intro {
  block_info: Block[];
  img_intro: Image;
  block_infoImg: Block[];
}

export interface Founder {
  img_founder: Image;
  string_name: string;
  string_quote: string;
}

export interface Founders {
  arr_founders: Founder[];
}

export interface Value {
  img_iconValue: Image;
  block_info: Block[];
}

export interface Values {
  string_h3: string;
  text_values: string;
  arr_values: Value[];
}

export interface Promises {
  block_info: Block[];
  img_promises1: Image;
  img_promises2: Image;
}
export interface AboutPage {
  language: string;
  seo: SEO;
  hero: Hero;
  intro: Intro;
  founders: Founders;
  values: Values;
  promises: Promises;
}
