import { client } from "@/sanity/lib/client";


export async function getCategories(lang = "en") {
  const query = `
    *[_type == "category"] | order(title.en asc) {
      _id,
      "title": title[$lang],
      "slug": slug.current,
      "image": image.asset->url,
      "smallText": count[$lang]
    }
  `;
  return await client.fetch(query, { lang });
}









export async function getCategoryPageData(slug, lang = "en", page = 1, limit = 16) {
  const start = (page - 1) * limit;
  const end = start + limit;

  const query = `{
    "category": *[_type == "category" && slug.current == $slug][0]{
      _id,
      "title": title[$lang], 
      "image": image.asset->url,
      "description": description[$lang]
    },
    "postsData": {
      "posts": *[_type == "post" && category->slug.current == $slug] | order(publishedAt desc) [$start...$end] {
        _id,
        "title": title[$lang],
        "excerpt": excerpt[$lang],
        // Pick the slug based on language
        "slug": slug[$lang].current, 
        // Corrected from 'image' to 'mainImage'
        "image": mainImage.asset->url, 
        publishedAt,
        "categoryTitle": category->title[$lang]
      },
      "total": count(*[_type == "post" && category->slug.current == $slug])
    }
  }`;

  return await client.fetch(query, { slug, lang, start, end });
}