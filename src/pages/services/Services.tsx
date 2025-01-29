import { services } from "./Service.data";

export default function Services() {
  return (
    <div className="bg-gray-100 py-12">
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4 animate-fade-in text-[#1F2024] uppercase">
            Our Services
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            We offer top-notch solutions for all your biking needs. From repairs
            and customizations to rentals, we have everything you need to keep
            you riding smoothly
          </p>
        </div>

        {/* Services Grid */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-6 lg:px-12">
          {services.map((service, index) => (
            <div
              key={index}
              className="shadow-lg rounded-2xl overflow-hidden transform transition duration-300 hover:-translate-y-1"
            >
              {/* Service Image */}
              <div className="relative">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-56 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
              </div>

              {/* Service Content */}
              <div className="p-6">
                <h2 className="text-xl font-semibold text-black mb-2">
                  {service.title}
                </h2>
                <p className="text-gray-600">{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
