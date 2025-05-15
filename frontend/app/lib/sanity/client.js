import { createClient } from "@sanity/client";

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_STUDIO_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_STUDIO_DATASET,
  apiVersion: "2025-04-29",
  useCdn: false,
});