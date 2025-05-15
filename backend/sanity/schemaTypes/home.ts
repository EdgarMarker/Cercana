export default {
  name: 'home',
  title: 'Home',
  type: 'document',
  groups: [
    {
      name: 'seo',
      title: 'SEO',
    },
    {
      name: 'hero',
      title: 'Hero',
    },
    {
      name: 'intro',
      title: 'Intro',
    },
    {
      name: 'catalogue',
      title: 'Alojamientos',
    },
    {
      name: 'explore',
      title: 'Conoce Cercana',
    },
    {
      name: 'testy',
      title: 'Testimonios',
    },
  ],
  fields: [
    {
      name: 'language',
      type: 'string',
      readOnly: true,
      hidden: true,
    },
    {
      name: 'seo',
      title: 'SEO',
      group: 'seo',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'Título',
          type: 'string',
        },
        {
          name: 'dsc',
          title: 'Descripción',
          type: 'text',
        },
        {
          name: 'keywords',
          title: 'Palabras Claves',
          type: 'text',
        },
      ],
    },
    {
      name: 'hero',
      title: 'Hero',
      group: 'hero',
      type: 'object',
      fields: [
        {
          name: 'string_h1',
          title: 'Titulo para buscador',
          type: 'string',
        },
        {
          name: 'string_h2',
          title: 'Texto llamativo',
          type: 'string',
        },
        {
          name: 'string_btn',
          title: 'Texto para botón',
          type: 'string',
        },
        {
          name: 'img_bg',
          title: 'Imagen de fondo',
          type: 'image',
        },
      ],
    },
    {
      name: 'intro',
      title: 'Intro',
      group: 'intro',
      type: 'object',
      fields: [
        {
          name: 'block_info',
          title: 'Información',
          type: 'array',
          of: [{type: 'block'}, {type: 'image'}],
        },
        {
          name: 'img',
          title: 'Imagen representativa 1',
          type: 'image',
        },
        {
          name: 'block_imgAndInfo',
          title: 'Imagen representativa 2 con información',
          type: 'array',
          of: [{type: 'block'}, {type: 'image'}],
        },
      ],
    },
    {
      name: 'catalogue',
      title: 'Catalogo',
      group: 'catalogue',
      type: 'object',
      fields: [
        {
          name: 'string_h2',
          title: 'Titulo',
          type: 'string',
        },
        {
          name: 'text_desc',
          title: 'Descripción',
          type: 'text',
        },
        {
          name: 'string_btn',
          title: 'Texto de botón',
          type: 'string',
        },
      ],
    },
    {
      name: 'explore',
      title: 'Conoce Cercana',
      group: 'explore',
      type: 'object',
      fields: [
        {
          name: 'block_info',
          title: 'Información',
          type: 'array',
          of: [{type: 'block'}],
        },
        {
          name: 'string_btn',
          title: 'Texto botón',
          type: 'string',
        },
        {
          name: 'img_1',
          title: 'Imagen grande',
          type: 'image',
        },
        {
          name: 'img_2',
          title: 'Imagen pequeña',
          type: 'image',
        },
      ],
    },
    {
      name: 'testy',
      title: 'Testimonios',
      group: 'testy',
      type: 'object',
      fields: [
        {
          name: 'string_h2',
          title: 'Titulo',
          type: 'string',
        },
        {
          name: 'ref_testimonials',
          title: 'Testimonios',
          type: 'array',
          of: [{type: 'reference', to: [{type: 'testimonials'}]}],
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'title',
      language: 'language',
    },
    prepare({language}: {language: string}) {
      return {
        title: 'Home',
        subtitle: language ? `Idioma: ${language}` : 'Idioma no especificado',
      }
    },
  },
}
