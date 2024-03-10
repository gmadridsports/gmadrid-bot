import { MessagesRepository } from '../domain/MessagesRepository';

class FetchAndPublishNewNotices {
  private readonly messagesRepository: MessagesRepository;

  constructor(messagesRepository: MessagesRepository) {
    this.messagesRepository = messagesRepository;
  }

  async run(): Promise<void> {
    console.log('fetching the new messages...');
    this.messagesRepository.publishNewMessages();

    return Promise.resolve();
  }
}

export default FetchAndPublishNewNotices;
