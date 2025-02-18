import { Link } from "react-router-dom";
import { useGetAllFProductsQuery } from "../../redux/features/products/products.api";
import { SearchIcon, Star } from "lucide-react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Slider,
  Button,
  Chip,
  TextField,
  InputAdornment,
} from "@mui/material";
import { useMemo, useState } from "react";
import BestProducts from "../home/bestproducts/BestProducts";
import Loading from "../../components/ui/Loading";

const ProductsPage = () => {
  const [filters, setFilters] = useState({
    category: "",
    brand: "",
    minPrice: 0,
    maxPrice: 10000,
    inStock: "",
    search: "",
  });

  // Query without filters to get all products for extracting categories and brands
  const { data: allProducts, isLoading } = useGetAllFProductsQuery([]);

  // Extract unique categories and brands using useMemo to avoid recalculation
  const { categories, brands } = useMemo(() => {
    if (!allProducts?.data) return { categories: [], brands: [] };

    const uniqueCategories = [
      ...new Set(allProducts.data.map((product) => product.category)),
    ];
    const uniqueBrands = [
      ...new Set(allProducts.data.map((product) => product.brand)),
    ];

    return {
      categories: uniqueCategories.filter(Boolean).sort(), // Remove empty values and sort
      brands: uniqueBrands.filter(Boolean).sort(),
    };
  }, [allProducts]);

  // Create query params array from filters for filtered products
  const queryParams = Object.entries(filters)
    .filter(([key, value]) => {
      // Only include inStock in query if it's not an empty string
      if (key === "inStock") return value !== "";
      // Only include search in query if it's not an empty string
      if (key === "search") return value.trim() !== "";
      // Include other non-empty filters
      return value !== "";
    })
    .map(([name, value]) => ({
      name,
      // Convert inStock string to boolean for the query
      value:
        name === "inStock" ? (value === "true").toString() : value.toString(),
    }));

  // Get filtered products
  const { data: filteredProducts } = useGetAllFProductsQuery(queryParams);

  const handleFilterChange = (name, value) => {
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle search input
  const [searchInput, setSearchInput] = useState("");
  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchInput(value);

    // Debounce the search to avoid too many API calls
    const timeoutId = setTimeout(() => {
      handleFilterChange("search", value);
    }, 500);

    return () => clearTimeout(timeoutId);
  };

  const handlePriceChange = (event, newValue) => {
    setFilters((prev) => ({
      ...prev,
      minPrice: newValue[0],
      maxPrice: newValue[1],
    }));
  };

  // Helper function to format inStock status for display
  const formatInStockStatus = (status) => {
    switch (status) {
      case "true":
        return "In Stock";
      case "false":
        return "Out of Stock";
      default:
        return "All Items";
    }
  };

  if (isLoading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  return (
    <div className="bg-gray-100 py-12">
      <div className="container mx-auto px-4 ">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4 animate-fade-in uppercase">
            Products
          </h1>
        </div>
        {/* Search Bar */}
        <div className="mb-6  w-full ">
          <TextField
            fullWidth
            placeholder="Search by product name, brand, or category..."
            value={searchInput}
            onChange={handleSearchChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            className="bg-white outline-none "
          />
        </div>

        {/* Filters Section */}
        <div className="mb-8 grid grid-cols-1 md:grid-cols-4 gap-4 bg-gray-100 p-4 rounded-lg shadow">
          <FormControl fullWidth>
            <InputLabel>Category</InputLabel>
            <Select
              value={filters.category}
              label="Category"
              onChange={(e) => handleFilterChange("category", e.target.value)}
              className="bg-white"
            >
              <MenuItem value="">All Categories</MenuItem>
              {categories.map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel>Brand</InputLabel>
            <Select
              value={filters.brand}
              label="Brand"
              onChange={(e) => handleFilterChange("brand", e.target.value)}
              className="bg-white"
            >
              <MenuItem value="">All Brands</MenuItem>
              {brands.map((brand) => (
                <MenuItem key={brand} value={brand}>
                  {brand}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <div className="px-4">
            <p className="text-sm font-medium mb-2">Price Range</p>
            <Slider
              color="#fffff"
              value={[filters.minPrice, filters.maxPrice]}
              onChange={handlePriceChange}
              valueLabelDisplay="auto"
              max={10000}
              step={100}
            />
            <div className="mt-2 text-sm text-gray-500 flex justify-between">
              <span>{filters.minPrice} BDT</span>
              <span>{filters.maxPrice} BDT</span>
            </div>
          </div>

          <FormControl fullWidth>
            <InputLabel>Availability</InputLabel>
            <Select
              value={filters.inStock}
              label="Availability"
              onChange={(e) => handleFilterChange("inStock", e.target.value)}
              className="bg-white"
            >
              <MenuItem value="">All Items</MenuItem>
              <MenuItem value="true">In Stock</MenuItem>
              <MenuItem value="false">Out of Stock</MenuItem>
            </Select>
          </FormControl>
        </div>

        {/* Active Filters */}
        <div className="mb-4 flex flex-wrap gap-2">
          {Object.entries(filters).map(([key, value]) => {
            if (value && key !== "minPrice" && key !== "maxPrice") {
              if (key === "search") {
                return value.trim() ? (
                  <Chip
                    key={key}
                    label={`Search: ${value}`}
                    onDelete={() => {
                      setSearchInput("");
                      handleFilterChange("search", "");
                    }}
                    className="bg-gray-100"
                  />
                ) : null;
              }
              let displayValue = value;
              if (key === "inStock") {
                displayValue = formatInStockStatus(value);
              }
              return (
                <Chip
                  key={key}
                  label={`${
                    key === "inStock" ? "Availability" : key
                  }: ${displayValue}`}
                  onDelete={() => handleFilterChange(key, "")}
                  className="bg-gray-100"
                />
              );
            }
            return null;
          })}
          {(filters.minPrice > 0 || filters.maxPrice < 10000) && (
            <Chip
              label={`Price: ${filters.minPrice} - ${filters.maxPrice} BDT`}
              className="bg-gray-100"
            />
          )}
          {Object.values(filters).some((v) => v !== "") && (
            <Button
              variant="outlined"
              size="small"
              onClick={() =>
                setFilters({
                  category: "",
                  brand: "",
                  minPrice: 0,
                  maxPrice: 10000,
                  inStock: "", // Reset to empty string
                  search: "", // Reset to empty string
                })
              }
              className="ml-2"
            >
              Clear All
            </Button>
          )}
        </div>

        {/* Product Card */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
          {filteredProducts?.data?.map((product) => (
            <>
              <Link
                to={`/product/${product._id}`}
                key={product._id}
                className="bg-white rounded-sm overflow-hidden shadow-lg ring-2 ring-gray-200 ring-opacity-20 transition-all duration-300 hover:shadow-xl"
              >
                <div className="relative">
                  <img
                    className="w-full h-64 object-cover object-center"
                    src={product.image}
                    alt="Product Image"
                  />
                  {
                    // Sale Badge
                    product.quantity < 5 && (
                      <div className="absolute top-0 right-0 bg-red-500 text-white px-2 py-1 m-2 rounded-md text-sm font-medium">
                        SALE
                      </div>
                    )
                  }
                  {/* New badge */}
                  {new Date(product.createdAt) >=
                    new Date(new Date().setDate(new Date().getDate() - 3)) && (
                    <div className="absolute top-0 left-0 bg-[#BD2A2E] text-gray-200 font-sm px-2.5 py-1 m-2 text-xs ">
                      NEW
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-medium mb-2">{product.name}</h3>
                  {/* Rating */}
                  <div className="my-3 flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < Math.round(4)
                            ? "text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                    <span className="ml-2 text-sm text-gray-500">
                      ({4} reviews)
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-medium">
                      {product.price} BDT
                    </span>
                    {
                      // Out of Stock Badge
                      product.quantity === 0 ? (
                        <span className="text-[#BD2A2E] px-2 py-1 text-sm font-semibold">
                          OUT OF STOCK
                        </span>
                      ) : (
                        <span className="text-green-800 px-2 py-1 rounded-md text-sm font-semibold">
                          IN STOCK
                        </span>
                      )
                    }
                  </div>
                  <Link to={`/product/${product._id}`}>
                    <button className=" bg-transparent text-gray-600 hover:text-[#BD2A2E] font-bold py-4 px-4 rounded w-full mt-4 cursor-pointer">
                      View Details
                    </button>
                  </Link>
                </div>
              </Link>
            </>
          ))}
        </div>
        {
          // Show message if no products are found
          filteredProducts?.data?.length === 0 && (
            <div className="text-center mt-8 text-gray-500">
              No products found with the selected filters.
            </div>
          )
        }

        {/* Best Product Suggestion */}
        <BestProducts />
      </div>
    </div>
  );
};

export default ProductsPage;
