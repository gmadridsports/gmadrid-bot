import { AggregateRoot } from '../../Shared/domain/AggregateRoot';
import AppRoute from './AppRoute';
import Title from './Title';
import Body from './Body';
import NotificationId from './Id';
import NotificationCreatedDomainEvent from './NotificationCreatedDomainEvent';

/**
 * A notification to be sent to active sessions.
 */
class Notification extends AggregateRoot {
  constructor(
    private id: NotificationId,
    readonly title: Title,
    readonly body: Body,
    readonly route: AppRoute | null,
  ) {
    super();
  }

  static create(id: NotificationId, title: Title, body: Body, route?: AppRoute): Notification {
    const notification = new Notification(id, title, body, route || null);

    notification.record(
      new NotificationCreatedDomainEvent({
        aggregateId: notification.id.value,
      }),
    );

    return notification;
  }

  toPrimitives() {
    throw new Error('Method not implemented.');
  }
}

export default Notification;
