import {defineField} from 'sanity'

export default {
  name: 'rooms-detail',
  type: 'document',
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
  ],
}
