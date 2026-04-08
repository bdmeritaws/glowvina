import "@/app/globals.css";
import AdminLayoutWrapper from "@/components/admin/AdminLayoutWrapper";

export const metadata = {
  title: "Beaulii Admin Panel",
  description: "Beaulii e-commerce admin panel",
};

export default function AdminLayout({ children }) {
  return (
    <html lang="en" className="overflow-x-hidden" suppressHydrationWarning>
      <body 
        suppressHydrationWarning
        className="antialiased overflow-x-hidden bg-gray-50"
      >
        <AdminLayoutWrapper>
          {children}
        </AdminLayoutWrapper>
      </body>
    </html>
  );
}
