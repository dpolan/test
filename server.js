const express = require('express');
const cors = require('cors');
const axios = require('axios')
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

const isEmpty = obj => {
    for(var prop in obj) {
      if(obj.hasOwnProperty(prop))
        return false;
    }
    return true;
  }

app.get("/api/movies", (req,res) => {
    let query = req.query.search;
    console.log(req.query)
    if (query !== undefined) {
        var Movie = mongoose.model(query, movieSchema);
        let queryMongo = Movie.find({title: "the mask"}, function(obj) { console.log(obj); });
        if(!isEmpty(queryMongo)) {
            // return it res.json()
        }
        else {
            return axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${APP_KEY}&query=${query}`)
            .then(result => {
                console.log(result);
                return res.status(200).send("")
            }) 
            .catch(err => {
                return res.status(500).json(err)
            });
        }
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
