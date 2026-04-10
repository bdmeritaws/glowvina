"use client";

import Image from "next/image";

const reviews = [
  {
    beforeAfter: "/images/reviews/1.webp",
  },
  {
    beforeAfter: "/images/reviews/2.webp",
  },
  {
    beforeAfter: "/images/reviews/3.webp",
  },
];

export default function Reviews() {
  return (
    <section className="bg-[#f4f1ee] py-16">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-[#5a2a0f] mb-3">
            Real Customers Real Reviews
          </h2>
          <p className="text-[#5a2a0f] font-medium">
            Trusted by 10 Lakh+ Customers
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          {reviews.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-xl border border-[#d8cfc7] overflow-hidden hover:shadow-md transition"
            >

              {/* Before After Image */}
              <div className="relative h-72 w-full">
                <Image
                  src={item.beforeAfter}
                  alt="review"
                  fill
                  className="object-cover"
                />
              </div>

              {/* Content */}
              <div className="p-6">

                {/* Profile */}
                <div className="flex items-center gap-4 mb-4">
                  <Image
                    src="/images/reviews/profile.webp"
                    alt="profile"
                    width={50}
                    height={50}
                    className="rounded-full"
                  />
                  <div>
                    <h4 className="font-semibold text-[#3b1f0f]">
                      Rakshana Sharmaa
                    </h4>
                    <p className="text-sm text-gray-500">
                      Rohtak, Haryana
                    </p>
                    <div className="flex items-center gap-2 text-sm mt-1">
                      <span className="text-yellow-500">
                        ★★★★★
                      </span>
                      <span className="text-[#3b1f0f] font-medium">
                        4.8/5
                      </span>
                    </div>
                  </div>
                </div>

                {/* Review Text */}
                <p className="font-semibold text-[#3b1f0f] mb-2">
                  The only cream that worked for my stretch marks !
                </p>

                <p className="text-sm text-gray-600 mb-6">
                  I've tried so many products, but Pokonut Stretch Mark Cream is truly a game-changer! Within few weeks, I noticed my stretch marks fading.
                </p>

                {/* Button */}
                <div className="relative">
                  <button className="w-full bg-[#5a2a0f] text-white py-3 rounded-lg font-semibold hover:bg-[#3b1f0f] transition">
                    ADD THIS PRODUCT TO CART
                  </button>

                  {/* Small product image */}
                  <div className="absolute -bottom-3 right-4 w-14 h-14">
                    <Image
                      src="/images/bestsellers/3.webp"
                      alt="product"
                      fill
                      className="object-contain"
                    />
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
