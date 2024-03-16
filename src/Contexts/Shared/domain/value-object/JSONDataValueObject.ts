import { PrimitivesBag, ValueObject } from './ValueObject';
import { InvalidArgumentError } from './InvalidArgumentError';

export class JSONDataValueObject extends ValueObject<PrimitivesBag> {
  constructor(value: PrimitivesBag) {
    super(value);
    this.ensureJSONDataIsValid(value);
  }

  static fromJSON(value: PrimitivesBag): JSONDataValueObject {
    return new JSONDataValueObject(value);
  }

  static fromString(value: string): JSONDataValueObject {
    return new JSONDataValueObject(JSON.parse(value));
  }

  toString(): string {
    return JSON.stringify(this.value);
  }

  private ensureJSONDataIsValid(value: Record<string, unknown>): void {
    try {
      JSON.parse(JSON.stringify(value));
    } catch (error) {
      console.log(error);
      throw new InvalidArgumentError('Invalid data');
    }
  }
}
