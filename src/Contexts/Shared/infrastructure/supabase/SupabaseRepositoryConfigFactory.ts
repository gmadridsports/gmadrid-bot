import config from '../../../Shared/infrastructure/config';
import { SupabaseRepositoryConfig } from './SupabaseRepositoryConfig';

export class SupabaseRepositoryConfigFactory {
  static createConfig(): SupabaseRepositoryConfig {
    return {
      url: config.get('supabase.url'),
      key: config.get('supabase.key'),
    };
  }
}
