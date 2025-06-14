import express from 'express';
import { EmailController } from '../controllers/EmailController';
import cloudinary from '../middleware/cloudinaryUpload';

const router = express.Router();
const emailController = new EmailController();

// Routes
router.post('/email', cloudinary.array('attachment'), emailController.sendEmail);
// router.get('/email', emailController.getAllEmails);

export default router;
