import { ValueObject } from '../../Shared/domain/value-object/ValueObject';

class Body extends ValueObject<string> {
  static maxLength = 500;

  constructor(value: string) {
    const trimmedValue = value.trim();

    if (trimmedValue.length < Body.maxLength) {
      super(trimmedValue);
      return;
    }

    super(`${trimmedValue.substring(0, Body.maxLength - 3)}...`);
  }
}

export default Body;
