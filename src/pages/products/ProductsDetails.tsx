import {
  Minus,
  Plus,
  ShoppingCart,
  Star,
  ThumbsUp,
  MessageCircle,
  Send,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import { useParams, Link } from "react-router-dom";
import {
  useGetSingleproductQuery,
  useGetAllProductsQuery,
} from "../../redux/features/products/products.api";
import { useState } from "react";
import { useAppDispatch } from "../../redux/hooks";
import { addToCart } from "../../redux/features/cart/cartSlice";
import ProductImageModal from "./ProductImageModal";
import { ProductDetailsSkeleton } from "../../components/ui/Skeleton";

const tags = ["Bike", "Mountain Bikes", "Road Bikes", "Hybrid Bikes"];

// Mock data for reviews
const mockReviews = [
  {
    id: 1,
    user: "John Doe",
    rating: 5,
    comment:
      "Excellent product! Highly recommended. The build quality is outstanding and it exceeded my expectations.",
    date: "2024-01-15",
    helpful: 12,
    verified: true,
  },
  {
    id: 2,
    user: "Sarah Smith",
    rating: 4,
    comment: "Good value for money. Fast delivery and great customer service.",
    date: "2024-01-10",
    helpful: 8,
    verified: true,
  },
  {
    id: 3,
    user: "Mike Johnson",
    rating: 5,
    comment:
      "Perfect! Exactly what I was looking for. Will definitely buy again.",
    date: "2024-01-05",
    helpful: 15,
    verified: false,
  },
];

// Mock data for Q&A
const mockQA = [
  {
    id: 1,
    question: "What's the warranty period for this product?",
    answer:
      "This product comes with a 2-year manufacturer warranty covering all defects.",
    asker: "Customer",
    answerer: "Seller",
    date: "2024-01-12",
    helpful: 5,
  },
  {
    id: 2,
    question: "Is this suitable for professional use?",
    answer:
      "Yes, this product is designed for both personal and professional use with industrial-grade components.",
    asker: "Professional User",
    answerer: "Seller",
    date: "2024-01-08",
    helpful: 3,
  },
];

const ProductsDetails = () => {
  const { id } = useParams();
  const { data, isLoading, error } = useGetSingleproductQuery(id as string);
  const { data: allProducts } = useGetAllProductsQuery(undefined);
  const [quantity, setQuantity] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("reviews");
  const [newQuestion, setNewQuestion] = useState("");
  const [newReview, setNewReview] = useState({ rating: 5, comment: "" });
  const [expandedQA, setExpandedQA] = useState<number[]>([]);

  const dispatch = useAppDispatch();

  // Get suggested products (exclude current product)
  const suggestedProducts = Array.isArray(allProducts?.data)
    ? allProducts.data.filter((product) => product._id !== id).slice(0, 4)
    : [];

  // Calculate average rating
  const averageRating =
    mockReviews.reduce((sum, review) => sum + review.rating, 0) /
    mockReviews.length;
  const ratingDistribution = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: mockReviews.filter((review) => review.rating === star).length,
    percentage:
      (mockReviews.filter((review) => review.rating === star).length /
        mockReviews.length) *
      100,
  }));

  const handleIncrease = () => setQuantity((prev) => prev + 1);
  const handleDecrease = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const toggleQA = (id: number) => {
    setExpandedQA((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSubmitQuestion = () => {
    if (newQuestion.trim()) {
      // Handle question submission logic here
      setNewQuestion("");
    }
  };

  const handleSubmitReview = () => {
    if (newReview.comment.trim()) {
      // Handle review submission logic here
      setNewReview({ rating: 5, comment: "" });
    }
  };

  if (isLoading) return <ProductDetailsSkeleton />;
  if (error)
    return <p className="text-center py-4">Error fetching product details.</p>;
  if (!data || !data.data)
    return <p className="text-center py-4">Product not found.</p>;

  const product = data.data;

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        product: product._id,
        name: product.name,
        price: product.price,
        quantity,
        image: product.image,
      })
    );
  };

  return (
    <div className="py-15">
      <div className="container max-w-6xl mx-auto md:px-0 px-5 py-4">
        {/* Original Product Details Section */}
        <div className="flex flex-col md:flex-row  bg-white rounded-lg shadow-md overflow-hidden mb-8">
          {/* Image Section */}
          <div className="md:flex-1 px-4">
            <div
              className="md:h-[460px] rounded-lg bg-gray-300 mb-4 cursor-zoom-in"
              onClick={() => setIsModalOpen(true)}
            >
              <img
                src={product.image}
                className="w-full h-full object-cover"
                alt={product.name}
              />
            </div>
          </div>

          {/* Details Section */}
          <div className="md:flex-1 px-4 py-6">
            <h2 className="text-3xl font-bold text-gray-800 mb-3">
              {product.name}
            </h2>

            <div className="flex items-center justify-between mb-6">
              <div>
                <span className="text-2xl font-semibold text-[#BD2A2E]">
                  {product.price} BDT
                </span>
              </div>
              <div className="flex items-center">
                {product.inStock ? (
                  <span className="flex items-center text-sm font-medium text-green-600">
                    <span className="w-2 h-2 rounded-full bg-green-600 mr-2"></span>
                    In Stock
                  </span>
                ) : (
                  <span className="flex items-center text-sm font-medium text-red-600">
                    <span className="w-2 h-2 rounded-full bg-red-600 mr-2"></span>
                    Out of Stock
                  </span>
                )}
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-700 mb-2">
                Product Details
              </h3>
              <p className="text-gray-600">{product.description}</p>
            </div>

            <div className="mb-8">
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-gray-200 rounded-md overflow-hidden">
                  <button
                    className="p-2 hover:bg-gray-100 transition-colors"
                    onClick={handleDecrease}
                    type="button"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <input
                    type="number"
                    className="w-16 text-center py-2 bg-transparent border-x border-gray-200"
                    value={quantity}
                    readOnly
                  />
                  <button
                    className="p-2 hover:bg-gray-100 transition-colors"
                    onClick={handleIncrease}
                    type="button"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <button
                  className="flex-1 flex items-center justify-center gap-2 bg-[#BD2A2E] hover:bg-[#9a2326] text-white py-3 px-6 rounded-md font-medium transition-colors"
                  type="button"
                  onClick={handleAddToCart}
                >
                  <ShoppingCart className="w-5 h-5" />
                  Add to Cart
                </button>
              </div>
            </div>

            <div className="space-y-4 border-t border-gray-300 pt-4">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <h4 className="text-gray-700 font-semibold mb-1">Category</h4>
                  <p className="text-gray-600">{product.category}</p>
                </div>
                <div>
                  <h4 className="text-gray-700 font-semibold mb-1">Brand</h4>
                  <p className="text-gray-600">{product.brand}</p>
                </div>
                <div>
                  <h4 className="text-gray-700 font-semibold mb-1">Model</h4>
                  <p className="text-gray-600">{product.model}</p>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-gray-700 mb-2">Tags</h4>
                <div className="flex flex-wrap gap-2 items-center">
                  {tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1.5 rounded-sm text-sm font-medium bg-gray-600 text-gray-100"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews, Q&A, and Suggested Products Section */}
        <>
          {/* Tab Navigation */}
          <div className="border-b border-gray-200 bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="flex">
              {["reviews", "qa", "suggested"].map((tab) => (
                <button
                  key={tab}
                  className={`px-6 py-4 font-medium text-sm border-b-2 transition-colors ${
                    activeTab === tab
                      ? "border-[#BD2A2E] text-[#BD2A2E] bg-red-50"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab === "reviews" && "Reviews & Ratings"}
                  {tab === "qa" && "Questions & Answers"}
                  {tab === "suggested" && "Suggested Products"}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-6 bg-white rounded-lg shadow-md overflow-hidden my-2">
            {/* Reviews Tab */}
            {activeTab === "reviews" && (
              <div className="space-y-6">
                {/* Rating Summary */}
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <div className="text-center">
                      <div className="text-4xl font-bold text-gray-800 mb-2">
                        {averageRating.toFixed(1)}
                      </div>
                      <div className="flex justify-center mb-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`w-5 h-5 ${
                              star <= Math.round(averageRating)
                                ? "text-yellow-400 fill-current"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <div className="text-gray-600">
                        Based on {mockReviews.length} reviews
                      </div>
                    </div>
                  </div>
                  <div>
                    {ratingDistribution.map(({ star, count, percentage }) => (
                      <div key={star} className="flex items-center gap-2 mb-2">
                        <span className="text-sm w-8">{star}★</span>
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-yellow-400 h-2 rounded-full"
                            style={{ width: `${percentage}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-600 w-8">
                          {count}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Write Review */}
                <div className="border-t pt-6">
                  <h3 className="text-lg font-semibold mb-4">Write a Review</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Rating
                      </label>
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            onClick={() =>
                              setNewReview((prev) => ({
                                ...prev,
                                rating: star,
                              }))
                            }
                            className="p-1"
                          >
                            <Star
                              className={`w-6 h-6 ${
                                star <= newReview.rating
                                  ? "text-yellow-400 fill-current"
                                  : "text-gray-300"
                              }`}
                            />
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Review
                      </label>
                      <textarea
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#BD2A2E] focus:border-transparent"
                        rows={4}
                        placeholder="Share your experience with this product..."
                        value={newReview.comment}
                        onChange={(e) =>
                          setNewReview((prev) => ({
                            ...prev,
                            comment: e.target.value,
                          }))
                        }
                      />
                    </div>
                    <button
                      onClick={handleSubmitReview}
                      className="bg-[#BD2A2E] text-white px-6 py-2 rounded-md hover:bg-[#9a2326] transition-colors"
                    >
                      Submit Review
                    </button>
                  </div>
                </div>

                {/* Reviews List */}
                <div className="border-t pt-6">
                  <h3 className="text-lg font-semibold mb-4">
                    Customer Reviews
                  </h3>
                  <div className="space-y-6">
                    {mockReviews.map((review) => (
                      <div
                        key={review.id}
                        className="border-b pb-6 last:border-b-0"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-medium">{review.user}</span>
                              {review.verified && (
                                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                                  Verified Purchase
                                </span>
                              )}
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="flex">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <Star
                                    key={star}
                                    className={`w-4 h-4 ${
                                      star <= review.rating
                                        ? "text-yellow-400 fill-current"
                                        : "text-gray-300"
                                    }`}
                                  />
                                ))}
                              </div>
                              <span className="text-sm text-gray-500">
                                {review.date}
                              </span>
                            </div>
                          </div>
                        </div>
                        <p className="text-gray-700 mb-3">{review.comment}</p>
                        <div className="flex items-center gap-4">
                          <button className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700">
                            <ThumbsUp className="w-4 h-4" />
                            Helpful ({review.helpful})
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Q&A Tab */}
            {activeTab === "qa" && (
              <div className="space-y-6">
                {/* Ask Question */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Ask a Question</h3>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      className="flex-1 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#BD2A2E] focus:border-transparent"
                      placeholder="What would you like to know about this product?"
                      value={newQuestion}
                      onChange={(e) => setNewQuestion(e.target.value)}
                    />
                    <button
                      onClick={handleSubmitQuestion}
                      className="bg-[#BD2A2E] text-white px-4 py-3 rounded-md hover:bg-[#9a2326] transition-colors"
                    >
                      <Send className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Q&A List */}
                <div className="border-t pt-6">
                  <h3 className="text-lg font-semibold mb-4">
                    Questions & Answers
                  </h3>
                  <div className="space-y-4">
                    {mockQA.map((qa) => (
                      <div
                        key={qa.id}
                        className="border border-gray-200 rounded-lg p-4"
                      >
                        <button
                          onClick={() => toggleQA(qa.id)}
                          className="flex items-center justify-between w-full text-left"
                        >
                          <div className="flex items-start gap-2">
                            <MessageCircle className="w-5 h-5 text-[#BD2A2E] mt-0.5" />
                            <div>
                              <p className="font-medium text-gray-800">
                                {qa.question}
                              </p>
                              <p className="text-sm text-gray-500">
                                Asked by {qa.asker}
                              </p>
                            </div>
                          </div>
                          {expandedQA.includes(qa.id) ? (
                            <ChevronDown className="w-5 h-5 text-gray-400" />
                          ) : (
                            <ChevronRight className="w-5 h-5 text-gray-400" />
                          )}
                        </button>

                        {expandedQA.includes(qa.id) && (
                          <div className="mt-4 pl-7 border-t pt-4">
                            <div className="bg-gray-50 p-3 rounded-md">
                              <p className="text-gray-700 mb-2">{qa.answer}</p>
                              <div className="flex items-center justify-between text-sm text-gray-500">
                                <span>
                                  Answered by {qa.answerer} on {qa.date}
                                </span>
                                <button className="flex items-center gap-1 hover:text-gray-700">
                                  <ThumbsUp className="w-3 h-3" />
                                  Helpful ({qa.helpful})
                                </button>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Suggested Products Tab */}
            {activeTab === "suggested" && (
              <div>
                <h3 className="text-lg font-semibold mb-6">
                  You might also like
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {suggestedProducts.map((suggestedProduct) => (
                    <Link
                      key={suggestedProduct._id}
                      to={`/product/${suggestedProduct._id}`}
                      className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
                    >
                      <div className="relative">
                        <img
                          className="w-full h-32 object-cover"
                          src={suggestedProduct.image}
                          alt={suggestedProduct.name}
                        />
                        {suggestedProduct.quantity < 5 && (
                          <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                            SALE
                          </span>
                        )}
                      </div>
                      <div className="p-3">
                        <h4 className="font-medium text-sm mb-2 line-clamp-2">
                          {suggestedProduct.name}
                        </h4>
                        <div className="flex justify-between items-center">
                          <span className="font-bold text-[#BD2A2E]">
                            {suggestedProduct.price} BDT
                          </span>
                          <span
                            className={`text-xs px-2 py-1 rounded ${
                              suggestedProduct.quantity === 0
                                ? "bg-red-100 text-red-800"
                                : "bg-green-100 text-green-800"
                            }`}
                          >
                            {suggestedProduct.quantity === 0
                              ? "OUT"
                              : "IN STOCK"}
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </>
      </div>

      {/* Product Image Modal */}
      <ProductImageModal
        image={product.image}
        alt={product.name}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default ProductsDetails;
