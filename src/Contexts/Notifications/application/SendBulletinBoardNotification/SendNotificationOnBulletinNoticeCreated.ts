import { DomainEventSubscriber } from '../../../Shared/domain/DomainEventSubscriber';
import { DomainEventClass } from '../../../Shared/domain/DomainEvent';
import { NoticeCreatedDomainEvent } from '../../../BulletinBoard/domain/NoticeCreatedDomainEvent';
import SendBulletinBoardNotification from './SendBulletinBoardNotification';

export default class SendNotificationOnBulletinNoticeCreated implements DomainEventSubscriber<NoticeCreatedDomainEvent> {
  constructor(private sendNotification: SendBulletinBoardNotification) {}

  subscribedTo(): DomainEventClass[] {
    return [NoticeCreatedDomainEvent];
  }

  async on(domainEvent: NoticeCreatedDomainEvent) {
    const { body } = domainEvent;
    await this.sendNotification.run({ body });
  }
}
