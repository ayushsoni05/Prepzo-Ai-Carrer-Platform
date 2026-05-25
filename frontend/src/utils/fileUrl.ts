/**
 * Utility to resolve relative upload paths (e.g. /uploads/images/...)
 * into absolute URLs by prepending the backend host.
 */

export const getFileUrl = (path?: string | null): string => {
  if (!path) return '';
  
  // If it's already an absolute URL (http://, https://, or data:), return as is
  if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('data:')) {
    return path;
  }

  // Prepend the backend host (remove /api from VITE_API_URL)
  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
  const baseUrl = apiUrl.replace(/\/api\/?$/, '');
  
  // Ensure path starts with a slash
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  
  return `${baseUrl}${normalizedPath}`;
};
