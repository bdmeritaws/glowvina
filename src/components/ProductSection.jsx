import ProductCard from "./ProductCard";
import Link from "next/link";

export default function ProductSection({ title, products: externalProducts, type }) {
  if (!externalProducts || externalProducts.length === 0) {
    return null;
  }

  const displayProducts = externalProducts.map((p) => ({
    image: p.image,
    title: p.title,
    subtitle: p.shortDescription || "",
    oldPrice: p.oldPrice || "",
    newPrice: p.price,
    discount: p.discount || 0,
    slug: p.slug,
  }));

  const getSectionSlug = () => {
    if (type) return type;
    return title.toLowerCase().replace(/\s+/g, "-");
  };

  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* HEADING */}
        <div className="flex flex-col sm:flex-row items-center justify-between mb-10 gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
              {title}
            </h2>
            <div className="h-1 w-16 bg-orange-500 mt-2 rounded-full"></div>
          </div>

          <Link
            href={`/products/${getSectionSlug()}`}
            className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-orange-600 transition"
          >
            View All <span className="text-lg">&rarr;</span>
          </Link>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {displayProducts.map((product, index) => (
            <ProductCard key={index} {...product} />
          ))}
        </div>

      </div>
    </section>
  );
}