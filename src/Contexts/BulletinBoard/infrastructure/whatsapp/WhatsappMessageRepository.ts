import { MessagesRepository } from '../../domain/MessagesRepository';
import Message from '../../domain/Message';
import { Client, LocalAuth } from 'whatsapp-web.js';
import qrcode from 'qrcode-terminal';

import { EventBus } from '../../../Shared/domain/EventBus';
import { MessageReceivedDomainEvent } from '../../domain/MessageReceivedDomainEvent';
import { WhatsappMessageRepositoryConfig } from './WhatsappMessageRepositoryConfig';

class WhatsappMessageRepository implements MessagesRepository {
  constructor(
    private eventBus: EventBus,
    private config: WhatsappMessageRepositoryConfig,
  ) {}

  async publishNewMessages(): Promise<Message[]> {
    return new Promise(() => {
      const client = new Client({
        authStrategy: new LocalAuth(),
        puppeteer: {
          headless: true,
          executablePath: '/usr/bin/chromium',
          args: [
            '--no-sandbox',
            '--headless',
            '--autoplay-policy=no-user-gesture-required',
            '--no-first-run',
            '--disable-gpu',
            '--use-fake-ui-for-media-stream',
            '--use-fake-device-for-media-stream',
            '--disable-sync',
          ],
          timeout: 100000,
        },
      });

      client.on('qr', (qr) => {
        // Generate and scan this code with your phone
        qrcode.generate(qr, { small: true });
      });

      client.on('ready', async () => {
        const chat = await client.getChatById(this.config.chatId);
        const messages = await chat.fetchMessages({ limit: 10 });
        const newMessagesEvents = messages.map(
          (msg) =>
            new MessageReceivedDomainEvent({
              fromChannel: 'whatsapp',
              id: msg.id.id,
              body: msg.body,
            }),
        );

        this.eventBus.publish(newMessagesEvents);
      });

      client.on('message', (msg) => {
        this.eventBus.publish([
          new MessageReceivedDomainEvent({
            fromChannel: 'whatsapp',
            id: msg.id.id,
            body: msg.body,
          }),
        ]);
      });

      client.initialize();
    });
  }
}

export default WhatsappMessageRepository;
