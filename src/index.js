import http from 'http';

let app = require('./server').default;

const server = http.createServer(app);

let currentApp = app;
const port = process.env.PORT || 3000
server.listen(port, error => {
  if (error) {
    console.log(error);
    process.exit(1);
    return;
  }

  console.log(`🚀 started on port:${port}`);
});

if (module.hot) {
  console.log('✅  Server-side HMR Enabled!');

  module.hot.accept('./server', () => {
    console.log('🔁  HMR Reloading `./server`...');

    try {
      app = require('./server').default;
      server.removeListener('request', currentApp);
      server.on('request', app);
      currentApp = app;
    } catch (error) {
      console.error(error);
    }
  });
}
