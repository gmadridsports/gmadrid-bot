import { DomainEvent } from '../../Shared/domain/DomainEvent';

type MessageReceivedDomainEventAttributes = {
  readonly fromChannel: string;
  readonly id: string;
  readonly body: string;
};

export class MessageReceivedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME = 'bulletin_board.message_received';

  readonly fromChannel: string;
  readonly id: string;
  readonly body: string;

  constructor({
    aggregateId,
    fromChannel,
    id,
    body,
    eventId,
    occurredOn,
  }: {
    aggregateId?: string;
    eventId?: string;
    fromChannel: string;
    id: string;
    body: string;
    occurredOn?: Date;
  }) {
    super({ eventName: MessageReceivedDomainEvent.EVENT_NAME, aggregateId, eventId, occurredOn });
    this.fromChannel = fromChannel;
    this.id = id;
    this.body = body;
  }

  toPrimitives(): MessageReceivedDomainEventAttributes {
    const { fromChannel, id, body } = this;
    return {
      fromChannel,
      id,
      body,
    };
  }

  static fromPrimitives(params: {
    aggregateId: string;
    attributes: MessageReceivedDomainEventAttributes;
    eventId: string;
    occurredOn: Date;
  }): DomainEvent {
    const { aggregateId, attributes, occurredOn, eventId } = params;
    return new MessageReceivedDomainEvent({
      aggregateId,
      fromChannel: attributes.fromChannel,
      id: attributes.id,
      body: attributes.body,
      eventId,
      occurredOn,
    });
  }
}
