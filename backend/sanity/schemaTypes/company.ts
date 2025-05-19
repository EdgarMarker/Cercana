export default {
  name: 'company',
  type: 'document',
  groups: [
    {
      name: 'contact',
      title: 'Contacto',
    },
    {
      name: 'social',
      title: 'Redes sociales',
    },
    {
      name: 'privacy',
      title: 'Privacidad',
    },
    {
      name: 'colors',
      title: 'Colores',
    },
  ],
  fields: [
    {
      name: 'img_logoNav',
      title: 'Logo de la empresa para la barra de navegación',
      type: 'image',
    },
    {
      name: 'string_name',
      title: 'Nombre de la empresa',
      type: 'string',
    },
    {
      name: 'contact',
      title: 'Contacto',
      type: 'object',
      group: 'contact',
      fields: [
        {
          name: 'string_email',
          title: 'Email de contacto',
          type: 'string',
        },
        {
          name: 'string_phone',
          title: 'Teléfono de contacto',
          type: 'string',
        },
        {
          name: 'string_lada',
          title: 'Lada de contacto',
          type: 'string',
        },
        {
          name: 'string_address',
          title: 'Dirección de la empresa',
          type: 'string',
        },
        {
          name: 'string_addressLink',
          title: 'Enlace a la dirección de la empresa',
          type: 'string',
        },
      ],
    },
    {
      name: 'social',
      title: 'Redes sociales',
      type: 'object',
      group: 'social',
      fields: [
        {
          name: 'string_fbLink',
          title: 'Enlace a Facebook',
          type: 'string',
        },
        {
          name: 'string_igLink',
          title: 'Enlace a Instagram',
          type: 'string',
        },
        {
          name: 'string_ytLink',
          title: 'Enlace a YouTube',
          type: 'string',
        },
      ],
    },
  ],
}
