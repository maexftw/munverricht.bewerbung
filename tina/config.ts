import { defineConfig } from "tinacms";

const branch =
  process.env.CF_PAGES_BRANCH ||
  process.env.HEAD ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  "main";

export default defineConfig({
  branch,
  clientId: process.env.TINA_PUBLIC_CLIENT_ID || process.env.VITE_TINA_PUBLIC_CLIENT_ID || null,
  token: process.env.TINA_TOKEN || process.env.VITE_TINA_TOKEN || null,

  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "",
      publicFolder: "public",
    },
  },
  schema: {
    collections: [
      {
        name: "page",
        label: "Pages",
        path: "content/pages",
        format: "md",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            type: "object",
            name: "hero",
            label: "Hero Section",
            fields: [
              { type: "string", name: "slogan", label: "Slogan" },
              { type: "string", name: "firstName", label: "First Name" },
              { type: "string", name: "lastName", label: "Last Name" },
              { type: "rich-text", name: "description", label: "Description" },
            ],
          },
          {
            type: "object",
            name: "evolution",
            label: "Evolution / Werdegang",
            list: true,
            fields: [
              { type: "string", name: "period", label: "Zeitraum" },
              { type: "string", name: "title", label: "Titel" },
              { type: "string", name: "tagline", label: "Tagline" },
              { type: "rich-text", name: "description", label: "Beschreibung" },
            ],
          },
          {
            type: "object",
            name: "skills",
            label: "Skills / System Performance",
            list: true,
            fields: [
              { type: "string", name: "category", label: "Kategorie" },
              { type: "string", name: "items", label: "Items", list: true },
              { type: "number", name: "level", label: "Level (0-100)" },
            ],
          },
        ],
      },
      {
        name: "project",
        label: "Projects",
        path: "content/projects",
        format: "json",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          { type: "string", name: "url", label: "URL" },
          { type: "string", name: "desc", label: "Description" },
          { type: "string", name: "stack", label: "Stack", list: true },
        ],
      },
    ],
  },
});
