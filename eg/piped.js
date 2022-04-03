import http from 'http';

// request object -> [ReadableStream][]
// response object -> [WritableStream][]

http
  .createServer((req, res) => {
    req.on('error', (err) => {
      console.error('Request error:', err);
      res.statusCode = 400;
      res.end();
    });
    res.on('error', (err) => {
      console.error('Response error:', err);
    });
    if (req.method === 'POST' && req.url === '/echo') {
      req.pipe(res);
    } else {
      res.statusCode = 404;
      res.end();
    }
  })
  .listen(8080);
