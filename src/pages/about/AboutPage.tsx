import { AboutData } from "./About.data";
import Address from "./Address";

interface CardProps {
  title: string;
  description: string;
}

const Card = ({ title, description }: CardProps) => {
  return (
    <div className="shadow-md rounded-lg p-6 bg-white hover:shadow-lg transition-shadow duration-300">
      <div className="text-center">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
};

const AboutPage = () => {
  return (
    <div className=" py-12">
      <div className="container max-w-6xl mx-auto md:px-0 px-5 py-4">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            About Us
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed mb-8">
            Welcome to{" "}
            <span className="font-semibold text-gray-900">Bike Store</span>,
            your go-to destination for all your biking needs. From custom bikes
            to expert repairs, we’re here to ensure your ride is smooth and
            enjoyable.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {AboutData.map((card, index) => (
            <Card
              key={index}
              title={card.title}
              description={card.description}
            />
          ))}
        </div>
        <Address />
      </div>
    </div>
  );
};

export default AboutPage;
