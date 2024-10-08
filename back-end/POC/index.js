const express = require('express');

const app = express();
const port = 8080;

app.get('/', (req, res) => {
  res.status(200).send('Welcome to Area51');
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
