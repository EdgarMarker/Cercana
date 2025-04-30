// src/workers/sanity-sync-webhook.ts

import { createClient } from "@sanity/client";
import type { SanityClient } from "@sanity/client";
import type { ExecutionContext } from "@cloudflare/workers-types";

interface Env {
  SANITY_PROJECT_ID: string;
  SANITY_DATASET: string;
  SANITY_API_WRITE_TOKEN: string;
  SANITY_WEBHOOK_SECRET: string;
}

async function isValidSignature(
  body: string,
  signature: string | null,
  secret: string
): Promise<boolean> {
  if (!signature || !secret) {
    return false;
  }
  console.warn("Webhook signature verification is not fully implemented!");
  return true; // DANGER: REPLACE WITH YOUR ACTUAL SECURE IMPLEMENTATION IN PRODUCTION
}

export default {
  async fetch(
    request: Request,
    env: Env, // <-- 'env' object correctly passed here
    ctx: ExecutionContext
  ): Promise<Response> {
    if (request.method !== "POST") {
      return new Response("Method Not Allowed", { status: 405 });
    }

    const bodyText = await request.text();
    const signature = request.headers.get("X-Sanity-Signature");

    if (
      !(await isValidSignature(bodyText, signature, env.SANITY_WEBHOOK_SECRET))
    ) {
      console.warn("Invalid signature or missing secret");
      return new Response("Invalid Signature", { status: 401 });
    }

    let body: any;
    try {
      body = JSON.parse(bodyText);
    } catch (error) {
      console.error("Error parsing JSON body:", error);
      return new Response("Invalid JSON body", { status: 400 });
    }

    const updatedDocument = body;

    if (!updatedDocument || !updatedDocument._type || !updatedDocument._id) {
      console.log("Payload does not contain a relevant document, type, or _id");
      return new Response("No relevant document, type, or _id in payload", {
        status: 200,
      });
    }

    const fieldsToSync: { [key: string]: any } = {};

    if (updatedDocument._type === "page") {
      if (updatedDocument.statsNumber !== undefined) {
        fieldsToSync.statsNumber = updatedDocument.statsNumber;
      }
    }
    // Add more else if blocks for other internationalized document types
    // else if (updatedDocument._type === 'product') {
    //     if (updatedDocument.price !== undefined) {
    //         fieldsToSync.price = updatedDocument.price;
    //     }
    // }

    if (Object.keys(fieldsToSync).length === 0) {
      console.log(
        `No configured non-translatable fields found for type ${updatedDocument._type} in updated document ${updatedDocument._id} or fieldsToSync is empty.`
      );
      return new Response("No non-translatable fields to sync for this type", {
        status: 200,
      });
    }

    const sanityClient: SanityClient = createClient({
      // --- CORRECCIÓN AQUÍ ---
      // En Cloudflare Workers, las variables de entorno se acceden vía el objeto 'env'
      // No uses process.env aquí.
      projectId: env.SANITY_PROJECT_ID,
      dataset: env.SANITY_DATASET,
      token: env.SANITY_API_WRITE_TOKEN, // Correcto, usa env aquí
      apiVersion: "2025-04-29",
      useCdn: false,
    });

    const relatedDocsQuery = `*[_type == $updatedDocType && _id != $updatedDocId && references($updatedDocId)]{_id, language}`;

    let relatedDocuments: Array<{ _id: string; language?: string }> = [];
    try {
      relatedDocuments = await sanityClient.fetch(relatedDocsQuery, {
        updatedDocType: updatedDocument._type,
        updatedDocId: updatedDocument._id,
      });

      relatedDocuments = relatedDocuments.filter(
        (doc: any) => doc._id !== updatedDocument._id
      );

      if (relatedDocuments.length === 0) {
        console.log(
          `No related documents found for document ${updatedDocument._type}:${updatedDocument._id} to sync fields.`
        );
        return new Response("No related documents found", { status: 200 });
      }
    } catch (error: any) {
      console.error("Error fetching related documents:", error);
      return new Response(
        `Error fetching related documents: ${error.message}`,
        { status: 500 }
      );
    }

    const patchOperations = relatedDocuments.map((doc) => {
      console.log(
        `Patching document ${doc._id} (${doc.language}) with fields:`,
        fieldsToSync
      );
      return sanityClient.patch(doc._id).set(fieldsToSync).commit();
    });

    try {
      const patchResults = await Promise.all(patchOperations);
      console.log(
        `Successfully synced fields for document ${updatedDocument._id} to ${relatedDocuments.length} related documents. Results:`,
        patchResults
      );
      return new Response("Sync successful", { status: 200 });
    } catch (error: any) {
      console.error("Error applying patches:", error);
      return new Response(`Error applying patches: ${error.message}`, {
        status: 500,
      });
    }

    console.warn("Webhook request did not result in sync or error.");
    return new Response("Unhandled request logic", { status: 400 });
  },
};