import { MessagesRepository } from '../domain/MessagesRepository';
import { NumMessagesToFetch } from '../domain/NumMessagesToFetch';

class FetchAndPublishNewNotices {
  private readonly messagesRepository: MessagesRepository;

  constructor(messagesRepository: MessagesRepository) {
    this.messagesRepository = messagesRepository;
  }

  async run(previousMessagesToFetch?: NumMessagesToFetch): Promise<void> {
    console.log('fetching the new messages...');
    this.messagesRepository.publishNewMessages(previousMessagesToFetch);

    return Promise.resolve();
  }
}

export default FetchAndPublishNewNotices;
