import { DomainEvent } from '../../Shared/domain/DomainEvent';

type PastNoticeCreatedDomainEventAttributes = {
  readonly body: string;
};

export class PastNoticeCreatedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME = 'bulletin_board.past_notice_created';

  readonly body: string;

  constructor({ aggregateId, body, eventId, occurredOn }: { aggregateId: string; eventId?: string; body: string; occurredOn?: Date }) {
    super({ eventName: PastNoticeCreatedDomainEvent.EVENT_NAME, aggregateId, eventId, occurredOn });
    this.body = body;
  }

  toPrimitives(): PastNoticeCreatedDomainEventAttributes {
    const { body } = this;
    return {
      body,
    };
  }

  static fromPrimitives(params: {
    aggregateId: string;
    attributes: PastNoticeCreatedDomainEventAttributes;
    eventId: string;
    occurredOn: Date;
  }): DomainEvent {
    const { aggregateId, occurredOn, eventId } = params;
    return new PastNoticeCreatedDomainEvent({
      aggregateId,
      body: params.attributes.body,
      eventId,
      occurredOn,
    });
  }
}
