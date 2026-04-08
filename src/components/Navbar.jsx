"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Menu,
  Search,
  ShoppingCart,
  User,
  Truck,
  X,
  MapPin,
  Percent,
  Phone,
  Users,
  Shield,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import CartDrawer from "./CartDrawer";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { cartCount, openCart } = useCart();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

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

  // Default menu items when API fails or returns empty
  const defaultMenuItems = [
    { icon: <MapPin size={18} />, name: "Track My Order" },
    { name: "Handmade Soaps", slug: "handmade-soaps" },
    { name: "New Launches", slug: "new-launches" },
    { name: "Mom Care", slug: "mom-care" },
    { name: "Skincare", slug: "skincare" },
    { icon: <Percent size={18} />, name: "80% OFF DEALS" },
    { name: "Blogs" },
    { icon: <Phone size={18} />, name: "Contact Us" },
    { icon: <Users size={18} />, name: "About Us" },
    { icon: <User size={18} />, name: "Login/Signup" },
    { icon: <Shield size={18} />, name: "Admin Panel", href: "/admin/login" },
  ];

  // Build menu items from API categories or fallback
  const menuItems = categories.length > 0
    ? categories.map(cat => ({ name: cat.name, slug: cat.slug }))
    : defaultMenuItems;

  return (
    <>
      {/* ================= NAVBAR ================= */}
      <header className="bg-[#f4f1ee] border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">

          {/* LEFT SECTION */}
          <div className="flex items-center gap-4">

            {/* Menu Button */}
            <button
              onClick={() => setOpen(true)}
              className="cursor-pointer text-gray-700 hover:text-orange-500 transition"
            >
              <Menu size={24} />
            </button>

            {/* LOGO ONLY */}
            <Link href="/" className="cursor-pointer">
              <Image
                src="/images/logo/beaulii.webp"
                alt="Beaulii"
                width={130}
                height={40}
                className="object-contain"
                priority
              />
            </Link>

          </div>

          {/* CENTER SEARCH (Desktop Only) */}
          <div className="hidden md:flex flex-1 mx-10">
            <div className="relative w-full">
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
              />
              <input
                type="text"
                placeholder="Search for products"
                className="w-full pl-10 pr-4 py-2 rounded-full border-2 border-orange-400 bg-white placeholder-black focus:outline-none focus:ring-2 focus:ring-orange-300"
              />
            </div>
          </div>

          {/* RIGHT SECTION */}
          <div className="flex items-center gap-6 text-gray-700">

            <button className="cursor-pointer hover:text-orange-500 transition">
              <Truck size={20} />
            </button>

            <button 
              onClick={openCart}
              className="relative cursor-pointer hover:text-orange-500 transition"
            >
              <ShoppingCart size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-[10px] px-1.5 py-[1px] rounded-full">
                  {cartCount}
                </span>
              )}
            </button>

            <Link 
              href="/admin/dashboard" 
              className="cursor-pointer hover:text-orange-500 transition"
              title="Admin Dashboard"
            >
              <Shield size={20} />
            </Link>

            <button className="cursor-pointer hover:text-orange-500 transition">
              <User size={20} />
            </button>

          </div>
        </div>
      </header>

      {/* ================= SIDEBAR ================= */}
      <div
        className={`fixed inset-0 z-50 transition ${
          open ? "visible" : "invisible"
        }`}
      >
        {/* Overlay */}
        <div
          onClick={() => setOpen(false)}
          className={`absolute inset-0 bg-black/40 transition-opacity ${
            open ? "opacity-100" : "opacity-0"
          }`}
        ></div>

        {/* Drawer */}
        <div
          className={`absolute left-0 top-0 h-full w-[85%] max-w-xs bg-[#f4f1ee] shadow-xl transform transition-transform duration-300 ${
            open ? "translate-x-0" : "-translate-x-full"
          } overflow-y-auto`}
        >

          {/* Sidebar Header */}
          <div className="flex items-center justify-between p-5 border-b">

            {/* Logo Only */}
            <Link
              href="/"
              onClick={() => setOpen(false)}
              className="cursor-pointer"
            >
              <Image
                src="/images/logo/beaulii.webp"
                alt="Beaulii"
                width={110}
                height={35}
                className="object-contain"
              />
            </Link>

            {/* Close Button */}
            <button
              onClick={() => setOpen(false)}
              className="cursor-pointer hover:text-orange-500 transition"
            >
              <X size={22} />
            </button>
          </div>

          {/* Menu List */}
          <div className="mt-4 border-t">
            {loading ? (
              <div className="px-5 py-4 text-gray-500">Loading categories...</div>
            ) : (
              menuItems.map((item, index) => (
                <Link
                  key={index}
                  href={item.href || (item.slug ? `/products/${item.slug}` : "#")}
                  onClick={() => setOpen(false)}
                  className="w-full flex items-center gap-3 px-5 py-4 border-b cursor-pointer hover:bg-white transition text-left"
                >
                  {item.icon}
                  <span className="font-medium text-[#3b1f0f]">
                    {item.name}
                  </span>
                </Link>
              ))
            )}
          </div>

        </div>
      </div>

      {/* Cart Drawer */}
      <CartDrawer />
    </>
  );
}
