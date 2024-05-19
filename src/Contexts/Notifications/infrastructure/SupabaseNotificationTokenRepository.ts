import NotificationType from '../domain/NotificationType';
import { NotificationTokenRepository } from '../domain/NotificationTokenRepository';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import NotificationToken from '../domain/NotificationToken';
import { SupabaseRepositoryConfig } from '../../Shared/infrastructure/supabase/SupabaseRepositoryConfig';
import { EventBus } from '../../Shared/domain/EventBus';

export default class SupabaseNotificationTokenRepository implements NotificationTokenRepository {
  private static readonly TABLE_NAME = 'notification_tokens';
  private static readonly TOKEN_COLUMN_NAME = 'token';
  private static readonly NOTIFICATION_PREFERENCES_COLUMN_NAME = 'preferences';

  private supabase: SupabaseClient;

  constructor(
    private config: SupabaseRepositoryConfig,
    private eventBus: EventBus,
  ) {
    this.supabase = createClient(this.config.url, this.config.key);
  }

  async getTokens(forNotificationType: NotificationType): Promise<Array<NotificationToken>> {
    const { data: tokens, error } = await this.supabase
      .from(SupabaseNotificationTokenRepository.TABLE_NAME)
      .select(`${SupabaseNotificationTokenRepository.TOKEN_COLUMN_NAME}, ${SupabaseNotificationTokenRepository.NOTIFICATION_PREFERENCES_COLUMN_NAME}`)
      .eq(`${SupabaseNotificationTokenRepository.NOTIFICATION_PREFERENCES_COLUMN_NAME}->${forNotificationType.value}`, true);

    if (error) {
      throw new Error(error.message);
    }

    return tokens.map((token: Record<string, unknown>) =>
      NotificationToken.fromPrimitives({
        aggregateId: token[SupabaseNotificationTokenRepository.TOKEN_COLUMN_NAME] as string,
        preferences: token[SupabaseNotificationTokenRepository.NOTIFICATION_PREFERENCES_COLUMN_NAME] as Record<string, boolean>,
      }),
    );
  }

  async save(token: NotificationToken): Promise<void> {
    // in reality, we don't want to save new things, just notify of the changes, like stale token
    const events = token.pullDomainEvents();
    await this.eventBus.publish(events);
  }

  async delete(token: NotificationToken): Promise<void> {
    token.delete();

    await this.supabase
      .from(SupabaseNotificationTokenRepository.TABLE_NAME)
      .delete()
      .eq(`${SupabaseNotificationTokenRepository.TOKEN_COLUMN_NAME}`, token.token);
    const events = token.pullDomainEvents();
    await this.eventBus.publish(events);
  }
}
