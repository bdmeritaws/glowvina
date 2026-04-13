"use client";

import Image from "next/image";
import { Star, Quote } from "lucide-react";

const reviews = [
  {
    beforeAfter: "/images/reviews/1.webp",
    name: "Nusrat Jahan",
    location: "Dhaka, Bangladesh",
    rating: 5,
    title: "The only cream that worked for my stretch marks!",
    description:
      "I've tried so many products, but this cream is truly a game-changer! Within a few weeks, I noticed my stretch marks fading.",
  },
  {
    beforeAfter: "/images/reviews/2.webp",
    name: "Tanvir Ahmed",
    location: "Chattogram, Bangladesh",
    rating: 5,
    title: "Visible results in just weeks!",
    description:
      "Honestly impressed with the quality. My skin feels smoother and healthier. Highly recommended for daily use.",
  },
  {
    beforeAfter: "/images/reviews/3.webp",
    name: "Sadia Islam",
    location: "Khulna, Bangladesh",
    rating: 5,
    title: "Best skincare product I've used!",
    description:
      "The texture, smell, and results are amazing. I can see a big difference already. Will definitely buy again.",
  },
];

export default function Reviews() {
  return (
    <section className="bg-gradient-to-b from-gray-50 to-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-3">
            What Our Customers Say
          </h2>
          <p className="text-gray-500">
            Trusted by 10,000+ happy customers worldwide
          </p>
          <div className="flex items-center justify-center gap-2 mt-3">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={18} className="fill-orange-400 text-orange-400" />
              ))}
            </div>
            <span className="text-gray-700 font-semibold">4.9/5</span>
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">

          {reviews.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100"
            >
              {/* Before/After Image */}
              <div className="relative h-56 sm:h-64 w-full">
                <Image
                  src={item.beforeAfter}
                  alt="review"
                  fill
                  className="object-cover"
                />
                <div className="absolute top-3 left-3 bg-black/50 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full">
                  Before & After
                </div>
              </div>

              {/* Content */}
              <div className="p-5 sm:p-6">
                <Quote size={32} className="text-orange-200 mb-3" />

                {/* Review Title */}
                <p className="font-bold text-gray-800 mb-2 text-lg">
                  {item.title}
                </p>

                {/* Review Text */}
                <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                  {item.description}
                </p>

                {/* Profile & Rating */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
                      <span className="text-orange-600 font-bold text-sm">
                        {item.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 text-sm">
                        {item.name}
                      </h4>
                      <p className="text-xs text-gray-500">
                        {item.location}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        size={14} 
                        className={i < item.rating ? "fill-orange-400 text-orange-400" : "text-gray-300"} 
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}