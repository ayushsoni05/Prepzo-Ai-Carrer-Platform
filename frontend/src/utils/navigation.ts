export const navigateTo = (path: string) => {
  // Intercept old jobs detail path format and convert to query parameter format
  let targetPath = path;
  const jobsMatch = path.match(/^\/?jobs\/([a-f0-9]{24})$/i);
  if (jobsMatch) {
    targetPath = `/jobs?jobId=${jobsMatch[1]}`;
  }

  // Add leading slash if not present
  const fullPath = targetPath.startsWith('/') ? targetPath : `/${targetPath}`;
  
  // Update browser history
  window.history.pushState({}, '', fullPath);
  
  // Dispatch a custom popstate event so the App router catches it
  window.dispatchEvent(new Event('popstate'));
};
