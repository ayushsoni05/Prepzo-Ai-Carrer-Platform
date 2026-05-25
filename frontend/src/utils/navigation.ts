export const navigateTo = (path: string) => {
  // Add leading slash if not present
  const fullPath = path.startsWith('/') ? path : `/${path}`;
  
  // Update browser history
  window.history.pushState({}, '', fullPath);
  
  // Dispatch a custom popstate event so the App router catches it
  window.dispatchEvent(new Event('popstate'));
};
