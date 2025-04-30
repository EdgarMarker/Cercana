export default {
  name: 'page',
  title: 'Pagina',
  type: 'document',
  fields: [
    {
      name: 'language',
      type: 'string',
      readOnly: true,
      hidden: true,
    },
    {
      name: 'title',
      title: 'Titulo de ejemplo',
      type: 'string',
    },
    {
      name: 'text',
      title: 'Descripción de ejemplo',
      type: 'text',
    },
  ],
  preview: {
    select: {
      title: 'title',
      language: 'language',
    },
    prepare({ title, language }: { title: string; language: string }) {
      return {
        title: title,
        subtitle: language ? `Idioma: ${language}` : 'Idioma no especificado',
      };
    },
  },
}
