import { CreateNoticeRequest } from './CreateNoticeRequest';
import { NoticeRepository } from '../../domain/NoticeRepository';
import Notice from '../../domain/Notice';
import { NoticeId } from '../../domain/NoticeId';
import { NoticeIsPublished } from '../../domain/NoticeIsPublished';
import { EventBus } from '../../../Shared/domain/EventBus';

class CreatePastNotice {
  constructor(
    private noticeRepository: NoticeRepository,
    private eventBus: EventBus,
  ) {}

  async run({ from, externalId, body, pubblicationDate, jsonRawData }: CreateNoticeRequest): Promise<void> {
    const notice = Notice.createPastNotice(NoticeId.random(), from, externalId, NoticeIsPublished.published(), body, pubblicationDate, jsonRawData);

    await this.noticeRepository.save(notice);
    await this.eventBus.publish(notice.pullDomainEvents());
  }
}

export default CreatePastNotice;
