import { defineType, defineField } from "sanity";

export default defineType({
  name: "category",
  title: "Category",
  type: "document",
  fields: [

    // =========================
    // TITLE (BILINGUAL)
    // =========================
    defineField({
      name: "title",
      title: "Title",
      type: "object",
      fields: [
        {
          name: "en",
          title: "English Title",
          type: "string",
          validation: Rule => Rule.required()
        },
        {
          name: "ar",
          title: "Arabic Title",
          type: "string",
          validation: Rule => Rule.required()
        }
      ]
    }),

    // =========================
    // SLUG (ENGLISH ONLY)
    // =========================
    defineField({
      name: "slug",
      title: "Slug (English Only)",
      type: "slug",
      options: {
        source: "title.en",
        maxLength: 96
      },
      validation: Rule => Rule.required()
    }),

    // =========================
    // CATEGORY IMAGE
    // =========================
    defineField({
      name: "image",
      title: "Category Image",
      type: "image",
      options: { hotspot: true }
    }),

    // =========================
    // SMALL LABEL / COUNT (BILINGUAL)
    // Example: "Latest Rules"
    // =========================
    defineField({
      name: "count",
      title: "Small Label (Count Text)",
      type: "object",
      fields: [
        {
          name: "en",
          title: "English Small Text",
          type: "string"
        },
        {
          name: "ar",
          title: "Arabic Small Text",
          type: "string"
        }
      ]
    }),

  ],

  preview: {
    select: {
      title: "title.en",
      media: "image"
    }
  }
});