"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useCallback } from "react";
import { getImageUrl } from "@/lib/cdn";
import { ChevronRight } from "lucide-react";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCategories = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/categories', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        cache: 'no-store',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setCategories(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Error fetching categories:', err);
      setError('Unable to load categories.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const getCategoryImage = (cat) => {
    if (cat?.image) {
      if (cat.image.startsWith('http')) return cat.image;
      return getImageUrl(cat.image);
    }
    return getImageUrl("images/placeholder-category.webp");
  };

  const CategorySkeleton = () => (
    <div className="flex flex-col items-center">
      <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-2xl bg-gray-200 animate-pulse" />
      <div className="mt-3 h-4 w-16 mx-auto bg-gray-200 rounded animate-pulse" />
    </div>
  );

  if (loading) {
    return (
      <section className="bg-[#f4f1ee] py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex overflow-x-auto gap-6 justify-center pb-2">
            {[...Array(5)].map((_, i) => (<CategorySkeleton key={i} />))}
          </div>
        </div>
      </section>
    );
  }

  if (error || categories.length === 0) {
    return null;
  }

  return (
    <section className="bg-[#f4f1ee] py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex overflow-x-auto gap-4 sm:gap-6 md:gap-8 pb-4 justify-start md:justify-center pl-4 md:pl-0">
          {categories.slice(0, 6).map((cat) => (
            <Link
              key={cat.id}
              href={`/products/${cat.slug}`}
              className="flex-shrink-0 cursor-pointer group"
              prefetch={false}
            >
              <div className="relative w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-2xl overflow-hidden shadow-md group-hover:shadow-xl transition-all duration-300 group-hover:-translate-y-1">
                <Image
                  src={getCategoryImage(cat)}
                  alt={cat.name || 'Category'}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="mt-3 text-center">
                <h3 className="text-sm sm:text-base font-semibold text-gray-800 group-hover:text-orange-600 transition-colors">
                  {cat.name}
                </h3>
                <span className="flex items-center justify-center gap-1 text-xs text-gray-400 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  Shop <ChevronRight size={12} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}