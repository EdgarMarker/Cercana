export default {
  name: 'us',
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
      name: 'intro',
      title: 'Introducción',
    },
    {
      name: 'founders',
      title: 'Fundadores',
    },
    {
      name: 'values',
      title: 'Valores',
    },
    {
      name: 'promises',
      title: 'Promesas',
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
          title: 'Título',
          type: 'string',
        },
        {
          name: 'block_info',
          title: 'Texto de Información',
          type: 'array',
          of: [{type: 'block'}],
        },
        {
          name: 'img_hero',
          title: 'Imagen Principal',
          type: 'image',
        },
      ],
    },
    {
      name: 'intro',
      title: 'Introducción',
      group: 'intro',
      type: 'object',
      fields: [
        {
          name: 'block_info',
          title: 'Texto de Introducción',
          type: 'array',
          of: [{type: 'block'}],
        },
        {
          name: 'img_intro',
          title: 'Imagen de Introducción flotante',
          type: 'image',
        },
        {
          name: 'block_infoImg',
          title: 'Imagen con texto',
          type: 'array',
          of: [{type: 'block'}, {type: 'image'}],
        },
      ],
    },
    {
      name: 'founders',
      title: 'Fundadores',
      group: 'founders',
      type: 'object',
      fields: [
        {
          name: 'arr_founders',
          title: 'Lista de Fundadores',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'img_founder',
                  title: 'Imagen del Fundador',
                  type: 'image',
                },
                {
                  name: 'string_name',
                  title: 'Nombre',
                  type: 'string',
                },
                {
                  name: 'string_quote',
                  title: 'Cita',
                  type: 'string',
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
      name: 'values',
      title: 'Valores',
      group: 'values',
      type: 'object',
      fields: [
        {
          name: 'string_h3',
          title: 'Titulo de Valores',
          type: 'string',
        },
        {
          name: 'text_values',
          title: 'Texto de Valores',
          type: 'text',
        },
        {
          name: 'arr_values',
          title: 'Lista de Valores',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'img_iconValue',
                  title: 'Icono de Valor',
                  type: 'image',
                },
                {
                  name: 'block_info',
                  title: 'Descripción del Valor',
                  type: 'array',
                  of: [{type: 'block'}],
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
      name: 'promises',
      title: 'Promesas',
      group: 'promises',
      type: 'object',
      fields: [
        {
          name: 'block_info',
          title: 'Texto de Promesas',
          type: 'array',
          of: [{type: 'block'}],
        },
        {
          name: 'img_promises1',
          title: 'Imagen de Promesas',
          type: 'image',
        },
        {
          name: 'img_promises2',
          title: 'Imagen de Promesas 2',
          type: 'image',
        },
      ],
    },
  ],
}
