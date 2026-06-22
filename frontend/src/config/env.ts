/**
 * Centralized Environment Configuration
 * Single source of truth for frontend environment variables and API URLs
 */

export const ENV = {
  API_URL: (import.meta.env.VITE_API_URL as string) || 'http://localhost:5000/api',
  
  SOCKET_URL: (import.meta.env.VITE_API_URL as string)
    ? (import.meta.env.VITE_API_URL as string).replace('/api', '')
    : 'http://localhost:5000',
    
  FIREBASE: {
    API_KEY: (import.meta.env.VITE_FIREBASE_API_KEY as string) || '',
    AUTH_DOMAIN: (import.meta.env.VITE_FIREBASE_AUTH_DOMAIN as string) || '',
    PROJECT_ID: (import.meta.env.VITE_FIREBASE_PROJECT_ID as string) || '',
    STORAGE_BUCKET: (import.meta.env.VITE_FIREBASE_STORAGE_BUCKET as string) || '',
    MESSAGING_SENDER_ID: (import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID as string) || '',
    APP_ID: (import.meta.env.VITE_FIREBASE_APP_ID as string) || '',
    MEASUREMENT_ID: (import.meta.env.VITE_FIREBASE_MEASUREMENT_ID as string) || ''
  },
  
  JUDGE0_URL: (import.meta.env.VITE_JUDGE0_URL as string) || 'https://ce.judge0.com/submissions'
};
