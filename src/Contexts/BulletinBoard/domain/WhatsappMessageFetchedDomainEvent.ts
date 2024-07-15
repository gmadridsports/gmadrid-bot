import { DomainEvent } from '../../Shared/domain/DomainEvent';

type MessageFetchedDomainEventAttributes = {
  messageId: string;
  jsonRawData: string;
  body: string;
  pubblicationDate: Date;
};

export class WhatsappMessageFetchedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME = 'bulletin_board.whatsapp_message_fetched';

  readonly jsonRawData: string;
  readonly messageId: string;
  readonly body: string;
  readonly pubblicationDate: Date;

  constructor({
    eventId,
    jsonRawData,
    messageId,
    body,
    pubblicationDate,
    occurredOn,
  }: {
    eventId?: string;
    jsonRawData: string;
    messageId: string;
    body: string;
    pubblicationDate?: Date;
    occurredOn?: Date;
  }) {
    super({ eventName: WhatsappMessageFetchedDomainEvent.EVENT_NAME, aggregateId: undefined, eventId, occurredOn });
    this.messageId = messageId;
    this.jsonRawData = jsonRawData;
    this.body = body;
    this.pubblicationDate = pubblicationDate || new Date();
  }

  toPrimitives(): MessageFetchedDomainEventAttributes {
    const { messageId, jsonRawData, body, pubblicationDate } = this;
    return {
      messageId,
      jsonRawData,
      body,
      pubblicationDate,
    };
  }

  static fromPrimitives(params: { attributes: MessageFetchedDomainEventAttributes; eventId: string; occurredOn: Date }): DomainEvent {
    const { attributes, occurredOn, eventId } = params;
    return new WhatsappMessageFetchedDomainEvent({
      eventId,
      jsonRawData: attributes.jsonRawData,
      messageId: attributes.messageId,
      body: attributes.body,
      pubblicationDate: attributes.pubblicationDate,
      occurredOn,
    });
  }
}
