const express = require('express');
const cors = require('cors');
const axios = require('axios')
const app = express();
const APP_KEY = "4c15b40ed5d5289859ad7836af15d25e";
const mongoose= require('mongoose');
const port = process.env.PORT || 5000;

app.use(cors());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.get('/', (req,res) => {
    res.send('home')
})

const movieSchema = new mongoose.Schema({
  title:  String,
  id: String,
  overview:   String,
  poster_path : String,
  release_date: String,
  genre_ids: [Number],
  vote_average: Number,
  vote_count: Number
});
const Movie = mongoose.model('Movie', movieSchema);
const isEmpty = obj => {
    for(var prop in obj) {
      if(obj.hasOwnProperty(prop))
        return false;
    }
    return true;
  }

app.get("/api/movies", async (req,res) => {
    let movieQuery = req.query.search;
    if (movieQuery !== undefined) {
        console.log('d')
        console.log(movieQuery)
        let queryMongo = await Movie.find({title: movieQuery});
        console.log(queryMongo)
        console.log('ok')
        if(isEmpty(queryMongo)) {
            // return it res.json()
            res.status(200).json(queryMongo)
        }
        else {
            conso.log('ddd')
            return axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${APP_KEY}&query=${movieQuery}`)
            .then(async result => {
                const data = result.data.results.sort((a, b) => {
                    a.title.localeCompare(b.title)
                });

                const getNewPost = (item) => new Movie(item);

                const movies = data.slice(0, 10).map(getNewPost);
                const results = await Movie.insertMany(movies)
                console.log(results)
                res.status(200).json(result)
            }) 
            .catch(err => {
                return res.status(500).json(err)
            });
        }
    }
})

app.post('/add-movie',(req,res) => {

});


app.get("/api/movies/:id", (req,res) => {
    console.log(req.params.id, 'ok')
});

// connect to DB
mongoose.connect('mongodb://lorisW:loris1999@cluster0-y8cg5.mongodb.net/test?retryWrites=true',
{ useNewUrlParser: true},
 () => console.log('connected'))
// localhost:3003
app.listen(port, () => {
    console.log('Server is up and listening')
})
