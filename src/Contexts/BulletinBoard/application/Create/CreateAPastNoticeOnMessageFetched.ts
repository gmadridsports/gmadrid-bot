import { DomainEventClass } from '../../../Shared/domain/DomainEvent';
import { DomainEventSubscriber } from '../../../Shared/domain/DomainEventSubscriber';
import { WhatsappMessageReceivedDomainEvent } from '../../domain/WhatsappMessageReceivedDomainEvent';
import OriginSource, { OriginSources } from '../../domain/OriginSource/OriginSource';
import { NoticeSourceId } from '../../domain/NoticeSourceId';
import { NoticeBodyMessage } from '../../domain/NoticeBodyMessage/NoticeBodyMessage';
import { NoticePublicationDate } from '../../domain/NoticePublicationDate';
import { RawJSONDataMessage } from '../../domain/RawJSONDataMessage';
import CreatePastNotice from './CreatePastNotice';
import { WhatsappMessageFetchedDomainEvent } from '../../domain/WhatsappMessageFetchedDomainEvent';

export default class CreateAPastNoticeOnMessageFetched implements DomainEventSubscriber<WhatsappMessageReceivedDomainEvent> {
  constructor(private creator: CreatePastNotice) {}

  subscribedTo(): DomainEventClass[] {
    return [WhatsappMessageFetchedDomainEvent];
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
