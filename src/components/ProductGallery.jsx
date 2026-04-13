"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, ZoomIn, Heart, Share2 } from "lucide-react";

export default function ProductGallery({ images, title, resultClaim }) {
  const [activeImage, setActiveImage] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  const nextImage = () => setActiveImage(prev => prev === images.length - 1 ? 0 : prev + 1);
  const prevImage = () => setActiveImage(prev => prev === 0 ? images.length - 1 : prev - 1);

  return (
    <div className="space-y-4">

      {/* Main Image Container */}
      <div className="relative bg-gray-50 rounded-2xl overflow-hidden shadow-sm border border-gray-100 group">
        
        {/* Main Image */}
        <div 
          className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] cursor-zoom-in"
          onClick={() => setIsZoomed(!isZoomed)}
        >
          <Image
            src={images[activeImage]}
            alt={title}
            fill
            className={`object-contain transition-transform duration-300 ${isZoomed ? 'scale-150' : 'group-hover:scale-105'}`}
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          
          {/* Image Controls */}
          <div className="absolute top-4 right-4 flex flex-col gap-2">
            <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-100 transition">
              <Heart size={18} className="text-gray-600" />
            </button>
            <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-100 transition">
              <Share2 size={18} className="text-gray-600" />
            </button>
            <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-100 transition">
              <ZoomIn size={18} className="text-gray-600" />
            </button>
          </div>

          {/* Navigation Arrows */}
          <button 
            onClick={(e) => { e.stopPropagation(); prevImage(); }}
            className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition"
          >
            <ChevronLeft size={20} />
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); nextImage(); }}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition"
          >
            <ChevronRight size={20} />
          </button>

          {/* Image Counter */}
          <div className="absolute bottom-4 left-4 px-3 py-1 bg-black/50 backdrop-blur-sm text-white text-sm rounded-full">
            {activeImage + 1} / {images.length}
          </div>
        </div>

        {/* Result Claim Strip */}
        {resultClaim && (
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white text-center py-3 px-4">
            <p className="text-sm sm:text-base font-semibold">{resultClaim}</p>
          </div>
        )}
      </div>

      {/* Thumbnails */}
      <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto pb-2 px-1">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setActiveImage(i)}
            className={`relative min-w-[70px] h-[70px] sm:min-w-[90px] sm:h-[90px] rounded-xl border-2 cursor-pointer overflow-hidden transition-all duration-200 hover:shadow-md ${
              activeImage === i
                ? "border-orange-500 ring-2 ring-orange-200"
                : "border-gray-200 hover:border-gray-300"
            }`}
          >
            <Image
              src={img}
              alt={`${title} ${i + 1}`}
              fill
              className="object-contain p-2"
              sizes="90px"
            />
          </button>
        ))}
      </div>

    </div>
  );
}