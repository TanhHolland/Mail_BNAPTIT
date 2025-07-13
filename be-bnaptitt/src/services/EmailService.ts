import mongoose from 'mongoose';
import Email from '@/models/Email';
import File from '@/models/File';
import { transporter } from '@/repository/transporter';

export class EmailService {
  public renderTemplate(template: string, data: Record<string, any>): string {
    return template.replace(/{{\s*(\w+)\s*}}/g, (_, key) => {
      return data[key] !== undefined ? data[key] : '';
    });
  }

  public async sendEmail(
    name: string,
    email: string,
    title: string,
    content: string,
    receivers: string,
    files: Express.Multer.File[]
  ): Promise<{ success: Record<string, any>[]; failed: { receiver: any; error: any }[] }> {
    const success: Record<string, any>[] = [];
    const failed: { receiver: any; error: any }[] = [];

    try {
      const receiversConvert: Record<string, any>[] = JSON.parse(receivers);
      if (!title || !content || !receivers || receivers.length === 0) {
        throw new Error('Thiếu dữ liệu');
      }
      const fileIds: mongoose.Types.ObjectId[] = [];

      for (const file of files) {
        const newFile = new File({
          fileName: file.originalname,
          path: file.path,
          contentType: file.mimetype,
        });
        await newFile.save();
        fileIds.push(newFile._id);
      }
      for (const receiver of receiversConvert) {
        try {
          const html = this.renderTemplate(content, receiver);
          const emailReceiver = receiver['A']; // Nếu field email không tên là 'email'

          if (!emailReceiver) {
            throw new Error('Không có địa chỉ email');
          }
          // logic send mail
          await transporter.sendMail({
            from: `${name} <${email}>`,
            to: emailReceiver,
            subject: title,
            html: html,
            attachments: files.map((file) => ({
              filename: file.originalname,
              path: file.path, // chính là URL từ Cloudinary
              contentType: file.mimetype,
            })),
          });

          // save mail
          const newEmail = new Email({
            name,
            email,
            toEmail: emailReceiver,
            title,
            content: html,
            receiver,
            attachments: fileIds,
          });

          await newEmail.save();
          success.push(receiver);
        } catch (error: any) {
          failed.push({ receiver, error: error.message || error });
        }
      }
      return { success, failed };
    } catch (error) {
      throw error;
    }
  }
}
