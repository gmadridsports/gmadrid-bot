import { DomainEventClass } from '../../../Shared/domain/DomainEvent';
import { DomainEventSubscriber } from '../../../Shared/domain/DomainEventSubscriber';
import { MessageReceivedDomainEvent } from '../../domain/MessageReceivedDomainEvent';
import CreateNotice from './CreateNotice';

export default class CreateANoticeOnMessageReceived implements DomainEventSubscriber<MessageReceivedDomainEvent> {
  constructor(private creator: CreateNotice) {}

  subscribedTo(): DomainEventClass[] {
    return [MessageReceivedDomainEvent];
  }

  async on(domainEvent: MessageReceivedDomainEvent) {
    // todo id? from domain event?
    await this.creator.run({ id: domainEvent.id, body: domainEvent.body });
  }
}
