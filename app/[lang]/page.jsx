import CategoriesGrid from "@/components/Home/CategoryGrid"
import GovServices from "@/components/Home/GovernemntServices"
import LatestNewsSlider from "@/components/Home/LatestArticles"
import LivingInSaudi from "@/components/Home/LivingInSaudi"
import PopularGuides from "@/components/Home/PopularGuides"
import VisaIqamaServices from "@/components/Home/VisaAndIqama"

import { getLatestPosts, getPopularGuides,getAllPostsByLang } from "@/services/postServices"
import { getCategories } from "@/services/categoriesServices"
import BankingFinance from "@/components/Home/BankingFinance"
import JobsSalaries from "@/components/Home/JobsSalaries"
import DrivingTraffic from "@/components/Home/DrivingTraffic"
import BusinessSetup from "@/components/Home/BusinessSetup"
import CategoryExplore from "@/components/Home/CategoryExploral"

export default async function HomePage({ params }) {
  const { lang } = await params

  const latestPosts = await getLatestPosts(lang);

  const popularGuides = await getPopularGuides(lang);

  const allPosts = await getAllPostsByLang(lang);

  

  const categories = await getCategories(lang);

  console.log("Fetched Categories:", categories);


  // Filter posts for "Living in Saudi" category
  const livingPosts = allPosts.filter(post => post.categorySlug === "cost-of-living");

  const visaIqamaPosts = allPosts.filter(post => post.categorySlug === "visa-and-iqama");

  const financePosts = allPosts.filter(post => post.categorySlug === "banking-and-finance");

  const jobsandSalariesPosts = allPosts.filter(post => post.categorySlug === "jobs-and-salaries");

  const drivingPosts = allPosts.filter(post => post.categorySlug === "driving-and-traffic"); 

  const businessPosts = allPosts.filter(post => post.categorySlug === "business-and-company-setup");


  
 

  return (
    <div>
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
  )
}