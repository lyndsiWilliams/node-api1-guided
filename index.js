// - 2 -
// import express from 'express';  // ES2015 Modules - NO MORE IMPORT
const express = require('express');  // CommonJS Modules - DO IT THIS WAY
// - 3 -
const server = express();

// MIDDLEWARE
// Teach express how to read JSON from the body
server.use(express.json()); // needed for POST and PUT/PATCH

const Hubs = require('./data/hubs-model.js');

// GET "hello world"
server.get('/', (req, res) => {
  res.json({ hello: 'Web 26' });
});

// GET list of hubs
server.get('/api/hubs', (req, res) => {
  // go and get the hubs from the databaase
  Hubs.find().then(hubs => {
    res.status(200).json(hubs);
  }).catch(err => {
    console.log(err);
    res.status(500).json({ errorMessage: 'oops' });
  });
  res.status(200)
})

// POST a hub
server.post('/api/hubs', (req, res) => {
  // axios.post(url, data, options); <-- The data will be in the body of the request
  const hubInfo = req.body;
  // Validate the data - if the data is valid, save it

  Hubs.add(hubInfo).then(hub => {
    res.status(201).json(hub);
  }).catch(err => {
    console.log(err);
    res.status(500).json({ errorMessage: 'oops' });
  });
  res.status(200)
})

// DELETE
// :id is a banana word, make sure req.params matches
server.delete('/api/hubs/:id', (req, res) => {
  Hubs.remove(req.params.id).then(removed => {
    res.status(200).json(removed);
  }).catch(err => {
    console.log(err);
    res.status(500).json({ errorMessage: 'oops' });
  });
  res.status(200)
})

// PUT
server.put('/api/hubs/:id', (req, res) => {
  const changes = req.body
  Hubs.update(req.params.id, changes)
  .then( change => {
      res.status(200).json(change)
  })
  .catch( err => {
      console.log(err);
      res.status(500).json({ errorMessage: 'oops'})
  })
})

// - 4 -
const port = 5000; 
// - 5 -
server.listen(port, () => console.log(`\n** API on port ${port} \n`));