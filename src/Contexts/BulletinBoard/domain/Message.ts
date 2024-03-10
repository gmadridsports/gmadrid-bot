import { AggregateRoot } from '../../Shared/domain/AggregateRoot';

class Message extends AggregateRoot {
  private body: string;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  toPrimitives(): any {}

  private constructor(body: string) {
    super();
    this.body = body;
  }

  static fromPrimitives(body: string): Message {
    return new Message(body);
  }
}

export default Message;
