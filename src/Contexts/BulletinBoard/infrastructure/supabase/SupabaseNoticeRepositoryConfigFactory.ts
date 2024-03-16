import config from '../../../Shared/infrastructure/config';
import { SupabaseNoticeRepositoryConfig } from './SupabaseNoticeRepositoryConfig';

export class SupabaseNoticeRepositoryConfigFactory {
  static createConfig(): SupabaseNoticeRepositoryConfig {
    console.log('createConfig called');
    return {
      url: config.get('supabase.url'),
      key: config.get('supabase.key'),
    };
  }
}
