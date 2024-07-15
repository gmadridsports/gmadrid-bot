import { NumMessagesToFetch } from './NumMessagesToFetch';

export interface MessagesRepository {
  publishNewMessages(previousQuantity?: NumMessagesToFetch): void;
}
