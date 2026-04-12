"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAdminAuth } from "@/components/AdminAuth";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  ShoppingBag,
  Users,
  Eye,
  Package,
  ShoppingCart,
  Settings,
  Menu,
  X,
} from "lucide-react";

const stats = [
  { title: "Total Revenue", value: "$2,45,890", change: "+12.5%", positive: true, icon: DollarSign },
  { title: "Total Orders", value: "1,234", change: "+8.2%", positive: true, icon: ShoppingBag },
  { title: "Total Customers", value: "5,678", change: "+15.3%", positive: true, icon: Users },
  { title: "Page Views", value: "45,890", change: "-2.4%", positive: false, icon: Eye },
];

const recentOrders = [
  { id: "#ORD-001", customer: "Rahul Sharma", product: "Dark Patch Reducer Cream", amount: "$3,999", status: "Pending" },
  { id: "#ORD-002", customer: "Priya Patel", product: "Flawless Skin Combo", amount: "$2,999", status: "Processing" },
  { id: "#ORD-003", customer: "Amit Kumar", product: "Foot Care Cream", amount: "$1,999", status: "Delivered" },
  { id: "#ORD-004", customer: "Sneha Gupta", product: "Stretch Mark Cream", amount: "$3,999", status: "Pending" },
  { id: "#ORD-005", customer: "Vikram Singh", product: "Dark Patch Reducer Cream", amount: "$3,999", status: "Shipped" },
];

const topProducts = [
  { name: "Dark Patch Reducer Cream", sales: 234, revenue: "$9,35,766" },
  { name: "Flawless Skin Combo", sales: 189, revenue: "$5,66,811" },
  { name: "Foot Care Cream", sales: 156, revenue: "$3,11,844" },
  { name: "Stretch Mark Cream", sales: 123, revenue: "$4,91,877" },
];

