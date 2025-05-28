export default {
  name: 'room-detail',
  type: 'document',
  groups: [
    {
      name: 'general',
      title: 'General',
    },
    {
      name: 'card',
      title: 'Tarjeta',
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
      name: 'string_title',
      title: 'Titulo',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'string_title',
        maxLength: 96,
      },
      validation: (Rule: any) => Rule.required().error('El slug es obligatorio'),
    },
    {
      name: 'general',
      title: 'General',
      group: 'general',
      type: 'object',
      fields: [
        {
          name: 'arrRef_category',
          title: 'Categoria',
          type: 'array',
          of: [{type: 'reference', to: [{type: 'room-category'}]}],
        },
        {
          name: 'ref_location',
          title: 'Ubicación',
          type: 'reference',
          to: [{type: 'room-location'}],
        },
        {
          name: 'number_guests',
          title: 'Número de huéspedes',
          description: 'Número máximo de huéspedes que puede alojar la habitación 1 al 8',
          type: 'number',
          validation: (rule: any) => rule.min(1).max(8).error('Debe ser un número entre 1 y 8'),
        },
      ],
    },
    {
      name: 'card',
      title: 'Tarjeta',
      group: 'card',
      type: 'object',
      fields: [
        {
          name: 'text_excerpt',
          title: 'Extracto',
          type: 'text',
        },
        {
          name: 'img_card',
          title: 'Imagen de la tarjeta',
          type: 'image',
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'string_title',
      language: 'language',
    },
    prepare({language, title}: {language: string; title: string}) {
      return {
        title: title,
        subtitle: language ? `Idioma: ${language}` : 'Idioma no especificado',
      }
    },
  },
}
