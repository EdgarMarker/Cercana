export interface Image {
  _type: string;
  media: {
    url: string;
  };
}

export interface Block {
  _type: "block";
  children: Array<{
    _type: "span";
    text: string;
    marks?: string[];
  }>;
  style: string;
}

export interface SEO {
  title: string;
  dsc: string;
  keywords: string;
}

export interface SLUG {
  _type: "slug";
  current: string;
}
