"use client";

const ProductSkeleton = () => {
  return (
    <div className="p-4 space-y-6 w-full">
      <div className="flex gap-4">
        {/* Small preview images */}
        <div className="flex flex-col gap-2">
          <div className="w-24 h-24 bg-gray-200 rounded animate-pulse" />
          <div className="w-24 h-24 bg-gray-200 rounded animate-pulse" />
        </div>

        {/* Large main image */}
        <div className="w-3/4 h-64 bg-gray-200 rounded animate-pulse" />
      </div>

      {/* Text content */}
      <div className="space-y-3">
        <div className="w-1/2 h-6 bg-gray-200 rounded animate-pulse" />
        <div className="w-1/4 h-5 bg-gray-200 rounded animate-pulse" />
        <div className="w-full h-4 bg-gray-200 rounded animate-pulse" />
        <div className="w-full h-4 bg-gray-200 rounded animate-pulse" />
      </div>

      {/* Quantity controls */}
      <div className="flex items-center gap-2">
        <div className="w-10 h-10 bg-gray-200 rounded animate-pulse" />
        <div className="w-10 h-10 bg-gray-200 rounded animate-pulse" />
        <div className="w-10 h-10 bg-gray-200 rounded animate-pulse" />
      </div>

      {/* Action button */}
      <div className="w-full h-10 bg-gray-200 rounded animate-pulse" />
    </div>
  );
};

export default ProductSkeleton;
