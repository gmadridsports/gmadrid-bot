import { DomainEvent } from '../../Shared/domain/DomainEvent';

export default class NotificationTokenExpiredEvent extends DomainEvent {
  static readonly EVENT_NAME = 'notification_token.expired';

  constructor({ aggregateId, eventId, occurredOn }: { aggregateId: string; eventId?: string; occurredOn?: Date }) {
    super({ eventName: NotificationTokenExpiredEvent.EVENT_NAME, aggregateId, eventId, occurredOn });
  }

  toPrimitives() {
    throw new Error('Method not implemented.');
  }

  static fromPrimitives(params: { aggregateId: string; eventId: string; occurredOn: Date }): DomainEvent {
    const { aggregateId, eventId, occurredOn } = params;
    return new NotificationTokenExpiredEvent({
      aggregateId,
      eventId,
      occurredOn,
    });
  }
}
