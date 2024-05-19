import { NoticeSourceId } from '../../domain/NoticeSourceId';
import OriginSource from '../../domain/OriginSource/OriginSource';
import { RawJSONDataMessage } from '../../domain/RawJSONDataMessage';
import { NoticeBodyMessage } from '../../domain/NoticeBodyMessage/NoticeBodyMessage';
import { NoticePublicationDate } from '../../domain/NoticePublicationDate';

export interface CreateNoticeRequest {
  from: OriginSource;
  jsonRawData: RawJSONDataMessage;
  externalId: NoticeSourceId;
  body: NoticeBodyMessage;
  pubblicationDate: NoticePublicationDate;
}
