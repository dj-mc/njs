import express from 'express';
import { readFile } from 'fs';
import { readFile as rf } from 'fs/promises';

const app = express();

app.get('/', async (req, res) => {
  res.send(await rf('./home.html', 'utf-8'));
});

app.get('/asdf', (req, res) => {
  readFile('./asdf.html', 'utf-8', (err, data) => {
    if (err) res.status(500).send('err: 500');
    res.send(data);
  });
});

app.listen(8080, () => {
  console.log('Listening on 8080');
});
