import Message from './Message';

export interface MessagesRepository {
  publishNewMessages(): Promise<Message[]>;
}
