import { StringValueObject } from '../../Shared/domain/value-object/StringValueObject';

export class NoticeSourceId extends StringValueObject {
  constructor(value: string) {
    super(value);
  }

  static from(sourceID: string): NoticeSourceId {
    return new NoticeSourceId(sourceID);
  }
}
