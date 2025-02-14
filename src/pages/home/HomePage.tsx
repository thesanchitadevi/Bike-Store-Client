import Services from "../services/Services";
import PromoBanner from "./banner";
import BestProducts from "./bestproducts/BestProducts";
import Brand from "./brand/Brand";
import Catergory from "./Category/Catergory";
import FeaturedProductsPage from "./featured/FeaturedProducts";
import Hero from "./Hero/Hero";
import OfferBanners from "./OfferBanner/OfferBanner";

const HomePage = () => {
  return (
    <>
      <Hero />
      <Catergory />
      <FeaturedProductsPage />
      <Brand />
      <OfferBanners />
      <Services />
      <PromoBanner />
      <BestProducts />
    </>
  );
};

export default HomePage;
