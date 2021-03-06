const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');
const sequelizeConnection = require('./db');
const Song = require('./models/song-model');
const Artist = require('./models/artist-model');

//body-parser middleware adds .body property to req (if we make a POST AJAX request with some data attached, that data will be accessible as req.body)
app.use(bodyParser.urlencoded({ extended: true }));

//listen on port 8888
app.listen('8888', () => console.log('Listening on port 8888'));

//serve all of the HTML views, which we'll eventually use to build a simple user interface
app.get('/view/all-songs', (req, res) => {res.sendFile(path.join(__dirname, '/views/all-songs.html'))});
app.get('/view/all-artists', (req, res) => {res.sendFile(path.join(__dirname, '/views/all-artists.html'))});
app.get('/view/artists-search', (req, res) => {res.sendFile(path.join(__dirname, '/views/artists-search.html'))});
app.get('/view/youtube-search', (req, res) => {res.sendFile(path.join(__dirname, '/views/youtube-search.html'))});

// ONE
app.get('/api/songs', (req,res) => {
  Song.findAll({
    include : [Artist]
  })
    .then((data) =>{
      console.log(data);
      res.send(data);
    })
})

// TWO
// app.get('/api/songs/id/:id', (req, res) => {
//   Song.findById(req.params.id)
//     .then((data) => {
//       console.log(data);
//       res.send(data);
//     })
// })

// TWO
app.get('/api/songs/id/:id', (req, res) => {
  Song.findAll({
    include: [Artist],
    where: {
      id: req.params.id
    }
  })
  .then((data) => {
    res.send(data)
  })
})

// THREE
app.get('/api/songs/name/:name', (req, res) => {
  Song.findAll({
    include: [Artist],
<<<<<<< HEAD
    where: {
      title: req.params.name
    }
  })
  .then((data) => {
    res.send(data)
  })
})

// FOUR
app.get('/api/songs/sort/by-date', (req,res) => {
  Song.findAll({
    include: [Artist],
    order: '"createdAt" DESC'
  })
  .then((data) => {
    res.send(data)
  })
})

// FIVE
app.get('/api/songs/sort/a-z', (req, res) => {
  Song.findAll({
    include: [Artist],
    order: "title"
  })
  .then((data) => {
    res.send(data)
  })
})

// SIX
app.get('/api/count', (req, res) => {
  Song.count({
    include: [Artist]
  })
  .then((data) => {
    console.log(data)
  })
})

// SEVEN
app.get('/api/songs/first-five', (req, res) => {
  Song.findAll({
    include: [Artist],
    order: ["createdAt"],
    limit: 5
  })
  .then((data) => {
    res.send(data)
  })
})

// EIGHT
app.get('/api/artists', (req, res) => {
  Artist.findAll()
  .then((data) => {
    res.send(data)
  })
})

// NINE
app.get('/api/artists/a-z', (req, res) => {
  Artist.findAll({
    order: "name"
  })
  .then((data) => {
    res.send(data)
  })
})

// TEN
app.get('/api/artists/id/:id', (req, res) => {
  Artist.findAll({
    where: {
      id: req.params.id
    }
  })
  .then((data) => {
    res.send(data)
  })
})

// ELEVEN
app.get('/api/artists/name/:name', (req, res) => {
  Artist.findAll({
    where:{
      title: req.params.name
    }
  })
    .then((data) => {
      res.send(data);
    })
})

// TWELVE
app.get('/api/artists/no-jungle' , (req,res)=>{
  Artist.findAll({
    where: {
      name: {
        $not : ['Jungle']
        }
      }
    })
    .then((data) =>{
      res.send(data);
    })
})

// THIRTEEN
app.get('/api/songs-with-artists', (req, res) => {
  Song.findAll({
    include: [Artist]
  })
  .then((data) => {
    res.send(data)
  })
})

// FIFTEEN
app.get('/api/artists/frank-or-chromeo', (req, res) => {
  Song.findAll({
    include: [{
      model: Artist,
      where: {
        $or: [
          {name: 'Frank Ocean'},
          {name: 'Chromeo'}
        ]
      }
    }]
  })
  .then((data) => {
    res.send(data)
  })
})

// SIXTEEN
app.post('/api/artists', (req,res) => {
  Artist.create({name:req.body.name})
    .then((data)=> {
        res.send(data);
    })
})

// SEVENTEEN
app.delete('/api/artists/:id', (req,res) => {
  Artist.findById(req.params.id)
    .then(artist => {
      artist.destroy();
    })
    .then(data => {
        res.send(data);
    })
})

// EIGHT
app.put('/api/artists/:id', (req,res) =>{
  Artist.findById(req.params.id)
  .then(artist => {
  artist.update({name: "Chanice"})
  })
  .then(data => {
    res.send(data);
  })
})

// NINETEEN
