import { EnumValueObject } from '../../Shared/domain/value-object/EnumValueObject';
import { InvalidArgumentError } from '../../Shared/domain/value-object/InvalidArgumentError';

export enum NotificationTypes {
  TraningWeek = 'training-week',
  Other = 'other',
  BulletinBoard = 'bulletin-board',
}

export default class NotificationType extends EnumValueObject<NotificationTypes> {
  constructor(value: NotificationTypes) {
    super(value, Object.values(NotificationTypes));
  }

  static fromValue(value: string): NotificationType {
    switch (value) {
      case 'training-week':
        return new NotificationType(NotificationTypes.TraningWeek);
      case 'other':
        return new NotificationType(NotificationTypes.Other);
      case 'bulletin-board':
        return new NotificationType(NotificationTypes.BulletinBoard);
      default:
        throw new InvalidArgumentError(`Value not valid: ${value} for NotificationType`);
    }
  }

  protected throwErrorForInvalidValue(value: NotificationTypes): void {
    throw new InvalidArgumentError(`The notification type ${value} is invalid`);
  }
}
