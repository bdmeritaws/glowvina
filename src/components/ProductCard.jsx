"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import toast from "react-hot-toast";
import { Heart, ShoppingBag } from "lucide-react";
import { useState } from "react";

export default function ProductCard({
  image,
  title,
  subtitle,
  oldPrice,
  newPrice,
  price,
  discount,
  slug: propSlug,
}) {
  const { addToCart } = useCart();
  const [isWishlisted, setIsWishlisted] = useState(false);

  const productPrice = newPrice || price;

  const slug = propSlug || title
    .toLowerCase()
    .replace(/[^\w\s]/gi, "")
    .replace(/\s+/g, "-");

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({
      slug,
      title,
      price: productPrice,
      image,
      oldPrice,
    });
    toast.success(`Added to cart!`);
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
    toast.success(isWishlisted ? "Removed from wishlist" : "Added to wishlist");
  };

  return (
    <div className="bg-white rounded-xl overflow-hidden transition hover:shadow-xl group border border-gray-100">

      {/* IMAGE AREA */}
      <Link href={`/product/${slug}`}>
        <div className="relative bg-gray-50 cursor-pointer aspect-square">

          {/* Badges */}
          <div className="absolute top-3 left-3 z-10 flex flex-col gap-1">
            {discount > 0 && (
              <span className="bg-orange-500 text-white text-[10px] px-2 py-1 rounded-full font-semibold">
                {discount}% OFF
              </span>
            )}
          </div>

          {/* Wishlist Button */}
          <button
            onClick={handleWishlist}
            className="absolute top-3 right-3 z-10 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition"
          >
            <Heart 
              size={16} 
              className={isWishlisted ? "fill-orange-500 text-orange-500" : "text-gray-400"} 
            />
          </button>

          {/* Product Image */}
          <div className="relative w-full h-full p-4">
            <Image
              src={image || "/images/placeholder.webp"}
              alt={title}
              fill
              className="object-contain group-hover:scale-105 transition-transform duration-300"
              onError={(e) => { e.target.src = '/images/placeholder.webp'; }}
            />
          </div>

        </div>
      </Link>

      {/* CONTENT */}
      <div className="px-4 py-4">

        <Link href={`/product/${slug}`}>
          <h3 className="text-sm font-semibold text-gray-800 mb-1 line-clamp-2 leading-snug hover:text-orange-600 transition cursor-pointer">
            {title}
          </h3>
        </Link>

        <p className="text-xs text-gray-500 mb-2 line-clamp-1">
          {subtitle}
        </p>

        {/* PRICE */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-lg font-bold text-gray-900">
            ${productPrice}
          </span>
          {oldPrice && (
            <span className="text-sm text-gray-400 line-through">
              ${oldPrice}
            </span>
          )}
        </div>

        {/* ADD TO CART BUTTON */}
        <button
          onClick={handleAddToCart}
          className="w-full flex items-center justify-center gap-2 bg-gray-900 text-white text-sm py-2.5 rounded-lg font-medium hover:bg-orange-600 transition"
        >
          <ShoppingBag size={16} />
          Add to Cart
        </button>

      </div>
    </div>
  );
}