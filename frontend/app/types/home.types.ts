import { SEO, Block, Image } from "./globals.types";
export interface Home {
  language: string;
  seo: SEO;
  hero: {
    string_h1: string;
    string_h2: string;
    string_btn: string;
    img_bg: Image;
  };
  intro: {
    block_info: (Block | Image)[];
    img: Image;
    block_imgAndInfo: (Block | Image)[];
  };
  catalogue: {
    string_h2: string;
    text_desc: string;
    string_btn: string;
  };
  explore: {
    block_info: Block[];
    string_btn: string;
    img_1: Image;
    img_2: Image;
  };
  testy: {
    string_h2: string;
    ref_testimonials: Testimonial[];
  };
}

export interface Testimonial {
  string_name: string;
  block_info: Block[];
  img_stars: Image[];
}
