import BlogDetails from "@/components/Blog/BlogDetails";
import { getPostDetails } from "@/services/postServices";
import { notFound } from "next/navigation"; // Crucial for SEO (returns real 404 status)
import { cache } from "react";

export const revalidate = 60; // ISR: regenerate page every 60 seconds

// Cache the fetch so generateMetadata and the Page component share the same request
const getCachedPost = cache(async (slug) => {
  return await getPostDetails(slug);
});

// ------------------------
// Metadata for SEO (Next.js 16 App Router)
// ------------------------
export async function generateMetadata({ params }) {
  const { slug, lang } = await params;

  const data = await getCachedPost(slug);
  if (!data?.post) return {}; 

  // Safely extract all localized fields, including the new keywords array
  const post = {
    title: data.post.title?.[lang] || data.post.title?.en || "",
    seoTitle: data.post.seoTitle?.[lang] || data.post.seoTitle?.en || data.post.title?.en || "",
    metaDescription: data.post.metaDescription?.[lang] || data.post.metaDescription?.en || "",
    slug: data.post.slug?.[lang]?.current || data.post.slug?.en?.current || slug,
    image: data.post.mainImage || "https://www.expatlifeinfo.com/default-og-image.jpg",
    keywords: data.post.keywords?.[lang] || data.post.keywords?.en || [] // <--- ADDED KEYWORDS HERE
  };

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.expatlifeinfo.com";

  return {
    metadataBase: new URL(baseUrl),
    title: post.seoTitle,
    description: post.metaDescription,
    keywords: post.keywords, // <--- INJECTED INTO NEXT.JS METADATA
    alternates: {
      canonical: `/${lang}/blog/${post.slug}`,
      languages: {
        en: `/en/blog/${data.post.slug?.en?.current || slug}`,
        ar: `/ar/blog/${data.post.slug?.ar?.current || slug}`,
      },
    },
    // Open Graph for social sharing (WhatsApp, LinkedIn, etc.)
    openGraph: {
      title: post.seoTitle,
      description: post.metaDescription,
      url: `/${lang}/blog/${post.slug}`,
      siteName: "Expat Life Info",
      images: [
        {
          url: post.image,
          width: 1200,
          height: 630,
          alt: post.seoTitle,
        },
      ],
      locale: lang === 'ar' ? 'ar_SA' : 'en_US',
      type: 'article',
    },
  };
}

// ------------------------
// Page Component with ISR
// ------------------------
const BlogDetailsPage = async ({ params }) => {
  const { slug, lang } = await params;

  const data = await getCachedPost(slug);

  if (!data?.post) {
    notFound(); // Triggers Next.js 404 page & sends 404 HTTP status to Google
  }

  // Pick requested language with fallback
  const post = {
    ...data.post,
    title: data.post.title?.[lang] || data.post.title?.en || "",
    excerpt: data.post.excerpt?.[lang] || data.post.excerpt?.en || "",
    body: data.post.body?.[lang] || data.post.body?.en || [],
    seoTitle: data.post.seoTitle?.[lang] || data.post.seoTitle?.en || "",
    metaDescription: data.post.metaDescription?.[lang] || data.post.metaDescription?.en || "",
    slug: data.post.slug?.[lang]?.current || data.post.slug?.en?.current || slug,
    keywords: data.post.keywords?.[lang] || data.post.keywords?.en || [], // <--- ADDED KEYWORDS HERE
  };

  // ------------------------
  // JSON-LD Structured Data
  // ------------------------
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.expatlifeinfo.com";
  
  // Create the schema object safely extracting localized values
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.seoTitle || post.title,
    description: post.metaDescription || post.excerpt,
    image: data.post.mainImage ? [data.post.mainImage] : [],
    datePublished: data.post.publishedAt || new Date().toISOString(),
    // If you have dateModified in Sanity, map it here. Otherwise fallback to publishedAt
    dateModified: data.post._updatedAt || data.post.publishedAt || new Date().toISOString(),
    author: {
      '@type': 'Person',
      // Safely grab the author's name, checking for localization
      name: data.post.author?.name?.[lang] || data.post.author?.name?.en || data.post.author?.name || 'Expat Life Info',
      url: data.post.author?.slug?.current ? `${baseUrl}/${lang}/author/${data.post.author.slug.current}` : baseUrl,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Expat Life Info',
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/logo.png`, // Update this to your actual logo URL
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${baseUrl}/${lang}/blog/${post.slug}`,
    },
    keywords: post.keywords.join(', '), // <--- ADDED TO JSON-LD (Requires a comma-separated string)
  };

  return (
    <>
      {/* Inject JSON-LD Script into the DOM */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <BlogDetails post={post} lang={lang} />
    </>
  );
};

export default BlogDetailsPage;