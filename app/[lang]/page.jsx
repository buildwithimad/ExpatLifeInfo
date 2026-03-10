import CategoriesGrid from "@/components/Home/CategoryGrid"
import GovServices from "@/components/Home/GovernemntServices"
import LatestNewsSlider from "@/components/Home/LatestArticles"
import LivingInSaudi from "@/components/Home/LivingInSaudi"
import PopularGuides from "@/components/Home/PopularGuides"
import VisaIqamaServices from "@/components/Home/VisaAndIqama"
import BankingFinance from "@/components/Home/BankingFinance"
import JobsSalaries from "@/components/Home/JobsSalaries"
import DrivingTraffic from "@/components/Home/DrivingTraffic"
import BusinessSetup from "@/components/Home/BusinessSetup"
import CategoryExplore from "@/components/Home/CategoryExploral"

import { getLatestPosts, getPopularGuides, getAllPostsByLang } from "@/services/postServices"
import { getCategories } from "@/services/categoriesServices"
import { notFound } from "next/navigation"

const validLangs = ["en", "ar"];

// ISR: Cache the homepage for 1 hour to handle the heavy 'getAllPosts' fetch efficiently
export const revalidate = 3600; 

// ------------------------
// 1. Top-Tier SEO Metadata
// ------------------------
export async function generateMetadata({ params }) {
  const { lang } = await params;
  
  if (!validLangs.includes(lang)) return {};

  const isArabic = lang === "ar";
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.expatlifeinfo.com";

  // CORRECTED: Branded Titles & Descriptions
  const title = isArabic 
    ? "Expat Life Info | الأخبار، الإقامة، والأعمال في السعودية" 
    : "Expat Life Info | Saudi News, Visas, and Business Setup";
    
  const description = isArabic
    ? "مصدرك الشامل للمعلومات حول الحياة، العمل، وتأشيرات الدخول في المملكة العربية السعودية. ابق مطلعاً على أحدث الأخبار والأدلة."
    : "Your ultimate resource for living, working, and navigating visas in Saudi Arabia. Stay updated with the latest expat news and guides.";

  return {
    metadataBase: new URL(baseUrl),
    title,
    description,
    alternates: {
      canonical: `${baseUrl}/${lang}`,
      languages: {
        en: `${baseUrl}/en`,
        ar: `${baseUrl}/ar`,
      },
    },
    openGraph: {
      title,
      description,
      url: `${baseUrl}/${lang}`,
      siteName: "Expat Life Info", // CORRECTED
      images: [
        {
          url: `${baseUrl}/og-home.jpg`, // Ensure you have an og-home.jpg in your public folder!
          width: 1200,
          height: 630,
          alt: "Expat Life Info", // CORRECTED
        },
      ],
      locale: isArabic ? "ar_SA" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${baseUrl}/og-home.jpg`],
    },
  };
}

// ------------------------
// 2. Page Component
// ------------------------
export default async function HomePage({ params }) {
  const { lang } = await params;

  if (!validLangs.includes(lang)) {
    notFound();
  }
  
  // Fetch Data
  const latestPosts = await getLatestPosts(lang);
  const popularGuides = await getPopularGuides(lang);
  const allPosts = await getAllPostsByLang(lang);
  const categories = await getCategories(lang);

  // Filter posts
  const livingPosts = allPosts.filter(post => post.categorySlug === "cost-of-living");
  const visaIqamaPosts = allPosts.filter(post => post.categorySlug === "visa-and-iqama");
  const financePosts = allPosts.filter(post => post.categorySlug === "banking-and-finance");
  const jobsandSalariesPosts = allPosts.filter(post => post.categorySlug === "jobs-and-salaries");
  const drivingPosts = allPosts.filter(post => post.categorySlug === "driving-and-traffic"); 
  const businessPosts = allPosts.filter(post => post.categorySlug === "business-and-company-setup");

  const isArabic = lang === "ar";
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.expatlifeinfo.com";

  // ------------------------
  // 3. JSON-LD Structured Data
  // ------------------------
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Expat Life Info', // CORRECTED: Main brand name
    alternateName: isArabic ? 'دليل المغتربين في السعودية' : 'Saudi Expat Guide', // Good for SEO keywords
    url: `${baseUrl}/${lang}`,
    publisher: {
      '@type': 'Organization',
      name: 'Expat Life Info', // CORRECTED
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/logo.png` // Ensure you have a logo.png in your public folder
      }
    },
    // Enables the Google Sitelinks Search Box
    potentialAction: {
      '@type': 'SearchAction',
      target: `${baseUrl}/${lang}/search?q={search_term_string}`,
      'query-input': 'required name=search_term_string'
    }
  };

  return (
    <>
      {/* Inject JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="overflow-x-hidden">
        <LatestNewsSlider lang={lang} latestPosts={latestPosts} />
        <PopularGuides lang={lang} popularGuides={popularGuides} />
        <CategoryExplore lang={lang} categories={categories} />
        <CategoriesGrid lang={lang} categories={categories} />
        <LivingInSaudi lang={lang} livingPosts={livingPosts} />
        <VisaIqamaServices lang={lang} visaIqamaPosts={visaIqamaPosts} />
        <BankingFinance lang={lang} financePosts={financePosts}/>
        <JobsSalaries lang={lang} jobPosts={jobsandSalariesPosts} />
        <DrivingTraffic lang={lang} drivingPosts={drivingPosts} />
        <BusinessSetup lang={lang} businessPosts={businessPosts} />
        <GovServices lang={lang} />
      </div>
    </>
  )
}