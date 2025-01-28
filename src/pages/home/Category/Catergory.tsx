import { Link } from "react-router-dom";
import { CategoryData } from "./Category.data";
import { FaArrowRightLong } from "react-icons/fa6";

const Category = () => {
  return (
    <div className="container mx-auto pt-10">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4 animate-fade-in text-gray-600">
          SHOP BY CATEGORY
        </h1>
      </div>
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-6 lg:px-12">
        {CategoryData.map((category, index) => (
          <Link
            to={category.link}
            key={index}
            className="no-underline text-inherit"
          >
            <div className="relative border border-gray-300 rounded-sm overflow-hidden h-90 md:h-[70%] cursor-pointer group">
              {/* Image */}
              <img
                src={category.image}
                alt={category.title}
                className="w-full h-full object-cover  "
              />
              {/* Dark Shade Overlay */}
              <div className="absolute inset-0 bg-gray-900 opacity-60 rounded-md"></div>
              {/* Title on Image */}
              <div className="absolute bottom-[10px] left-0 right-0 text-left text-white p-2 transition-all duration-300 group-hover:bottom-10">
                <h3 className="text-2xl font-semibold text-[#F4B400] px-4">
                  {category.title}
                </h3>
              </div>
              <hr className="w-16 border-t-2 border-white my-2" />
              {/* Buy Now Button */}

              <div className="absolute bottom-[-50px] left-0 right-0 text-left text-white p-2 transition-all duration-300 group-hover:bottom-1">
                <div className="flex items-center justify-between px-4 pt-4 ">
                  <button className="flex text-white border-none   cursor-pointer">
                    Buy Now
                  </button>
                  <FaArrowRightLong />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Category;
