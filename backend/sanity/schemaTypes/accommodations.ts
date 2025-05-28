export default {
  name: 'accommodations',
  type: 'document',
  fields: [
    {
      name: 'language',
      type: 'string',
      readOnly: true,
      hidden: true,
    },
    {
      name: 'string_h1',
      title: 'Título principal',
      type: 'string',
    },
    {
      name: 'block_info',
      title: 'Información de pagina',
      type: 'array',
      of: [{type: 'block'}],
    },
  ],
}
