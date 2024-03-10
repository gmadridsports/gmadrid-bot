import convict from 'convict';

const notificationsConfig = convict({
  env: {
    doc: 'The application environment.',
    format: ['production', 'development', 'test'],
    default: 'development',
    env: 'NODE_ENV',
  },
  supabaseUrl: {
    doc: 'The Supabase URL.',
    format: String,
    default: 'http://localhost:8000',
    env: 'SUPABASE_URL',
  },
  whatsappChannelId: {
    doc: 'The WhatsApp channel ID to listen for the notices.',
    format: String,
    default: '34638782987-1599067857@g.us',
    env: 'WHATSAPP_CHANNEL_ID',
  },
});

notificationsConfig.loadFile([`${__dirname}/default.json`, `${__dirname}/${notificationsConfig.get('env')}.json`]);
export default notificationsConfig;
