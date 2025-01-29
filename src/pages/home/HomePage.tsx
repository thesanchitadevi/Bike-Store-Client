import Services from "../services/Services";
import Brand from "./brand/Brand";
import Catergory from "./Category/Catergory";
import FeaturedProductsPage from "./featured/FeaturedProducts";
import Hero from "./Hero/Hero";
import Promotional from "./promotional/Promotional";

const HomePage = () => {
  return (
    <>
      <Hero />
      <Catergory />
      <Services />
      <Brand />
      <Promotional />
      <FeaturedProductsPage />
    </>
  );
};

export default HomePage;
