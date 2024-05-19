import { ValueObject } from '../../../Shared/domain/value-object/ValueObject';
import OriginSource from '../OriginSource/OriginSource';

export class NoticeBodyMessage extends ValueObject<string> {
  constructor(value: string) {
    super(value);
  }

  static from(rawData: string, origin: OriginSource): NoticeBodyMessage {
    return new NoticeBodyMessage(origin.parser.parse(rawData));
  }
}
