/* eslint-disable @typescript-eslint/no-explicit-any */
import { SearchIcon } from "lucide-react";
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
  Box,
  Typography,
  SelectChangeEvent,
  Skeleton,
} from "@mui/material";
import { useMemo, useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import BestProducts from "../home/bestproducts/BestProducts";

import { useGetAllProductsQuery } from "../../redux/features/products/products.api";
import ProductCard from "../../components/ui/ProductCard";
import PaginationComponent from "../../components/ui/Pagination";
import { CardSkeleton } from "../../components/ui/Skeleton";

const ProductsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [filters, setFilters] = useState({
    category: "",
    brand: "",
    minPrice: 0,
    maxPrice: 10000000,
    inStock: "",
    search: "",
  });

  // Initialize filters from URL parameters on component mount
  useEffect(() => {
    const categoryFromUrl = searchParams.get("category");
    const brandFromUrl = searchParams.get("brand");
    const searchFromUrl = searchParams.get("search");
    const inStockFromUrl = searchParams.get("inStock");
    const minPriceFromUrl = searchParams.get("minPrice");
    const maxPriceFromUrl = searchParams.get("maxPrice");

    if (
      categoryFromUrl ||
      brandFromUrl ||
      searchFromUrl ||
      inStockFromUrl ||
      minPriceFromUrl ||
      maxPriceFromUrl
    ) {
      setFilters({
        category: categoryFromUrl || "",
        brand: brandFromUrl || "",
        minPrice: minPriceFromUrl ? parseInt(minPriceFromUrl) : 0,
        maxPrice: maxPriceFromUrl ? parseInt(maxPriceFromUrl) : 10000000,
        inStock: inStockFromUrl || "",
        search: searchFromUrl || "",
      });

      if (searchFromUrl) {
        setSearchInput(searchFromUrl);
      }
    }
  }, [searchParams]);

  // Update URL when filters change
  const updateUrlParams = (newFilters: typeof filters) => {
    const params = new URLSearchParams();

    Object.entries(newFilters).forEach(([key, value]) => {
      if (value && value !== "" && value !== 0) {
        if (key === "maxPrice" && value === 10000000) return; // Don't add default max price
        params.set(key, value.toString());
      }
    });

    setSearchParams(params);
  };

  // Create query params array from filters for filtered products
  const queryParams = useMemo(() => {
    const params = Object.entries(filters)
      .filter(([key, value]) => {
        if (key === "inStock") return value !== "";
        if (key === "search")
          return typeof value === "string" && value.trim() !== "";
        return value !== "";
      })
      .map(([name, value]) => ({
        name,
        value:
          name === "inStock" ? (value === "true").toString() : value.toString(),
      }));

    // Add pagination parameters
    params.push({ name: "page", value: page.toString() });
    params.push({ name: "limit", value: limit.toString() });

    return params;
  }, [filters, page, limit]);

  // Query without filters to get all products for extracting categories and brands
  const { data: allProducts, isLoading } = useGetAllProductsQuery([]);

  // Get filtered products with pagination
  const { data: filteredProducts } = useGetAllProductsQuery(queryParams);

  // Handle filter changes
  const handleFilterChange = (name: string, value: string) => {
    setPage(1); // Reset to first page when filters change
    const newFilters = {
      ...filters,
      [name]: value,
    };
    setFilters(newFilters);
    updateUrlParams(newFilters);
  };

  // Handle search input
  const [searchInput, setSearchInput] = useState("");
  const handleSearchChange = (event: { target: { value: any } }) => {
    const value = event.target.value;
    setSearchInput(value);

    // Debounce the search to avoid too many API calls
    const timeoutId = setTimeout(() => {
      handleFilterChange("search", value);
    }, 500);

    return () => clearTimeout(timeoutId);
  };

  const handlePriceChange = (_event: any, newValue: any[]) => {
    setPage(1); // Reset to first page when price changes
    const newFilters = {
      ...filters,
      minPrice: newValue[0],
      maxPrice: newValue[1],
    };
    setFilters(newFilters);
    updateUrlParams(newFilters);
  };

  // Handle page change
  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  // Handle limit change
  const handleLimitChange = (event: SelectChangeEvent<number>) => {
    setLimit(event.target.value as number);
    setPage(1);
  };

  // Extract unique categories and brands using useMemo to avoid recalculation
  const { categories, brands } = useMemo(() => {
    if (!allProducts?.data) return { categories: [], brands: [] };

    const uniqueCategories = [
      ...new Set(
        Array.isArray(allProducts.data)
          ? allProducts.data.map((product: any) => product.category)
          : []
      ),
    ];
    const uniqueBrands = [
      ...new Set(
        Array.isArray(allProducts.data)
          ? allProducts.data.map((product: any) => product.brand)
          : []
      ),
    ];

    return {
      categories: uniqueCategories.filter(Boolean).sort(),
      brands: uniqueBrands.filter(Boolean).sort(),
    };
  }, [allProducts]);

  // Helper function to format inStock status for display
  const formatInStockStatus = (status: string | number) => {
    switch (status) {
      case "true":
        return "In Stock";
      case "false":
        return "Out of Stock";
      default:
        return "All Items";
    }
  };

  // Clear all filters function
  const clearAllFilters = () => {
    const newFilters = {
      category: "",
      brand: "",
      minPrice: 0,
      maxPrice: 10000000,
      inStock: "",
      search: "",
    };
    setFilters(newFilters);
    setSearchInput("");
    setPage(1);
    setSearchParams(new URLSearchParams()); // Clear URL params
  };

  if (isLoading) {
    return (
      <div className="py-12">
        <div className="container max-w-6xl mx-auto md:px-0 px-5 py-4">
          <div className="text-center mb-8">
            <Skeleton
              variant="text"
              width={300}
              height={60}
              className="mx-auto"
            />
          </div>

          <div className="flex flex-col md:flex-row gap-8">
            {/* Sidebar Skeletons */}
            <div className="w-full md:w-1/4 space-y-6">
              {/* Search Skeleton */}
              <Skeleton variant="rectangular" height={56} />

              {/* Filters Section Skeletons */}
              <Box className="space-y-6 p-4 bg-gray-50 rounded-lg shadow">
                <Skeleton variant="text" width={100} height={40} />

                {/* Category Filter Skeleton */}
                <Skeleton variant="rectangular" height={56} className="mb-4" />

                {/* Brand Filter Skeleton */}
                <Skeleton variant="rectangular" height={56} className="mb-4" />

                {/* Price Range Skeleton */}
                <div className="space-y-2">
                  <Skeleton variant="text" width={100} height={24} />
                  <Skeleton variant="rectangular" height={40} />
                  <div className="flex justify-between">
                    <Skeleton variant="text" width={60} height={20} />
                    <Skeleton variant="text" width={60} height={20} />
                  </div>
                </div>

                {/* Availability Skeleton */}
                <Skeleton variant="rectangular" height={56} />
              </Box>
            </div>

            {/* Product Cards Skeletons */}
            <div className="w-full md:w-3/4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 3 }).map((_, index) => (
                  <CardSkeleton key={`skeleton-${index}`} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12">
      <div className="container max-w-6xl mx-auto md:px-0 px-5 py-4">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4 animate-fade-in uppercase">
            Products
            {filters.category && (
              <span className="text-lg font-normal text-gray-600 block mt-2">
                Category: {filters.category}
              </span>
            )}
          </h1>
        </div>

        <div className="flex flex-col md:flex-row gap-8 py-8">
          {/* Filters Sidebar */}
          <div className="w-full md:w-1/4 space-y-6">
            {/* Search Bar */}
            <div className="mb-6">
              <TextField
                fullWidth
                placeholder="Search products..."
                value={searchInput}
                onChange={handleSearchChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
                className="bg-white"
              />
            </div>

            {/* Filters Section */}
            <Box className="space-y-6 p-4 bg-gray-50 rounded-lg shadow">
              <Typography variant="h6" className="font-bold pb-5">
                Filters
              </Typography>

              <FormControl fullWidth>
                <InputLabel>Category</InputLabel>
                <Select
                  value={filters.category}
                  label="Category"
                  onChange={(e) =>
                    handleFilterChange("category", e.target.value)
                  }
                  className="bg-white mb-4"
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
                  className="bg-white mb-4"
                >
                  <MenuItem value="">All Brands</MenuItem>
                  {brands.map((brand) => (
                    <MenuItem key={brand} value={brand}>
                      {brand}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <div>
                <Typography variant="subtitle1" className="mb-2">
                  Price Range
                </Typography>
                <Slider
                  color="primary"
                  value={[filters.minPrice, filters.maxPrice]}
                  onChange={(event, newValue) =>
                    handlePriceChange(event, newValue as number[])
                  }
                  valueLabelDisplay="auto"
                  max={10000}
                  step={100}
                />
                <div className="mt-1 text-sm text-gray-500 flex justify-between">
                  <span>{filters.minPrice} BDT</span>
                  <span>{filters.maxPrice} BDT</span>
                </div>
              </div>

              <FormControl fullWidth>
                <InputLabel>Availability</InputLabel>
                <Select
                  value={filters.inStock}
                  label="Availability"
                  onChange={(e) =>
                    handleFilterChange("inStock", e.target.value)
                  }
                  className="bg-white"
                >
                  <MenuItem value="">All Items</MenuItem>
                  <MenuItem value="true">In Stock</MenuItem>
                  <MenuItem value="false">Out of Stock</MenuItem>
                </Select>
              </FormControl>

              {/* Active Filters */}
              <div className="flex flex-wrap gap-2">
                {Object.entries(filters).map(([key, value]) => {
                  if (value && key !== "minPrice" && key !== "maxPrice") {
                    if (key === "search") {
                      return typeof value === "string" && value.trim() ? (
                        <Chip
                          key={key}
                          label={`Search: ${value}`}
                          onDelete={() => {
                            setSearchInput("");
                            handleFilterChange("search", "");
                          }}
                          className="bg-gray-200"
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
                        className="bg-gray-200"
                      />
                    );
                  }
                  return null;
                })}
                {(filters.minPrice > 0 || filters.maxPrice < 10000) && (
                  <Chip
                    label={`Price: ${filters.minPrice} - ${filters.maxPrice} BDT`}
                    className="bg-gray-200"
                  />
                )}
              </div>

              {Object.values(filters).some((v) => v !== "" && v !== 0) && (
                <Button
                  variant="outlined"
                  size="small"
                  fullWidth
                  onClick={clearAllFilters}
                >
                  Clear All Filters
                </Button>
              )}
            </Box>
          </div>

          {/* Products Section */}
          <div className="w-full md:w-3/4">
            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.isArray(filteredProducts?.data) &&
                filteredProducts.data.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
            </div>

            {/* No Products Found */}
            {Array.isArray(filteredProducts?.data) &&
              filteredProducts.data.length === 0 && (
                <div className="text-center mt-8 text-gray-500">
                  No products found with the selected filters.
                </div>
              )}

            {/* Reusable Pagination Component */}
            {filteredProducts?.meta && filteredProducts.meta.total > 0 && (
              <PaginationComponent
                currentPage={page}
                totalPages={filteredProducts.meta.totalPage || 1}
                limit={limit}
                total={filteredProducts.meta.total}
                onPageChange={handlePageChange}
                onLimitChange={handleLimitChange}
                limitOptions={[10, 20, 30, 50]}
                showItemsPerPage={true}
                showItemsInfo={true}
              />
            )}
          </div>
        </div>

        {/* Best Product Suggestion */}
        <BestProducts />
      </div>
    </div>
  );
};

export default ProductsPage;
