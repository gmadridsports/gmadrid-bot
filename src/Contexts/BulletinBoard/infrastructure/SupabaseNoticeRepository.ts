import { NoticeRepository } from '../domain/NoticeRepository';
import Notice from '../domain/Notice';

class SupabaseNoticeRepository implements NoticeRepository {
  async save(notice: Notice): Promise<void> {
    console.log(notice);
    throw new Error('Method not implemented.');
    // todo implement this
    // const { data, error } = await supabase.from('notices').insert(notice);
    // if (error) {
    //   throw new Error(error.message);
    // }
  }
}

export default SupabaseNoticeRepository;
