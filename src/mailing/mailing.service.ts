/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Injectable, Logger } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MailingService {
  private readonly logger = new Logger(MailingService.name);
  private readonly transporter: nodemailer.Transporter;

  constructor(private readonly configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        // user: this.configService.get<string>('GMAIL_USER') ?? '',
        // pass: this.configService.get<string>('GMAIL_APP_PASSWORD') ?? '',
        user: 'famosipe2010@gmail.com',
        pass: 'qxzq dkpz psrg kzws',
      },
    });
  }
  /**
   * Sends an email using the configured transporter.
   * @param options - The email options including recipient, subject, and HTML content.
   * @returns A promise that resolves to an object indicating success or failure.
   */
  async sendEmail(options: {
    to: string | string[];
    subject: string;
    html: string;
    from?: string;
  }) {
    const { to, subject, html, from } = options;

    const mailOptions = {
      from:
        from ?? `"No Reply" <${this.configService.get<string>('GMAIL_USER')}>`,
      to,
      subject,
      html,
    };

    try {
      const info = await this.transporter.sendMail(mailOptions);
      this.logger.log(`Email sent: ${info.messageId}`);
      return { success: true, messageId: info.messageId };
    } catch (err: unknown) {
      if (err instanceof Error) {
        this.logger.error('Failed to send email', err.stack);
        return { success: false, error: err.message };
      } else {
        const errorString = String(err);
        this.logger.error(
          'Failed to send email with unknown error',
          errorString,
        );
        return { success: false, error: errorString };
      }
    }
  }

  async sendVerificationEmail(email: string, token: string) {
    this.logger.debug('verification token:', token);
    const verificationUrl = `${this.configService.get<string>('FRONTEND_URL')}/verify-email?token=${token}`;

    const subject = 'Verify your email';
    const html = `
      <p>Click the link below to verify your email:</p>
      <a href="${verificationUrl}">Verify Email</a>
    `;

    return this.sendEmail({
      to: email,
      subject,
      html,
    });
  }
}
