import http from 'http';
import ProductController from './product-controller.mjs';

const server = http.createServer((req, res) => {
  console.log('A get request will hang until responded to,');
  console.log('but these logs are triggered regardless.');

  if (req.url === '/api/products') {
    if (req.method === 'GET') ProductController.get_product(req, res);
    if (req.method === 'POST') ProductController.create_product(req, res);
  } else if (req.url.match(/\/api\/products\/\w+/)) {
    const id = req.url.split('/')[3];
    if (req.method === 'GET') ProductController.get_product(req, res, id);
    if (req.method === 'PUT') ProductController.update_product(req, res, id);
    if (req.method === 'DELETE') ProductController.delete_product(req, res, id);
  } else {
    res.writeHead(404, { 'content-type': 'application/json' });
    res.end(JSON.stringify({ message: 'Route not found' }));
  }
});

server.listen(8080, () => console.log('Server is live'));
