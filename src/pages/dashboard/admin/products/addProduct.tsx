/* eslint-disable @typescript-eslint/no-unused-vars */
import { useRef, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { useAddProductMutation } from "../../../../redux/features/products/products.api";

interface FormValues {
  name: string;
  description: string;
  brand: string;
  price: number;
  quantity: number;
  category: string;
  inStock: boolean;
  model: string;
}

const AdminDashboardProductAdd = () => {
  const [imagePreview, setImagePreview] = useState<string>("");
  const [addProduct] = useAddProductMutation();
  const { register, handleSubmit, reset } = useForm<FormValues>();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const toastId = toast.loading("Adding Product...");
    const formData = new FormData();

    try {
      const imageFile = fileInputRef.current?.files?.[0];

      if (!imageFile) {
        toast.error("Please select an image first!", { id: toastId });
        return;
      }

      // Create a data object with all form values
      const productData = {
        name: data.name,
        description: data.description,
        brand: data.brand,
        price: data.price,
        quantity: data.quantity,
        category: data.category,
        inStock: data.inStock,
        model: data.model,
      };

      // Append the file and stringified data
      formData.append("file", imageFile);
      formData.append("data", JSON.stringify(productData)); // Match backend expectation

      await addProduct(formData).unwrap();

      toast.success("Product added successfully!", { id: toastId });
      reset();
      setImagePreview("");
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      toast.error("Failed to add product. Please try again.", { id: toastId });
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Add New Product</h1>
      <div className="max-w-5xl  p-6 bg-white rounded-lg shadow-md">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Product Image <span className="text-red-500">*</span>
            </label>
            <input
              ref={fileInputRef}
              id="image"
              name="image"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              required
              title="Product image is required"
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
            />
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Preview"
                className="mt-2 h-32 w-32 object-cover rounded"
              />
            )}
          </div>

          {/* Name */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Bike Name <span className="text-red-500">*</span>
            </label>
            <input
              {...register("name")}
              required
              title="Name is required"
              className="w-full px-3 py-2 border border-gray-300 rounded"
            />
          </div>

          {/* Model */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Model <span className="text-red-500">*</span>
            </label>
            <input
              {...register("model")}
              required
              title="Model is required"
              className="w-full px-3 py-2 border border-gray-300 rounded"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              {...register("description")}
              required
              title="Description is required"
              className="w-full px-3 py-2 border border-gray-300 rounded"
              rows={3}
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Category <span className="text-red-500">*</span>
            </label>
            <select
              {...register("category")}
              required
              title="Category is required"
              className="w-full px-3 py-2 border border-gray-300 rounded"
            >
              <option value="">Select a category</option>
              <option value="Mountain">Mountain</option>
              <option value="Road">Road</option>
              <option value="Hybrid">Hybrid</option>
              <option value="Electric">Electric</option>
            </select>
          </div>

          {/* Brand */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Brand <span className="text-red-500">*</span>
            </label>
            <input
              {...register("brand")}
              required
              title="Brand is required"
              className="w-full px-3 py-2 border border-gray-300 rounded"
            />
          </div>

          {/* Price and Quantity */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Price (৳) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                {...register("price", { valueAsNumber: true })}
                required
                min="1"
                title="Price must be greater than 0"
                className="w-full px-3 py-2 border border-gray-300 rounded"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Quantity <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                {...register("quantity", { valueAsNumber: true })}
                required
                min="1"
                title="Quantity must be greater than 0"
                className="w-full px-3 py-2 border border-gray-300 rounded"
              />
            </div>
          </div>

          {/* In Stock */}
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="inStock"
              {...register("inStock")}
              className="h-4 w-4 text-blue-600 border-gray-300 rounded"
            />
            <label htmlFor="inStock" className="text-sm font-medium">
              In Stock
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 mt-6"
          >
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminDashboardProductAdd;
