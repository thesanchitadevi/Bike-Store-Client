import { Link } from "react-router-dom";
import { CategoryData } from "./Category.data";
import { ArrowRight, Package } from "lucide-react";

const Category = () => {
  return (
    <div className="container max-w-6xl mx-auto md:px-0 px-5 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 text-gray-800">
          Shop by Category
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Discover our extensive range of products across different categories.
          Find exactly what you're looking for with our organized collection.
        </p>
      </div>

      {/* Category Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {CategoryData.map((category, index) => (
          <Link
            to={`/products?category=${category.title.split(" ")[0]}`}
            key={index}
            className="group block"
          >
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              {/* Image Container */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={category.image}
                  alt={category.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>

                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <div className="bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-2">
                    <Package className="w-4 h-4 text-[#BD2A2E]" />
                    <span className="text-sm font-medium text-gray-800">
                      Category
                    </span>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-[#BD2A2E] transition-colors">
                      {category.title}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Explore our collection
                    </p>
                  </div>
                  <div className="flex items-center justify-center w-10 h-10 bg-[#BD2A2E] rounded-full text-white transition-all duration-300 group-hover:bg-[#9a2326] group-hover:scale-110">
                    <ArrowRight className="w-5 h-5" />
                  </div>
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
