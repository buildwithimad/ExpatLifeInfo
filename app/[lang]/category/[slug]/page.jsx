import CategoryView from "@/components/Category/CategoryView"; // Adjust path as needed
import { getCategoryPageData } from "@/services/categoriesServices";
import { notFound } from "next/navigation";
import { cache } from "react";

export const revalidate = 60; // ISR: Regenerate page every 60 seconds
const POSTS_PER_PAGE = 16;

// 1. Cache the fetch to prevent double-fetching between generateMetadata and the page render
const getCachedCategoryData = cache(async (slug, lang, page) => {
  return await getCategoryPageData(slug, lang, page, POSTS_PER_PAGE);
});

// ------------------------
// Metadata for SEO
// ------------------------
export async function generateMetadata({ params, searchParams }) {
  const { lang, slug } = await params;
  const sParams = await searchParams;
  const currentPage = parseInt(sParams?.page) || 1;

  const { category } = await getCachedCategoryData(slug, lang, currentPage);
  
  if (!category) {
    return { title: "Category Not Found", robots: { index: false, follow: false } };
  }

  const categoryTitle = typeof category.title === "string" ? category.title : category.title?.[lang] || "Category";
  const categoryDesc = category.description || `Explore the latest articles in ${categoryTitle}`;
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.expatlifeinfo.com";
  const currentUrl = currentPage > 1 ? `${baseUrl}/${lang}/category/${slug}?page=${currentPage}` : `${baseUrl}/${lang}/category/${slug}`;

  return {
    metadataBase: new URL(baseUrl),
    title: `${categoryTitle} - Page ${currentPage} | Expat Life Info`,
    description: categoryDesc,
    alternates: {
      canonical: currentUrl,
      // Note: If categories have localized slugs, map them here. Otherwise, reuse slug.
      languages: {
        en: `${baseUrl}/en/category/${slug}`,
        ar: `${baseUrl}/ar/category/${slug}`,
      },
    },
    openGraph: {
      title: categoryTitle,
      description: categoryDesc,
      url: currentUrl,
      siteName: "Expat Life Info",
      images: category.image ? [{ url: category.image, width: 1200, height: 630, alt: categoryTitle }] : [],
      locale: lang === 'ar' ? 'ar_SA' : 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: categoryTitle,
      description: categoryDesc,
      images: category.image ? [category.image] : [],
    },
  };
}

// ------------------------
// Main Page Component
// ------------------------
export default async function CategoryPage({ params, searchParams }) {
  const { lang, slug } = await params;
  const sParams = await searchParams;
  const currentPage = parseInt(sParams?.page) || 1;

  const { category, postsData } = await getCachedCategoryData(slug, lang, currentPage);

  if (!category) notFound();

  // ------------------------
  // JSON-LD Structured Data (Collection & ItemList Schema)
  // ------------------------
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.expatlifeinfo.com";
  const categoryTitle = typeof category.title === "string" ? category.title : category.title?.[lang] || "Category";
  
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: categoryTitle,
    url: `${baseUrl}/${lang}/category/${slug}`,
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: postsData.posts.map((post, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: `${baseUrl}/${lang}/news/${post.slug}`,
        name: typeof post.title === "string" ? post.title : post.title?.[lang] || ""
      }))
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Pass all data cleanly to the UI component */}
      <CategoryView 
        category={category} 
        postsData={postsData} 
        lang={lang} 
        slug={slug} 
        currentPage={currentPage} 
        postsPerPage={POSTS_PER_PAGE}
      />
    </>
  );
}