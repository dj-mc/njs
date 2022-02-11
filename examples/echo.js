import http from 'http';

http
  .createServer((req, res) => {
    if (req.method === 'POST' && req.url === '/echo') {
      let body = [];
      req
        .on('data', (chunk) => {
          body.push(chunk);
        })
        .on('end', () => {
          body = Buffer.concat(body).toString();
          res.end(body);
        });
    } else {
      res.statusCode = 404;
      res.end();
    }
  })
  .listen(8080);
