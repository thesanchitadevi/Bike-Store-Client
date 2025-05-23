// src/components/navigation/MegaMenu.tsx
import { NavLink } from "react-router-dom";

interface MenuItem {
  name: string;
  slug: string;
}

interface MegaMenuProps {
  onClose: () => void;
}

const MegaMenu = ({ onClose }: MegaMenuProps) => {
  const policyItems: MenuItem[] = [
    { name: "Terms & Conditions", slug: "terms-and-conditions" },
    { name: "Return Policy", slug: "return-policy" },
    { name: "Privacy Policy", slug: "privacy-policy" },
    { name: "Shipping Policy", slug: "shipping-policy" },
  ];

  return (
    <div className="absolute left-0 w-full bg-white shadow-lg z-50 border-t border-gray-200">
      <div className="max-w-6xl mx-auto px-4 py-3">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {policyItems.map((item) => (
            <div key={item.slug} className="p-3 hover:bg-gray-50 rounded-lg">
              <NavLink
                to={`/policies/${item.slug}`}
                className="block py-2 text-gray-700 hover:text-[#BD2A2E] font-medium"
                onClick={onClose}
              >
                {item.name}
              </NavLink>
              <p className="text-gray-500 text-sm mt-1">
                {item.name === "Terms & Conditions" && "Our terms of service"}
                {item.name === "Return Policy" && "How to return products"}
                {item.name === "Privacy Policy" && "How we handle your data"}
                {item.name === "Shipping Policy" && "Delivery information"}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MegaMenu;
