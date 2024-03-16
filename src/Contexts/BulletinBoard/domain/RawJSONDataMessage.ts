import { JSONDataValueObject } from '../../Shared/domain/value-object/JSONDataValueObject';
import { PrimitivesBag } from '../../Shared/domain/value-object/ValueObject';
import { InvalidArgumentError } from '../../Shared/domain/value-object/InvalidArgumentError';

export class RawJSONDataMessage extends JSONDataValueObject {
  constructor(value: PrimitivesBag) {
    super(value);
  }

  static fromJsonRawData(rawData: string): RawJSONDataMessage {
    try {
      const parsed = JSON.parse(rawData);
      return new RawJSONDataMessage(parsed);
    } catch (error) {
      throw new InvalidArgumentError('Invalid data');
    }
  }
}
