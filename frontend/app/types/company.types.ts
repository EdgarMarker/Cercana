export interface Company {
  img_logoNav: {
    media: {
      url: string;
    };
  };
  string_name: string;
  contact: Contact;
  social: Social;
}

interface Contact {
  string_email: string;
  string_phone: string;
  string_lada: string;
  string_address: string;
  string_addressLink: string;
}

interface Social {
  string_fb: string;
  string_fbLink: string;
  string_ig: string;
  string_igLink: string;
  string_yt: string;
  string_ytLink: string;
}
