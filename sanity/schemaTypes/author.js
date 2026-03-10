import { defineType, defineField } from "sanity";

export default defineType({
  name: "author",
  title: "Author",
  type: "document",
  fields: [
    
    // Name (same in both languages)
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: Rule => Rule.required()
    }),

    // Image
    defineField({
      name: "image",
      title: "Image",
      type: "image",
    }),

    // Bio (bilingual)
    defineField({
      name: "bio",
      title: "Bio",
      type: "object",
      fields: [
        {
          name: "en",
          title: "English Bio",
          type: "text"
        },
        {
          name: "ar",
          title: "Arabic Bio",
          type: "text"
        }
      ]
    }),
  ],

  preview: {
    select: {
      title: "name",
      media: "image"
    }
  }
});
