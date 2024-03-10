import config from '../../../Shared/infrastructure/config';
import { WhatsappMessageRepositoryConfig } from './WhatsappMessageRepositoryConfig';

export class WhatsappMessageRepositoryConfigFactory {
  static createConfig(): WhatsappMessageRepositoryConfig {
    console.log('FACTORY CALLED');
    return {
      chatId: config.get('whatsappChannelId'),
    };
  }
}
