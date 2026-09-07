import PopularCategories from "@/Pages/home/_components/PopularCategories";
import HeroBanner from "@/Pages/home/_components/HeroBanner";
import BestWeeklyDeals from "@/Pages/home/_components/BestWeeklyDeals";
import TrendingSearch from "@/Pages/home/_components/TrendingSearch";
import PreOrderBanner from "@/Pages/home/_components/PreOrderBanner";
import PopularBrands from "@/Pages/home/_components/PopularBrands";
import BlogSection from "@/Pages/home/_components/BlogSection";
import Newsletter from "@/Pages/home/_components/Newsletter";
import ServiceFeatures from "@/Pages/home/_components/ServiceFeatures";
import SectionCarousel from "@/Pages/home/_components/SectionCarousel";
import ProductShowcase from "@/Pages/home/_components/ProductShowcase";
import FeaturedProductShowcase from "./_components/FeaturedProductShowcase";
const HomePage = () => {
  return (
    <>
      <SectionCarousel />
      <HeroBanner />
      <PopularCategories />
      <main>
        <BestWeeklyDeals />
        <TrendingSearch />
        <PreOrderBanner />
        <ProductShowcase />
        <PopularBrands />
        <FeaturedProductShowcase />
        <BlogSection />
        <Newsletter />
        <ServiceFeatures />
      </main>
    </>
  );
};

export default HomePage;
