import { DomainEventClass } from '../../../Shared/domain/DomainEvent';
import { DomainEventSubscriber } from '../../../Shared/domain/DomainEventSubscriber';
import { WhatsappMessageReceivedDomainEvent } from '../../domain/WhatsappMessageReceivedDomainEvent';
import CreateNotice from './CreateNotice';
import OriginSource, { OriginSources } from '../../domain/OriginSource/OriginSource';
import { NoticeSourceId } from '../../domain/NoticeSourceId';
import { NoticeBodyMessage } from '../../domain/NoticeBodyMessage/NoticeBodyMessage';
import { NoticePublicationDate } from '../../domain/NoticePublicationDate';
import { RawJSONDataMessage } from '../../domain/RawJSONDataMessage';

export default class CreateANoticeOnMessageReceived implements DomainEventSubscriber<WhatsappMessageReceivedDomainEvent> {
  constructor(private creator: CreateNotice) {}

  subscribedTo(): DomainEventClass[] {
    return [WhatsappMessageReceivedDomainEvent];
  }

  async on(domainEvent: WhatsappMessageReceivedDomainEvent) {
    const { messageId, jsonRawData, body, pubblicationDate } = domainEvent;
    const originSource = OriginSource.fromValue(OriginSources.WHATSAPP);

    await this.creator.run({
      from: originSource,
      externalId: NoticeSourceId.from(messageId),
      body: NoticeBodyMessage.from(body, originSource),
      pubblicationDate: new NoticePublicationDate(pubblicationDate),
      jsonRawData: RawJSONDataMessage.fromJsonRawData(jsonRawData),
    });
  }
}
