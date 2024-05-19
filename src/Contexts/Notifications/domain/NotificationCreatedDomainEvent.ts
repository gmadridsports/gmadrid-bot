import { DomainEvent } from '../../Shared/domain/DomainEvent';

export default class NotificationCreatedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME = 'notification_token.created';

  constructor({ aggregateId, eventId, occurredOn }: { aggregateId: string; eventId?: string; occurredOn?: Date }) {
    super({ eventName: NotificationCreatedDomainEvent.EVENT_NAME, aggregateId, eventId, occurredOn });
  }

  toPrimitives() {
    throw new Error('Method not implemented.');
  }

  static fromPrimitives(params: { aggregateId: string; eventId: string; occurredOn: Date }): DomainEvent {
    const { aggregateId, eventId, occurredOn } = params;
    return new NotificationCreatedDomainEvent({
      aggregateId,
      eventId,
      occurredOn,
    });
  }
}
