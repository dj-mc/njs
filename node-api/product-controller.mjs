import Product from './product-model.mjs';
import { get_post_data } from './utils.mjs';

export default class ProductController {
  constructor() {}

  // @desc    Find all products, or a specific product of a
  //          given id. Return status 404 if the id cannot
  //          be found.
  // @route   GET /api/products/:id
  static async get_product(req, res, id) {
    try {
      let product_request;
      const is_int = Number.isInteger(Number(id));
      if (is_int) {
        product_request = await Product.find_product(id);
        if (!product_request) {
          res.writeHead(404, { 'content-type': 'application/json' });
          res.end(JSON.stringify({ message: `Couldn't find ${id}` }));
        }
      } else {
        product_request = await Product.find_all();
      }
      res.writeHead(200, { 'content-type': 'application/json' });
      res.end(JSON.stringify(product_request));
    } catch (err) {
      console.log(err);
    }
  }

  // @desc    Create a product and add its data to
  //          products.db.json.
  // @route   POST /api/products
  static async create_product(req, res) {
    try {
      const body = await get_post_data(req);
      const { name, description, price } = JSON.parse(body);
      const proto_product = {
        name,
        description,
        price
      };
      const new_product = await Product.create_new(proto_product);
      res.writeHead(201, { 'content-type': 'application/json' });
      res.end(JSON.stringify(new_product));
    } catch (err) {
      console.log(err);
    }
  }

  // @desc    Update a product and modify its data in
  //          products.db.json.
  // @route   PUT /api/products/:id
  static async update_product(req, res, id) {
    try {
      const product_request = await Product.find_product(id);
      if (!product_request) {
        res.writeHead(404, { 'content-type': 'application/json' });
        res.end(JSON.stringify({ message: `Couldn't find ${id}` }));
      } else {
        const body = await get_post_data(req);
        const { name, description, price } = JSON.parse(body);
        const proto_product = {
          name: name || product_request.name,
          description: description || product_request.description,
          price: price || product_request.price
        };
        const put_product = await Product.put(id, proto_product);
        res.writeHead(200, { 'content-type': 'application/json' });
        res.end(JSON.stringify(put_product));
      }
    } catch (err) {
      console.log(err);
    }
  }

  // @desc    Delete a product and remove its data from
  //          products.db.json.
  // @route   DELETE /api/products/:id
  static async delete_product(req, res, id) {
    try {
      const product_request = await Product.find_product(id);
      if (!product_request) {
        res.writeHead(404, { 'content-type': 'application/json' });
        res.end(JSON.stringify({ message: `Couldn't find ${id}` }));
      } else {
        await Product.del(id);
        res.writeHead(200, { 'content-type': 'application/json' });
        res.end(JSON.stringify({ message: `Product ${id} deleted` }));
      }
    } catch (err) {
      console.log(err);
    }
  }
}
