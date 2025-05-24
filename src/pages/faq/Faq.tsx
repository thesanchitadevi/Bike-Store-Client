import { useState } from "react";
import { Link } from "react-router-dom";

const FaqPage = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "What types of bikes do you sell?",
      answer:
        "We offer a wide range of bicycles including road bikes, mountain bikes, hybrid bikes, electric bikes, and kids' bikes. Our inventory is carefully selected to cater to all cycling enthusiasts.",
    },
    {
      question: "Do you offer bike assembly services?",
      answer:
        "Yes, we provide professional bike assembly for all purchases at our store for a small fee. If you prefer to assemble it yourself, we also offer free basic assembly instructions.",
    },
    {
      question: "What is your return policy?",
      answer:
        "We accept returns within 30 days of purchase with the original receipt. The item must be in its original condition with all tags attached. Some exclusions apply for customized or special order bikes.",
    },
    {
      question: "Do you provide maintenance services?",
      answer:
        "Absolutely! Our certified technicians offer full maintenance services including tune-ups, brake adjustments, gear tuning, and complete overhauls. We also offer seasonal maintenance packages.",
    },
    {
      question: "How do I choose the right bike size?",
      answer:
        "Bike sizing depends on your height, inseam, and riding style. We have sizing charts available online, but we recommend visiting our store for a professional bike fitting to ensure optimal comfort and performance.",
    },
    {
      question: "Do you offer financing options?",
      answer:
        "Yes, we partner with several financing companies to offer flexible payment plans. You can apply for financing online or in-store with instant approval options available.",
    },
    {
      question: "What safety gear do you recommend?",
      answer:
        "We strongly recommend a properly fitted helmet as a minimum. Additional safety gear includes gloves, reflective clothing, lights, and mirrors depending on your riding conditions.",
    },
    {
      question: "Can I test ride bikes before purchasing?",
      answer:
        "Of course! We encourage test rides on all our bikes. Just bring a valid ID, and our staff will help you find the perfect bike to test on our designated test ride area.",
    },
  ];

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-gray-600">
            Find answers to common questions about our bikes, services, and
            policies.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-200"
            >
              <button
                className="w-full px-6 py-5 text-left focus:outline-none"
                onClick={() => toggleAccordion(index)}
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-gray-900">
                    {faq.question}
                  </h3>
                  <svg
                    className={`w-6 h-6 text-gray-500 transform transition-transform duration-200 ${
                      activeIndex === index ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </button>
              <div
                className={`px-6 pb-5 transition-all duration-300 ease-in-out ${
                  activeIndex === index ? "block" : "hidden"
                }`}
              >
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-blue-50 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Still have questions?
          </h2>
          <p className="text-gray-600 mb-6">
            Our customer service team is happy to help with any other questions
            you might have.
          </p>
          <Link
            to="/contact"
            className="bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-6 rounded-lg transition duration-200"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FaqPage;
