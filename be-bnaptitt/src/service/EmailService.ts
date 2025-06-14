import Email from '../models/Email';
import { transporter } from '../repository/transporter';

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
    receivers: Record<string, any>[]
  ): Promise<{ success: Record<string, any>[]; failed: { receiver: any; error: any }[] }> {
    const success: Record<string, any>[] = [];
    const failed: { receiver: any; error: any }[] = [];

    try {
      if (!title || !content || !receivers || receivers.length === 0) {
        throw new Error('Thiếu dữ liệu');
      }

      for (const receiver of receivers) {
        try {
          const html = this.renderTemplate(content, receiver);
          const emailReceiver = receiver['A']; // Nếu field email không tên là 'email'

          if (!emailReceiver) {
            throw new Error('Không có địa chỉ email');
          }

          await transporter.sendMail({
            from: `${name} <${email}>`,
            to: emailReceiver,
            subject: title,
            html: html,
          });

          const newEmail = new Email({
            name,
            email,
            title,
            content: html,
            receivers,
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
