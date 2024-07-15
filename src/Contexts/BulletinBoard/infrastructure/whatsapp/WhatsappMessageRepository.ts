import { MessagesRepository } from '../../domain/MessagesRepository';
import { Client, LocalAuth } from 'whatsapp-web.js';
import qrcode from 'qrcode-terminal';

import { EventBus } from '../../../Shared/domain/EventBus';
import { WhatsappMessageReceivedDomainEvent } from '../../domain/WhatsappMessageReceivedDomainEvent';
import { WhatsappMessageRepositoryConfig } from './WhatsappMessageRepositoryConfig';
import { NumMessagesToFetch } from '../../domain/NumMessagesToFetch';
import { WhatsappMessageFetchedDomainEvent } from '../../domain/WhatsappMessageFetchedDomainEvent';

class WhatsappMessageRepository implements MessagesRepository {
  constructor(
    private eventBus: EventBus,
    private config: WhatsappMessageRepositoryConfig,
  ) {}

  publishNewMessages(previousQuantity: NumMessagesToFetch = new NumMessagesToFetch(0)): void {
    new Promise(() => {
      const client = new Client({
        // webVersionCache: {
        //   type: 'remote',
        //   remotePath: this.config.pageUrl,
        // },
        authStrategy: new LocalAuth({ dataPath: '/usr/src/app/data' }),
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

      client.on('auth_failure', (error) => {
        console.log('authentication failure', error);
      });

      if (previousQuantity.value > 0) {
        client.on('ready', async () => {
          const chat = await client.getChatById(this.config.chatId);
          const messages = await chat.fetchMessages({ limit: previousQuantity.value });
          const newMessagesEvents = messages
            .filter((msg) => msg.type === 'chat')
            .map(
              (msg) =>
                new WhatsappMessageFetchedDomainEvent({
                  jsonRawData: JSON.stringify(msg.rawData),
                  messageId: msg.id.id,
                  body: msg.body,

                  pubblicationDate: new Date(msg.timestamp * 1000),
                }),
            );

          this.eventBus.publish(newMessagesEvents);
        });
      }

      client.on('message', async (msg) => {
        if (msg.type !== 'chat' || msg.fromMe) return;

        if ((await msg.getChat()).id._serialized !== this.config.chatId) return;

        this.eventBus.publish([
          new WhatsappMessageReceivedDomainEvent({
            jsonRawData: JSON.stringify(msg.rawData),
            messageId: msg.id.id,
            body: msg.body,
          }),
        ]);
      });

      client.initialize();
    });
  }
}

export default WhatsappMessageRepository;
