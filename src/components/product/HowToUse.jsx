"use client";

import { BookOpen } from "lucide-react";

export default function HowToUse({ product }) {
  return (
    <section className="py-10 bg-gray-50 rounded-xl mt-6">
      <div className="max-w-4xl mx-auto px-4">

        {/* Heading */}
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
            <BookOpen size={20} className="text-orange-600" />
          </div>
          <h2 className="text-xl font-bold text-gray-800">
            How to Use
          </h2>
        </div>

        {/* Dynamic Content */}
        {product?.howToUse && (
          <div className="bg-white rounded-xl p-5 shadow-sm">
            <div 
              className="prose prose-sm max-w-none text-gray-600"
              dangerouslySetInnerHTML={{ __html: product.howToUse }}
            />
          </div>
        )}

      </div>
    </section>
  );
}