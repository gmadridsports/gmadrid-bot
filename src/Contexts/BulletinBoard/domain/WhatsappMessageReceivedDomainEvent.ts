import { DomainEvent } from '../../Shared/domain/DomainEvent';

type MessageReceivedDomainEventAttributes = {
  messageId: string;
  jsonRawData: string;
  body: string;
  pubblicationDate: Date;
};

export class WhatsappMessageReceivedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME = 'bulletin_board.whatsapp_message_received';

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
    super({ eventName: WhatsappMessageReceivedDomainEvent.EVENT_NAME, aggregateId: undefined, eventId, occurredOn });
    this.messageId = messageId;
    this.jsonRawData = jsonRawData;
    this.body = body;
    this.pubblicationDate = pubblicationDate || new Date();
  }

  toPrimitives(): MessageReceivedDomainEventAttributes {
    const { messageId, jsonRawData, body, pubblicationDate } = this;
    return {
      messageId,
      jsonRawData,
      body,
      pubblicationDate,
    };
  }

  static fromPrimitives(params: { attributes: MessageReceivedDomainEventAttributes; eventId: string; occurredOn: Date }): DomainEvent {
    const { attributes, occurredOn, eventId } = params;
    return new WhatsappMessageReceivedDomainEvent({
      eventId,
      jsonRawData: attributes.jsonRawData,
      messageId: attributes.messageId,
      body: attributes.body,
      pubblicationDate: attributes.pubblicationDate,
      occurredOn,
    });
  }
}
