export default {
  name: 'amenities',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Titulo',
      type: 'object',
      fields: [
        {
          name: 'string_es',
          title: 'Español',
          type: 'string',
        },
        {
          name: 'string_en',
          title: 'Inglés',
          type: 'string',
        },
      ],
    },
    {
      name: 'img_icon',
      title: 'Icono',
      type: 'image',
    },
  ],
  preview: {
    select: {
      title: 'title.string_es',
      media: 'img_icon',
    },
  },
}
