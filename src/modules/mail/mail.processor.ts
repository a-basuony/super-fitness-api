import { Controller, Logger } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { MailService, MailOptions } from './mail.service';

@Controller()
export class MailProcessor {
  private readonly logger = new Logger(MailProcessor.name);

  constructor(private readonly mailService: MailService) {}

  @EventPattern('email.send')
  async handleSendEmail(@Payload() data: MailOptions) {
    try {
      await this.mailService.sendMail(data);
      this.logger.log(`Email sent to ${data.to} [template: ${data.template}]`);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : JSON.stringify(error);
      const stack = error instanceof Error ? error.stack : undefined;
      this.logger.error(`Failed to send email to ${data.to}: ${message}`, stack);
      throw error;
    }
  }
}
