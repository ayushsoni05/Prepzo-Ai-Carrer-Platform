/**
 * Utility to resolve relative upload paths (e.g. /uploads/images/...)
 * into absolute URLs by prepending the backend host.
 */

export const getFileUrl = (path?: string | null): string => {
  if (!path) return '';
  
  // Clean up any quotes (escaped or otherwise) and leading/trailing whitespace
  let cleanPath = path.trim();
  cleanPath = cleanPath.replace(/^\\?["']|\\?["']$/g, '').trim();
  
  // If it's already an absolute URL (http://, https://, or data:), return as is
  if (cleanPath.startsWith('http://') || cleanPath.startsWith('https://') || cleanPath.startsWith('data:')) {
    return cleanPath;
  }

  // Prepend the backend host (remove /api from VITE_API_URL)
  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
  const baseUrl = apiUrl.replace(/\/api\/?$/, '');
  
  // Ensure path starts with a slash
  const normalizedPath = cleanPath.startsWith('/') ? cleanPath : `/${cleanPath}`;
  
  return `${baseUrl}${normalizedPath}`;
};
