const express = require('express');
const body_parser = require('body-parser');
const _ = require('lodash');


const app = express();
app.use(body_parser.urlencoded ({ extended: true }));

app.get('/', (req, res) => {
  res.send('Hello World!');
}).listen(3000, () => {
  console.log('Example app listening on port 3000!');
})