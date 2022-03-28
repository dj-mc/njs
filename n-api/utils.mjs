import fs from 'fs';

function write_to_json(file, data) {
  fs.writeFileSync(file, JSON.stringify(data), 'utf-8', (err) => {
    if (err) {
      console.log(err);
    }
  });
}

function get_post_data(req) {
  return new Promise((resolve, reject) => {
    try {
      let body = '';
      req.on('data', (chunk) => {
        body += chunk.toString();
      });
      req.on('end', () => {
        resolve(body);
      });
    } catch (err) {
      reject(err);
    }
  });
}

export { write_to_json, get_post_data };
