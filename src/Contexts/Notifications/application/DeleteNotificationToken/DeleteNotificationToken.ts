import { NotificationTokenRepository } from '../../domain/NotificationTokenRepository';
import { DeleteNotificationTokenRequest } from './DeleteNotificationTokenRequest';
import NotificationToken from '../../domain/NotificationToken';

class DeleteNotificationToken {
  constructor(private readonly notificationTokenRepository: NotificationTokenRepository) {}

  async run(request: DeleteNotificationTokenRequest): Promise<void> {
    const token: NotificationToken = NotificationToken.fromPrimitives({
      aggregateId: request.notificationTokenId,
      preferences: {},
    });

    await this.notificationTokenRepository.delete(token);
  }
}

export default DeleteNotificationToken;
