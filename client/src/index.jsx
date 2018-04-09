import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
// import AnyComponent from './components/filename.jsx'
import Search from './components/Search.jsx'
import Movies from './components/Movies.jsx'
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
  	super(props)
  	this.state = {
      movies: [{deway: "movies"}],
      favorites: [{deway: "favorites"}],
      showFaves: false
  	}

    this.getMovies = this.getMovies.bind(this)
    this.saveMovie = this.saveMovie.bind(this)
    this.deleteMovie = this.deleteMovie.bind(this)
    this.swapFavorites = this.swapFavorites.bind(this)
    this.showFavorites = this.showFavorites.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  getMovies(genreId) {
    axios.post('/search', {id: genreId})
    .then((response) => {
      let movieResult = response.data
      this.setState({ movies: response.data })
    })
    .catch((err) => console.log(err))
  }

  saveMovie(movie) {
    axios.post('/save', movie)
    .then((response) => console.log('saved'))
    .catch((err) => console.log(err))
  }

  showFavorites(movie) {
    console.log('saved')
    axios.get('/showFavorites')
    .then((response) => {

      let database = response.data
      this.setState({favorites: database})
    })
    .catch((err) => console.log(err))
  }


  deleteMovie(movie) {
    console.log('deleted')
    axios.post('/delete', movie)
    .then((response) => console.log('saved'))
    .catch((err) => console.log(err))
  }

  swapFavorites() {
    console.log('i was called')
    this.setState({
      showFaves: !this.state.showFaves
    },()=> console.log(this.state.showFaves))
    this.showFavorites()
  }

  handleClick(movie){
    if(this.state.showFaves){
      this.deleteMovie(movie)
    }else{
      this.saveMovie(movie)
    }
  }

  render () {
  	return (
    <div className="app">
      <header className="navbar"><h1>Bad Movies</h1></header> 
      <div className="main">
        <Search swapFavorites={this.swapFavorites} 
                showFaves={this.state.showFaves} 
                getMovies={this.getMovies}
                showFavorites={this.showFavorites}/>
        <Movies movies={this.state.showFaves ? this.state.favorites : this.state.movies} 
                showFaves={this.state.showFaves} 
                handleClick={this.handleClick}/>
      </div>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));