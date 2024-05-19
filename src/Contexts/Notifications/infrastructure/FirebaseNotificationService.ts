import { initializeApp, applicationDefault, App } from 'firebase-admin/app';
import { ExpiredNotificationToken, NotificationService } from '../domain/NotificationService';
import { getMessaging } from 'firebase-admin/messaging';
import Notification from '../domain/Notification';
import NotificationToken from '../domain/NotificationToken';

class FirebaseNotificationService implements NotificationService {
  private readonly firebaseApp: App;

  constructor() {
    this.firebaseApp = initializeApp({
      credential: applicationDefault(),
    });
  }

  async sendNotification(notification: Notification, token: NotificationToken): Promise<void> {
    try {
      await getMessaging().send({
        notification: {
          title: notification.title.value,
          body: notification.body.value,
        },
        data: notification.route !== null ? { requestType: 'screen', fullPath: notification.route.value } : undefined,
        token: token.token.value,
      });
    } catch (e: unknown) {
      const typedError = e as { code?: string; message?: string };
      if (typedError.code?.includes('messaging/registration-token-not-registered')) {
        throw new ExpiredNotificationToken(typedError.message);
      }

      throw e;
    }
  }
}

export default FirebaseNotificationService;
