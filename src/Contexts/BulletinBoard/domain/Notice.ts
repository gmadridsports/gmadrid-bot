import { NoticeId } from './NoticeId';
import { AggregateRoot } from '../../Shared/domain/AggregateRoot';
import OriginSource from './OriginSource/OriginSource';
import { NoticePublicationDate } from './NoticePublicationDate';
import { NoticeIsPublished } from './NoticeIsPublished';
import { NoticeSourceId } from './NoticeSourceId';
import { RawJSONDataMessage } from './RawJSONDataMessage';
import { NoticeBodyMessage } from './NoticeBodyMessage/NoticeBodyMessage';
import { NoticeCreatedDomainEvent } from './NoticeCreatedDomainEvent';
import { PastNoticeCreatedDomainEvent } from './PastNoticeCreatedDomainEvent';

class Notice extends AggregateRoot {
  private readonly id: NoticeId;
  private readonly publicationDate: NoticePublicationDate;
  private readonly isPublished: NoticeIsPublished;
  private readonly sourceId: NoticeSourceId;
  private readonly originSource: OriginSource;
  private readonly bodyMessage: NoticeBodyMessage;
  private readonly originalRawDataMessage: RawJSONDataMessage;

  constructor(
    id: NoticeId,
    originSource: OriginSource,
    sourceId: NoticeSourceId,
    isPublished: NoticeIsPublished,
    body: NoticeBodyMessage,
    publicationDate: NoticePublicationDate,
    originalRawDataMessage: RawJSONDataMessage,
  ) {
    super();
    this.id = id;
    this.originSource = originSource;
    this.sourceId = sourceId;
    this.isPublished = isPublished;
    this.bodyMessage = body;
    this.publicationDate = publicationDate;
    this.originalRawDataMessage = originalRawDataMessage;
  }

  static create(
    id: NoticeId,
    originSource: OriginSource,
    sourceId: NoticeSourceId,
    isPublished: NoticeIsPublished,
    body: NoticeBodyMessage,
    publicationDate: NoticePublicationDate,
    originalRawDataMessage: RawJSONDataMessage,
  ): Notice {
    const notice = new Notice(id, originSource, sourceId, isPublished, body, publicationDate, originalRawDataMessage);

    notice.record(
      new NoticeCreatedDomainEvent({
        aggregateId: id.value,
        body: body.value,
      }),
    );

    return notice;
  }

  static createPastNotice(
    id: NoticeId,
    originSource: OriginSource,
    sourceId: NoticeSourceId,
    isPublished: NoticeIsPublished,
    body: NoticeBodyMessage,
    publicationDate: NoticePublicationDate,
    originalRawDataMessage: RawJSONDataMessage,
  ): Notice {
    const notice = new Notice(id, originSource, sourceId, isPublished, body, publicationDate, originalRawDataMessage);

    notice.record(
      new PastNoticeCreatedDomainEvent({
        aggregateId: id.value,
        body: body.value,
      }),
    );

    return notice;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  toPrimitives(): any {
    return {
      id: this.id.value,
      originSource: this.originSource.value,
      isPublished: this.isPublished.value,
      sourceId: this.sourceId.value,
      bodyMessage: this.bodyMessage.value,
      publicationDate: this.publicationDate.value,
      originalRawDataMessage: this.originalRawDataMessage.value,
    };
  }
}

export default Notice;
