import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailProcessor } from './mail.processor';

@Module({
  providers: [MailService],
  controllers: [MailProcessor],
  exports: [MailService],
})
export class MailModule {}
