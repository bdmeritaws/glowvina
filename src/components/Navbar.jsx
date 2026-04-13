"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Menu,
  Search,
  ShoppingCart,
  User,
  Truck,
  X,
  Loader2,
  Heart,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import CartDrawer from "./CartDrawer";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const searchRef = useRef(null);
  const { cartCount, openCart } = useCart();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (searchQuery.length >= 2) {
        setSearchLoading(true);
        try {
          const res = await fetch(`/api/products/search?q=${encodeURIComponent(searchQuery)}&limit=8`);
          const data = await res.json();
          setSearchResults(data.products || []);
          setShowResults(true);
        } catch (err) {
          console.error("Search error:", err);
        } finally {
          setSearchLoading(false);
        }
      } else {
        setSearchResults([]);
        setShowResults(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowResults(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/categories');
        if (response.ok) {
          const data = await response.json();
          setCategories(data);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const menuItems = categories.length > 0
    ? categories.map(cat => ({ name: cat.name, slug: cat.slug }))
    : [];

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-300 ${
        scrolled 
          ? "bg-white shadow-lg" 
          : "bg-[#f4f1ee]"
      }`}>
        <div className="max-w-7xl mx-auto px-3 md:px-4">
          
          {/* Main Navbar Row */}
          <div className="flex items-center justify-between py-3 gap-2 md:gap-4">

            {/* Left - Menu & Logo */}
            <div className="flex items-center gap-2 md:gap-4">
              <button
                onClick={() => setOpen(true)}
                className="cursor-pointer p-2 rounded-lg hover:bg-orange-100 transition text-gray-700"
              >
                <Menu size={22} />
              </button>

              <Link href="/" className="cursor-pointer">
                <Image
                  src="/images/logo/beaulii.webp"
                  alt="Beaulii"
                  width={110}
                  height={36}
                  className="object-contain"
                  priority
                />
              </Link>
            </div>

            {/* Center - Search */}
            <div className="hidden lg:flex flex-1 max-w-xl mx-6 relative" ref={searchRef}>
              <div className="relative w-full">
                <Search
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => searchQuery.length >= 2 && setShowResults(true)}
                  className="w-full pl-11 pr-12 py-2.5 rounded-full border-2 border-gray-200 bg-white placeholder-gray-400 focus:outline-none focus:border-orange-400 transition"
                />
                {searchLoading ? (
                  <Loader2 size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 animate-spin" />
                ) : searchQuery && (
                  <button 
                    onClick={() => setSearchQuery("")}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>

              {showResults && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-200 max-h-96 overflow-y-auto z-50">
                  {searchResults.length > 0 ? (
                    searchResults.map((product) => (
                      <Link
                        key={product.id}
                        href={`/products/${product.slug}`}
                        onClick={() => {
                          setShowResults(false);
                          setSearchQuery("");
                        }}
                        className="flex items-center gap-3 p-3 hover:bg-gray-50 border-b last:border-b-0 transition"
                      >
                        <div className="relative w-14 h-14 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                          {product.image && (
                            <Image
                              src={product.image}
                              alt={product.title}
                              fill
                              className="object-cover"
                            />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-800 truncate">{product.title}</p>
                          <p className="text-xs text-gray-500 truncate">{product.shortDescription}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-sm font-bold text-orange-600">${product.price}</span>
                            {product.oldPrice && (
                              <span className="text-xs text-gray-400 line-through">${product.oldPrice}</span>
                            )}
                          </div>
                        </div>
                      </Link>
                    ))
                  ) : (
                    <div className="p-6 text-center text-gray-500">
                      <p>No products found</p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Right - Actions */}
            <div className="flex items-center gap-1 md:gap-2">
              {/* Mobile Search */}
              <button 
                type="button"
                onClick={() => setMobileSearchOpen(true)}
                className="p-2 rounded-lg hover:bg-orange-100 transition lg:hidden"
                aria-label="Search"
              >
                <Search size={20} className="text-gray-700" />
              </button>

              {/* Track Order */}
              <button className="hidden md:flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-orange-100 transition text-gray-700">
                <Truck size={20} />
              </button>

              {/* Wishlist */}
              <button className="p-2 rounded-lg hover:bg-orange-100 transition text-gray-700">
                <Heart size={20} />
              </button>

              {/* Cart */}
              <button 
                onClick={openCart}
                className="relative p-2 rounded-lg hover:bg-orange-100 transition text-gray-700"
              >
                <ShoppingCart size={20} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-[10px] font-bold px-1.5 py-[1px] rounded-full min-w-[18px] text-center">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* User */}
              <button className="p-2 rounded-lg hover:bg-orange-100 transition text-gray-700">
                <User size={20} />
              </button>
            </div>
          </div>

          {/* Category Links */}
          {menuItems.length > 0 && (
            <div className="hidden lg:flex items-center gap-6 py-2 border-t border-gray-200 overflow-x-auto">
              {menuItems.slice(0, 6).map((item, index) => (
                <Link 
                  key={index} 
                  href={`/products/${item.slug}`} 
                  className="text-sm font-medium text-gray-600 hover:text-orange-600 whitespace-nowrap transition"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          )}
        </div>
      </header>

      {/* Sidebar Drawer */}
      <div className={`fixed inset-0 z-50 transition ${open ? "visible" : "invisible"}`}>
        <div
          onClick={() => setOpen(false)}
          className={`absolute inset-0 bg-black/50 transition-opacity ${
            open ? "opacity-100" : "opacity-0"
          }`}
        ></div>

        <div className={`absolute left-0 top-0 h-full w-[300px] max-w-[85%] bg-white shadow-xl transform transition-transform duration-300 ${
            open ? "translate-x-0" : "-translate-x-full"
          } overflow-y-auto`}
        >
          <div className="flex items-center justify-between p-4 bg-[#5a1f00]">
            <Link href="/" onClick={() => setOpen(false)} className="cursor-pointer">
              <Image
                src="/images/logo/beaulii.webp"
                alt="Beaulii"
                width={100}
                height={32}
                className="object-contain invert brightness-0 invert"
              />
            </Link>
            <button
              onClick={() => setOpen(false)}
              className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition text-white"
            >
              <X size={20} />
            </button>
          </div>

          <div className="mt-2">
            {loading ? (
              <div className="px-5 py-4 text-gray-500">Loading...</div>
            ) : menuItems.length > 0 ? (
              menuItems.map((item, index) => (
                <Link
                  key={index}
                  href={`/products/${item.slug}`}
                  onClick={() => setOpen(false)}
                  className="w-full flex items-center gap-3 px-5 py-3.5 border-b border-gray-100 cursor-pointer hover:bg-orange-50 transition text-left"
                >
                  <span className="font-medium text-gray-700">
                    {item.name}
                  </span>
                </Link>
              ))
            ) : (
              <div className="px-5 py-4 text-gray-500">No categories available</div>
            )}
          </div>

          <div className="p-5 mt-4 border-t">
            <div className="flex flex-col gap-2 text-sm text-gray-600">
              <Link href="#" className="hover:text-orange-600">Track My Order</Link>
              <Link href="#" className="hover:text-orange-600">Contact Us</Link>
              <Link href="#" className="hover:text-orange-600">About Us</Link>
              <Link href="#" className="hover:text-orange-600">Login / Signup</Link>
            </div>
          </div>
        </div>
      </div>

      <CartDrawer />

      {/* Mobile Search Modal */}
      {mobileSearchOpen && (
        <div className="fixed inset-0 z-[100] bg-black/60" onClick={() => setMobileSearchOpen(false)}>
          <div className="absolute top-0 left-0 right-0 bg-white p-4 shadow-xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center gap-3">
              <button type="button" onClick={() => setMobileSearchOpen(false)} className="p-1">
                <X size={22} className="text-gray-600" />
              </button>
              <div className="flex-1 relative">
                <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                  className="w-full pl-10 pr-4 py-3 text-base rounded-full border-2 border-gray-200 bg-gray-50 focus:outline-none focus:border-orange-400"
                />
              </div>
            </div>

            {showResults && searchResults.length > 0 && (
              <div className="mt-4 max-h-72 overflow-y-auto">
                {searchResults.map((product) => (
                  <Link
                    key={product.id}
                    href={`/products/${product.slug}`}
                    onClick={() => setMobileSearchOpen(false)}
                    className="flex items-center gap-3 p-3 border-b"
                  >
                    <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-gray-100">
                      {product.image && (
                        <Image src={product.image} alt={product.title} fill className="object-cover" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-800 truncate">{product.title}</p>
                      <span className="text-sm font-bold text-orange-600">${product.price}</span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}