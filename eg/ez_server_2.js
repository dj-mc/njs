import http from 'http';

const routes = {
  '/': function index(req, res) {
    res.writeHead(200, { 'content-type': 'text/html' });
    res.end('We have 200 origami cranes.');
  },
  '/foo': function foo(req, res) {
    res.writeHead(200, { 'content-type': 'text/html' });
    res.end('200\n');
  }
};

const PORT = 8888;

export default http
  .createServer((req, res) => {
    if (req.url in routes) {
      return routes[req.url](req, res);
    }

    res.writeHead(404, { 'content-type': 'text/html' });
    res.write('404\n');
    res.end(http.STATUS_CODES[404]);
  })
  .listen(PORT, () => {
    console.log('Listening on %s', PORT);
  });
