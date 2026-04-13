"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowRight, Star } from "lucide-react";

export default function WhatToExpect({ beforeImage, afterImage }) {
  const [position, setPosition] = useState(50);

  const beforeImg = beforeImage || "/images/whattoexpect/1.webp";
  const afterImg = afterImage || "/images/whattoexpect/2.webp";

  return (
    <section className="py-12 bg-white">
      <div className="max-w-5xl mx-auto px-4">

        {/* Heading */}
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-3">
            What to Expect?
          </h2>
          <div className="flex items-center justify-center gap-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} className="fill-orange-400 text-orange-400" />
              ))}
            </div>
            <span className="text-gray-600 text-sm">Visible results in 28 days*</span>
          </div>
        </div>

        {/* Before/After Comparison */}
        <div className="relative max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-xl border border-gray-200">

          {/* After Image (Full Width) */}
          <div className="relative w-full h-[250px] sm:h-[350px] md:h-[450px]">
            <Image
              src={afterImg}
              alt="After"
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Before Image (Clipped) */}
          <div
            className="absolute top-0 left-0 h-full overflow-hidden"
            style={{ width: `${position}%` }}
          >
            <Image
              src={beforeImg}
              alt="Before"
              fill
              className="object-cover"
            />
          </div>

          {/* Divider Line with Handle */}
          <div
            className="absolute top-0 bottom-0 w-1 bg-white shadow-lg"
            style={{ left: `${position}%`, transform: 'translateX(-50%)' }}
          >
            <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 left-1/2 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-xl cursor-ew-resize">
              <ArrowRight size={16} className="text-gray-700 -rotate-90" />
              <ArrowRight size={16} className="text-gray-700 rotate-90 absolute" />
            </div>
          </div>

          {/* Slider Input */}
          <input
            type="range"
            min="0"
            max="100"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            className="absolute top-0 left-0 w-full h-full opacity-0 cursor-ew-resize"
          />

          {/* Labels */}
          <span className="absolute top-4 left-4 bg-black/60 backdrop-blur-sm text-white text-xs px-3 py-1.5 rounded-full font-medium">
            Before
          </span>
          <span className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm text-white text-xs px-3 py-1.5 rounded-full font-medium">
            After
          </span>
        </div>

        {/* Info Text */}
        <p className="text-center text-gray-400 text-xs mt-4">
          *Individual results may vary. For best results, use consistently for 28 days.
        </p>

      </div>
    </section>
  );
}