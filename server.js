const express = require('express');
const cors = require('cors')
const app = express();
const APP_KEY = "4c15b40ed5d5289859ad7836af15d25e";
const mongoose= require('mongoose');
const port = process.env.PORT || 5000;

app.use(cors());

var Schema = mongoose.Schema;

var movieSchema = new Schema({
  title:  String,
  overview:   String,
  poster_path : String,
  release_date: String,
  genre_ids: [Number],
  vote_average: Number,
  vote_count: Number
});

app.get("/api/movies", async (req,res) => {
    let query = req.query.search;
    var Movie = mongoose.model(query, movieSchema);
    let queryMongo = Movie.find({title: query}, function(obj) { console.log(obj); });
    if(!isEmpty(queryMongo)) {
        // return it res.json()
    }
    else {
        const response = await fetch(
            `https://api.themoviedb.org/3/search/movie?api_key=${APP_KEY}&query=${query}`
            );
            const data = await response.json();
            const dataModel = mongoose.model(data, movieSchema);
            dataModel.save(function(err, movie) {
                if(err) {
                    return console.error(err);
                }
                console.log(movie.title + " saved to movie collection."); 
            });
    }
})


// connect to DB
mongoose.connect('mongodb://lorisW:loris1999@cluster0-y8cg5.mongodb.net/test?retryWrites=true',
{ useNewUrlParser: true},
 () => console.log('connected'))
// localhost:3003
app.listen(port, () => {
    console.log('Server is up and listening')
})
