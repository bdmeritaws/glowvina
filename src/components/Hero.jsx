"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { getImageUrl } from "@/lib/cdn";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ShoppingBag, ArrowRight } from "lucide-react";

const defaultSlides = [
  { image: "/images/hero/1_1.webp", title: "Natural Skincare", subtitle: "Discover our organic collection", link: "/products", linkText: "Shop Now" },
  { image: "/images/hero/1_2.webp", title: "Best Sellers", subtitle: "Top rated products for you", link: "/products", linkText: "Explore" },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const response = await fetch('/api/banners');
        if (response.ok) {
          const data = await response.json();
          setBanners(data.length > 0 ? data : defaultSlides);
        } else {
          setBanners(defaultSlides);
        }
      } catch (error) {
        setBanners(defaultSlides);
      } finally {
        setLoading(false);
      }
    };
    fetchBanners();
  }, []);

  useEffect(() => {
    if (banners.length <= 1 || isPaused) return;
    const interval = setInterval(() => {
      setCurrent(prev => prev === banners.length - 1 ? 0 : prev + 1);
    }, 4500);
    return () => clearInterval(interval);
  }, [banners.length, isPaused]);

  if (loading) {
    return (
      <section className="bg-[#f4f1ee] py-4">
        <div className="max-w-7xl mx-auto px-4">
          <div className="relative h-[280px] sm:h-[400px] lg:h-[500px] bg-gray-300 animate-pulse rounded-2xl" />
        </div>
      </section>
    );
  }

  const slides = banners.map(banner => ({
    image: banner.image ? getImageUrl(banner.image) : "/images/placeholder.webp",
    title: banner.title || "Natural Beauty",
    subtitle: banner.subtitle || "Premium skincare products",
    link: banner.link || "/products",
    linkText: banner.linkText || "Shop Now",
  }));

  return (
    <section 
      className="relative bg-[#f4f1ee] pt-24 pb-4 overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative pt-6">
        
        {/* Main Slider */}
        <div className="relative h-[280px] sm:h-[400px] lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
          
          {/* Slides */}
          <div 
            className="flex h-full transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${current * 100}%)` }}
          >
            {slides.map((slide, index) => (
              <div key={index} className="min-w-full relative">
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  className="object-cover"
                  priority={index === 0}
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
              </div>
            ))}
          </div>

          {/* Content Overlay */}
          {slides.map((slide, index) => (
            <div 
              key={index}
              className={`absolute inset-0 flex items-center ${
                index === 0 ? 'justify-start' : index === slides.length - 1 ? 'justify-end' : 'justify-center'
              } px-8 sm:px-16 transition-opacity duration-500 ${
                current === index ? 'opacity-100' : 'opacity-0 pointer-events-none'
              }`}
            >
              <div className="max-w-lg">
                <div className="inline-block px-3 py-1 bg-orange-500 text-white text-xs font-semibold rounded-full mb-4">
                  NEW ARRIVAL
                </div>
                <h1 className="text-white text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 leading-tight">
                  {slide.title}
                </h1>
                <p className="text-white/90 text-base sm:text-lg mb-6">
                  {slide.subtitle}
                </p>
                <Link 
                  href={slide.link}
                  className="inline-flex items-center gap-2 bg-white text-gray-900 px-6 py-3 rounded-full font-semibold hover:bg-orange-500 hover:text-white transition-colors"
                >
                  <ShoppingBag size={18} />
                  {slide.linkText}
                </Link>
              </div>
            </div>
          ))}

          {/* Navigation Arrows */}
          {slides.length > 1 && (
            <>
              <button
                onClick={() => setCurrent(prev => prev === 0 ? slides.length - 1 : prev - 1)}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition z-10"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={() => setCurrent(prev => prev === slides.length - 1 ? 0 : prev + 1)}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition z-10"
              >
                <ChevronRight size={20} />
              </button>
            </>
          )}

          {/* Dots */}
          {slides.length > 1 && (
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrent(index)}
                  className={`h-2 rounded-full transition-all ${
                    current === index ? "w-8 bg-orange-500" : "w-2 bg-white/50"
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Promo Banners Below */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
          <div className="bg-gradient-to-r from-orange-600 to-orange-700 rounded-xl p-6 flex items-center justify-between">
            <div>
              <h3 className="text-white text-lg font-bold mb-1">Mega Sale</h3>
              <p className="text-orange-100 text-sm">Up to 50% off on skincare</p>
            </div>
            <ArrowRight size={24} className="text-white" />
          </div>
          <div className="bg-gradient-to-r from-[#5a1f00] to-[#8a3a10] rounded-xl p-6 flex items-center justify-between">
            <div>
              <h3 className="text-white text-lg font-bold mb-1">Free Shipping</h3>
              <p className="text-orange-100 text-sm">On orders above $499</p>
            </div>
            <ArrowRight size={24} className="text-white" />
          </div>
        </div>

      </div>
    </section>
  );
}