"use client";

import { Check, X, Star } from "lucide-react";

export default function WhyBeaulii() {
  const beauliiBenefits = [
    "Rooted in Ayurveda, Proven by Science",
    "Safe For Delicate Areas",
    "Rich Cream, Pocket Friendly",
    "Reduces Patches, Softens Skin",
    "Made with Real Mom Logic",
  ];

  const othersCons = [
    "Bleach-Based Quick Fix",
    "Harsh On Sensitive Skin",
    "Priced Higher Than Worth",
    "Same Cream For All",
    "Made To Sell, Not Heal",
  ];

  return (
    <section className="py-12 bg-gray-50 rounded-2xl mt-8">
      <div className="max-w-4xl mx-auto px-4">

        {/* Heading */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Why Choose Beaulii?
          </h2>
          <div className="flex items-center justify-center gap-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} className="fill-orange-400 text-orange-400" />
              ))}
            </div>
            <span className="text-gray-500 text-sm">Trusted by 10,000+ customers</span>
          </div>
        </div>

        {/* Comparison Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          {/* Beaulii */}
          <div className="bg-white rounded-xl p-6 shadow-sm border-2 border-green-200">
            <h3 className="text-lg font-bold text-green-700 mb-4 text-center">
              Beaulii
            </h3>
            <ul className="space-y-3">
              {beauliiBenefits.map((item, index) => (
                <li key={index} className="flex items-start gap-3 text-sm text-gray-700">
                  <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check size={12} className="text-green-600" />
                  </div>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Others */}
          <div className="bg-white rounded-xl p-6 shadow-sm border-2 border-red-100">
            <h3 className="text-lg font-bold text-red-700 mb-4 text-center">
              Others
            </h3>
            <ul className="space-y-3">
              {othersCons.map((item, index) => (
                <li key={index} className="flex items-start gap-3 text-sm text-gray-500">
                  <div className="w-5 h-5 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <X size={12} className="text-red-500" />
                  </div>
                  {item}
                </li>
              ))}
            </ul>
          </div>

        </div>

      </div>
    </section>
  );
}