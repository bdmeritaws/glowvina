import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// CDN Path Configuration
// In database, we store relative paths like "products/image.webp" or "bestsellers/1.webp"
// The getImageUrl() function in src/lib/cdn.js will add the base URL

// Available image mappings from public/images folder
const imageMap = {
  // Main products
  "products/1.webp": "products/vitamin-c-serum.webp",
  "products/2.webp": "products/moisturizing-cream.webp",
  // Bestsellers
  "bestsellers/1.webp": "products/anti-aging-combo.webp",
  "bestsellers/2.webp": "products/stretch-marks-cream.webp",
  "bestsellers/3.webp": "products/sunscreen-spf50.webp",
  "bestsellers/4.webp": "products/hair-growth-serum.webp",
  // Categories
  "categories/1.webp": "categories/skincare.webp",
  "categories/2.webp": "categories/hair-care.webp",
  "categories/3.webp": "categories/body-care.webp",
  "categories/4.webp": "categories/sun-care.webp",
  "categories/5.webp": "categories/anti-aging.webp",
};

// Helper to get CDN path (relative path that works with getImageUrl utility)
function getCdnPath(originalPath) {
  // Map old paths to new CDN structure
  const mappedPath = imageMap[originalPath] || originalPath;
  return mappedPath;
}

const categories = [
  { name: "Skincare", slug: "skincare", description: "Premium skincare products for healthy, glowing skin", image: getCdnPath("categories/1.webp") },
  { name: "Hair Care", slug: "hair-care", description: "Professional hair care products for all hair types", image: getCdnPath("categories/2.webp") },
  { name: "Body Care", slug: "body-care", description: "Body care essentials for soft, smooth skin", image: getCdnPath("categories/3.webp") },
  { name: "Sun Care", slug: "sun-care", description: "Sun protection products for safe sun exposure", image: getCdnPath("categories/4.webp") },
  { name: "Anti-Aging", slug: "anti-aging", description: "Anti-aging solutions for youthful appearance", image: getCdnPath("categories/5.webp") },
];

