import { Minus, Plus } from "lucide-react";

const ProductsDetails = () => {
  return (
    <div className="py-15">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row -mx-4">
          <div className="md:flex-1 px-4">
            <div className="h-[460px] rounded-lg bg-gray-300 dark:bg-gray-700 mb-4">
              <img
                className="w-full h-full object-cover"
                src="https://cdn.pixabay.com/photo/2020/05/22/17/53/mockup-5206355_960_720.jpg"
                alt="Product Image"
              />
            </div>
          </div>
          <div className="md:flex-1 px-4">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
              Product Name
            </h2>

            <div className="flex mb-4">
              <div className="mr-4">
                <span className="font-bold text-gray-700 dark:text-gray-300">
                  Price:
                </span>
                <span className="text-gray-600 dark:text-gray-300">$29.99</span>
              </div>
              <div>
                <span className="font-bold text-gray-700 dark:text-gray-300">
                  Availability:
                </span>
                <span className="text-gray-600 dark:text-gray-300">
                  In Stock
                </span>
              </div>
            </div>

            <div>
              <p className="text-gray-600 dark:text-gray-300 text-sm mt-2">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sed
                ante justo. Integer euismod libero id mauris malesuada
                tincidunt. Vivamus commodo nulla ut lorem rhoncus aliquet. Duis
                dapibus augue vel ipsum pretium, et venenatis sem blandit.
                <br />
                <br />
                Quisque ut erat vitae nisi ultrices placerat non eget velit.
                Integer ornare mi sed ipsum lacinia, non sagittis mauris
                blandit. Morbi fermentum libero vel nisl suscipit, nec tincidunt
                mi consectetur.
              </p>
            </div>
            <div className="flex -mx-2 my-15">
              {/* Quantity Button */}
              <div>
                <div className="flex items-center outline outline-gray-300 ">
                  <button className="p-2">
                    <Plus />
                  </button>
                  <input
                    type="number"
                    className="outline-none text-center w-16 py-4 bg-transparent"
                    defaultValue={1}
                  />
                  <button className="p-2">
                    <Minus />
                  </button>
                </div>
              </div>
              <div className="w-1/2 px-2">
                <button className="w-full bg-[#BD2A2E] text-white py-4 px-4 font-semibold hover:bg-gray-800 cursor-pointer uppercase">
                  Add to Cart
                </button>
              </div>
            </div>
            <div>
              {/* Category */}
              <div className="flex items-center mb-4">
                <span className="font-bold text-gray-700 dark:text-gray-300">
                  Category:{" "}
                </span>
                <span className="text-gray-600 dark:text-gray-300">
                  Electronics
                </span>
              </div>
              {/* Tags */}
              <div className="flex items-center mb-4">
                <span className="font-bold text-gray-700 dark:text-gray-300">
                  Tags:{" "}
                </span>
                <span className="text-gray-600 dark:text-gray-300">
                  Bike, Mountain Bikes, Road Bikes
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsDetails;
