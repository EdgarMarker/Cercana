export default {
  name: 'contact',
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
      name: 'form',
      title: 'Form',
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
          title: 'Titulo principal',
          type: 'string',
        },
        {
          name: 'block_info',
          title: 'Información',
          type: 'array',
          of: [{type: 'block'}],
        },
        {
          name: 'string_btn',
          title: 'Texto de Botón',
          type: 'string',
        },
        {
          name: 'img_hero1',
          title: 'Imagen de Hero 1',
          type: 'image',
        },
        {
          name: 'img_hero2',
          title: 'Imagen de Hero 2',
          type: 'image',
        },
      ],
    },
    {
      name: 'form',
      title: 'Form',
      group: 'form',
      type: 'object',
      fields: [
        {
          name: 'string_h3',
          title: 'Subtítulo para sección',
          type: 'string',
        },
        {
          name: 'text_info',
          title: 'Información',
          type: 'text',
        },
        {
          name: 'string_btn',
          title: 'Texto de Botón de Envío',
          type: 'string',
        },
      ],
    },
  ],
}
