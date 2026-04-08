"use client";

import { useState, useEffect } from "react";
import ProductCard from "@/components/ProductCard";

// Helper to get image URL
const getImageUrl = (path) => {
  if (!path) return "/images/placeholder.jpg";
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }
  if (path.startsWith('/images/') || path.startsWith('images/')) {
    return path.startsWith('/') ? path : `/${path}`;
  }
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  const cdnPath = cleanPath.startsWith('cdn/') ? cleanPath : `cdn/${cleanPath}`;
  return `${baseUrl}/${cdnPath}`;
};

// Default fallback products
const getDefaultProducts = (category) => {
  const products = [];
  const count = category === "bestseller" ? 15 : category === "new-arrival" ? 15 : 15;
  
  for (let i = 1; i <= count; i++) {
    products.push({
      id: i,
      slug: `product-${i}`,
      title: category === "bestseller" 
        ? `Bestseller Product ${i}` 
        : category === "new-arrival" 
          ? `New Arrival Product ${i}` 
          : `Combo Deal Product ${i}`,
      shortDescription: category === "bestseller"
        ? "90% saw visible results in 28 Days"
        : category === "new-arrival"
          ? "Newly Launched Premium Formula"
          : "Best Value Combo Offer",
      price: category === "bestseller" ? "3999.00" : category === "new-arrival" ? "1999.00" : "2999.00",
      oldPrice: category === "bestseller" ? "5449.00" : category === "new-arrival" ? "2999.00" : "4999.00",
      discount: category === "bestseller" ? 32 : category === "new-arrival" ? 25 : 40,
      image: getImageUrl(`/images/bestsellers/${(i % 4) + 1}.webp`),
    });
  }
  return products;
};

export default function ProductsGrid({ category, type }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        
        // Build query params
        const params = new URLSearchParams();
        if (category) {
          params.append("category", category);
        }
        if (type) {
          params.append("type", type);
        }
        
        const response = await fetch(`/api/products?${params.toString()}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        
        const data = await response.json();
        
        if (data.products && data.products.length > 0) {
          // Transform API products to match ProductCard format
          const transformedProducts = data.products.map(product => ({
            id: product.id,
            slug: product.slug,
            title: product.title,
            subtitle: product.shortDescription || "",
            oldPrice: product.oldPrice || "",
            newPrice: product.price,
            discount: product.discount || 0,
            image: product.image ? getImageUrl(product.image) : getImageUrl("/images/bestsellers/1.webp"),
          }));
          setProducts(transformedProducts);
        } else {
          // Use default fallback products
          setProducts(getDefaultProducts(type || category));
        }
      } catch (err) {
        console.error('Error fetching products:', err);
        setError(err.message);
        // Fallback to default products on error
        setProducts(getDefaultProducts(type || category));
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category, type]);

  if (loading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="bg-white rounded-lg border border-[#e5ddd5] overflow-hidden">
            <div className="relative w-full h-40 sm:h-56 bg-gray-200 animate-pulse"></div>
            <div className="px-3 py-3 sm:px-5 sm:py-4">
              <div className="h-4 bg-gray-200 rounded animate-pulse mb-2"></div>
              <div className="h-3 bg-gray-200 rounded animate-pulse mb-3"></div>
              <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <>
      {/* PRODUCT GRID */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {products.map((product, index) => (
          <ProductCard key={product.id || index} {...product} />
        ))}
      </div>
      
      {/* EMPTY STATE */}
      {products.length === 0 && !loading && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No products found</p>
        </div>
      )}
    </>
  );
}
