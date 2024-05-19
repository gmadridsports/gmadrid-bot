import { EnumValueObject } from '../../Shared/domain/value-object/EnumValueObject';

export enum AppRoutes {
  TrainingCalendar = '/member-app/training-calendar',
  BulletinBoard = '/member-app/bulletin-board',
  Profile = '/member-app/profile',
}

class AppRoute extends EnumValueObject<AppRoutes> {
  constructor(value: AppRoutes) {
    super(value, Object.values(AppRoutes));
  }

  protected throwErrorForInvalidValue(value: AppRoutes): void {
    throw new Error(`The route ${value} is invalid`);
  }
}

export default AppRoute;
