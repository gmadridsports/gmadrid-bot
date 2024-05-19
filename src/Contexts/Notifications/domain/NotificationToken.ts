import { AggregateRoot } from '../../Shared/domain/AggregateRoot';
import NotificationTokenId from './NotificationTokenId';
import NotificationType from './NotificationType';
import NotificationTokenExpiredEvent from './NotificationTokenExpiredEvent';
import NotificationDeletedDomainEvent from './NotificationDeletedDomainEvent';

export default class NotificationToken extends AggregateRoot {
  private readonly aggregateId: NotificationTokenId;
  private readonly forNotificationTypes: Array<NotificationType>;

  constructor(tokenId: NotificationTokenId, forNotificationTypes: Array<NotificationType>) {
    super();
    this.aggregateId = tokenId;
    this.forNotificationTypes = forNotificationTypes;
  }

  public get token(): NotificationTokenId {
    return this.aggregateId;
  }

  public markAsExpired(): void {
    this.record(new NotificationTokenExpiredEvent({ aggregateId: this.aggregateId.value }));
  }

  public delete(): void {
    this.record(new NotificationDeletedDomainEvent({ aggregateId: this.aggregateId.value }));
  }

  toPrimitives() {
    throw new Error('Method not implemented.');
  }

  static fromPrimitives(plainData: { aggregateId: string; preferences: Record<string, boolean> }): NotificationToken {
    return new NotificationToken(
      new NotificationTokenId(plainData.aggregateId),
      Object.keys(plainData.preferences)
        .filter((key) => plainData.preferences[key])
        .map((key) => NotificationType.fromValue(key)),
    );
  }
}
