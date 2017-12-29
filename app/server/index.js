//index.js

import app from './app';
const MongoClient    = require('mongodb').MongoClient;
const db = require('./config/db');

const port = process.env.PORT || 8000;

MongoClient.connect(db.url, (err, database) => {
  if (err) return console.log(err)
  require('./routes')(app, database);

  app.listen(port, () => {
    console.log('We are live on ' + port);
  });               
})