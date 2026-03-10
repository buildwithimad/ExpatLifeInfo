import { client } from "@/sanity/lib/client";

export async function getLatestPosts(lang = "en", limit = 5) {
  const query = `
    *[_type == "post" && defined(slug.en.current)] 
    | order(publishedAt desc)[0...$limit] {
      _id,
      "title": title[$lang],
      "slug": slug.en.current,        // Always English slug
      "excerpt": excerpt[$lang],
      "image": mainImage.asset->url,
      publishedAt,
      readTime,
      "category": category->{
        "title": title[$lang],
        "slug": slug.current
      }
    }
  `;

  return await client.fetch(query, { lang, limit });
}


export async function getPopularGuides(lang = "en", limit = 6) {
  const query = `
    *[
      _type == "post" &&
      isPopular == true &&
      defined(slug[$lang].current)
    ]
    | order(publishedAt desc)[0...$limit] {
      _id,
      "title": title[$lang],
      "slug": slug[$lang].current,
      "excerpt": excerpt[$lang],
      "image": mainImage.asset->url,
      publishedAt,
      readTime,
      "category": category->{
        "title": title[$lang],
        "slug": slug.current
      }
    }
  `;

  return await client.fetch(query, { lang, limit });
}

export async function getAllPostsByLang(lang = "en") {
  const query = `
    *[_type == "post" && defined(slug[$lang].current)]
    | order(publishedAt desc) {
      _id,
      "title": title[$lang],
      "slug": slug[$lang].current,
      "excerpt": excerpt[$lang],
      "image": mainImage.asset->url,
      publishedAt,
      readTime,
      "categoryTitle": category->title[$lang],
      "categorySlug": category->slug.current
    }
  `;

  return await client.fetch(query, { lang });
}




export async function getPostDetails (slug){
  // 1. Target slug.en.current
  // 2. Resolve image assets to strings using ->url
  const query = `*[_type == "post" && (slug.en.current == $slug || slug.ar.current == $slug)][0]{
    _id,
    title,
    slug,
    excerpt,
    "mainImage": mainImage.asset->url, // Resolves the image object to a usable URL string
    body,
    readTime,
    tags,
    videoUrl,
    publishedAt,
    featured,
    isPopular,
    "category": category->{
      _id,
      title
    },
    "author": author->{
      _id,
      name,
      "image": image.asset->url, // Resolves the author image to a URL string
      bio,
      "slug": slug.current
    },
    seoTitle,
    metaDescription,
    keywords
  }`;

  try {
    const post = await client.fetch(query, { slug });
    return { post };
  } catch (error) {
    console.error("Sanity Fetch Error:", error);
    return { post: null };
  }
};