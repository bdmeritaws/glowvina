import ProductsGrid from "@/components/ProductsGrid";
import { prisma } from "@/lib/prisma";

export async function generateMetadata({ params }) {
  const { type } = await params;
  return {
    title: `${type.replace("-", " ").toUpperCase()} - Beaulii`,
  };
}

export default async function ProductPage({ params }) {
  const { type } = await params;

  const category = await prisma.category.findUnique({
    where: { slug: type, isActive: true },
  });

  if (category) {
    return (
      <section className="bg-[#f4f1ee] min-h-screen pt-24">

        {/* 🔥 CATEGORY HERO (DATA USED PROPERLY) */}
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 py-10 grid md:grid-cols-2 gap-6 items-center">

            {/* LEFT CONTENT */}
            <div>
              <h1 className="text-3xl md:text-5xl font-bold text-[#5a2a0f]">
                {category.name}
              </h1>

              {category.description && (
                <p className="mt-4 text-gray-600 leading-relaxed">
                  {category.description}
                </p>
              )}

              {/* SMALL INFO BADGE */}
              <div className="mt-4 flex gap-3 text-sm">
                <span className="bg-[#5a2a0f]/10 text-[#5a2a0f] px-3 py-1 rounded-full">
                  Premium Quality
                </span>
                <span className="bg-gray-100 px-3 py-1 rounded-full">
                  Fast Delivery
                </span>
              </div>
            </div>

            {/* RIGHT SIDE (STATIC VISUAL BLOCK) */}
            <div className="hidden md:block bg-[#eaddd1] rounded-xl h-40 flex items-center justify-center text-[#5a2a0f] font-semibold">
              {category.name} Collection
            </div>

          </div>
        </div>

        {/* 🔥 CONTROL BAR */}
        <div className="bg-white border-b sticky top-20 z-10">
          <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3">

            {/* LEFT INFO */}
            <div className="text-sm text-gray-600">
              Explore all {category.name} products
            </div>

            {/* RIGHT ACTIONS */}
            <div className="flex flex-wrap gap-2 text-sm">

              <button className="px-4 py-1.5 border rounded-md hover:bg-gray-100">
                Availability
              </button>

              <button className="px-4 py-1.5 border rounded-md hover:bg-gray-100">
                Price
              </button>

              <button className="px-4 py-1.5 border rounded-md hover:bg-gray-100">
                Sort: Featured
              </button>

            </div>

          </div>
        </div>

        {/* 🔥 MAIN CONTENT */}
        <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-12 gap-6">

          {/* SIDEBAR (STRUCTURED FILTER) */}
          <aside className="col-span-12 md:col-span-3">

            <div className="bg-white border rounded-xl p-5 space-y-6">

              {/* CATEGORY INFO */}
              <div>
                <h3 className="font-semibold text-[#5a2a0f] mb-2">
                  About {category.name}
                </h3>
                <p className="text-sm text-gray-500 line-clamp-4">
                  {category.description || "No description available."}
                </p>
              </div>

              {/* FILTER BLOCK */}
              <div>
                <h4 className="font-medium text-gray-700 mb-2">Filters</h4>

                <div className="space-y-2 text-sm">
                  <button className="block w-full text-left hover:text-black text-gray-600">
                    In Stock
                  </button>
                  <button className="block w-full text-left hover:text-black text-gray-600">
                    Price Range
                  </button>
                </div>
              </div>

            </div>

          </aside>

          {/* PRODUCT AREA */}
          <main className="col-span-12 md:col-span-9">

            {/* TITLE ROW */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-800">
                All Products
              </h2>
            </div>

            {/* PRODUCT GRID */}
            <ProductsGrid category={type} type={null} />

          </main>

        </div>

      </section>
    );
  }

  // ===== FALLBACK SAME LOGIC =====
  const getCategoryParams = (productType) => {
    switch (productType) {
      case "bestseller":
      case "bestsellers":
        return { type: "SINGLE", category: "bestseller" };
      case "new-arrival":
      case "new-arrivals":
        return { type: "SINGLE", category: "new-arrival" };
      case "combo":
        return { type: "COMBO", category: "combo" };
      case "single-products":
        return { type: "SINGLE", category: "single-products" };
      case "combo-products":
        return { type: "COMBO", category: "combo-products" };
      case "pack-products":
        return { type: "PACK", category: "pack-products" };
      default:
        return { type: "SINGLE", category: productType };
    }
  };

  const { category: cat, type: productType } = getCategoryParams(type);

  const hasValidCategory = await prisma.category.findUnique({
    where: { slug: type, isActive: true },
    select: { id: true },
  });

  if (!type) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl font-semibold">
        Category not found
      </div>
    );
  }

  return (
    <section className="bg-[#f4f1ee] min-h-screen pt-24">

      {/* SIMPLE HEADER */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-[#5a2a0f]">
            {type.replace("-", " ").toUpperCase()}
          </h1>
        </div>
      </div>

      {/* GRID */}
      <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-12 gap-6">

        <aside className="col-span-12 md:col-span-3 bg-white border rounded-xl p-5">
          Filters
        </aside>

        <main className="col-span-12 md:col-span-9">
          <ProductsGrid category={hasValidCategory ? cat : null} type={productType} />
        </main>

      </div>

    </section>
  );
}