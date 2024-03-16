import { DateValueObject } from '../../Shared/domain/value-object/DateValueObject';

export class NoticePublicationDate extends DateValueObject {
  constructor(value: Date) {
    super(value);
  }
}