const products = [
  {
    title: "Beaulii Vitamin C Brightening Serum",
    slug: "beaulii-vitamin-c-brightening-serum",
    description: "A powerful vitamin C serum that brightens skin, reduces dark spots, and provides antioxidant protection. Formulated with 20% Vitamin C, Vitamin E, and Hyaluronic Acid for radiant, glowing skin.",
    shortDescription: "Brightening serum with 20% Vitamin C",
    price: 1499,
    oldPrice: 1999,
    mrp: 2249,
    discount: 25,
    sku: "BEA-VCS-001",
    stockQuantity: 100,
    isInStock: true,
    skinType: "All Skin Types",
    concern: "Dark Spots, Uneven Tone, Dullness",
    ingredient: "Water, Ascorbic Acid (20%), Tocopherol (Vitamin E), Sodium Hyaluronate, Niacinamide, Aloe Vera Extract, Glycerin",
    howToUse: "Apply 3-4 drops to clean face morning and evening. Follow with moisturizer. Always use sunscreen during the day.",
    resultClaim: "Visible Brightening in 14 Days",
    badges: JSON.stringify(["Dermatologically Tested", "SLS & Paraben Free", "Vegan", "Cruelty Free"]),
    thumbnail: getCdnPath("products/1.webp"),
    videoUrl: "https://www.youtube.com/watch?v=example1",
    isFeatured: true,
    productType: "SINGLE",
    isActive: true,
    categorySlug: "skincare",
  },
  {
    title: "Beaulii Hydrating Moisturizing Cream",
    slug: "beaulii-hydrating-moisturizing-cream",
    description: "Deeply hydrating moisturizer with Hyaluronic Acid and Ceramides. Provides 24-hour hydration and strengthens skin barrier.",
    shortDescription: "24-hour hydration with Hyaluronic Acid",
    price: 899,
    oldPrice: 1299,
    mrp: 1449,
    discount: 31,
    sku: "BEA-HMC-001",
    stockQuantity: 150,
    isInStock: true,
    skinType: "Dry, Normal, Combination",
    concern: "Dryness, Dehydration, Dullness",
    ingredient: "Water, Hyaluronic Acid, Ceramide NP, Ceramide AP, Ceramide EOP, Shea Butter, Squalane, Glycerin",
    howToUse: "Apply generously to face and body after cleansing. Use morning and night.",
    resultClaim: "Deep Hydration in 7 Days",
    badges: JSON.stringify(["Hydrating", "Non-Greasy", "Fast Absorbing"]),
    thumbnail: getCdnPath("products/2.webp"),
    isFeatured: true,
    productType: "SINGLE",
    isActive: true,
    categorySlug: "skincare",
  },
  {
    title: "Beaulii Anti-Aging Complete Skincare Combo",
    slug: "beaulii-anti-aging-complete-skincare-combo",
    description: "A complete anti-aging skincare regimen including Vitamin C Serum, Retinol Night Cream, and Eye Cream. Reduces fine lines, wrinkles, and restores youthful glow.",
    shortDescription: "Complete anti-aging skincare set",
    price: 3499,
    oldPrice: 4999,
    mrp: 5499,
    discount: 30,
    sku: "BEA-ANTI-AGING-COMBO",
    stockQuantity: 50,
    isInStock: true,
    skinType: "Mature Skin, All Skin Types",
    concern: "Fine Lines, Wrinkles, Loss of Elasticity",
    badges: JSON.stringify(["Dermatologically Tested", "FDA Certified", "Anti-Aging Award 2024"]),
    thumbnail: getCdnPath("bestsellers/1.webp"),
    isFeatured: true,
    productType: "COMBO",
    isActive: true,
    categorySlug: "anti-aging",
  },
  {
    title: "Beaulii Stretch Marks Removal Cream",
    slug: "beaulii-stretch-marks-removal-cream",
    description: "Advanced stretch marks treatment cream with Bio-Oil, Almond Oil, and Vitamin E. Clinically proven to reduce stretch marks visibility by 80% in 8 weeks.",
    shortDescription: "Effective stretch marks reduction cream",
    price: 899,
    oldPrice: 1299,
    mrp: 1449,
    discount: 31,
    sku: "BEA-STM-001",
    stockQuantity: 200,
    isInStock: true,
    skinType: "All Skin Types",
    concern: "Stretch Marks, Skin Elasticity",
    ingredient: "Purified Water, Almond Oil, Vitamin E, Bio-Oil, Cocoa Butter, Shea Butter, Collagen, Centella Asiatica",
    howToUse: "Apply twice daily on affected areas. Massage in circular motions for 5 minutes. Use consistently for best results.",
    resultClaim: "80% Reduction in 8 Weeks",
    badges: JSON.stringify(["Dermatologically Tested", "SLS Free", "Non-Greasy", "Fast Absorbing"]),
    thumbnail: getCdnPath("bestsellers/2.webp"),
    isFeatured: false,
    productType: "SINGLE",
    isActive: true,
    categorySlug: "body-care",
  },
  {
    title: "Beaulii Sunscreen SPF 50 PA+++",
    slug: "beaulii-sunscreen-spf-50",
    description: "Broad spectrum sunscreen with SPF 50 and PA+++ protection. Lightweight, non-sticky formula that absorbs quickly without white cast.",
    shortDescription: "SPF 50+ broad spectrum protection",
    price: 599,
    oldPrice: 899,
    mrp: 999,
    discount: 33,
    sku: "BEA-SPF-001",
    stockQuantity: 300,
    isInStock: true,
    skinType: "All Skin Types",
    concern: "Sun Protection, UV Damage, Dark Spots",
    ingredient: "Zinc Oxide, Titanium Dioxide, Niacinamide, Vitamin E, Aloe Vera, Green Tea Extract",
    howToUse: "Apply generously 15 minutes before sun exposure. Reapply every 2 hours when outdoors.",
    resultClaim: "Complete UV Protection",
    badges: JSON.stringify(["Water Resistant", "Non-Comedogenic", "Dermatologically Tested"]),
    thumbnail: getCdnPath("bestsellers/3.webp"),
    isFeatured: true,
    productType: "SINGLE",
    isActive: true,
    categorySlug: "sun-care",
  },
  {
    title: "Beaulii Hair Growth Serum",
    slug: "beaulii-hair-growth-serum",
    description: "Advanced hair growth serum with Minoxidil, Biotin, and Caffeine. Stimulates hair follicles and promotes healthy hair growth.",
    shortDescription: "Hair growth stimulating serum",
    price: 1199,
    oldPrice: 1699,
    mrp: 1899,
    discount: 29,
    sku: "BEA-HGS-001",
    stockQuantity: 80,
    isInStock: true,
    skinType: "All Hair Types",
    concern: "Hair Loss, Thinning, Slow Growth",
    ingredient: "Minoxidil 5%, Biotin, Caffeine, Saw Palmetto, Niacin, Vitamin E, Argan Oil",
    howToUse: "Apply 1ml to scalp twice daily. Massage gently. Do not rinse. Use consistently for 3 months.",
    resultClaim: "Visible Growth in 60 Days",
    badges: JSON.stringify(["SLS Free", "Sulfate Free", "Dermatologically Tested"]),
    thumbnail: getCdnPath("bestsellers/4.webp"),
    isFeatured: false,
    productType: "SINGLE",
    isActive: true,
    categorySlug: "hair-care",
  },
  {
    title: "Beaulii Retinol Night Cream",
    slug: "beaulii-retinol-night-cream",
    description: "Powerful anti-aging night cream with 0.5% Retinol. Reduces wrinkles, fine lines, and improves skin texture while you sleep.",
    shortDescription: "Anti-aging night cream with Retinol",
    price: 1299,
    oldPrice: 1799,
    mrp: 1999,
    discount: 28,
    sku: "BEA-RNC-001",
    stockQuantity: 75,
    isInStock: true,
    skinType: "All Skin Types",
    concern: "Wrinkles, Fine Lines, Aging",
    ingredient: "Retinol 0.5%, Peptides, Hyaluronic Acid, Vitamin E, Shea Butter, Squalane",
    howToUse: "Apply a pea-sized amount to clean face at night. Start with every other night. Follow with moisturizer.",
    resultClaim: "Reduced Wrinkles in 28 Days",
    badges: JSON.stringify(["Dermatologically Tested", "Night Treatment", "Anti-Aging"]),
    thumbnail: getCdnPath("products/1.webp"),
    isFeatured: true,
    productType: "SINGLE",
    isActive: true,
    categorySlug: "anti-aging",
  },
  {
    title: "Beaulii Kojic Acid Dark Circle Cream",
    slug: "beaulii-kojic-acid-dark-circle-cream",
    description: "Brightening under-eye cream with Kojic Acid and Vitamin C. Reduces dark circles, puffiness, and brightens the under-eye area.",
    shortDescription: "Brightening eye cream for dark circles",
    price: 749,
    oldPrice: 999,
    mrp: 1149,
    discount: 25,
    sku: "BEA-KDC-001",
    stockQuantity: 120,
    isInStock: true,
    skinType: "All Skin Types",
    concern: "Dark Circles, Puffiness, Dullness",
    ingredient: "Kojic Acid, Vitamin C, Caffeine, Hyaluronic Acid, Peptides, Cucumber Extract",
    howToUse: "Apply a small amount around the eye area morning and night. Gently tap with ring finger.",
    resultClaim: "Brighter Eyes in 14 Days",
    badges: JSON.stringify(["Dermatologically Tested", "Fragrance Free", "Ophthalmologist Tested"]),
    thumbnail: getCdnPath("products/2.webp"),
    isFeatured: false,
    productType: "SINGLE",
    isActive: true,
    categorySlug: "skincare",
  },
  {
    title: "Beaulii Body Lotion - Shea Butter & Vitamin E",
    slug: "beaulii-body-lotion-shea-butter",
    description: "Rich body lotion with Shea Butter and Vitamin E. Provides deep moisturization and leaves skin soft, smooth, and radiant.",
    shortDescription: "Deep moisturizing body lotion",
    price: 499,
    oldPrice: 699,
    mrp: 799,
    discount: 29,
    sku: "BEA-BL-001",
    stockQuantity: 250,
    isInStock: true,
    skinType: "All Skin Types",
    concern: "Dryness, Rough Texture, Dullness",
    ingredient: "Shea Butter, Vitamin E, Aloe Vera, Glycerin, Coconut Oil, Almond Oil",
    howToUse: "Apply all over body after bath. Massage until absorbed. Use twice daily.",
    resultClaim: "Soft, Smooth Skin in 7 Days",
    badges: JSON.stringify(["Long Lasting Moisture", "Non-Sticky", "Dermatologically Tested"]),
    thumbnail: getCdnPath("bestsellers/1.webp"),
    isFeatured: false,
    productType: "SINGLE",
    isActive: true,
    categorySlug: "body-care",
  },
  {
    title: "Beaulii Hair Fall Control Shampoo",
    slug: "beaulii-hair-fall-control-shampoo",
    description: "Anti-hair fall shampoo with Biotin, Keratin, and Argan Oil. Strengthens hair roots and reduces hair fall by 80%.",
    shortDescription: "Anti-hair fall strengthening shampoo",
    price: 449,
    oldPrice: 649,
    mrp: 749,
    discount: 31,
    sku: "BEA-HF-001",
    stockQuantity: 180,
    isInStock: true,
    skinType: "All Hair Types",
    concern: "Hair Fall, Thinning, Weak Hair",
    ingredient: "Biotin, Keratin, Argan Oil, Vitamin E, Aloe Vera, Saw Palmetto",
    howToUse: "Apply to wet hair, massage gently, leave for 2 minutes, rinse. Follow with conditioner.",
    resultClaim: "80% Less Hair Fall",
    badges: JSON.stringify(["SLS Free", "Sulfate Free", "Dermatologically Tested"]),
    thumbnail: getCdnPath("bestsellers/2.webp"),
    isFeatured: true,
    productType: "SINGLE",
    isActive: true,
    categorySlug: "hair-care",
  },
  {
    title: "Beaulii Vitamin C Face Wash",
    slug: "beaulii-vitamin-c-face-wash",
    description: "Gentle face wash with Vitamin C and Mulberry Extract. Brightens skin, removes impurities, and evens skin tone.",
    shortDescription: "Brightening vitamin C face wash",
    price: 399,
    oldPrice: 549,
    mrp: 629,
    discount: 27,
    sku: "BEA-VCFW-001",
    stockQuantity: 200,
    isInStock: true,
    skinType: "All Skin Types",
    concern: "Dullness, Uneven Tone, Dark Spots",
    ingredient: "Vitamin C, Mulberry Extract, Glycolic Acid, Aloe Vera, Glycerin",
    howToUse: "Apply to damp face, massage gently, rinse with water. Use twice daily.",
    resultClaim: "Radiant Skin in 7 Days",
    badges: JSON.stringify(["Gentle Formula", "pH Balanced", "Dermatologically Tested"]),
    thumbnail: getCdnPath("products/1.webp"),
    isFeatured: false,
    productType: "SINGLE",
    isActive: true,
    categorySlug: "skincare",
  },
  {
    title: "Beaulii Under Eye Cream with Cucumber Extract",
    slug: "beaulii-under-eye-cream-cucumber",
    description: "Soothing under-eye cream with Cucumber Extract and Caffeine. Reduces puffiness, dark circles, and refreshes tired eyes.",
    shortDescription: "Soothing under-eye cream",
    price: 599,
    oldPrice: 849,
    mrp: 949,
    discount: 29,
    sku: "BEA-UEC-001",
    stockQuantity: 100,
    isInStock: true,
    skinType: "All Skin Types",
    concern: "Puffiness, Dark Circles, Tired Eyes",
    ingredient: "Cucumber Extract, Caffeine, Hyaluronic Acid, Vitamin E, Peptides, Green Tea Extract",
    howToUse: "Apply around eyes morning and night. Gently pat with ring finger.",
    resultClaim: "Refreshed Eyes in 14 Days",
    badges: JSON.stringify(["Cooling Effect", "Dermatologically Tested", "Fragrance Free"]),
    thumbnail: getCdnPath("products/2.webp"),
    isFeatured: false,
    productType: "SINGLE",
    isActive: true,
    categorySlug: "skincare",
  },
  {
    title: "Beaulii Complete Hair Care Combo",
    slug: "beaulii-complete-hair-care-combo",
    description: "Complete hair care set including Shampoo, Conditioner, Hair Serum, and Hair Mask. Transform your hair in 30 days.",
    shortDescription: "Complete hair transformation set",
    price: 1499,
    oldPrice: 2199,
    mrp: 2499,
    discount: 32,
    sku: "BEA-HAIR-COMBO-001",
    stockQuantity: 60,
    isInStock: true,
    skinType: "All Hair Types",
    concern: "Hair Fall, Dryness, Frizz, Damage",
    badges: JSON.stringify(["Complete Care", "Sulfate Free", "Natural Ingredients"]),
    thumbnail: getCdnPath("bestsellers/3.webp"),
    isFeatured: true,
    productType: "COMBO",
    isActive: true,
    categorySlug: "hair-care",
  },
  {
    title: "Beaulii Niacinamide 10% Serum",
    slug: "beaulii-niacinamide-10-serum",
    description: "Advanced serum with 10% Niacinamide and 1% Zinc. Controls oil production, minimizes pores, and treats acne.",
    shortDescription: "Oil control & pore minimizing serum",
    price: 799,
    oldPrice: 1099,
    mrp: 1249,
    discount: 27,
    sku: "BEA-N10-001",
    stockQuantity: 90,
    isInStock: true,
    skinType: "Oily, Combination, Acne Prone",
    concern: "Acne, Oily Skin, Large Pores",
    ingredient: "Niacinamide 10%, Zinc PCA 1%, Hyaluronic Acid, Aloe Vera, Green Tea Extract",
    howToUse: "Apply 3-4 drops after cleansing. Follow with moisturizer. Use morning and night.",
    resultClaim: "Clear Skin in 21 Days",
    badges: JSON.stringify(["Oil Control", "Non-Comedogenic", "Dermatologically Tested"]),
    thumbnail: getCdnPath("bestsellers/4.webp"),
    isFeatured: true,
    productType: "SINGLE",
    isActive: true,
    categorySlug: "skincare",
  },
  {
    title: "Beaulii Body Scrub - Coffee & Coconut",
    slug: "beaulii-body-scrub-coffee-coconut",
    description: "Exfoliating body scrub with Coffee and Coconut Oil. Removes dead skin cells, improves circulation, and leaves skin glowing.",
    shortDescription: "Exfoliating coffee scrub",
    price: 549,
    oldPrice: 799,
    mrp: 899,
    discount: 31,
    sku: "BEA-BS-001",
    stockQuantity: 140,
    isInStock: true,
    skinType: "All Skin Types",
    concern: "Dead Skin, Dullness, Rough Texture",
    ingredient: "Coffee Powder, Coconut Oil, Sugar, Shea Butter, Vitamin E, Almond Oil",
    howToUse: "Apply to damp body, massage in circular motions, rinse. Use 2-3 times per week.",
    resultClaim: "Glowing Skin in 14 Days",
    badges: JSON.stringify(["Natural Exfoliant", "Dermatologically Tested", "Cruelty Free"]),
    thumbnail: getCdnPath("bestsellers/1.webp"),
    isFeatured: false,
    productType: "SINGLE",
    isActive: true,
    categorySlug: "body-care",
  },
];

