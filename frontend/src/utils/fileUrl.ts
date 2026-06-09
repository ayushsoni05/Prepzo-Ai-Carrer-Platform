/**
 * Utility to resolve relative upload paths (e.g. /uploads/images/...)
 * into absolute URLs by prepending the backend host.
 */

export const getFileUrl = (path?: string | null): string => {
  if (!path) return '';
  
  // Clean up any quotes (escaped or otherwise) and leading/trailing whitespace recursively
  let cleanPath = path.trim();
  
  while (cleanPath.startsWith('"') || cleanPath.startsWith("'") || cleanPath.startsWith('\\')) {
    cleanPath = cleanPath.substring(1).trim();
  }
  while (cleanPath.endsWith('"') || cleanPath.endsWith("'") || cleanPath.endsWith('\\')) {
    cleanPath = cleanPath.substring(0, cleanPath.length - 1).trim();
  }
  
  // Resilient check: if it contains base64/data URI markers, extract it directly
  if (cleanPath.includes('data:image/') || cleanPath.includes(';base64,')) {
    const dataIdx = cleanPath.indexOf('data:');
    if (dataIdx !== -1) {
      return cleanPath.substring(dataIdx).replace(/\s/g, '');
    }
    return cleanPath.replace(/\s/g, '');
  }
  
  // If it's already an absolute URL, return as is
  if (cleanPath.startsWith('http://') || cleanPath.startsWith('https://') || cleanPath.startsWith('data:')) {
    if (cleanPath.startsWith('data:')) {
      return cleanPath.replace(/\s/g, '');
    }
    return cleanPath;
  }

  // Prepend the backend host (remove /api from VITE_API_URL)
  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
  const baseUrl = apiUrl.replace(/\/api\/?$/, '');
  
  // Ensure path starts with a slash
  const normalizedPath = cleanPath.startsWith('/') ? cleanPath : `/${cleanPath}`;
  
  return `${baseUrl}${normalizedPath}`;
};
