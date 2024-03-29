import express from 'express';
import urlencoded from 'body-parser/lib/types/urlencoded.js';

const app = express();
const user_posts = [];

app.listen(9006);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
  res.send('tiny blog');
});

app.post('/send', urlencoded({ extended: true }), (req, res) => {
  console.log(req.body);
  if (req.body && req.body.user_post) {
    user_posts.push(req.body.user_post);
    res.send({ status: 'ok', message: 'Post received' });
  } else {
    res.send({ status: 'err', message: 'Nothing found' });
  }
});

app.get('/user_posts', (req, res) => {
  res.send(user_posts);
});
