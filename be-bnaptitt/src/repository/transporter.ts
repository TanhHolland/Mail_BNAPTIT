import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USERNAME, // Thay bằng email của bạn
    pass: process.env.EMAIL_PASSWORD, // Dùng App Password, KHÔNG dùng mật khẩu thật
  },
});
