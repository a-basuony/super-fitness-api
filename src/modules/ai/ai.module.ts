import { Module, Global } from '@nestjs/common';
import { ChatGoogleGenerativeAI } from '@langchain/google-genai';
import { GEMINI_MODEL } from '../../common/utils/constants';
import { ConfigModule, ConfigService } from '@nestjs/config';
@Global()
@Module({
  imports: [ConfigModule],
  providers: [
    ConfigService,
    {
      provide: GEMINI_MODEL,
      useFactory: (configService: ConfigService) => {
        return new ChatGoogleGenerativeAI({
          apiKey: configService.get<string>('GOOGLE_API_KEY'),
          model: 'gemini-3-flash-preview',
          temperature: 0.7,
          maxRetries: 3,
          apiVersion: 'v1beta',
        });
      },
      inject: [ConfigService],
    },
  ],
  exports: [GEMINI_MODEL],
})
export class AiModule {}
