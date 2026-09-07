import PromotionBar from "@/Pages/home/_components/PromotionBar";
import Header from "@/Pages/home/_components/Header";
import Navigation from "@/Pages/home/_components/Navigation";
import PopularCategories from "@/Pages/home/_components/PopularCategories";
import HeroBanner from "@/Pages/home/_components/HeroBanner";
import BestWeeklyDeals from "@/Pages/home/_components/BestWeeklyDeals";
import TrendingSearch from "@/Pages/home/_components/TrendingSearch";
import PreOrderBanner from "@/Pages/home/_components/PreOrderBanner";
import PopularBrands from "@/Pages/home/_components/PopularBrands";
import BlogSection from "@/Pages/home/_components/BlogSection";
import Newsletter from "@/Pages/home/_components/Newsletter";
import ServiceFeatures from "@/Pages/home/_components/ServiceFeatures";
import Footer from "@/Pages/home/_components/Footer";
import SectionTicker from "./_components/SectionTicker";
import SectionCarousel from "@/Pages/home/_components/SectionCarousel";
import ProductShowcase from "@/Pages/home/_components/ProductShowcase";
const HomePage = () => {
  return (
    <>
      <PromotionBar />
      <Header />
      <SectionCarousel />
      <PopularCategories />
      <main>
        <HeroBanner />
        {/* <Navigation /> */}
        <ProductShowcase />
        <BestWeeklyDeals />
        <TrendingSearch />
        <PreOrderBanner />
        <PopularBrands />

        <BlogSection />
        <Newsletter />
        <ServiceFeatures />
        <Footer />
      </main>
    </>
  );
};

export default HomePage;
