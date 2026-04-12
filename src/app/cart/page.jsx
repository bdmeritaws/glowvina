"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Trash2, Minus, Plus, ShoppingBag, ArrowRight } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function CartPage() {
  const { cart, updateQuantity, removeItem, cartTotal } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const shipping = cartTotal > 50 ? 0 : 9.99;
  const tax = cartTotal * 0.08;
  const orderTotal = cartTotal + shipping + tax;

  if (cart.length === 0) {
    return (
      <section className="bg-[#f4f1ee] min-h-screen py-16">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <div className="bg-white rounded-2xl p-12 shadow-lg">
            <div className="w-20 h-20 bg-[#5a2a0f]/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="w-10 h-10 text-[#5a2a0f]" />
            </div>
            <h2 className="text-2xl font-bold text-[#3b1f0f] mb-4">
              Your cart is empty
            </h2>
            <p className="text-gray-600 mb-8">
              Looks like you haven't added anything to your cart yet.
            </p>
            <Link
              href="/"
              className="inline-block bg-[#5a2a0f] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#3b1f0f] transition"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-[#f4f1ee] min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-2xl md:text-3xl font-bold text-[#3b1f0f] mb-8">
          Shopping Cart ({cart.length} {cart.length === 1 ? "item" : "items"})
        </h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl p-4 flex gap-4 border border-[#e5ddd5] dark:border-gray-600"
              >
                <div className="w-24 h-24 relative bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                  {item.thumbnail ? (
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <ShoppingBag className="w-8 h-8 text-gray-300" />
                    </div>
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <Link
                    href={`/product/${item.slug}`}
                    className="text-lg font-semibold text-[#3b1f0f] hover:text-[#5a2a0f] line-clamp-1"
                  >
                    {item.title}
                  </Link>
                  {item.selectedVariant && (
                    <p className="text-sm text-gray-500">{item.selectedVariant}</p>
                  )}
                  <p className="font-medium text-[#5a2a0f] mt-1">
                    ${parseFloat(item.price).toFixed(2)}
                  </p>
                  
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center border border-gray-200 rounded-lg dark:border-gray-600">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="px-3 py-1 text-gray-600 hover:text-[#5a2a0f] dark:text-gray-400"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="px-3 py-1 font-medium text-gray-800 dark:text-gray-200">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="px-3 py-1 text-gray-600 hover:text-[#5a2a0f] dark:text-gray-400"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                    
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-red-500 hover:text-red-700 p-2"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
            
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-[#5a2a0f] font-medium hover:underline"
            >
              <ArrowRight className="rotate-180" size={18} />
              Continue Shopping
            </Link>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl p-6 border border-[#e5ddd5] dark:border-gray-600 sticky top-24">
              <h2 className="text-lg font-bold text-[#3b1f0f] mb-6">
                Order Summary
              </h2>
              
              <div className="space-y-3 text-gray-600 dark:text-gray-300">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-medium text-gray-800 dark:text-gray-200">
                    ${cartTotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="font-medium text-gray-800 dark:text-gray-200">
                    {shipping === 0 ? (
                      <span className="text-green-600">FREE</span>
                    ) : (
                      `$${shipping.toFixed(2)}`
                    )}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span className="font-medium text-gray-800 dark:text-gray-200">
                    ${tax.toFixed(2)}
                  </span>
                </div>
                <div className="border-t pt-3 flex justify-between text-lg font-bold text-[#3b1f0f]">
                  <span>Total</span>
                  <span>${orderTotal.toFixed(2)}</span>
                </div>
              </div>

              {cartTotal < 50 && (
                <p className="text-sm text-green-600 mt-3">
                  Add ${(50 - cartTotal).toFixed(2)} more for free shipping!
                </p>
              )}

              <Link
                href="/checkout"
                className="block w-full bg-[#5a2a0f] text-white text-center py-3 rounded-lg font-semibold hover:bg-[#3b1f0f] transition mt-6"
              >
                Proceed to Checkout
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
