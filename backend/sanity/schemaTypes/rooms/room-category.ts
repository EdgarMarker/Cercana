export default {
  name: 'room-category',
  type: 'document',
  fields: [
    {
      name: 'string_name',
      title: 'Titulo',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'string_name',
        maxLength: 96,
      },
      validation: (Rule: any) => Rule.required().error('El slug es obligatorio'),
    },
    {
      name: 'img',
      title: 'Imagen de la categoría',
      type: 'image',
    },
  ],
}
