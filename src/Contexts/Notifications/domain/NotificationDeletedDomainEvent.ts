import { DomainEvent } from '../../Shared/domain/DomainEvent';

export default class NotificationDeletedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME = 'notification_token.deleted';

  constructor({ aggregateId, eventId, occurredOn }: { aggregateId: string; eventId?: string; occurredOn?: Date }) {
    super({ eventName: NotificationDeletedDomainEvent.EVENT_NAME, aggregateId, eventId, occurredOn });
  }

  toPrimitives() {
    throw new Error('Method not implemented.');
  }

  static fromPrimitives(params: { aggregateId: string; eventId: string; occurredOn: Date }): DomainEvent {
    const { aggregateId, eventId, occurredOn } = params;
    return new NotificationDeletedDomainEvent({
      aggregateId,
      eventId,
      occurredOn,
    });
  }
}
