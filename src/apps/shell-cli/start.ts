import CommandLineApp from './CommandLineApp';

try {
  new CommandLineApp().start();
} catch (e) {
  console.log(e);
  process.exit(1);
}

process.on('uncaughtException', (err) => {
  console.log('uncaught exception: ', err);
  process.exit(1);
});
