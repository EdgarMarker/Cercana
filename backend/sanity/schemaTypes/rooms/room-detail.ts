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
    {
      name: 'seo',
      title: 'SEO',
    },
    {
      name: 'page',
      title: 'Página',
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
      title: 'Datos generales de la propiedad',
      group: 'general',
      type: 'object',
      fields: [
        {
          name: 'arrRef_category',
          title: 'Categoría de alojamiento',
          type: 'array',
          of: [{type: 'reference', to: [{type: 'room-category'}]}],
        },
        {
          name: 'ref_location',
          title: 'Ubicación general de la propiedad',
          type: 'reference',
          to: [{type: 'room-location'}],
        },
        {
          name: 'string_location',
          title: 'Dirección detallada',
          type: 'string',
        },
        {
          name: 'string_latitud',
          title: 'Latitud de la ubicación',
          type: 'number',
        },
        {
          name: 'string_longitud',
          title: 'Longitud de la ubicacion',
          type: 'number',
        },
        {
          name: 'string_urlLocation',
          title: 'URL de la ubicación en Google Maps',
          type: 'string',
        },
        {
          name: 'number_guests',
          title: 'Número de huéspedes',
          description: 'Número máximo de huéspedes que puede alojar la habitación 1 al 8',
          type: 'number',
          validation: (rule: any) => rule.min(1).max(8).error('Debe ser un número entre 1 y 8'),
        },
        {
          name: 'number_rooms',
          title: 'Número de habitaciones',
          type: 'number',
          validation: (rule: any) => rule.min(1).max(8).error('Debe ser un número entre 1 y 8'),
        },
        {
          name: 'number_beds',
          title: 'Número de camas',
          type: 'number',
          validation: (rule: any) => rule.min(1).max(8).error('Debe ser un número entre 1 y 8'),
        },
        {
          name: 'number_baths',
          title: 'Número de baños',
          type: 'number',
          validation: (rule: any) => rule.min(1).max(8).error('Debe ser un número entre 1 y 8'),
        },
      ],
    },
    {
      name: 'card',
      title: 'Datos de la propiedad en el listado tipo tarjeta',
      group: 'card',
      type: 'object',
      fields: [
        {
          name: 'text_excerpt',
          title: 'Colonia, ciudad o estado',
          type: 'string',
        },
        {
          name: 'img_card',
          title: 'Imagen de la tarjeta',
          type: 'image',
        },
      ],
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
      name: 'page',
      title: 'Página de detalle de la propiedad',
      group: 'page',
      type: 'object',
      fields: [
        {
          name: 'hero',
          title: 'Imágenes del carrusel en la cabecera de la página',
          type: 'object',
          fields: [
            {
              name: 'arr_img',
              title: 'Carrusel',
              type: 'array',
              of: [{type: 'image'}],
              options: {
                layout: 'grid',
              },
            },
          ],
        },
        {
          name: 'intro',
          title: 'Introducción',
          type: 'object',
          fields: [
            {
              name: 'text_dsc',
              title: 'Descripción general de la propiedad',
              type: 'text',
            },
            {
              name: 'string_btn',
              title: 'Texto del botón',
              type: 'string',
            },
          ],
        },
        {
          name: 'amenities',
          title: 'Servicios',
          type: 'object',
          fields: [
            {
              name: 'string_h3',
              title: 'Título',
              type: 'string',
            },
            {
              name: 'arrRef_amenity',
              title: 'Servicios',
              type: 'array',
              of: [{type: 'reference', to: [{type: 'amenities'}]}],
            },
            {
              name: 'string_btn',
              title: 'Texto del botón',
              type: 'string',
            },
          ],
        },
        {
          name: 'rooms',
          title: 'Habitaciones',
          type: 'object',
          fields: [
            {
              name: 'string_h3',
              title: 'Título',
              type: 'string',
            },
            {
              name: 'arrObject_room',
              title: 'Habitaciones',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    {
                      name: 'string_name',
                      title: 'Nombre de la habitación',
                      type: 'string',
                    },
                    {
                      name: 'string_dsc',
                      title: 'Cama(s) en la habitación',
                      type: 'string',
                    },
                    {
                      name: 'img_room',
                      title: 'Imagen de la habitación',
                      type: 'image',
                    },
                  ],
                },
              ],
              options: {
                layout: 'grid',
              },
            },
          ],
        },
        {
          name: 'distance',
          title: 'Distancias y ubicación',
          type: 'object',
          fields: [
            {
              name: 'string_h3',
              title: 'Título',
              type: 'string',
            },
            {
              name: 'block_distanceWalking',
              title: 'Distancias a pie',
              type: 'array',
              of: [{type: 'block'}],
            },
            {
              name: 'block_distanceDriving',
              title: 'Distancias en coche',
              type: 'array',
              of: [{type: 'block'}],
            },
            {
              name: 'string_btn',
              title: 'Texto del botón',
              type: 'string',
            },
          ],
        },
        {
          name: 'testy',
          title: 'Testimonios',
          type: 'object',
          fields: [
            {
              name: 'string_h2',
              title: 'Título',
              type: 'string',
            },
            {
              name: 'arrRef_testimonial',
              title: 'Testimonios',
              type: 'array',
              of: [{type: 'reference', to: [{type: 'testimonials'}]}],
              options: {
                layout: 'grid',
              },
            },
          ],
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
