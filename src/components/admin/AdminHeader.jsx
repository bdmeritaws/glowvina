"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAdminAuth } from "@/components/AdminAuth";
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Users, 
  Star, 
  Settings,
  LogOut,
  Menu,
  X,
  Folder,
  Image,
  User,
  ChevronDown
} from "lucide-react";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/admin/dashboard" },
  { icon: Package, label: "Products", href: "/admin/products" },
  { icon: Folder, label: "Categories", href: "/admin/categories" },
  { icon: Image, label: "Banners", href: "/admin/banners" },
  { icon: Users, label: "Users", href: "/admin/users" },
  { icon: ShoppingCart, label: "Orders", href: "/admin/orders" },
  { icon: User, label: "Customers", href: "/admin/customers" },
  { icon: Star, label: "Reviews", href: "/admin/reviews" },
  { icon: Settings, label: "Settings", href: "/admin/settings" },
];

export default function AdminHeader() {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { admin, loading: authLoading, logout } = useAdminAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/admin/logout", {
        method: "POST",
      });
      if (res.ok) {
        window.location.href = "/admin/login";
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const isActive = (href) => {
    if (!mounted) return false;
    return pathname === href;
  };

  return (
    <>
      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 bg-[#3b1f0f] text-white z-50">
        <div className="flex items-center justify-between px-4 py-3">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 rounded-md hover:bg-[#5a2a0f]"
          >
            <Menu className="w-6 h-6" />
          </button>
          <h1 className="text-lg font-semibold">Beaulii Admin</h1>
          <div className="w-10" />
        </div>
      </header>

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar - Left positioned */}
      <aside className={`
        fixed top-0 left-0 h-full w-64 bg-[#3b1f0f] text-white z-50
        transform transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0
      `}>
        <div className="flex flex-col h-full pt-14 lg:pt-0">
          {/* Logo & User Info */}
          <div className="px-4 py-5 border-b border-[#5a2a0f]">
            <Link href="/admin/dashboard" className="text-xl font-bold text-pink-400">
              Beaulii Admin
            </Link>
            <p className="text-xs text-gray-400 mt-1">Admin Panel</p>
            
            {/* User Info Section */}
            {admin && (
              <div className="mt-4 pt-4 border-t border-[#5a2a0f]">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-2 w-full text-left"
                >
                  <div className="w-8 h-8 rounded-full bg-[#5a2a0f] flex items-center justify-center">
                    {admin.firstName ? (
                      <span className="text-xs font-medium">
                        {admin.firstName.charAt(0)}{admin.lastName ? admin.lastName.charAt(0) : ''}
                      </span>
                    ) : (
                      <User className="w-4 h-4" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate">
                      {admin.firstName || admin.email}
                    </p>
                    <p className="text-xs text-gray-400 truncate">
                      {admin.role === 'SUPER_ADMIN' ? 'Super Admin' : admin.role === 'ADMIN' ? 'Admin' : 'Staff'}
                    </p>
                  </div>
                  <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${showUserMenu ? 'rotate-180' : ''}`} />
                </button>
                
                {/* User Dropdown Menu */}
                {showUserMenu && (
                  <div className="mt-2 py-2 bg-[#2a150a] rounded-lg">
                    <div className="px-2 py-1">
                      <p className="text-xs text-gray-400">Email</p>
                      <p className="text-sm text-white truncate">{admin.email}</p>
                    </div>
                    {admin.firstName && (
                      <div className="px-2 py-1">
                        <p className="text-xs text-gray-400">Name</p>
                        <p className="text-sm text-white">
                          {admin.firstName} {admin.lastName || ''}
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Navigation Menu */}
          <nav className="flex-1 px-3 py-4 overflow-y-auto">
            <ul className="space-y-1">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => setIsSidebarOpen(false)}
                      className={`
                        flex items-center gap-3 px-3 py-2.5 rounded-lg
                        transition-colors duration-200
                        ${active 
                          ? 'bg-[#5a2a0f] text-white' 
                          : 'text-gray-300 hover:bg-[#5a2a0f]/50'
                        }
                      `}
                    >
                      <Icon className="w-5 h-5" />
                      <span>{item.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Logout Button */}
          <div className="px-3 py-4 border-t border-[#5a2a0f]">
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-red-400 hover:bg-red-500/10 transition-colors duration-200"
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* Close button for mobile */}
        <button
          onClick={() => setIsSidebarOpen(false)}
          className="lg:hidden absolute top-4 right-4 p-2 rounded-md hover:bg-[#5a2a0f]"
        >
          <X className="w-5 h-5" />
        </button>
      </aside>

      {/* Spacer for mobile header */}
      <div className="lg:hidden h-14" />
    </>
  );
}
