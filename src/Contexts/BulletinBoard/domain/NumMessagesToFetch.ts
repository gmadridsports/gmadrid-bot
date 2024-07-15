import { PositiveIntegerValueObject } from '../../Shared/domain/value-object/PositiveIntegerValueObject';

export class NumMessagesToFetch extends PositiveIntegerValueObject {
  static fromString(value: string): NumMessagesToFetch {
    return new NumMessagesToFetch(parseInt(value));
  }
}
