"use client";

import { useState } from "react";
import Image from "next/image";

export default function WhatToExpect({ beforeImage, afterImage }) {
  const [position, setPosition] = useState(50);

  // Use product images if provided, otherwise fall back to defaults
  const beforeImg = beforeImage || "/images/whattoexpect/1.webp";
  const afterImg = afterImage || "/images/whattoexpect/2.webp";

  return (
    <section className="mt-16 sm:mt-20 md:mt-24 px-4 text-center">

      {/* Heading */}
      <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-[#4a1f0f] mb-6 sm:mb-8">
        What to expect ?
      </h2>

      {/* Decorative Banner */}
      <div className="flex justify-center mb-8 sm:mb-12">
        <div className="relative border border-[#b98c6a] text-[#4a1f0f] px-4 sm:px-8 py-2 sm:py-3 rounded-md text-xs sm:text-sm md:text-base font-medium bg-white w-full sm:w-fit max-w-md sm:max-w-none">

          <span className="hidden sm:block absolute left-4 top-1/2 -translate-y-1/2 text-[#b98c6a] text-lg">
            ✦
          </span>

          <span className="sm:mx-8">
            Visible Reduction of Stretch Marks in 28 Days*
          </span>

          <span className="hidden sm:block absolute right-4 top-1/2 -translate-y-1/2 text-[#b98c6a] text-lg">
            ✦
          </span>

        </div>
      </div>

      {/* Before/After Slider */}
      <div className="relative max-w-5xl mx-auto rounded-xl overflow-hidden shadow-lg">

        {/* AFTER IMAGE */}
        <div className="relative w-full h-[260px] sm:h-[380px] md:h-[520px]">
          <Image
            src={afterImg}
            alt="After"
            fill
            className="object-cover"
          />
        </div>

        {/* BEFORE IMAGE */}
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

        {/* Divider Line */}
        <div
          className="absolute top-0 bottom-0 w-[2px] sm:w-[3px] bg-black"
          style={{ left: `${position}%` }}
        >
          <div className="absolute top-1/2 -translate-y-1/2 -left-4 bg-[#2e2e2e] text-white w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center shadow-md cursor-ew-resize text-sm sm:text-base">
            ≡
          </div>
        </div>

        {/* Invisible Slider */}
        <input
          type="range"
          min="0"
          max="100"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
          className="absolute top-0 left-0 w-full h-full opacity-0 cursor-ew-resize"
        />

        {/* Labels */}
        <span className="absolute top-3 left-3 sm:top-4 sm:left-4 bg-[#4a3b2f] text-white text-[10px] sm:text-xs px-2 sm:px-3 py-1 rounded">
          BEFORE
        </span>

        <span className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-[#4a3b2f] text-white text-[10px] sm:text-xs px-2 sm:px-3 py-1 rounded">
          AFTER
        </span>

      </div>

    </section>
  );
}