import { initializeApp } from 'firebase/app';
import { getAuth, RecaptchaVerifier } from 'firebase/auth';
import { ENV } from '../config/env';

const firebaseConfig = {
  apiKey: ENV.FIREBASE.API_KEY,
  authDomain: ENV.FIREBASE.AUTH_DOMAIN,
  projectId: ENV.FIREBASE.PROJECT_ID,
  storageBucket: ENV.FIREBASE.STORAGE_BUCKET,
  messagingSenderId: ENV.FIREBASE.MESSAGING_SENDER_ID,
  appId: ENV.FIREBASE.APP_ID,
  measurementId: ENV.FIREBASE.MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// Helper for Recaptcha
export const setupRecaptcha = (containerId: string) => {
  if (window.recaptchaVerifier) {
     window.recaptchaVerifier.clear();
  }
  
  window.recaptchaVerifier = new RecaptchaVerifier(auth, containerId, {
    'size': 'invisible',
    'callback': () => {
      // reCAPTCHA solved, allow signInWithPhoneNumber.
    }
  });
  
  return window.recaptchaVerifier;
};

// Global type for recaptcha
declare global {
  interface Window {
    recaptchaVerifier: RecaptchaVerifier;
    confirmationResult: any;
  }
}
