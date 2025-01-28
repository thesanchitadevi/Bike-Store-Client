import ProductsPage from "../products/ProductsPage";
import Services from "../services/Services";
import Brand from "./brand/Brand";
import Catergory from "./Category/Catergory";
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
      <ProductsPage />
    </>
  );
};

export default HomePage;
