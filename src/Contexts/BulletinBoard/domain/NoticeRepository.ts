import Notice from './Notice';

export interface NoticeRepository {
  save(notice: Notice): Promise<void>;
}
