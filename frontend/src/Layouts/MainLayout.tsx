import { Outlet } from "react-router-dom";

import Header from "@/Pages/home/_components/Header";
import Navigation from "@/Pages/home/_components/Navigation";
import Breadcrumb from "@/Pages/home/_components/Breadcrumb";
import Footer from "@/Pages/home/_components/Footer";
import PromotionBar from "@/Pages/home/_components/PromotionBar";

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-white">
      <PromotionBar />
      <Header />

      {/* <SectionCarousel /> */}

      <Navigation />

      <Breadcrumb />

      <main>
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default MainLayout;
