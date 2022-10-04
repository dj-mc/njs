import https from 'https';
import { https_options } from './https-options.mjs';

const PORT = process.env.npm_package_config_port || 8080;

const app = (req, res) => {
  res.writeHead(200, { 'content-type': 'text/html' });
  res.end("What's up?");
};

https.createServer(https_options, app).listen(PORT, () => {
  console.log('Listening on %s', PORT);
});
