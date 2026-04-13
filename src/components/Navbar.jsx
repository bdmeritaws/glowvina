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

const HEADER_HEIGHT = 100;

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

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Search API
  useEffect(() => {
    const timer = setTimeout(async () => {
      if (searchQuery.length >= 2) {
        setSearchLoading(true);
        try {
          const res = await fetch(
            `/api/products/search?q=${encodeURIComponent(searchQuery)}&limit=8`
          );
          const data = await res.json();
          setSearchResults(data.products || []);
          setShowResults(true);
        } catch (err) {
          console.error(err);
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

  // Outside click search
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowResults(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("/api/categories");
        if (res.ok) {
          const data = await res.json();
          setCategories(data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const menuItems = categories.map((cat) => ({
    name: cat.name,
    slug: cat.slug,
  }));

  return (
    <>
      {/* HEADER */}
      <header
        className={`fixed top-0 left-0 right-0 z-[1000] transition-all ${
          scrolled ? "bg-white shadow" : "bg-[#f4f1ee]"
        }`}
      >
        <div className="max-w-7xl mx-auto px-3">

          {/* TOP BAR */}
          <div className="flex items-center justify-between py-3">

            {/* LEFT */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setOpen(true)}
                className="p-2 hover:bg-orange-100 rounded"
              >
                <Menu size={22} />
              </button>

              <Link href="/">
                <Image
                  src="/images/logo/beaulii.webp"
                  alt="logo"
                  width={110}
                  height={36}
                />
              </Link>
            </div>

            {/* RIGHT */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setMobileSearchOpen(true)}
                className="lg:hidden p-2"
              >
                <Search size={20} />
              </button>

              <button onClick={openCart} className="relative p-2">
                <ShoppingCart size={20} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs px-1.5 rounded-full">
                    {cartCount}
                  </span>
                )}
              </button>

              <button className="p-2">
                <User size={20} />
              </button>
            </div>
          </div>

          {/* CATEGORY MENU (THIS WAS MISSING) */}
          {menuItems.length > 0 && (
            <div className="hidden lg:flex gap-6 py-2 border-t overflow-x-auto">
              {menuItems.slice(0, 8).map((item, i) => (
                <Link
                  key={i}
                  href={`/products/${item.slug}`}
                  className="text-sm text-gray-600 hover:text-orange-600 whitespace-nowrap"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          )}
        </div>
      </header>

      {/* DRAWER */}
      <div className={`fixed inset-0 z-50 ${open ? "visible" : "invisible"}`}>

        {/* OVERLAY */}
        <div
          onClick={() => setOpen(false)}
          className={`absolute left-0 right-0 bottom-0 bg-black/50 transition-opacity ${
            open ? "opacity-100" : "opacity-0"
          }`}
          style={{ top: HEADER_HEIGHT }}
        />

        {/* SIDEBAR */}
        <div
          className={`absolute left-0 bg-white shadow-xl transition-transform duration-300 ${
            open ? "translate-x-0" : "-translate-x-full"
          } overflow-y-auto`}
          style={{
            top: HEADER_HEIGHT,
            height: `calc(100% - ${HEADER_HEIGHT}px)`,
            width: "300px",
          }}
        >
          <div className="flex justify-between items-center p-4 bg-[#5a1f00] text-white">
            <span>Menu</span>
            <button onClick={() => setOpen(false)}>
              <X size={20} />
            </button>
          </div>

          <div>
            {loading ? (
              <p className="p-4">Loading...</p>
            ) : (
              menuItems.map((item, i) => (
                <Link
                  key={i}
                  href={`/products/${item.slug}`}
                  onClick={() => setOpen(false)}
                  className="block px-5 py-3 border-b hover:bg-gray-50"
                >
                  {item.name}
                </Link>
              ))
            )}
          </div>
        </div>
      </div>

      <CartDrawer />
    </>
  );
}