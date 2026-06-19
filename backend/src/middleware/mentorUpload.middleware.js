import multer from 'multer';

// Allow images and PDFs
const allowedMimeTypes = [
  'image/jpeg',
  'image/png',
  'image/gif',
  'image/webp',
  'application/pdf'
];

// Configure memory storage
const storage = multer.memoryStorage();

// File filter with mime checks
const fileFilter = (req, file, cb) => {
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only PDF and images (JPEG, PNG, GIF, WEBP) are allowed.'), false);
  }
};

// Multer upload middleware configuration
export const mentorUpload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
    files: 1 // Only 1 file at a time
  }
});
