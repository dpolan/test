const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();
const APP_KEY = '4c15b40ed5d5289859ad7836af15d25e';
const mongoose = require('mongoose');
const port = process.env.PORT || 5000;

app.use(cors());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.get('/', (req, res) => {
  res.send('home');
});

const movieSchema = new mongoose.Schema({
  title: String,
  id: String,
  overview: String,
  poster_path: String,
  release_date: String,
  genre_ids: [Number],
  vote_average: Number,
  vote_count: Number,
});

const Movie = mongoose.model('Movie', movieSchema);
const isEmpty = (obj) => {
  for (var prop in obj) {
    if (obj.hasOwnProperty(prop)) return false;
  }
  return true;
};

// Search a movie
app.get('/api/movies', (req, res) => {
  let movieQuery = req.query.search;

  // Search for a specific movie query
  if (movieQuery !== undefined && movieQuery.length) {
    const queryMongo = Movie.find({ title: movieQuery })
      .then((MovieData) => console.log(MovieData))
      .catch((err) => {
        console.log(err);
      });
    if (!isEmpty(queryMongo)) {
      return res.status(200).json(queryMongo);
    } else {
      const request = axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=${APP_KEY}&query=${movieQuery}`
      );

      // Correct response
      request.then((result) => {
        const data = result.data.results.sort((a, b) => {
          a.title.localeCompare(b.title);
        });

        const getNewPost = (item) => new Movie(item);

        const movies = data.slice(0, 10).map(getNewPost);

        //const results = Movie.insertMany(movies)

        res.status(200).json(movies);
      });

      // Error
      request.catch((err) => {
        res.status(500).json(err.message);
      });
    }
  } else {
    // Send an empty response if no query was provided
    res.status(200).json([]);
  }
});

// Add a movie
app.post('/api/movies', async (req, res) => {
  const newMovie = new Movie({
    title: req.body.title,
    id: req.body.id,
    overview: req.body.overview,
    poster_path: req.body.poster_path,
    release_date: req.body.release_date,
    genre_ids: req.body.genre_ids,
    vote_average: req.body.vote_average,
    vote_count: req.body.vote_count,
  });
  try {
    const savedMovie = await newMovie.save();
    res.json(savedMovie);
  } catch (err) {
    res.json(err);
  }
});

// Get a movie by a parameter
app.get('/api/movies/:id', async (req, res) => {
  try {
    const post = await Movie.findById(req.params.id);
    res.json(post);
  } catch (err) {
    res.json({ message: err });
  }
});

// Delete a movie
app.delete('api/movies/:id', async (req, res) => {
  try {
    const removedMovie = await Movie.remove({ title: req.params.id });
    res.json(removedMovie);
  } catch (err) {
    res.json({ message: err });
  }
});

// Update a movie
app.put('api/movies/:id', async (req, res) => {
  try {
    const updatedMovie = await Movie.updateOne(
      { id: req.params.id },
      { $set: { title: req.body.title } }
    );
    res.json(updatedMovie);
  } catch (err) {
    res.json({ message: err });
  }
});

// connect to DB
mongoose.connect(
  'mongodb://lorisW:loris1999@cluster0-y8cg5.mongodb.net/test?retryWrites=true',
  { useNewUrlParser: true },
  () => console.log('connected')
);
// localhost:3003
app.listen(port, () => {
  console.log('Server is up and listening');
});
