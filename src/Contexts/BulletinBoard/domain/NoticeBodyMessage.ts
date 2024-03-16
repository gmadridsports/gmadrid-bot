import { ValueObject } from '../../Shared/domain/value-object/ValueObject';

export class NoticeBodyMessage extends ValueObject<string> {
  constructor(value: string) {
    super(value);
  }

  static from(rawData: string): NoticeBodyMessage {
    return new NoticeBodyMessage(rawData);
  }
}
