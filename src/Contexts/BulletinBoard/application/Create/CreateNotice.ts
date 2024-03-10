// import { NoticeRepository } from '../../domain/NoticeRepository';

import { CreateNoticeRequest } from './CreateNoticeRequest';

class CreateAndPublishNewNotice {
  // private readonly messagesRepository: NoticeRepository;

  // constructor(messagesRepository: MessagesRepository) {
  //   this.messagesRepository = messagesRepository;
  // }
  constructor() {}

  async run(request: CreateNoticeRequest): Promise<void> {
    console.log('Publishing a new notice on the bulletin board.');
    console.log(request);
    // this.messagesRepository.publishNewMessages();

    return Promise.resolve();
  }
}

export default CreateAndPublishNewNotice;
