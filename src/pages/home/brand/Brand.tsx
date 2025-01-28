import { BrandLogoList } from "./Brand.data";

const Brand = () => {
  return (
    <div className=" pt-12 ">
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-6 md:grid-cols-3 mt-10 bg-gray-100 p-5">
        {BrandLogoList.map((brand, index) => (
          <div className="flex items-center justify-center align-center p-4 ">
            <img
              key={index}
              src={brand.logo}
              alt={brand.name}
              className="w-[60%] h-[60%] object-contain "
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Brand;
