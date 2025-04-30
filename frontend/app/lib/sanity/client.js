import { createClient } from 'next-sanity';

export const client = createClient({
  projectId: process.env.SANITY_STUDIO_PROJECT_ID,
  dataset: process.env.SANITY_STUDIO_DATASET,
  apiVersion: '2025-04-29',
  useCdn: process.env.NODE_ENV === 'production',
});
