import http from 'http';

function index(req, res) {
  res.writeHead(200, { 'content-type': 'text/html' });
  res.end('\n200\n');
}

const PORT = 8888;

export default http
  .createServer((req, res) => {
    if (req.url === '/') {
      return index(req, res);
    }

    res.writeHead(404, { 'content-type': 'text/html' });
    res.write('\n404\n');
    res.end(http.STATUS_CODES[404]);
  })
  .listen(PORT, () => {
    console.log('Listening on %s', PORT);
  });
