import { createClient } from '@supabase/supabase-js';
import { NoticeRepository } from '../../domain/NoticeRepository';
import Notice from '../../domain/Notice';
import { SupabaseRepositoryConfig } from '../../../Shared/infrastructure/supabase/SupabaseRepositoryConfig';

class SupabaseNoticeRepository implements NoticeRepository {
  constructor(private config: SupabaseRepositoryConfig) {}

  async save(notice: Notice): Promise<void> {
    const supabase = createClient(this.config.url, this.config.key);

    const noticeToSave = notice.toPrimitives();
    const options: Intl.DateTimeFormatOptions = {
      hourCycle: 'h23',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      // hour12: false,
    };
    const publicationDate = noticeToSave.publicationDate.toLocaleString('en-US', options).replace(/,/g, '');
    const valuesToWrite = {
      publication_date: publicationDate,
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
      console.error(readingError);
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
