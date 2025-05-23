import { useState } from "react";
import { X, ZoomIn, ZoomOut } from "lucide-react";

const ProductImageModal = ({
  image,
  alt,
  isOpen,
  onClose,
}: {
  image: string;
  alt: string;
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [zoomLevel, setZoomLevel] = useState(1);

  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 0.25, 3));
  };

  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 0.25, 1));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-md bg-opacity-90 z-50 flex items-center justify-center p-4">
      <div className="relative max-w-4xl w-full max-h-[90vh]">
        <button
          onClick={onClose}
          className="absolute -top-10 right-0 text-white hover:text-gray-300 transition-colors"
        >
          <X size={24} />
        </button>

        <div className="flex gap-4 absolute -top-10 left-0">
          <button
            onClick={handleZoomIn}
            className="text-white hover:text-gray-300 transition-colors"
            disabled={zoomLevel >= 3}
          >
            <ZoomIn size={24} />
          </button>
          <button
            onClick={handleZoomOut}
            className="text-white hover:text-gray-300 transition-colors"
            disabled={zoomLevel <= 1}
          >
            <ZoomOut size={24} />
          </button>
        </div>

        <div className="overflow-auto h-full">
          <img
            src={image}
            className="w-full h-auto object-contain"
            style={{ transform: `scale(${zoomLevel})` }}
            alt={alt}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductImageModal;
