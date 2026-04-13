"use client";

import { useCart } from "@/context/CartContext";
import toast from "react-hot-toast";
import { Play, Eye, Plus } from "lucide-react";
import { useState } from "react";

const videos = [
  { link: "https://www.youtube.com/embed/MlpO5jFx9p8", title: "Stretch Mark Cream", price: "₹299" },
  { link: "https://www.youtube.com/embed/8GkFzcNQT3M", title: "Face Serum Review", price: "₹450" },
  { link: "https://www.youtube.com/embed/cf0biRzj3BI", title: "Skincare Routine", price: "₹350" },
  { link: "https://www.youtube.com/embed/UnyIA8SVvL0", title: " mom Care Tips", price: "₹280" },
  { link: "https://www.youtube.com/embed/qYVFytHJL-M", title: "Handmade Soaps", price: "₹150" },
  { link: "https://www.youtube.com/embed/_KA0nyJWakw", title: "Body Lotion", price: "₹399" },
];

export default function Videos() {
  const { addToCart } = useCart();
  const [activeIndex, setActiveIndex] = useState(null);

  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
            Shop By Videos
          </h2>
          <p className="text-gray-500 text-sm">
            Watch reviews and tutorials from our customers
          </p>
        </div>

        {/* Video Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {videos.map((video, index) => (
            <div
              key={index}
              className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group border border-gray-100"
            >
              {/* Video Thumbnail */}
              <div 
                className="relative aspect-[3/4] bg-gray-900 cursor-pointer"
                onMouseEnter={() => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(null)}
              >
                <iframe
                  src={video.link}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
                {activeIndex !== index && (
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Play size={40} className="text-white fill-white" />
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="p-3">
                <h4 className="font-semibold text-gray-800 text-sm mb-1 truncate">
                  {video.title}
                </h4>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-orange-600">
                    {video.price}
                  </span>
                </div>
              </div>

              {/* Quick Add Button */}
              <div className="px-3 pb-3">
                <button 
                  onClick={() => {
                    addToCart({ 
                      slug: video.title.toLowerCase().replace(/\s+/g, '-'), 
                      title: video.title, 
                      price: video.price.replace('₹', ''), 
                      image: '/images/placeholder.webp' 
                    });
                    toast.success(`${video.title} added to cart!`);
                  }}
                  className="w-full flex items-center justify-center gap-1 bg-gray-900 text-white py-2 text-xs font-medium rounded-lg hover:bg-orange-600 transition"
                >
                  <Plus size={14} />
                  Add
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}