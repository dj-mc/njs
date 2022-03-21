import url from 'url';
import path from 'path';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import fs from 'fs';

const https_options = {
  key: fs.readFileSync(path.resolve(__dirname, '../https/.conf/private_server_key.pem')),
  cert: fs.readFileSync(path.resolve(__dirname, '../https/.conf/cert.pem'))
};

console.log(https_options);

export { https_options };
