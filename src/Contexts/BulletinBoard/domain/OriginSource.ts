import { InvalidArgumentError } from '../../Shared/domain/value-object/InvalidArgumentError';
import { EnumValueObject } from '../../Shared/domain/value-object/EnumValueObject';

export enum OriginSources {
  WHATSAPP = 'whatsapp',
}

export default class OriginSource extends EnumValueObject<OriginSources> {
  constructor(value: OriginSources) {
    super(value, Object.values(OriginSources));
  }

  static fromValue(value: string): OriginSource {
    switch (value) {
      case 'whatsapp':
        return new OriginSource(OriginSources.WHATSAPP);
      default:
        throw new InvalidArgumentError(`Value not valid: ${value} for OriginSource`);
    }
  }

  protected throwErrorForInvalidValue(value: OriginSources): void {
    throw new InvalidArgumentError(`The origin source ${value} is invalid`);
  }
}
