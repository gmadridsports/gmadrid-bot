import NotificationType from './NotificationType';
import NotificationToken from './NotificationToken';

export interface NotificationTokenRepository {
  getTokens(forNotificationType: NotificationType): Promise<Array<NotificationToken>>;
  save(token: NotificationToken): Promise<void>;
  delete(token: NotificationToken): Promise<void>;
}
