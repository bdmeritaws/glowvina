-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 09, 2026 at 01:26 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `beaulii`
--

-- --------------------------------------------------------

--
-- Table structure for table `address`
--

CREATE TABLE `address` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `firstName` varchar(100) NOT NULL,
  `lastName` varchar(100) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `address` text NOT NULL,
  `city` varchar(100) NOT NULL,
  `state` varchar(100) DEFAULT NULL,
  `zipCode` varchar(20) NOT NULL,
  `country` varchar(100) NOT NULL,
  `addressType` enum('SHIPPING','BILLING') NOT NULL DEFAULT 'SHIPPING',
  `isDefault` tinyint(1) NOT NULL DEFAULT 0,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `banner`
--

CREATE TABLE `banner` (
  `id` int(11) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `subtitle` varchar(500) DEFAULT NULL,
  `image` text NOT NULL,
  `mobileImage` text DEFAULT NULL,
  `link` varchar(500) DEFAULT NULL,
  `linkText` varchar(100) DEFAULT NULL,
  `position` enum('HERO','POPUP','SIDEBAR','BANNER_1','BANNER_2','BANNER_3') NOT NULL DEFAULT 'HERO',
  `isActive` tinyint(1) NOT NULL DEFAULT 1,
  `sortOrder` int(11) NOT NULL DEFAULT 0,
  `startsAt` datetime(3) DEFAULT NULL,
  `expiresAt` datetime(3) DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `banner`
--

INSERT INTO `banner` (`id`, `title`, `subtitle`, `image`, `mobileImage`, `link`, `linkText`, `position`, `isActive`, `sortOrder`, `startsAt`, `expiresAt`, `createdAt`, `updatedAt`) VALUES
(1, 'This First Page Of Banner', 'The quick brown fox jump over the lazy dog', 'banner-image/3a40eb1b-706f-4c30-aa9b-46feb7db0d49.webp', '', 'https://www.facebook.com/nasim.ahmed.71697/', 'Facebook', 'HERO', 1, 0, '2026-04-01 00:00:00.000', '2026-04-30 00:00:00.000', '2026-04-09 09:25:15.293', '2026-04-09 10:11:50.560'),
(2, 'This is second tutorai', 'eque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...\"\n\"There is no one who loves pain itself, who seeks after it and wants to have it, simply because it is pain', 'banner-image/3a84d088-52fe-4746-829e-f9726865e1c8.webp', 'banner-image/141cb0d7-ce71-40ae-a056-800dc8b1cec1.webp', 'https://www.facebook.com/nasim.ahmed.71697/', 'Facebook', 'HERO', 1, 0, '2026-04-01 00:00:00.000', '2026-04-30 00:00:00.000', '2026-04-09 09:38:53.523', '2026-04-09 09:38:53.523');

-- --------------------------------------------------------

--
-- Table structure for table `cart`
--

CREATE TABLE `cart` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cartitem`
--

CREATE TABLE `cartitem` (
  `id` int(11) NOT NULL,
  `cartId` int(11) NOT NULL,
  `productId` int(11) NOT NULL,
  `variantId` int(11) DEFAULT NULL,
  `quantity` int(11) NOT NULL DEFAULT 1,
  `price` decimal(10,2) NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `slug` varchar(191) NOT NULL,
  `description` text DEFAULT NULL,
  `image` text DEFAULT NULL,
  `parentId` int(11) DEFAULT NULL,
  `sortOrder` int(11) NOT NULL DEFAULT 0,
  `isActive` tinyint(1) NOT NULL DEFAULT 1,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`id`, `name`, `slug`, `description`, `image`, `parentId`, `sortOrder`, `isActive`, `createdAt`, `updatedAt`) VALUES
(1, 'Skin Care', 'skin-care', 'skin-care', 'category/20431953-8909-4ac8-800c-c88fac5d83c3.webp', NULL, 0, 1, '2026-04-09 09:39:47.318', '2026-04-09 09:39:47.318'),
(2, 'Eye Care', 'eye-care', 'eye-care', 'category/cd3b9f90-afd5-481b-ae7b-3dd0f3187cc7.webp', NULL, 0, 1, '2026-04-09 09:44:41.062', '2026-04-09 09:44:41.062'),
(3, 'Hair Care', 'hair-care', 'hair-care', 'category/ba91b8ac-11d5-4c45-a52d-3490f0e92e13.webp', NULL, 0, 1, '2026-04-09 09:44:59.254', '2026-04-09 09:44:59.254');

-- --------------------------------------------------------

--
-- Table structure for table `coupon`
--

CREATE TABLE `coupon` (
  `id` int(11) NOT NULL,
  `code` varchar(191) NOT NULL,
  `description` text DEFAULT NULL,
  `discountType` enum('PERCENTAGE','FIXED') NOT NULL DEFAULT 'PERCENTAGE',
  `discountValue` decimal(10,2) NOT NULL,
  `minOrderAmount` decimal(10,2) DEFAULT NULL,
  `maxDiscount` decimal(10,2) DEFAULT NULL,
  `usageLimit` int(11) DEFAULT NULL,
  `usedCount` int(11) NOT NULL DEFAULT 0,
  `perUserLimit` int(11) DEFAULT 1,
  `isActive` tinyint(1) NOT NULL DEFAULT 1,
  `startsAt` datetime(3) NOT NULL,
  `expiresAt` datetime(3) NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL,
  `applicableCategories` text DEFAULT NULL,
  `applicableProducts` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `homesection`
--

CREATE TABLE `homesection` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `sectionKey` varchar(191) NOT NULL,
  `type` enum('PRODUCTS','BANNER','CATEGORIES','REVIEWS','VIDEOS','CUSTOM') NOT NULL DEFAULT 'PRODUCTS',
  `displayOrder` int(11) NOT NULL DEFAULT 0,
  `isActive` tinyint(1) NOT NULL DEFAULT 1,
  `config` text DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `order`
--

CREATE TABLE `order` (
  `id` int(11) NOT NULL,
  `orderNumber` varchar(191) NOT NULL,
  `userId` int(11) DEFAULT NULL,
  `guestEmail` varchar(255) DEFAULT NULL,
  `firstName` varchar(100) NOT NULL,
  `lastName` varchar(100) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `shippingAddressId` int(11) DEFAULT NULL,
  `status` enum('PENDING','CONFIRMED','PROCESSING','SHIPPED','DELIVERED','CANCELLED','REFUNDED','RETURN_REQUESTED','RETURNED') NOT NULL DEFAULT 'PENDING',
  `paymentMethod` enum('CARD','PAYPAL','COD','BANK_TRANSFER','UPI') NOT NULL DEFAULT 'CARD',
  `paymentStatus` enum('PENDING','PROCESSING','COMPLETED','FAILED','REFUNDED','PARTIALLY_REFUNDED') NOT NULL DEFAULT 'PENDING',
  `paymentId` varchar(191) DEFAULT NULL,
  `subtotal` decimal(10,2) NOT NULL,
  `shippingCost` decimal(10,2) NOT NULL DEFAULT 0.00,
  `tax` decimal(10,2) NOT NULL DEFAULT 0.00,
  `discount` decimal(10,2) NOT NULL DEFAULT 0.00,
  `total` decimal(10,2) NOT NULL,
  `customerNote` text DEFAULT NULL,
  `adminNote` text DEFAULT NULL,
  `placedAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `shippedAt` datetime(3) DEFAULT NULL,
  `deliveredAt` datetime(3) DEFAULT NULL,
  `cancelledAt` datetime(3) DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `orderitem`
--

CREATE TABLE `orderitem` (
  `id` int(11) NOT NULL,
  `orderId` int(11) NOT NULL,
  `productId` int(11) NOT NULL,
  `variantId` int(11) DEFAULT NULL,
  `productName` varchar(500) NOT NULL,
  `productImage` text DEFAULT NULL,
  `variantName` varchar(255) DEFAULT NULL,
  `quantity` int(11) NOT NULL,
  `unitPrice` decimal(10,2) NOT NULL,
  `totalPrice` decimal(10,2) NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `orderlog`
--

CREATE TABLE `orderlog` (
  `id` int(11) NOT NULL,
  `orderId` int(11) NOT NULL,
  `status` enum('PENDING','CONFIRMED','PROCESSING','SHIPPED','DELIVERED','CANCELLED','REFUNDED','RETURN_REQUESTED','RETURNED') NOT NULL,
  `note` text DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `id` int(11) NOT NULL,
  `title` varchar(500) NOT NULL,
  `slug` varchar(191) NOT NULL,
  `description` text DEFAULT NULL,
  `shortDescription` varchar(1000) DEFAULT NULL,
  `price` decimal(10,2) NOT NULL,
  `oldPrice` decimal(10,2) DEFAULT NULL,
  `discount` int(11) DEFAULT NULL,
  `mrp` decimal(10,2) DEFAULT NULL,
  `sku` varchar(191) DEFAULT NULL,
  `stockQuantity` int(11) NOT NULL DEFAULT 0,
  `lowStockAlert` int(11) NOT NULL DEFAULT 10,
  `isInStock` tinyint(1) NOT NULL DEFAULT 1,
  `skinType` varchar(100) DEFAULT NULL,
  `concern` varchar(255) DEFAULT NULL,
  `ingredient` text DEFAULT NULL,
  `howToUse` text DEFAULT NULL,
  `resultClaim` varchar(500) DEFAULT NULL,
  `badges` text DEFAULT NULL,
  `thumbnail` text DEFAULT NULL,
  `videoUrl` text DEFAULT NULL,
  `beforeImage` text DEFAULT NULL,
  `afterImage` text DEFAULT NULL,
  `metaTitle` varchar(255) DEFAULT NULL,
  `metaDescription` text DEFAULT NULL,
  `isActive` tinyint(1) NOT NULL DEFAULT 1,
  `isFeatured` tinyint(1) NOT NULL DEFAULT 0,
  `productType` enum('SINGLE','COMBO','PACK') NOT NULL DEFAULT 'SINGLE',
  `averageRating` decimal(3,2) NOT NULL DEFAULT 0.00,
  `totalReviews` int(11) NOT NULL DEFAULT 0,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`id`, `title`, `slug`, `description`, `shortDescription`, `price`, `oldPrice`, `discount`, `mrp`, `sku`, `stockQuantity`, `lowStockAlert`, `isInStock`, `skinType`, `concern`, `ingredient`, `howToUse`, `resultClaim`, `badges`, `thumbnail`, `videoUrl`, `beforeImage`, `afterImage`, `metaTitle`, `metaDescription`, `isActive`, `isFeatured`, `productType`, `averageRating`, `totalReviews`, `createdAt`, `updatedAt`) VALUES
(1, 'Beaulii Vitamin C Brightening Serum', 'beaulii-vitamin-c-brightening-serum', 'A powerful vitamin C serum that brightens skin, reduces dark spots, and provides antioxidant protection. Formulated with 20% Vitamin C, Vitamin E, and Hyaluronic Acid for radiant, glowing skin.', 'Brightening serum with 20% Vitamin C', 1499.00, 1999.00, 25, NULL, 'BEA-VCS-001', 100, 10, 1, 'All Skin Types', 'Dark Spots, Uneven Tone, Dullness', 'Water, Ascorbic Acid (20%), Tocopherol (Vitamin E), Sodium Hyaluronate, Niacinamide, Aloe Vera Extract, Glycerin', 'Apply 3-4 drops to clean face morning and evening. Follow with moisturizer. Always use sunscreen during the day.', 'Visible Brightening in 14 Days', '[\"Dermatologically Tested\\\"\",\"\\\"SLS & Paraben Free\\\"\",\"\\\"Vegan\\\"\",\"\\\"Cruelty Free\"]', 'product-image/6a66aa2e-a81f-4a72-9081-4e46cebbf44e.webp', 'https://www.youtube.com/watch?v=_eegSaPpq2Y&list=RDMM_eegSaPpq2Y&start_radio=1', 'product-image/d4ad9a2e-914f-48c6-b621-7eee341f2ed5.webp', 'product-image/568a7bcd-d74e-40bc-bc25-155d7dd0d0a6.webp', 'cfdf', 'fdsf', 1, 0, 'SINGLE', 0.00, 0, '2026-04-09 10:19:32.657', '2026-04-09 10:19:32.657'),
(3, 'Beaulii Hydrating Moisturizing Cream', 'beaulii-hydrating-moisturizing-cream', 'Deeply hydrating moisturizer with Hyaluronic Acid and Ceramides. Provides 24-hour hydration and strengthens skin barrier.', 'beaulii-hydrating-moisturizing-cream', 899.00, 1299.00, 31, 1449.00, 'BEA-HMC-002', 1299, 10, 1, 'All Skin Types', 'Dark Spots, Uneven Tone, Dullness', 'dcf', 'fdsf', 'Me as a customer really impressed with this cream on applying only 10 days and result was so good I brought more creams', '[\"Dermatologically Tested\\\"\",\"\\\"SLS & Paraben Free\\\"\",\"\\\"Vegan\\\"\",\"\\\"Cruelty Free\"]', 'product-image/5cfc7c71-40a3-407b-a1ea-ee781382df9f.webp', '', 'product-image/002f0402-57e3-4e00-aeab-b222b0b81743.webp', 'product-image/147e6af7-6d0c-4279-be76-726cd202875a.webp', '', '', 1, 0, 'SINGLE', 0.00, 0, '2026-04-09 10:24:48.881', '2026-04-09 10:24:48.881');

-- --------------------------------------------------------

--
-- Table structure for table `productcategory`
--

CREATE TABLE `productcategory` (
  `productId` int(11) NOT NULL,
  `categoryId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `productcategory`
--

INSERT INTO `productcategory` (`productId`, `categoryId`) VALUES
(1, 1),
(2, 5),
(3, 1),
(3, 2),
(4, 1);

-- --------------------------------------------------------

--
-- Table structure for table `productimage`
--

CREATE TABLE `productimage` (
  `id` int(11) NOT NULL,
  `productId` int(11) NOT NULL,
  `url` text NOT NULL,
  `altText` varchar(255) DEFAULT NULL,
  `sortOrder` int(11) NOT NULL DEFAULT 0,
  `isPrimary` tinyint(1) NOT NULL DEFAULT 0,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `productvariant`
--

CREATE TABLE `productvariant` (
  `id` int(11) NOT NULL,
  `productId` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `sku` varchar(191) DEFAULT NULL,
  `price` decimal(10,2) NOT NULL,
  `oldPrice` decimal(10,2) DEFAULT NULL,
  `discount` int(11) DEFAULT NULL,
  `stockQuantity` int(11) NOT NULL DEFAULT 0,
  `image` text DEFAULT NULL,
  `isActive` tinyint(1) NOT NULL DEFAULT 1,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `review`
--

CREATE TABLE `review` (
  `id` int(11) NOT NULL,
  `productId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `rating` int(11) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `comment` text DEFAULT NULL,
  `beforeImage` text DEFAULT NULL,
  `afterImage` text DEFAULT NULL,
  `reviewerName` varchar(255) NOT NULL,
  `reviewerLocation` varchar(255) DEFAULT NULL,
  `isVerified` tinyint(1) NOT NULL DEFAULT 0,
  `isApproved` tinyint(1) NOT NULL DEFAULT 1,
  `isFeatured` tinyint(1) NOT NULL DEFAULT 0,
  `helpfulCount` int(11) NOT NULL DEFAULT 0,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `sitesetting`
--

CREATE TABLE `sitesetting` (
  `id` int(11) NOT NULL,
  `key` varchar(191) NOT NULL,
  `value` text NOT NULL,
  `type` varchar(191) NOT NULL DEFAULT 'string',
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `email` varchar(191) NOT NULL,
  `password` varchar(255) NOT NULL,
  `firstName` varchar(100) DEFAULT NULL,
  `lastName` varchar(100) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `avatar` text DEFAULT NULL,
  `role` enum('CUSTOMER','ADMIN','SUPER_ADMIN') NOT NULL DEFAULT 'CUSTOMER',
  `isActive` tinyint(1) NOT NULL DEFAULT 1,
  `emailVerified` datetime(3) DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `email`, `password`, `firstName`, `lastName`, `phone`, `avatar`, `role`, `isActive`, `emailVerified`, `createdAt`, `updatedAt`) VALUES
(1, 'admin@beaulii.com', '$2b$10$W/qIypm1VI5ngHMMrSJ5cOeocWQxwT2mroWehAcgQcYUykE4Oat1S', 'Admin', 'User', '', NULL, 'SUPER_ADMIN', 1, NULL, '2026-02-24 12:04:12.000', '2026-02-26 09:15:10.375'),
(2, 'nasim.ahamed@gmail.com', '$2b$10$UNP42uj0lh4iih47M0Vy7u7DUFoblEJmK0lFijV0N81jIertBm0ki', 'Nasim', 'Ahamed', '01781915034', NULL, 'ADMIN', 1, NULL, '2026-02-25 08:16:25.769', '2026-02-25 08:16:25.769'),
(3, 'admin1@beaulii.com', '$2b$10$0uWgPCwlidhAmfjaSZTACO//SP9cUqZrd9vQrAdtxm5Z6rPCUZzyW', 'Admin', 'User', NULL, NULL, 'SUPER_ADMIN', 1, NULL, '2026-02-25 08:19:00.579', '2026-02-25 08:19:00.579'),
(4, 'admin123@beaulii.com', '$2b$10$VuJbp4lECYgxcG.LX5wfhudqXtSzEjDK2imbuUesQr6Nw9yCFZk5q', 'Admin', 'User', NULL, NULL, 'SUPER_ADMIN', 1, NULL, '2026-02-25 08:20:02.149', '2026-02-25 08:20:02.149'),
(5, 'user.admin@beaulii.com', '$2b$10$a0V8PZIKiPRixInV/iEXROfSMQXtw8Mxlti67AtBFhPyF9GCc555G', 'Saikul', 'Islam', NULL, NULL, 'SUPER_ADMIN', 1, NULL, '2026-04-09 10:13:03.841', '2026-04-09 10:13:03.841');

-- --------------------------------------------------------

--
-- Table structure for table `wishlist`
--

CREATE TABLE `wishlist` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `wishlistitem`
--

CREATE TABLE `wishlistitem` (
  `id` int(11) NOT NULL,
  `wishlistId` int(11) NOT NULL,
  `productId` int(11) NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `_prisma_migrations`
--

CREATE TABLE `_prisma_migrations` (
  `id` varchar(36) NOT NULL,
  `checksum` varchar(64) NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) NOT NULL,
  `logs` text DEFAULT NULL,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `applied_steps_count` int(10) UNSIGNED NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `_prisma_migrations`
--

INSERT INTO `_prisma_migrations` (`id`, `checksum`, `finished_at`, `migration_name`, `logs`, `rolled_back_at`, `started_at`, `applied_steps_count`) VALUES
('0b89de26-3070-40f8-b992-0b678181fede', '757db50bd89dae706665a693bdf321c0d6ab4c6596615275e3171d69157f1a5c', '2026-02-24 06:03:10.472', '20260223155124_init', NULL, NULL, '2026-02-24 06:03:09.175', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `address`
--
ALTER TABLE `address`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Address_userId_idx` (`userId`);

--
-- Indexes for table `banner`
--
ALTER TABLE `banner`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Banner_isActive_idx` (`isActive`),
  ADD KEY `Banner_position_idx` (`position`);

--
-- Indexes for table `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Cart_userId_key` (`userId`),
  ADD KEY `Cart_userId_idx` (`userId`);

--
-- Indexes for table `cartitem`
--
ALTER TABLE `cartitem`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `CartItem_cartId_productId_variantId_key` (`cartId`,`productId`,`variantId`),
  ADD KEY `CartItem_cartId_idx` (`cartId`),
  ADD KEY `CartItem_productId_idx` (`productId`),
  ADD KEY `CartItem_variantId_fkey` (`variantId`);

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Category_slug_key` (`slug`),
  ADD KEY `Category_slug_idx` (`slug`),
  ADD KEY `Category_parentId_idx` (`parentId`);

--
-- Indexes for table `coupon`
--
ALTER TABLE `coupon`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Coupon_code_key` (`code`),
  ADD KEY `Coupon_code_idx` (`code`),
  ADD KEY `Coupon_isActive_idx` (`isActive`);

--
-- Indexes for table `homesection`
--
ALTER TABLE `homesection`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `HomeSection_sectionKey_key` (`sectionKey`),
  ADD KEY `HomeSection_sectionKey_idx` (`sectionKey`);

--
-- Indexes for table `order`
--
ALTER TABLE `order`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Order_orderNumber_key` (`orderNumber`),
  ADD KEY `Order_orderNumber_idx` (`orderNumber`),
  ADD KEY `Order_userId_idx` (`userId`),
  ADD KEY `Order_status_idx` (`status`),
  ADD KEY `Order_email_idx` (`email`),
  ADD KEY `Order_shippingAddressId_fkey` (`shippingAddressId`);

--
-- Indexes for table `orderitem`
--
ALTER TABLE `orderitem`
  ADD PRIMARY KEY (`id`),
  ADD KEY `OrderItem_orderId_idx` (`orderId`),
  ADD KEY `OrderItem_productId_idx` (`productId`),
  ADD KEY `OrderItem_variantId_fkey` (`variantId`);

--
-- Indexes for table `orderlog`
--
ALTER TABLE `orderlog`
  ADD PRIMARY KEY (`id`),
  ADD KEY `OrderLog_orderId_idx` (`orderId`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Product_slug_key` (`slug`),
  ADD UNIQUE KEY `Product_sku_key` (`sku`),
  ADD KEY `Product_slug_idx` (`slug`),
  ADD KEY `Product_isActive_idx` (`isActive`),
  ADD KEY `Product_isFeatured_idx` (`isFeatured`),
  ADD KEY `Product_productType_idx` (`productType`);

--
-- Indexes for table `productcategory`
--
ALTER TABLE `productcategory`
  ADD PRIMARY KEY (`productId`,`categoryId`),
  ADD KEY `ProductCategory_productId_idx` (`productId`),
  ADD KEY `ProductCategory_categoryId_idx` (`categoryId`);

--
-- Indexes for table `productimage`
--
ALTER TABLE `productimage`
  ADD PRIMARY KEY (`id`),
  ADD KEY `ProductImage_productId_idx` (`productId`);

--
-- Indexes for table `productvariant`
--
ALTER TABLE `productvariant`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `ProductVariant_sku_key` (`sku`),
  ADD KEY `ProductVariant_productId_idx` (`productId`);

--
-- Indexes for table `review`
--
ALTER TABLE `review`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Review_productId_idx` (`productId`),
  ADD KEY `Review_userId_idx` (`userId`),
  ADD KEY `Review_isApproved_idx` (`isApproved`);

--
-- Indexes for table `sitesetting`
--
ALTER TABLE `sitesetting`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `SiteSetting_key_key` (`key`),
  ADD KEY `SiteSetting_key_idx` (`key`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `User_email_key` (`email`);

--
-- Indexes for table `wishlist`
--
ALTER TABLE `wishlist`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Wishlist_userId_key` (`userId`),
  ADD KEY `Wishlist_userId_idx` (`userId`);

--
-- Indexes for table `wishlistitem`
--
ALTER TABLE `wishlistitem`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `WishlistItem_wishlistId_productId_key` (`wishlistId`,`productId`),
  ADD KEY `WishlistItem_wishlistId_idx` (`wishlistId`),
  ADD KEY `WishlistItem_productId_idx` (`productId`);

--
-- Indexes for table `_prisma_migrations`
--
ALTER TABLE `_prisma_migrations`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `address`
--
ALTER TABLE `address`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `banner`
--
ALTER TABLE `banner`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `cart`
--
ALTER TABLE `cart`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `cartitem`
--
ALTER TABLE `cartitem`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `coupon`
--
ALTER TABLE `coupon`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `homesection`
--
ALTER TABLE `homesection`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `order`
--
ALTER TABLE `order`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `orderitem`
--
ALTER TABLE `orderitem`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `orderlog`
--
ALTER TABLE `orderlog`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `productimage`
--
ALTER TABLE `productimage`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `productvariant`
--
ALTER TABLE `productvariant`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `review`
--
ALTER TABLE `review`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `sitesetting`
--
ALTER TABLE `sitesetting`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `wishlist`
--
ALTER TABLE `wishlist`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `wishlistitem`
--
ALTER TABLE `wishlistitem`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `address`
--
ALTER TABLE `address`
  ADD CONSTRAINT `Address_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `cart`
--
ALTER TABLE `cart`
  ADD CONSTRAINT `Cart_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `cartitem`
--
ALTER TABLE `cartitem`
  ADD CONSTRAINT `CartItem_cartId_fkey` FOREIGN KEY (`cartId`) REFERENCES `cart` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `CartItem_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `product` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `CartItem_variantId_fkey` FOREIGN KEY (`variantId`) REFERENCES `productvariant` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `category`
--
ALTER TABLE `category`
  ADD CONSTRAINT `Category_parentId_fkey` FOREIGN KEY (`parentId`) REFERENCES `category` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `order`
--
ALTER TABLE `order`
  ADD CONSTRAINT `Order_shippingAddressId_fkey` FOREIGN KEY (`shippingAddressId`) REFERENCES `address` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `Order_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `orderitem`
--
ALTER TABLE `orderitem`
  ADD CONSTRAINT `OrderItem_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `order` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `OrderItem_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `product` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `OrderItem_variantId_fkey` FOREIGN KEY (`variantId`) REFERENCES `productvariant` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `orderlog`
--
ALTER TABLE `orderlog`
  ADD CONSTRAINT `OrderLog_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `order` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `productcategory`
--
ALTER TABLE `productcategory`
  ADD CONSTRAINT `ProductCategory_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `category` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `ProductCategory_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `product` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `productimage`
--
ALTER TABLE `productimage`
  ADD CONSTRAINT `ProductImage_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `product` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `productvariant`
--
ALTER TABLE `productvariant`
  ADD CONSTRAINT `ProductVariant_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `product` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `review`
--
ALTER TABLE `review`
  ADD CONSTRAINT `Review_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `product` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `Review_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `wishlist`
--
ALTER TABLE `wishlist`
  ADD CONSTRAINT `Wishlist_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `wishlistitem`
--
ALTER TABLE `wishlistitem`
  ADD CONSTRAINT `WishlistItem_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `product` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `WishlistItem_wishlistId_fkey` FOREIGN KEY (`wishlistId`) REFERENCES `wishlist` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
