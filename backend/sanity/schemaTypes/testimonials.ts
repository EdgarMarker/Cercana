export default {
  name: 'testimonials',
  type: 'document',
  fields: [
    {
      name: 'string_name',
      title: 'Nombre',
      type: 'string',
    },
    {
      name: 'block_info',
      title: 'Texto',
      type: 'array',
      of: [{type: 'block'}],
    },
    {
      name: 'img_stars',
      title: 'Estrellas',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
        },
      ],
      options: {
        layout: 'grid',
      },
    },
  ],
}
