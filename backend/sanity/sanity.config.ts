import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {documentInternationalization} from '@sanity/document-internationalization'

const supportedLanguages = [
  {id: 'es', title: 'Español'},
  {id: 'en', title: 'English'},
]

export default defineConfig({
  name: 'default',
  title: 'Cercana',

  projectId: 'sbu6lo2w',
  dataset: 'production',

  plugins: [
    structureTool(),
    visionTool(),
    documentInternationalization({
      supportedLanguages: supportedLanguages,
      schemaTypes: ['page'],
      languageField: 'language',
    }),
  ],

  schema: {
    types: schemaTypes,
  },
})
