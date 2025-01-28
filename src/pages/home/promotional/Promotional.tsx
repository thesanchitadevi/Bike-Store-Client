import { Link } from "react-router-dom";
import { PromoData } from "./Promotional.data";

const Promotional = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
      {PromoData.map((data, index) => (
        <div
          className="relative h-[100vh] text-white overflow-hidden rounded-sm"
          key={index}
        >
          <div className="overflow-hidden bg-cover0 absolute inset-0">
            <img
              src={data.image}
              alt="Background Image"
              className="object-cover object-center w-full h-full transition duration-300 ease-in-out hover:scale-110"
            />
            <div className="absolute inset-0 bg-black opacity-70"></div>
          </div>

          <div className="relative z-10 flex flex-col justify-center items-center h-full text-center">
            <h1 className="text-3xl md:text-6xl font-bold leading-tight mb-4 uppercase text-gray-200">
              {data.title}
            </h1>
            <p className="text-lg md:text-xl font-semibold text-gray-300 m-8 uppercase">
              {data.description}
            </p>
            <Link
              to="/products"
              className="bg-white text-gray-900 hover:text-gray-200 hover:bg-[#BD2A2E] py-2 px-6 rounded-full text-lg font-semibold transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg"
            >
              Order Now &rarr;
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Promotional;
