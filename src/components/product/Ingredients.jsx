"use client";

import { Leaf, Info } from "lucide-react";

export default function Ingredients({ product }) {
  return (
    <section className="py-12 bg-gray-50 rounded-2xl mt-8">
      <div className="max-w-4xl mx-auto px-4">

        {/* Heading */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
            <Leaf size={20} className="text-orange-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">
            Ingredients
          </h2>
        </div>

        {/* Content */}
        {product?.ingredient && (
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div 
              className="prose prose-sm max-w-none text-gray-600 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: product.ingredient }}
            />
          </div>
        )}

        {/* Note */}
        <div className="flex items-start gap-2 mt-4 text-xs text-gray-400">
          <Info size={14} />
          <p>For external use only. Avoid contact with eyes. Keep out of reach of children.</p>
        </div>

      </div>
    </section>
  );
}