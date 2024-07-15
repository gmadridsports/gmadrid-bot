import { ValueObject } from './ValueObject';

export abstract class PositiveIntegerValueObject extends ValueObject<number> {
  private ensureValueIsInteger(): void {
    if (this.value % 1 !== 0) {
      throw new Error('Value must be an integer');
    }
  }

  private ensureValueIsPositive(): void {
    if (this.value < 0) {
      throw new Error('Value must be positive');
    }
  }

  constructor(value: number) {
    super(value);
    this.ensureValueIsInteger();
    this.ensureValueIsPositive();
  }
}
