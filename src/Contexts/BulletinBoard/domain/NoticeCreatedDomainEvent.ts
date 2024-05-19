import { DomainEvent } from '../../Shared/domain/DomainEvent';

type NoticeCreatedDomainEventAttributes = {
  readonly body: string;
};

export class NoticeCreatedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME = 'bulletin_board.notice_created';

  readonly body: string;

  constructor({ aggregateId, body, eventId, occurredOn }: { aggregateId: string; eventId?: string; body: string; occurredOn?: Date }) {
    super({ eventName: NoticeCreatedDomainEvent.EVENT_NAME, aggregateId, eventId, occurredOn });
    this.body = body;
  }

  toPrimitives(): NoticeCreatedDomainEventAttributes {
    const { body } = this;
    return {
      body,
    };
  }

  static fromPrimitives(params: {
    aggregateId: string;
    attributes: NoticeCreatedDomainEventAttributes;
    eventId: string;
    occurredOn: Date;
  }): DomainEvent {
    const { aggregateId, occurredOn, eventId } = params;
    return new NoticeCreatedDomainEvent({
      aggregateId,
      body: params.attributes.body,
      eventId,
      occurredOn,
    });
  }
}
