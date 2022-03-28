import db from './products.db.json';
import { write_to_json } from './utils.mjs';
import { v4 as uuidv4 } from 'uuid';

export default class Product {
  constructor() {}

  static find_all() {
    return new Promise((resolve, reject) => {
      resolve(db);
    });
  }

  static find_product(id) {
    return new Promise((resolve, reject) => {
      resolve(db.find((p) => p.id === id));
    });
  }

  static create_new(product) {
    return new Promise((resolve, reject) => {
      const new_product = { id: uuidv4(), ...product };
      db.push(new_product);
      write_to_json('./products.db.json', db);
      resolve(new_product);
    });
  }

  static put(id, new_product_data) {
    return new Promise((resolve, reject) => {
      const idx = db.findIndex((p) => p.id === id);
      db[idx] = { id, ...new_product_data };
      write_to_json('./products.db.json', db);
      resolve(db[idx]);
    });
  }

  static del(id) {
    return new Promise((resolve, reject) => {
      let filtered_db = db.filter((p) => p.id !== id);
      write_to_json('./products.db.json', filtered_db);
      resolve();
    });
  }
}
