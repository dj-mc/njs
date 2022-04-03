import express from 'express';

const app = express();
app.use(express.json());

const PORT = 8080;

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});

const graphic_tshirt = {
  size: 'medium',
  tshirt: 'graphic'
};

app.get('/tshirt', (req, res) => {
  res.status(200).send(graphic_tshirt);
});

app.post('/tshirt/:id', (req, res) => {
  const { id } = req.params;
  const { logo } = req.body;

  if (!logo) {
    res.status(418).send({ message: 'No logo found' });
  }

  res.send({
    tshirt: `${id} and ${logo}`
  });
});
