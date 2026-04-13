"use client";

import Image from "next/image";
import { CheckCircle, Shield, Award, Scale } from "lucide-react";

export default function TriedAndTested() {
  const badges = [
    { title: "Dermatologically Tested", subtitle: "Safe for all skin types", icon: <Shield size={28} />, color: "bg-blue-50 text-blue-600" },
    { title: "Stability Tested", subtitle: "Proven formula stability", icon: <Scale size={28} />, color: "bg-purple-50 text-purple-600" },
    { title: "FDA Approved", subtitle: "Government certified", icon: <Award size={28} />, color: "bg-green-50 text-green-600" },
    { title: "GMP Certified", subtitle: "Quality manufacturing", icon: <CheckCircle size={28} />, color: "bg-orange-50 text-orange-600" },
  ];

  return (
    <div className="py-12 bg-gray-50 rounded-2xl mt-8">
      <div className="max-w-7xl mx-auto px-4">
        
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-3">
          Tried & Tested
        </h2>
        <p className="text-gray-500 text-center mb-10">
          Quality you can trust
        </p>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {badges.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-5 flex flex-col items-center text-center hover:shadow-lg transition-shadow duration-300 border border-gray-100"
            >
              <div className={`w-14 h-14 rounded-full ${item.color} flex items-center justify-center mb-4`}>
                {item.icon}
              </div>
              
              <h3 className="font-semibold text-gray-800 text-sm mb-1">
                {item.title}
              </h3>
              <p className="text-xs text-gray-500">
                {item.subtitle}
              </p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}