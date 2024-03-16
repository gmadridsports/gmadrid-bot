import { ValueObject } from '../../Shared/domain/value-object/ValueObject';

export class NoticeIsPublished extends ValueObject<boolean> {
  constructor(value: boolean) {
    super(value);
  }

  public static published(): NoticeIsPublished {
    return new NoticeIsPublished(true);
  }
}
