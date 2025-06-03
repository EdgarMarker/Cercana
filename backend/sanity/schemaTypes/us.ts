export default {
  name: 'us',
  type: 'document',
  groups: [
    {
      name: 'seo',
      title: 'SEO',
    },
    {
      name: 'hero',
      title: 'Hero Section',
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
      title: 'Hero Section',
      group: 'hero',
      type: 'object',
      fields: [
        {
          name: 'string_h1',
          title: 'Título',
          type: 'string',
        },
        {
          name: 'block_info',
          title: 'Texto de Información',
          type: 'array',
          of: [{type: 'block'}],
        },
        {
          name: 'img_hero',
          title: 'Imagen Principal',
          type: 'image',
        },
      ],
    },
  ],
}
