import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';

// Cấu hình Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Cấu hình storage cho Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'email-attachments', // thư mục trên Cloudinary
    allowed_formats: ['jpg', 'png', 'pdf', 'doc', 'docx', 'xls', 'xlsx', 'zip'], // định dạng cho phép
    transformation: [{ width: 1000, height: 1000, crop: 'limit' }] // tùy chọn biến đổi (cho ảnh)
  } as any
});

// Kiểm tra loại file
const fileFilter = (req: any, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  // Chấp nhận tất cả các loại file hoặc giới hạn theo nhu cầu
  const allowedMimeTypes = [
    'image/jpeg', 'image/png', 'image/gif',
    'application/pdf',
    'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'application/zip'
  ];
  
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Định dạng file không được hỗ trợ'));
  }
};

// Khởi tạo middleware upload
const cloudinaryUpload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024 // giới hạn 10MB
  }
});

export default cloudinaryUpload;