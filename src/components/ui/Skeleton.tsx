export const CardSkeleton = () => {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md border border-gray-100 animate-pulse">
      {/* Image placeholder */}
      <div className="w-full h-56 bg-gray-200"></div>

      <div className="p-4">
        {/* Meta info placeholder (brand, category) */}
        <div className="flex justify-between mb-3">
          <div className="flex space-x-2">
            <div className="h-4 bg-gray-200 rounded w-16"></div>
            <div className="h-4 bg-gray-200 rounded w-4"></div>
            <div className="h-4 bg-gray-200 rounded w-16"></div>
          </div>
          <div className="h-4 bg-gray-200 rounded w-10"></div>
        </div>

        {/* Title placeholder */}
        <div className="h-5 bg-gray-200 rounded w-full mb-4"></div>

        {/* Price and stock placeholder */}
        <div className="flex justify-between items-center mt-4">
          <div className="h-6 bg-gray-200 rounded w-16"></div>
          <div className="h-5 bg-gray-200 rounded w-20"></div>
        </div>

        {/* Button placeholder */}
        <div className="w-full h-10 bg-gray-200 rounded mt-4"></div>
      </div>
    </div>
  );
};

// Variant with different image aspect ratio
export const CardSkeletonHorizontal = () => {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md border border-gray-100 animate-pulse flex">
      {/* Image placeholder */}
      <div className="w-32 h-full bg-gray-200"></div>

      <div className="p-4 flex-1">
        {/* Title placeholder */}
        <div className="h-5 bg-gray-200 rounded w-3/4 mb-3"></div>

        {/* Meta info placeholder */}
        <div className="flex space-x-2 mb-4">
          <div className="h-4 bg-gray-200 rounded w-12"></div>
          <div className="h-4 bg-gray-200 rounded w-4"></div>
          <div className="h-4 bg-gray-200 rounded w-12"></div>
        </div>

        {/* Price placeholder */}
        <div className="h-5 bg-gray-200 rounded w-1/3"></div>
      </div>
    </div>
  );
};

export const ProductDetailsSkeleton = () => {
  return (
    <div className="py-15">
      <div className="container max-w-6xl mx-auto md:px-0 px-5 py-4">
        <div className="flex flex-col md:flex-row -mx-4">
          {/* Image Skeleton */}
          <div className="md:flex-1 px-4">
            <div className="md:h-[460px] rounded-lg bg-gray-200 mb-4 animate-pulse"></div>
          </div>

          {/* Details Skeleton */}
          <div className="md:flex-1 px-4">
            {/* Title */}
            <div className="h-8 bg-gray-200 rounded w-3/4 mb-4 animate-pulse"></div>

            {/* Price and Stock */}
            <div className="flex justify-between mb-6">
              <div className="h-6 bg-gray-200 rounded w-24 animate-pulse"></div>
              <div className="h-6 bg-gray-200 rounded w-20 animate-pulse"></div>
            </div>

            {/* Description */}
            <div className="space-y-2 mb-6">
              <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-4/5 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
            </div>

            {/* Quantity and Add to Cart */}
            <div className="mb-8">
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-gray-200 rounded-md overflow-hidden">
                  <div className="h-10 w-10 bg-gray-200 animate-pulse"></div>
                  <div className="h-10 w-16 bg-gray-100 animate-pulse border-x border-gray-200"></div>
                  <div className="h-10 w-10 bg-gray-200 animate-pulse"></div>
                </div>
                <div className="h-12 bg-gray-200 rounded flex-1 animate-pulse"></div>
              </div>
            </div>

            {/* Product Meta */}
            <div className="space-y-4 pt-4">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <div className="h-5 bg-gray-200 rounded w-16 mb-1 animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
                </div>
                <div>
                  <div className="h-5 bg-gray-200 rounded w-16 mb-1 animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
                </div>
                <div>
                  <div className="h-5 bg-gray-200 rounded w-16 mb-1 animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
                </div>
              </div>

              <div>
                <div className="h-5 bg-gray-200 rounded w-16 mb-2 animate-pulse"></div>
                <div className="flex flex-wrap gap-2">
                  <div className="h-6 bg-gray-200 rounded-full w-16 animate-pulse"></div>
                  <div className="h-6 bg-gray-200 rounded-full w-20 animate-pulse"></div>
                  <div className="h-6 bg-gray-200 rounded-full w-16 animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
