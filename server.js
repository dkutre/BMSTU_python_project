'use strict';
let express = require('express');
let parser = require('body-parser');
let app = express();
let path = require('path');

app.use(parser.json());

app.use('/libs', express.static('node_modules'));


app.use('/', express.static('public', {maxAge: 1}));

app.use('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.listen(process.env.PORT || 3001, () => {
  console.log(`App started on port ${process.env.PORT || 3001}`);
});
