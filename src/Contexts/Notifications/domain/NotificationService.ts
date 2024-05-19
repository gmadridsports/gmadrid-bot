import NotificationToken from './NotificationToken';
import Notification from './Notification';

export class ExpiredNotificationToken extends Error {}

export interface NotificationService {
  /**
   * @throws ExpiredNotificationToken
   */
  sendNotification(notification: Notification, notificationToken: NotificationToken): Promise<void>;
}
