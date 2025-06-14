import { Request, Response } from 'express';
import { EmailService } from '../service/EmailService';

export class EmailController {
  private emailService: EmailService;

  constructor() {
    this.emailService = new EmailService();
  }

  public sendEmail = async (req: Request, res: Response): Promise<void> => {
    try {
      //const { name, email, title, content, receivers, } = req.body;
      console.log('data: ', req.body);
      console.log('file', req.files);
      //const result = await this.emailService.sendEmail(name, email, title, content, receivers);
      //res.status(200).json({ success: true, data: result });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  };

  // public getAllEmails = async (req: Request, res: Response): Promise<void> => {
  //   try {
  //     const emails = await this.emailService.getAllEmails();
  //     res.status(200).json({ success: true, data: emails });
  //   } catch (error: any) {
  //     res.status(500).json({ success: false, message: error.message });
  //   }
  // };
}
