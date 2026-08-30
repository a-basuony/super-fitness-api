import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import { Transporter } from 'nodemailer';
import * as handlebars from 'handlebars';
import * as fs from 'fs';
import * as path from 'path';

export interface MailOptions {
  to: string;
  subject: string;
  template: string;
  context: Record<string, any>;
}

@Injectable()
export class MailService implements OnModuleInit {
  private transporter: Transporter;
  private readonly templatesDir = path.join(__dirname, 'templates');
  private readonly layoutPath = path.join(this.templatesDir, 'layout.hbs');

  constructor(private readonly configService: ConfigService) {}

  onModuleInit() {
    this.transporter = nodemailer.createTransport({
      host: this.configService.get<string>('SMTP_HOST'),
      port: this.configService.get<number>('SMTP_PORT'),
      secure: this.configService.get<number>('SMTP_PORT') === 465,
      auth: {
        user: this.configService.get<string>('SMTP_USER'),
        pass: this.configService.get<string>('SMTP_PASS'),
      },
    });
  }

  async sendMail(options: MailOptions) {
    const { to, subject, template, context } = options;
    const from = this.configService.get<string>('SMTP_FROM');
    const html = this.renderTemplate(template, context);

    await this.transporter.sendMail({
      from,
      to,
      subject,
      html,
    });
  }

  private renderTemplate(templateName: string, context: Record<string, any>): string {
    const templatePath = path.join(this.templatesDir, `${templateName}.hbs`);
    const templateSource = fs.readFileSync(templatePath, 'utf-8');
    const template = handlebars.compile(templateSource);
    const body = template(context);

    if (fs.existsSync(this.layoutPath)) {
      const layoutSource = fs.readFileSync(this.layoutPath, 'utf-8');
      const layout = handlebars.compile(layoutSource);
      return layout({ body });
    }

    return body;
  }
}
