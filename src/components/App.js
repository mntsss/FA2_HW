import React from 'react';
import axios from 'axios';
import Card from './Card';
import Genre from './Genre';
import { endpoints } from '../../config';

export default class App extends React.Component {
  constructor() {
    super();

    this.state = {
      movieList: [],
      genreList: [],
      likedMovies: []
    };

    this.requestMovies();
    this.requestGenres();
  }

  requestMovies = () => {
    axios
      .get(endpoints.mostPopularMovies())
      .then((res) => this.setMovieList(res.data.results))
      .catch((error) => console.log(error));
  };

  requestGenres = () => {
    axios.get(endpoints.genres())
        .then(response => this.setGenreList(response.data.genres))
        .catch(err => console.log(err));
  };

  setMovieList = (movieList) => {
    this.setState({
      movieList,
    })
  };

  setGenreList = (genreList) => {
    this.setState({
        genreList
    })
  };

  getMoviesByGenre = (id) => {
      axios
          .get(endpoints.genreMovies(id))
          .then((res) => this.setMovieList(res.data.results))
          .catch((error) => console.log(error));
  };

  movieLikeStatusChanged = (id, status) => {
    if(status)
      this.state.likedMovies.push(id);
    else
    {
        let index = this.state.likedMovies.indexOf(id);
        this.state.likedMovies.splice(index, 1);
    }
  };

  movieLikeStatus = (id) => {
    return (this.state.likedMovies.indexOf(id) !== -1);
  };

  render() {
    const { movieList, genreList } = this.state;

    return (
        <div className="container">
          <div className="genres">
              {genreList.map((genre, i) => <Genre key={i} id={genre.id} name={genre.name} genreCallback={this.getMoviesByGenre} />)}
          </div>
          <div className="cards">
            {movieList.map((movie, i) => <Card key={i} movie={movie} like={this.movieLikeStatus(movie.id)} movieLikeStatusChangedCallback={this.movieLikeStatusChanged} />)}
          </div>
        </div>
    );
  }
}
