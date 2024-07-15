import config from '../../../Shared/infrastructure/config';
import { WhatsappMessageRepositoryConfig } from './WhatsappMessageRepositoryConfig';

export class WhatsappMessageRepositoryConfigFactory {
  static createConfig(): WhatsappMessageRepositoryConfig {
    return {
      chatId: config.get('whatsapp.channelId'),
      pageUrl: config.get('whatsapp.pageUrl'),
    };
  }
}
