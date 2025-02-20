import { useState } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

interface ProductFormData {
  name: string;
  brand: string;
  price: number;
  category: "Mountain" | "Road" | "Hybrid" | "Electric";
  description: string;
  quantity: number;
  inStock: boolean;
  image: string;
}

interface FormErrors {
  name?: string;
  brand?: string;
  price?: string;
  category?: string;
  description?: string;
  quantity?: string;
  image?: string;
}

const categories = ["Mountain", "Road", "Hybrid", "Electric"] as const;

const AdminDashboardProductAdd = () => {
  const [formData, setFormData] = useState<Omit<ProductFormData, "image">>({
    name: "",
    brand: "",
    price: 0,
    category: "Mountain",
    description: "",
    quantity: 0,
    inStock: true,
  });

  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) newErrors.name = "Product name is required";
    if (!formData.brand.trim()) newErrors.brand = "Brand name is required";
    if (formData.price <= 0) newErrors.price = "Price must be greater than 0";
    if (formData.quantity < 0)
      newErrors.quantity = "Quantity cannot be negative";
    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    } else if (formData.description.length < 20) {
      newErrors.description = "Description must be at least 20 characters";
    }
    if (!image) newErrors.image = "Product image is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, inStock: e.target.checked }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setErrors((prev) => ({ ...prev, image: "Please upload an image file" }));
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setErrors((prev) => ({
        ...prev,
        image: "Image size should be less than 5MB",
      }));
      return;
    }

    setImage(file);
    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result as string);
    reader.readAsDataURL(file);
    setErrors((prev) => ({ ...prev, image: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm())
      return toast.error("Please fill all required fields correctly");

    setLoading(true);
    const formDataToSend = new FormData();

    try {
      // Append form data
      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, value.toString());
      });

      if (image) formDataToSend.append("image", image);

      const response = await fetch("/api/admin/products", {
        method: "POST",
        body: formDataToSend,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to add product");
      }

      toast.success("Product added successfully!");

      // Reset form
      setFormData({
        name: "",
        brand: "",
        price: 0,
        category: "Mountain",
        description: "",
        quantity: 0,
        inStock: true,
      });
      setImage(null);
      setImagePreview(null);
    } catch (error) {
      console.error("Error:", error);
      toast.error(
        error instanceof Error ? error.message : "Failed to add product"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Add New Product</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          {/* Name Input */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Product Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleInputChange}
              className={`mt-1 block w-full rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
                errors.name ? "border-red-300" : "border-gray-300"
              }`}
              required
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name}</p>
            )}
          </div>

          {/* Brand Input */}
          <div>
            <label
              htmlFor="brand"
              className="block text-sm font-medium text-gray-700"
            >
              Brand
            </label>
            <input
              id="brand"
              name="brand"
              type="text"
              value={formData.brand}
              onChange={handleInputChange}
              className={`mt-1 block w-full rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
                errors.brand ? "border-red-300" : "border-gray-300"
              }`}
              required
            />
            {errors.brand && (
              <p className="mt-1 text-sm text-red-600">{errors.brand}</p>
            )}
          </div>

          {/* Price Input */}
          <div>
            <label
              htmlFor="price"
              className="block text-sm font-medium text-gray-700"
            >
              Price
            </label>
            <input
              id="price"
              name="price"
              type="number"
              min="0"
              step="1"
              value={formData.price}
              onChange={handleInputChange}
              className={`mt-1 block w-full rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
                errors.price ? "border-red-300" : "border-gray-300"
              }`}
              required
            />
            {errors.price && (
              <p className="mt-1 text-sm text-red-600">{errors.price}</p>
            )}
          </div>

          {/* Category Select */}
          <div>
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700"
            >
              Category
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* Description Textarea */}
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={4}
              className={`mt-1 block w-full rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
                errors.description ? "border-red-300" : "border-gray-300"
              }`}
              required
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-600">{errors.description}</p>
            )}
          </div>

          {/* Quantity Input */}
          <div>
            <label
              htmlFor="quantity"
              className="block text-sm font-medium text-gray-700"
            >
              Quantity
            </label>
            <input
              id="quantity"
              name="quantity"
              type="number"
              min="0"
              value={formData.quantity}
              onChange={handleInputChange}
              className={`mt-1 block w-full rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
                errors.quantity ? "border-red-300" : "border-gray-300"
              }`}
              required
            />
            {errors.quantity && (
              <p className="mt-1 text-sm text-red-600">{errors.quantity}</p>
            )}
          </div>

          {/* In Stock Checkbox */}
          <div className="flex items-center">
            <input
              id="inStock"
              name="inStock"
              type="checkbox"
              checked={formData.inStock}
              onChange={handleCheckboxChange}
              className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <label
              htmlFor="inStock"
              className="ml-2 block text-sm text-gray-700"
            >
              In Stock
            </label>
          </div>

          {/* Image Upload */}
          <div>
            <label
              htmlFor="image"
              className="block text-sm font-medium text-gray-700"
            >
              Product Image
            </label>
            <input
              id="image"
              name="image"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className={`mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 ${
                errors.image ? "border-red-300" : ""
              }`}
            />
            {errors.image && (
              <p className="mt-1 text-sm text-red-600">{errors.image}</p>
            )}
            {imagePreview && (
              <div className="mt-4">
                <img
                  src={imagePreview}
                  alt="Product preview"
                  className="max-w-xs rounded-lg shadow-md"
                />
              </div>
            )}
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin -ml-1 mr-2 h-5 w-5" />
              Adding Product...
            </>
          ) : (
            "Add Product"
          )}
        </button>
      </form>
    </div>
  );
};

export default AdminDashboardProductAdd;
