"use client";

import Image from "next/image";
import Link from "next/link";
import { Phone, Mail, Facebook, Instagram, Youtube, MapPin, Send, CreditCard, Truck, Shield, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white mt-20">
      {/* Top Features Bar */}
      <div className="max-w-7xl mx-auto px-6 py-8 border-b border-slate-700">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-rose-500/20 flex items-center justify-center flex-shrink-0">
              <Truck className="text-rose-400" size={22} />
            </div>
            <div>
              <h4 className="font-semibold text-sm">Free Shipping</h4>
              <p className="text-xs text-slate-400">On orders ₹499+</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-rose-500/20 flex items-center justify-center flex-shrink-0">
              <Shield className="text-rose-400" size={22} />
            </div>
            <div>
              <h4 className="font-semibold text-sm">Secure Payment</h4>
              <p className="text-xs text-slate-400">100% Safe</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-rose-500/20 flex items-center justify-center flex-shrink-0">
              <Heart className="text-rose-400" size={22} />
            </div>
            <div>
              <h4 className="font-semibold text-sm">Natural Products</h4>
              <p className="text-xs text-slate-400">100% Organic</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-rose-500/20 flex items-center justify-center flex-shrink-0">
              <CreditCard className="text-rose-400" size={22} />
            </div>
            <div>
              <h4 className="font-semibold text-sm">Easy Returns</h4>
              <p className="text-xs text-slate-400">30-day policy</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Image
              src="/images/logo/beaulii05.webp"
              alt="Beaulii"
              width={140}
              height={45}
              className="mb-5 object-contain brightness-0 invert"
            />
            <p className="text-slate-300 text-sm mb-5 leading-relaxed">
              Your destination for premium handmade soaps and natural skincare products. 
              Crafted with love for your beautiful skin.
            </p>
            <div className="flex items-center gap-3 mb-4">
              <Phone size={16} className="text-rose-400" />
              <span className="text-sm">01811-441177</span>
            </div>
            <div className="flex items-center gap-3 mb-5">
              <Mail size={16} className="text-rose-400" />
              <span className="text-sm">support@beaulii.com</span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin size={16} className="text-rose-400" />
              <span className="text-sm text-slate-300">Bangladesh</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-lg mb-5 text-rose-400">Quick Links</h4>
            <ul className="space-y-2.5">
              <li><Link href="/products/new-launches" className="text-sm text-slate-300 hover:text-white transition">New Launches</Link></li>
              <li><Link href="/products/handmade-soaps" className="text-sm text-slate-300 hover:text-white transition">Handmade Soaps</Link></li>
              <li><Link href="/products/skincare" className="text-sm text-slate-300 hover:text-white transition">Skincare</Link></li>
              <li><Link href="/products/mom-care" className="text-sm text-slate-300 hover:text-white transition">Mom Care</Link></li>
              <li><Link href="/products" className="text-sm text-slate-300 hover:text-white transition">All Products</Link></li>
            </ul>
          </div>

          {/* Information */}
          <div>
            <h4 className="font-bold text-lg mb-5 text-rose-400">Information</h4>
            <ul className="space-y-2.5">
              <li><Link href="#" className="text-sm text-slate-300 hover:text-white transition">About Us</Link></li>
              <li><Link href="#" className="text-sm text-slate-300 hover:text-white transition">Contact Us</Link></li>
              <li><Link href="#" className="text-sm text-slate-300 hover:text-white transition">Blog</Link></li>
              <li><Link href="#" className="text-sm text-slate-300 hover:text-white transition">FAQs</Link></li>
              <li><Link href="#" className="text-sm text-slate-300 hover:text-white transition">Shipping Info</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-bold text-lg mb-5 text-rose-400">Stay Connected</h4>
            <p className="text-slate-300 text-sm mb-4">
              Subscribe for exclusive offers and beauty tips!
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-4 py-2.5 bg-slate-700/50 rounded-l-lg text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-rose-500"
              />
              <button className="px-4 py-2.5 bg-rose-500 hover:bg-rose-600 rounded-r-lg transition">
                <Send size={18} />
              </button>
            </div>
            <div className="flex gap-3 mt-6">
              <Link href="#" className="w-10 h-10 rounded-full bg-slate-700/50 flex items-center justify-center hover:bg-rose-500 transition">
                <Facebook size={18} />
              </Link>
              <Link href="#" className="w-10 h-10 rounded-full bg-slate-700/50 flex items-center justify-center hover:bg-rose-500 transition">
                <Instagram size={18} />
              </Link>
              <Link href="#" className="w-10 h-10 rounded-full bg-slate-700/50 flex items-center justify-center hover:bg-rose-500 transition">
                <Youtube size={18} />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-700">
        <div className="max-w-7xl mx-auto px-6 py-5">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-slate-400">
              © 2024 Beaulii. All rights reserved.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-slate-400">
              <Link href="#" className="hover:text-white transition">Privacy Policy</Link>
              <span>•</span>
              <Link href="#" className="hover:text-white transition">Terms of Service</Link>
              <span>•</span>
              <Link href="#" className="hover:text-white transition">Refund Policy</Link>
              <span>•</span>
              <Link href="#" className="hover:text-white transition">Shipping Policy</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}