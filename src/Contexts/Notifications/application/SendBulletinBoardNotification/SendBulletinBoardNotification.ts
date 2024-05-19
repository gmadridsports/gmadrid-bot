import { NotificationTokenRepository } from '../../domain/NotificationTokenRepository';
import NotificationType, { NotificationTypes } from '../../domain/NotificationType';
import Notification from '../../domain/Notification';
import { ExpiredNotificationToken, NotificationService } from '../../domain/NotificationService';
import NotificationId from '../../domain/Id';
import Title from '../../domain/Title';
import Body from '../../domain/Body';
import { SendBulletinBoardNotificationRequest } from './SendBulletinBoardNotificationRequest';
import AppRoute, { AppRoutes } from '../../domain/AppRoute';

class SendBulletinBoardNotification {
  constructor(
    private readonly notificationTokenRepository: NotificationTokenRepository,
    private readonly notificationService: NotificationService,
  ) {}

  async run(request: SendBulletinBoardNotificationRequest): Promise<void> {
    const tokens = await this.notificationTokenRepository.getTokens(new NotificationType(NotificationTypes.BulletinBoard));
    const notification: Notification = Notification.create(
      NotificationId.random(),
      Title.forBulletinBoardNotice(),
      new Body(request.body),
      new AppRoute(AppRoutes.BulletinBoard),
    );

    for (const token of tokens) {
      try {
        await this.notificationService.sendNotification(notification, token);
      } catch (error) {
        if (error instanceof ExpiredNotificationToken) {
          console.error('Expired token, marked to deletion');
          token.markAsExpired();
        } else {
          throw error;
        }
      }
    }

    for (const token of tokens) {
      await this.notificationTokenRepository.save(token);
    }

    return Promise.resolve();
  }
}

export default SendBulletinBoardNotification;