async function main() {
  console.log("🌱 Starting seed with CDN-compatible paths...");
  console.log("📁 Image paths will work with getImageUrl() utility");

  // Create categories first
  console.log("📁 Creating categories...");
  const createdCategories = {};
  
  for (const cat of categories) {
    const category = await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {},
      create: cat,
    });
    createdCategories[cat.slug] = category;
    console.log(`  Created category: ${category.name}`);
    console.log(`    Image: ${category.image}`);
  }

  // Create products
  console.log("📦 Creating products with CDN paths...");
  
  for (const product of products) {
    const { categorySlug, images, variants, ...productData } = product;
    
    const createdProduct = await prisma.product.upsert({
      where: { slug: product.slug },
      update: {},
      create: {
        ...productData,
        categories: {
          create: {
            categoryId: createdCategories[categorySlug]?.id,
          },
        },
        images: {
          create: [
            { url: productData.thumbnail, altText: productData.title, isPrimary: true, sortOrder: 0 },
          ],
        },
      },
    });
    
    console.log(`  Created: ${createdProduct.title}`);
    console.log(`    Thumbnail: ${createdProduct.thumbnail}`);
  }

  console.log("✅ Seed completed!");
  console.log("\n📋 How to use images in your app:");
  console.log("   1. Use getImageUrl() from '@/lib/cdn'");
  console.log("   2. Example: <Image src={getImageUrl(product.thumbnail)} />");
  console.log("   3. In .env.local, set NEXT_PUBLIC_IMAGE_BASE_URL=http://localhost:3000");
  console.log("   4. For production, set NEXT_PUBLIC_IMAGE_BASE_URL=https://beaulli.com");
}

main()
  .catch((e) => {
    console.error("❌ Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
