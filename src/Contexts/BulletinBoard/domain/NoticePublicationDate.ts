import { DateValueObject } from '../../Shared/domain/value-object/DateValueObject';

export class NoticePublicationDate extends DateValueObject {
  constructor(value: Date) {
    super(value);
  }

  toString(): string {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    };

    return this.value.toLocaleString('en-US', options).replace(/,/g, '');
  }
}
