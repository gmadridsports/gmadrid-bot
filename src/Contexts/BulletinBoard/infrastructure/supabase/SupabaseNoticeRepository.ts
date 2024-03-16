import { createClient } from '@supabase/supabase-js';
import { NoticeRepository } from '../../domain/NoticeRepository';
import Notice from '../../domain/Notice';
import { SupabaseNoticeRepositoryConfig } from './SupabaseNoticeRepositoryConfig';

class SupabaseNoticeRepository implements NoticeRepository {
  constructor(private config: SupabaseNoticeRepositoryConfig) {}

  async save(notice: Notice): Promise<void> {
    const supabase = createClient(this.config.url, this.config.key);

    const noticeToSave = notice.toPrimitives();
    const valuesToWrite = {
      publication_date: noticeToSave.publicationDate,
      is_published: noticeToSave.isPublished,
      source_id: noticeToSave.sourceId,
      origin_source: noticeToSave.originSource,
      body_message: noticeToSave.bodyMessage,
      original_raw_data_message: noticeToSave.originalRawDataMessage,
    };

    const { data, error: readingError } = await supabase
      .from('bulletin_board')
      .select('id')
      .eq('origin_source', noticeToSave.originSource)
      .eq('source_id', noticeToSave.sourceId);

    if (readingError) {
      throw new Error(readingError.message);
      return;
    }

    if (data && data.length > 0) {
      await supabase.from('bulletin_board').update(valuesToWrite).eq('id', data[0].id);
      return;
    }

    const { error: writingError } = await supabase.from('bulletin_board').insert({ id: noticeToSave.id, ...valuesToWrite });
    if (writingError) {
      throw new Error(writingError.message);
    }
  }
}

export default SupabaseNoticeRepository;
