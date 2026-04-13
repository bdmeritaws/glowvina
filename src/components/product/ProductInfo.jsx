"use client";

import { useState } from "react";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import toast from "react-hot-toast";
import { Star, Shield, Truck, RotateCcw, Heart, Share2, Check, Minus, Plus } from "lucide-react";

export default function ProductInfo({ product }) {
  const [qty, setQty] = useState(1);
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart({
      slug: product.slug || product.title
        .toLowerCase()
        .replace(/[^\w\s]/gi, "")
        .replace(/\s+/g, "-"),
      title: product.title,
      price: product.price,
      image: product.images?.[0] || product.images[0],
      oldPrice: product.oldPrice,
    }, qty);

    toast.success(`${qty} × ${product.title} added to cart!`);
  };

  return (
    <div className="space-y-5">

      {/* Rating */}
      <div className="flex items-center gap-2">
        <div className="flex">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={16} className="fill-orange-400 text-orange-400" />
          ))}
        </div>
        <span className="text-gray-500 text-sm">({product.reviews} reviews)</span>
        <button className="ml-auto p-2 hover:bg-gray-100 rounded-full transition">
          <Share2 size={18} className="text-gray-500" />
        </button>
        <button className="p-2 hover:bg-gray-100 rounded-full transition">
          <Heart size={18} className="text-gray-500" />
        </button>
      </div>

      {/* Title */}
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
        {product.title}
      </h1>

      {/* Badges */}
      <div className="flex gap-2 flex-wrap">
        <span className="flex items-center gap-1 bg-green-50 text-green-700 px-3 py-1.5 rounded-full text-xs font-medium">
          <Check size={14} /> Dermatologically Tested
        </span>
        <span className="flex items-center gap-1 bg-orange-50 text-orange-700 px-3 py-1.5 rounded-full text-xs font-medium">
          <Shield size={14} /> 100% Natural
        </span>
      </div>

      {/* Price */}
      <div className="flex items-baseline gap-3">
        <span className="text-3xl font-bold text-gray-900">
          ${product.price}
        </span>
        <span className="text-lg text-gray-400 line-through">
          ${product.oldPrice}
        </span>
        <span className="bg-orange-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
          {product.discount}% OFF
        </span>
      </div>

      <p className="text-sm text-gray-500">
        MRP (Inclusive of all taxes)
      </p>

      {/* Variant Cards */}
      <div>
        <p className="text-sm font-medium text-gray-700 mb-3">Select Pack</p>
        <div className="grid grid-cols-3 gap-3">
          {[1, 2, 3].map((pack) => (
            <div
              key={pack}
              className="bg-white border-2 border-gray-200 rounded-xl p-3 text-center cursor-pointer hover:border-orange-500 hover:shadow-md transition"
            >
              <div className="relative w-full h-12 mb-2">
                <Image
                  src={product.images[0]}
                  alt="pack"
                  fill
                  className="object-contain"
                />
              </div>
              <p className="text-xs font-semibold text-gray-900">
                {pack === 1 ? "Single" : pack === 2 ? "Combo" : "_family Pack"}
              </p>
              <p className="text-[10px] text-green-600 font-medium">
                {pack === 1 ? "" : pack === 2 ? "Save $50" : "Save $150"}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ACTION SECTION */}
      <div className="space-y-3">

        {/* Quantity & Add */}
        <div className="flex flex-col sm:flex-row items-center gap-3">

          {/* Quantity Selector */}
          <div className="flex items-center border-2 border-gray-200 rounded-xl overflow-hidden">
            <button
              onClick={() => setQty(Math.max(1, qty - 1))}
              className="w-12 h-12 flex items-center justify-center text-xl font-bold text-gray-700 hover:bg-gray-100 transition"
            >
              <Minus size={18} />
            </button>
            <span className="w-14 text-center text-base font-semibold text-gray-900">
              {qty}
            </span>
            <button
              onClick={() => setQty(qty + 1)}
              className="w-12 h-12 flex items-center justify-center text-xl font-bold text-gray-700 hover:bg-gray-100 transition"
            >
              <Plus size={18} />
            </button>
          </div>

          {/* Add To Cart */}
          <button 
            onClick={handleAddToCart}
            className="flex-1 w-full bg-gray-900 text-white py-3.5 rounded-xl font-semibold hover:bg-orange-600 transition shadow-lg"
          >
            ADD TO CART
          </button>
        </div>

        {/* Buy Now */}
        <button className="w-full border-2 border-gray-900 text-gray-900 py-3.5 rounded-xl font-semibold hover:bg-gray-900 hover:text-white transition">
          BUY IT NOW
        </button>
      </div>

      {/* Delivery Info */}
      <div className="bg-gray-50 rounded-xl p-4 space-y-3">
        <div className="flex items-center gap-3 text-sm">
          <Truck size={20} className="text-orange-600" />
          <div>
            <p className="font-medium text-gray-900">Free Delivery</p>
            <p className="text-gray-500 text-xs">On orders above $499</p>
          </div>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <RotateCcw size={20} className="text-orange-600" />
          <div>
            <p className="font-medium text-gray-900">Easy Returns</p>
            <p className="text-gray-500 text-xs">30-day return policy</p>
          </div>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <Shield size={20} className="text-orange-600" />
          <div>
            <p className="font-medium text-gray-900">Genuine Product</p>
            <p className="text-gray-500 text-xs">100% authentic guarantee</p>
          </div>
        </div>
      </div>

    </div>
  );
}