import convict from 'convict';

const notificationsConfig = convict({
  env: {
    doc: 'The application environment.',
    format: ['prod', 'dev', 'test'],
    default: 'dev',
    env: 'NODE_ENV',
  },
  supabase: {
    url: {
      doc: 'The Supabase URL.',
      format: String,
      default: 'http://127.0.0.1:54321',
      env: 'SUPABASE_URL',
    },
    key: {
      doc: 'The Supabase key.',
      format: String,
      default: 'super-secret-jwt-token-with-at-least-32-characters-long',
      env: 'SUPABASE_KEY',
    },
  },
  whatsapp: {
    channelId: {
      doc: 'The WhatsApp channel ID to listen for the notices.',
      format: String,
      default: '34638782987-1599067857@g.us',
      env: 'WHATSAPP_CHANNEL_ID',
    },
    pageUrl: {
      doc: 'The WhatsApp page url to load the QR code.',
      format: String,
      default: 'https://github.com/wppconnect-team/wa-version/blob/main/html/2.3000.1014801647-alpha.html',
      env: 'WHATSAPP_PAGE_URL',
    },
  },
  firebase: {
    key: {
      doc: 'Firebase key path to access the push notifications',
      format: String,
      default: '',
      env: 'GOOGLE_APPLICATION_CREDENTIALS_PATH',
    },
  },
});
console.log(`${__dirname}/${notificationsConfig.get('env')}.json`);
notificationsConfig.loadFile([`${__dirname}/default.json`, `${__dirname}/${notificationsConfig.get('env')}.json`]);
export default notificationsConfig;
