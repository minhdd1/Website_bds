import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { schemaTypes } from './src/sanity/schemas';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '6kx2x66j';
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';

export default defineConfig({
  basePath: '/studio', // Nơi nhúng Sanity Studio trong ứng dụng Next.js
  name: 'default',
  title: 'Kayla Nguyen Admin Studio',

  projectId,
  dataset,

  plugins: [structureTool()],

  schema: {
    types: schemaTypes,
  },
});
