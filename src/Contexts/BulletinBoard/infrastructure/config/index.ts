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
});

notificationsConfig.loadFile([`${__dirname}/default.json`, `${__dirname}/${notificationsConfig.get('env')}.json`]);
export default notificationsConfig;
