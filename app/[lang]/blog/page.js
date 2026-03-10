import BlogList from "@/components/Blog/BlogList";
import { getPaginatedPosts } from "@/services/postServices";
import { cache } from "react";

export const revalidate = 60; // Regenerate every 60 seconds
const POSTS_PER_PAGE = 16;

const getCachedPosts = cache(async (lang, page) => {
  return await getPaginatedPosts(lang, page, POSTS_PER_PAGE);
});

export async function generateMetadata({ params, searchParams }) {
  const { lang } = await params;
  const sParams = await searchParams;
  const currentPage = parseInt(sParams?.page) || 1;
  const isArabic = lang === "ar";

  const title = isArabic ? `المدونة - صفحة ${currentPage}` : `Blog - Page ${currentPage}`;
  const description = isArabic ? "استكشف أحدث المقالات والأدلة." : "Explore our latest articles and guides.";
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.expatlifeinfo.com";

  return {
    title: `${title} | Expat Life Info`,
    description,
    alternates: {
      canonical: currentPage > 1 ? `${baseUrl}/${lang}/blog?page=${currentPage}` : `${baseUrl}/${lang}/blog`,
    },
    openGraph: {
      title,
      description,
      url: `${baseUrl}/${lang}/blog`,
      siteName: "Expat Life Info",
      locale: lang === 'ar' ? 'ar_SA' : 'en_US',
      type: 'website',
    },
  };
}

export default async function BlogIndexPage({ params, searchParams }) {
  const { lang } = await params;
  const sParams = await searchParams;
  const currentPage = parseInt(sParams?.page) || 1;

  const { posts, total } = await getCachedPosts(lang, currentPage);

  return (
    <BlogList 
      posts={posts} 
      total={total} 
      lang={lang} 
      currentPage={currentPage} 
      postsPerPage={POSTS_PER_PAGE} 
    />
  );
}