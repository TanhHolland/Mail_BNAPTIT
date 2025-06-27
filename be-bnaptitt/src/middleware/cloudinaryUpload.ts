import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

// Cấu hình Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Cấu hình storage cho Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'email-attachments', // thư mục trên
    allowed_formats: [
      'jpg',
      'png',
      'pdf',
      // 'doc',
      // 'docx',
      // 'xls',
      // 'xlsx',
      'zip',
      'mp4',
      'avi',
      'mov',
      'mkv',
      'webm',
      'mp3',
      'wav',
      'ogg',
      'aac',
      'm4a',
    ], // định dạng cho phép
    transformation: [{ width: 1000, height: 1000, crop: 'limit' }], // tùy chọn biến đổi (cho ảnh)
  } as any,
});

// Kiểm tra loại file
const fileFilter = (req: any, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  // Chấp nhận tất cả các loại file hoặc giới hạn theo nhu cầu
  const allowedMimeTypes = [
    // Ảnh
    'image/jpeg',
    'image/png',
    'image/gif',
    'image/webp',
    'image/svg+xml',
    // Tài liệu
    'application/pdf',
    // 'application/msword',
    // 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    // 'application/vnd.ms-excel',
    // 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    // 'application/vnd.ms-powerpoint',
    // 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    // 'text/plain',
    // 'text/csv',
    // File nén
    'application/zip',
    'application/x-rar-compressed',
    'application/x-7z-compressed',
    'application/x-zip-compressed',
    // Video
    'video/mp4',
    'video/quicktime',
    'video/x-msvideo',
    'video/webm',
    // Âm thanh
    // 'audio/mpeg',
    // 'audio/wav',
  ];
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    console.log('file loi', {
      name: file.originalname,
      type: file.mimetype,
    });
    const err = new multer.MulterError('LIMIT_UNEXPECTED_FILE');
    err.message = `Định dạng file ${file.originalname} không được hỗ trợ`;
    cb(err);
  }
};

// Khởi tạo middleware upload
const cloudinaryUpload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 25 * 1024 * 1024, // giới hạn 10MB
  },
});

export default cloudinaryUpload;
