import { defineType, defineField } from "sanity";

export default defineType({
  name: "post",
  title: "Post",
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
        { name: "en", title: "English Title", type: "string", validation: Rule => Rule.required() },
        { name: "ar", title: "Arabic Title", type: "string", validation: Rule => Rule.required() }
      ]
    }),

    // =========================
    // SLUG (BILINGUAL)
    // =========================
    defineField({
      name: "slug",
      title: "Slug",
      type: "object",
      fields: [
        {
          name: "en",
          title: "English Slug",
          type: "slug",
          options: { source: "title.en" }
        },
        {
          name: "ar",
          title: "Arabic Slug",
          type: "slug",
          options: { source: "title.ar" }
        }
      ]
    }),

    // =========================
    // EXCERPT (BILINGUAL)
    // =========================
    defineField({
      name: "excerpt",
      title: "Excerpt",
      type: "object",
      fields: [
        { name: "en", title: "English Excerpt", type: "text" },
        { name: "ar", title: "Arabic Excerpt", type: "text" }
      ]
    }),

    // =========================
    // MAIN IMAGE
    // =========================
    defineField({
      name: "mainImage",
      title: "Main Image",
      type: "image",
      options: { hotspot: true }
    }),

    // =========================
    // BODY (BILINGUAL) - with image support
    // =========================
    defineField({
      name: "body",
      title: "Body",
      type: "object",
      fields: [
        {
          name: "en",
          title: "English Content",
          type: "array",
          of: [
            { type: "block" },
            { type: "image", options: { hotspot: true } }
          ]
        },
        {
          name: "ar",
          title: "Arabic Content",
          type: "array",
          of: [
            { type: "block" },
            { type: "image", options: { hotspot: true } }
          ]
        }
      ]
    }),

    // =========================
    // RELATIONS
    // =========================
    defineField({
      name: "category",
      title: "Category",
      type: "reference",
      to: [{ type: "category" }]
    }),

    defineField({
      name: "author",
      title: "Author",
      type: "reference",
      to: [{ type: "author" }]
    }),

    // =========================
    // ADDITIONAL FIELDS
    // =========================
    defineField({
      name: "readTime",
      title: "Read Time (minutes)",
      type: "number",
      validation: Rule => Rule.min(1),
      initialValue: 5
    }),

    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
      options: {
        layout: "tags"
      }
    }),

    defineField({
      name: "videoUrl",
      title: "Video URL",
      type: "url",
      description: "Add a video URL from YouTube or Vimeo"
    }),

    // =========================
    // PUBLISHING
    // =========================
    defineField({
      name: "publishedAt",
      title: "Published At",
      type: "datetime"
    }),

    defineField({
      name: "featured",
      title: "Featured Post",
      type: "boolean",
      initialValue: false
    }),

    defineField({
      name: "isPopular",
      title: "Popular Post",
      type: "boolean",
      initialValue: false
    }),

    // =========================
    // SEO (BILINGUAL)
    // =========================
    defineField({
      name: "seoTitle",
      title: "SEO Title",
      type: "object",
      fields: [
        { name: "en", title: "English SEO Title", type: "string" },
        { name: "ar", title: "Arabic SEO Title", type: "string" }
      ]
    }),

    defineField({
      name: "metaDescription",
      title: "Meta Description",
      type: "object",
      fields: [
        { name: "en", title: "English Meta Description", type: "text" },
        { name: "ar", title: "Arabic Meta Description", type: "text" }
      ]
    }),

    defineField({
      name: "keywords",
      title: "SEO Keywords",
      type: "array",
      of: [{ type: "string" }]
    })

  ],

  preview: {
    select: {
      title: "title.en",
      media: "mainImage"
    }
  }
});
