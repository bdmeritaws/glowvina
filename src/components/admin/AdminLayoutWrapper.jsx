"use client";

import { usePathname } from "next/navigation";
import AdminHeader from "./AdminHeader";
import AdminFooter from "./AdminFooter";

export default function AdminLayoutWrapper({ children }) {
  const pathname = usePathname();
  
  // Don't show admin layout on login page
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen">
      <AdminHeader />
      <div className="flex-1 flex flex-col lg:ml-64">
        <main className="flex-1 p-4 lg:p-6 admin-content">
          {children}
        </main>
        <AdminFooter />
      </div>
    </div>
  );
}
