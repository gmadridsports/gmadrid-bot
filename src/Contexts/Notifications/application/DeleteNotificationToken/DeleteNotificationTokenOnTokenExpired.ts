import { DomainEventSubscriber } from '../../../Shared/domain/DomainEventSubscriber';
import { DomainEventClass } from '../../../Shared/domain/DomainEvent';
import NotificationTokenExpiredEvent from '../../domain/NotificationTokenExpiredEvent';
import DeleteNotificationToken from './DeleteNotificationToken';

export default class DeleteNotificationTokenOnTokenExpired implements DomainEventSubscriber<NotificationTokenExpiredEvent> {
  constructor(private deleteNotificationToken: DeleteNotificationToken) {}

  subscribedTo(): DomainEventClass[] {
    return [NotificationTokenExpiredEvent];
  }

  async on(domainEvent: NotificationTokenExpiredEvent) {
    const { aggregateId } = domainEvent;
    await this.deleteNotificationToken.run({ notificationTokenId: aggregateId! });
  }
}
