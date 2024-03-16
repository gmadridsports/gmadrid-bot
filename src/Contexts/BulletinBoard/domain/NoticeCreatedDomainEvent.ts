import { DomainEvent } from '../../Shared/domain/DomainEvent';

type NoticeCreatedDomainEventAttributes = {
  // readonly fromChannel: string;
  // readonly id: string;
  readonly body: string;
};

export class NoticeCreatedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME = 'bulletin_board.notice_created';

  // readonly fromChannel: string;
  readonly body: string;

  // readonly body: string;

  constructor({
    aggregateId,
    // fromChannel,
    // id,
    body,
    eventId,
    occurredOn,
  }: {
    aggregateId: string;
    eventId?: string;
    // fromChannel: string;
    // id: string;
    body: string;
    occurredOn?: Date;
  }) {
    super({ eventName: NoticeCreatedDomainEvent.EVENT_NAME, aggregateId, eventId, occurredOn });

    // this.fromChannel = fromChannel;
    // this.aggregateId = aggregateId;
    this.body = body;
  }

  toPrimitives(): NoticeCreatedDomainEventAttributes {
    const { body } = this;
    return {
      // fromChannel,
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
      // fromChannel: attributes.fromChannel,
      // id: attributes.id,
      body: params.attributes.body,
      eventId,
      occurredOn,
    });
  }
}
