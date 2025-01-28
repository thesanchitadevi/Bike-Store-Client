import { BrandLogoList } from "./Brand.data";

const Brand = () => {
  return (
    <div className="container mx-auto pt-12">
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-6 md:grid-cols-3">
        {BrandLogoList.map((brand, index) => (
          <div className="flex items-center justify-center p-4">
            <img
              key={index}
              src={brand.logo}
              alt={brand.name}
              className="w-24 h-24 object-contain "
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Brand;