export default function AdminDashboard() {
  const [mounted, setMounted] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const { admin, loading, isAuthenticated, logout } = useAdminAuth();
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("/admin/login");
    }
  }, [loading, isAuthenticated, router]);

  if (!mounted) return null;

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#5a2a0f]"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  const getStatusStyle = (status) => {
    switch (status) {
      case "Delivered": return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400";
      case "Shipped": return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400";
      case "Processing": return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400";
      default: return "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400";
    }
  };

  return (
    <div className="p-4 md:p-6">
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-800 dark:text-white">Dashboard</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">Welcome back!</p>
        </div>
        <button 
          onClick={() => setShowMobileMenu(!showMobileMenu)}
          className="p-2 bg-[#5a2a0f] text-white rounded-lg"
        >
          {showMobileMenu ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Quick Actions Menu */}
      {showMobileMenu && (
        <div className="md:hidden bg-white dark:bg-gray-800 rounded-xl p-4 mb-6 shadow-sm">
          <h2 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-3">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-2">
            <Link href="/admin/products" className="p-3 border border-gray-200 dark:border-gray-600 rounded-lg text-center">
              <Package className="mx-auto text-[#5a2a0f] mb-1" size={20} />
              <span className="text-xs font-medium text-gray-700 dark:text-gray-300">Add Product</span>
            </Link>
            <Link href="/admin/orders" className="p-3 border border-gray-200 dark:border-gray-600 rounded-lg text-center">
              <ShoppingCart className="mx-auto text-[#5a2a0f] mb-1" size={20} />
              <span className="text-xs font-medium text-gray-700 dark:text-gray-300">Orders</span>
            </Link>
            <Link href="/admin/users" className="p-3 border border-gray-200 dark:border-gray-600 rounded-lg text-center">
              <Users className="mx-auto text-[#5a2a0f] mb-1" size={20} />
              <span className="text-xs font-medium text-gray-700 dark:text-gray-300">Customers</span>
            </Link>
            <Link href="/admin/settings" className="p-3 border border-gray-200 dark:border-gray-600 rounded-lg text-center">
              <Settings className="mx-auto text-[#5a2a0f] mb-1" size={20} />
              <span className="text-xs font-medium text-gray-700 dark:text-gray-300">Settings</span>
            </Link>
          </div>
        </div>
      )}

      {/* Page Title - Desktop */}
      <div className="hidden md:block mb-8">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Dashboard</h1>
        <p className="text-gray-500 dark:text-gray-400">Welcome back! Here's what's happening today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-4 md:p-6 shadow-sm">
            <div className="flex items-center justify-between mb-3 md:mb-4">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-[#5a2a0f]/10 rounded-lg flex items-center justify-center">
                <stat.icon className="text-[#5a2a0f]" size={20} />
              </div>
              <span className={`flex items-center gap-1 text-xs md:text-sm font-medium ${stat.positive ? "text-green-500" : "text-red-500"}`}>
                {stat.positive ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                {stat.change}
              </span>
            </div>
            <h3 className="text-gray-500 dark:text-gray-400 text-xs md:text-sm">{stat.title}</h3>
            <p className="text-xl md:text-2xl font-bold text-gray-800 dark:text-white mt-1">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Recent Orders & Top Products */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-8">
        {/* Recent Orders */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
          <div className="p-4 md:p-6 border-b border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <h2 className="text-base md:text-lg font-semibold text-gray-800 dark:text-white">Recent Orders</h2>
              <Link href="/admin/orders" className="text-xs md:text-sm text-[#5a2a0f] hover:underline">
                View All
              </Link>
            </div>
          </div>
          {/* Mobile View - Card Style */}
          <div className="md:hidden divide-y divide-gray-100 dark:divide-gray-700">
            {recentOrders.map((order) => (
                <div key={order.id} className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-[#5a2a0f]">{order.id}</span>
                    <span className={`inline-flex px-2 py-0.5 text-xs font-medium rounded-full ${getStatusStyle(order.status)}`}>
                      {order.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{order.customer}</p>
                  <p className="text-sm font-medium text-gray-800 dark:text-white">{order.amount}</p>
                </div>
              ))}
            </div>
            {/* Desktop View - Table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Order</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Customer</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Amount</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                  {recentOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                      <td className="px-4 py-3 text-sm font-medium text-[#5a2a0f]">{order.id}</td>
                      <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">{order.customer}</td>
                      <td className="px-4 py-3 text-sm font-medium text-gray-800 dark:text-white">{order.amount}</td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusStyle(order.status)}`}>
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        {/* Top Products */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
          <div className="p-4 md:p-6 border-b border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <h2 className="text-base md:text-lg font-semibold text-gray-800 dark:text-white">Top Products</h2>
              <Link href="/admin/products" className="text-xs md:text-sm text-[#5a2a0f] hover:underline">
                View All
              </Link>
            </div>
          </div>
          <div className="divide-y divide-gray-100 dark:divide-gray-700">
            {topProducts.map((product, index) => (
              <div key={index} className="p-4 md:p-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700/50">
                <div>
                  <p className="font-medium text-gray-800 dark:text-white">{product.name}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{product.sales} sales</p>
                </div>
                <p className="font-semibold text-[#5a2a0f]">{product.revenue}</p>
              </div>
            ))}
          </div>
        </div>
        {/* Quick Actions */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 md:p-6 shadow-sm">
          <h2 className="text-base md:text-lg font-semibold text-gray-800 dark:text-white mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link href="/admin/products/new" className="p-4 border-2 border-dashed border-gray-200 dark:border-gray-600 rounded-lg text-center hover:border-[#5a2a0f] hover:bg-[#5a2a0f]/5 transition">
              <Package className="mx-auto text-gray-400 dark:text-gray-500 mb-2" size={24} />
              <span className="text-sm font-medium text-gray-600 dark:text-gray-300">Add Product</span>
            </Link>
            <Link href="/admin/orders" className="p-4 border-2 border-dashed border-gray-200 dark:border-gray-600 rounded-lg text-center hover:border-[#5a2a0f] hover:bg-[#5a2a0f]/5 transition">
              <ShoppingCart className="mx-auto text-gray-400 dark:text-gray-500 mb-2" size={24} />
              <span className="text-sm font-medium text-gray-600 dark:text-gray-300">Manage Orders</span>
            </Link>
            <Link href="/admin/customers" className="p-4 border-2 border-dashed border-gray-200 dark:border-gray-600 rounded-lg text-center hover:border-[#5a2a0f] hover:bg-[#5a2a0f]/5 transition">
              <Users className="mx-auto text-gray-400 dark:text-gray-500 mb-2" size={24} />
              <span className="text-sm font-medium text-gray-600 dark:text-gray-300">View Customers</span>
            </Link>
            <Link href="/admin/settings" className="p-4 border-2 border-dashed border-gray-200 dark:border-gray-600 rounded-lg text-center hover:border-[#5a2a0f] hover:bg-[#5a2a0f]/5 transition">
              <Settings className="mx-auto text-gray-400 dark:text-gray-500 mb-2" size={24} />
              <span className="text-sm font-medium text-gray-600 dark:text-gray-300">Settings</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
