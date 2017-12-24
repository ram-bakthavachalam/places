// routes/node_routes.js

var ObjectID = require('mongodb').ObjectID;

module.exports = function(app, db) {

  // READ places for list view
  app.get('/places', (req, res) => {
    const state = req.params.state; 
    const details = { 'state': state };
    db.collection('places').find({},details).toArray((err, item) =>{
      if (err) {
        res.send({'error':'An error has occurred'});
      } else {
        res.send(item);
      }
    });
  });

  // READ one place
  app.get('/places/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    db.collection('places').findOne(details, (err, item) => {
      if (err) {
        res.send({'error':'An error has occurred'});
      } else {
        res.send(item);
      }
    });
  });

  // CREATE one place
  app.post('/places', (req, res) => {
    const place = { 
      name: req.body.name, 
      shortdescription: req.body.shortdescription,
      longdescription: req.body.longdescription,  
      crowdrank: req.body.crowdrank,
      city: req.body.city,
      state: req.body.state,
      country: req.body.country,
      zipcode: req.body.zipcode
    };
    // Validate before creating
    const details = { 'name': place.name };
    db.collection('places').findOne(details, (err, item) => {
      if (err) {
        res.send({'error':'An error has occurred'});
      } else {
        if(null != item){
          res.send("Place already exists in the system wiht id :: "+item._id);
        }
        else{
          db.collection('places').insert(place, (err, result) => {
            if (err) { 
              res.send({ 'error': 'An error has occurred' }); 
            } else {
              res.send(result.ops[0]);
            }
          });
        }
      }
    });

  });

  // DELETE one place
  app.delete('/places/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    db.collection('places').remove(details, (err, item) => {
      if (err) {
        res.send({'error':'An error has occurred'});
      } else {
        res.send('Place ' + id + ' deleted!');
      } 
    });
  });

  // UPDATE one place
  app.put('/places/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    const place = { name: req.body.name, shortdescription: req.body.shortdescription, crowdrank: req.body.crowdrank };
    db.collection('notes').update(details, note, (err, result) => {
      if (err) {
          res.send({'error':'An error has occurred'});
      } else {
          res.send(note);
      } 
    });
  });
  
};