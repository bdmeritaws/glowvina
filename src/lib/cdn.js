/**
 * CDN / Image Base URL Utility
 * 
 * This utility provides a consistent way to handle image URLs
 * across local development and production environments.
 * 
 * Usage:
 * - Local: Images served from /cdn folder (http://localhost:3000/cdn/...)
 * - Production: Images served from CDN or domain (https://beaulli.com/cdn/...)
 * 
 * To migrate to S3/Cloudflare R2 later:
 * Simply change NEXT_PUBLIC_IMAGE_BASE_URL in .env
 */

/**
 * Get the base URL for images based on environment
 * @returns {string} Base URL for images
 */
export function getImageBaseUrl() {
  return process.env.NEXT_PUBLIC_IMAGE_BASE_URL || '';
}

/**
 * Generate full CDN image URL
 * @param {string} path - Image path (e.g., 'products/image.jpg' or '/cdn/products/image.jpg')
 * @returns {string} Full image URL
 */
export function getImageUrl(path) {
  const baseUrl = getImageBaseUrl();
  
  // Remove leading slash if present
  const cleanPath = path?.startsWith('/') ? path.slice(1) : path;
  
  // If path already starts with 'cdn/', use as-is
  if (cleanPath.startsWith('cdn/')) {
    return `${baseUrl}/${cleanPath}`;
  }
  
  // Otherwise add cdn/ prefix
  return `${baseUrl}/cdn/${cleanPath}`;
}

/**
 * Get image path relative to CDN folder
 * @param {string} folder - Folder name (e.g., 'products', 'banners')
 * @param {string} filename - Image filename
 * @returns {string} Relative path (e.g., 'products/image.jpg')
 */
export function getCdnPath(folder, filename) {
  return `${folder}/${filename}`;
}

/**
 * Example usage in components:
 * 
 * import { getImageUrl } from '@/lib/cdn';
 * 
 * // In your component:
 * <Image 
 *   src={getImageUrl('products/my-product.jpg')}
 *   alt="Product"
 *   width={500}
 *   height={500}
 * />
 * 
 * Or with the base URL directly:
 * 
 * import { getImageBaseUrl } from '@/lib/cdn';
 * 
 * const baseUrl = getImageBaseUrl();
 * // src = `${baseUrl}/cdn/products/image.jpg`
 */

export default {
  getImageBaseUrl,
  getImageUrl,
  getCdnPath,
};
