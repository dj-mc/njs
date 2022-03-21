import https from 'https';
import { https_options } from './https-options.js';
import dotenv from 'dotenv';

const cnf = dotenv.config();
if (cnf.error) {
  throw cnf.error;
}

const PORT = process.env.PORT;

const app = (req, res) => {
  res.writeHead(200, { 'content-type': 'text/html' });
  res.end("What's up?");
};

https.createServer(https_options, app).listen(PORT, () => {
  console.log('Listening on %s', PORT);
});
