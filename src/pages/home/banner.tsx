import { Link } from "react-router-dom";

const PromoBanner = () => {
  return (
    <div className="relative bg-gradient-to-r from-purple-600 to-blue-600 h-100 text-white overflow-hidden my-10">
      <div className="absolute inset-0">
        <img
          src="https://images.pexels.com/photos/9534369/pexels-photo-9534369.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt="Background Image"
          className="object-cover object-center w-full h-full"
        />
        <div className="absolute inset-0 bg-black opacity-80"></div>
      </div>

      <div className="relative z-10 flex flex-col justify-center items-center h-full text-center py-5">
        <p className="text-md md:text-lg font-semibold mb-4 tracking-[0.5rem] md:tracking-[2rem]">
          SPRING 2025
        </p>
        <h1 className="text-4xl md:text-7xl font-bold leading-tight mb-4 uppercase">
          Best Quality Products
        </h1>

        <Link
          to="/products"
          className="bg-[#BD2A2E] text-gray-200  py-3 px-6  text-medium font-semibold transition duration-300 ease-in-out transform  uppercase"
        >
          Order now
        </Link>
      </div>
    </div>
  );
};

export default PromoBanner;
