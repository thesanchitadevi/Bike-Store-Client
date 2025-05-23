import { Link } from "react-router-dom";
import { OfferData } from "./offer.data";

const OfferBanners = () => {
  return (
    <section className="w-full py-10 bg-gray-50">
      <div className="container max-w-6xl mx-auto md:px-0 px-5 py-4">
        <div className="flex flex-col md:flex-row gap-6 md:gap-8">
          {OfferData.map((offer, index) => (
            <div
              key={index}
              className="w-full md:w-1/2 relative group overflow-hidden rounded-md"
            >
              <div className="relative h-96">
                {/* Discount badge */}
                <span
                  className={`absolute top-4 left-4 z-10 ${
                    index === 0 ? "bg-red-600" : "bg-green-600"
                  } text-white px-4 py-2 rounded-full text-sm font-medium shadow-md uppercase`}
                >
                  {index === 0 ? "70% Off" : "50% Off"}
                </span>

                <img
                  src={offer.image}
                  alt={offer.title}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>

              {/* Enhanced text overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 via-black/90 to-transparent">
                <div className="text-white space-y-2 [text-shadow:_0_2px_4px_rgba(0,0,0,0.5)]">
                  <h5 className="text-2xl font-bold">{offer.title}</h5>
                  <p className="text-lg">{offer.description}</p>
                  <Link
                    to="/products"
                    className="bg-[#BD2A2E] text-gray-200  py-3 px-6  text-medium transition  duration-300 ease-in-out transform uppercase
                    mt-4 inline-block font-medium  shadow-lg"
                  >
                    Shop Now
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OfferBanners;
