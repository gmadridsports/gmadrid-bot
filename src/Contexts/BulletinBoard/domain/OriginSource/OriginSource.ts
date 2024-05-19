import { InvalidArgumentError } from '../../../Shared/domain/value-object/InvalidArgumentError';
import { EnumValueObject } from '../../../Shared/domain/value-object/EnumValueObject';
import WhatsappParser from './WhatsappParser';
import Parser from './Parser';

export enum OriginSources {
  WHATSAPP = 'whatsapp',
}

const Parsers: { [key in OriginSources]: Parser } = {
  [OriginSources.WHATSAPP]: new WhatsappParser(),
};

export default class OriginSource extends EnumValueObject<OriginSources> {
  get parser(): Parser {
    return Parsers[this.value];
  }

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
