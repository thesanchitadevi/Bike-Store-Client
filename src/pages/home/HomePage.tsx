import Services from "../services/Services";
import Brand from "./brand/Brand";
import Catergory from "./Category/Catergory";
import Hero from "./Hero/Hero";

const HomePage = () => {
  return (
    <>
      <Hero />
      <Catergory />
      <Services />
      <Brand />
    </>
  );
};

export default HomePage;
