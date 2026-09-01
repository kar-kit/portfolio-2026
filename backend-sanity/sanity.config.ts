import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'backend-sanity',

  projectId: 'mcqmxqxe',
  dataset: 'qa',

  plugins: [structureTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
