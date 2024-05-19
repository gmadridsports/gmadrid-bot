import { NoticeCreatedDomainEvent } from '../../domain/NoticeCreatedDomainEvent';
import { DomainEventClass } from '../../../Shared/domain/DomainEvent';
import { DomainEventSubscriber } from '../../../Shared/domain/DomainEventSubscriber';
import { WhatsappMessageReceivedDomainEvent } from '../../domain/WhatsappMessageReceivedDomainEvent';

export default class LogNoticeOnNoticeCreated implements DomainEventSubscriber<WhatsappMessageReceivedDomainEvent> {
  constructor() {}

  subscribedTo(): DomainEventClass[] {
    return [NoticeCreatedDomainEvent];
  }

  async on(domainEvent: NoticeCreatedDomainEvent) {
    const { occurredOn, body } = domainEvent;

    console.log(`Notice created on ${occurredOn}: ${body}`);
  }
}
