export default function AdminFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-200 px-6 py-4">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
        <p className="text-sm text-gray-500">
          © {currentYear} Beaulii. All rights reserved.
        </p>
        <div className="flex items-center gap-4 text-sm text-gray-500">
          <span>Admin Panel v1.0</span>
          <span className="hidden sm:inline">•</span>
          <span>Powered by Next.js</span>
        </div>
      </div>
    </footer>
  );
}
