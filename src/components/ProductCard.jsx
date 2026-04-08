"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import toast from "react-hot-toast";

// CDN Image URL Helper
const getImageUrl = (path) => {
  if (!path) return "/images/placeholder.jpg";
  // Already a full URL (http/https)
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }
  // Already starts with /images/ - use as-is
  if (path.startsWith('/images/') || path.startsWith('images/')) {
    return path.startsWith('/') ? path : `/${path}`;
  }
  // Always use relative paths to avoid hydration mismatch
  // Next.js handles the base URL automatically
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  const cdnPath = cleanPath.startsWith('cdn/') ? cleanPath : `cdn/${cleanPath}`;
  return `/${cdnPath}`;
};

export default function ProductCard({
  image,
  title,
  subtitle,
  oldPrice,
  newPrice,
  discount,
}) {
  const { addToCart } = useCart();

  // Generate slug
  const slug = title
    .toLowerCase()
    .replace(/[^\w\s]/gi, "")
    .replace(/\s+/g, "-");

  const handleAddToCart = () => {
    addToCart({
      slug,
      title,
      price: newPrice,
      image,
      oldPrice,
    });
    toast.success(`${title} added to cart!`);
  };

  return (
    <div className="bg-white rounded-lg border border-[#e5ddd5] overflow-hidden transition hover:shadow-md group">

      {/* ===== IMAGE AREA ===== */}
      <Link href={`/product/${slug}`}>
        <div className="relative bg-[#f3e9df] cursor-pointer">

          {/* SALE BADGE */}
          <span className="absolute top-2 left-2 z-10 bg-[#5a2a0f] text-white text-[9px] sm:text-xs px-2.5 py-1 rounded-full font-medium">
            Sale
          </span>

          {/* PRODUCT IMAGE */}
          <div className="relative w-full h-40 sm:h-56">
            <Image
              src={getImageUrl(image)}
              alt={title}
              fill
              className="object-contain p-3 sm:p-5 group-hover:scale-105 transition duration-300"
            />
          </div>

          {/* SUBTITLE STRIP */}
          {subtitle && (
            <div className="bg-[#8b5e3c] text-white text-center py-1.5 text-[10px] sm:text-sm font-medium">
              {subtitle}
            </div>
          )}

        </div>
      </Link>

      {/* ===== CONTENT ===== */}
      <div className="px-3 py-3 sm:px-5 sm:py-4">

        {/* TITLE → Details */}
        <Link href={`/product/${slug}`}>
          <h3 className="text-xs sm:text-base font-semibold text-[#3b1f0f] mb-1.5 line-clamp-2 leading-snug cursor-pointer hover:text-[#5a2a0f] transition">
            {title}
          </h3>
        </Link>

        {/* PRICE */}
        <div className="flex items-center gap-1.5 mb-3 text-[11px] sm:text-sm">

          {oldPrice && (
            <span className="text-gray-400 line-through">
              ৳ {oldPrice}
            </span>
          )}

          <span className="font-bold text-[#3b1f0f] text-sm sm:text-base">
            ৳ {newPrice}
          </span>

          {discount && (
            <span className="text-red-500 font-semibold">
              ({discount}%)
            </span>
          )}

        </div>

        {/* ADD TO CART BUTTON */}
        <button
          onClick={handleAddToCart}
          className="w-full bg-[#5a2a0f] text-white text-[11px] sm:text-sm py-2 sm:py-3 rounded-md font-semibold tracking-wide hover:bg-[#3b1f0f] transition"
        >
          ADD TO CART
        </button>

      </div>
    </div>
  );
}