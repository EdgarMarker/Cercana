export default {
  name: 'rooms',
  type: 'document',
  fields: [
    {
      name: 'string_title',
      title: 'Titulo',
      type: 'string',
    },
    {
      name: 'ref_rooms_detail',
      title: 'Version detalle de habitaciones',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'room-detail'}]}],
    },
  ],
}
