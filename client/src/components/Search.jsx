import React from 'react';
import axios from 'axios';

class Search extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      genres: [], 
      value: '',
    }
    this.getGenres = this.getGenres.bind(this)
    this.handleChange = this.handleChange.bind(this)

  }

  componentDidMount() {
    this.getGenres()
  }

  getGenres() {  
    axios.get('/genres')
    .then((response) => {this.setState({genres: response.data})})
    .catch((err) => console.log('this is the error', err))
  }

  handleChange(event) {
    this.setState({value: event.target.value})
  }

  render() {
    return (
      <div className="search">


        <button onClick={this.props.swapFavorites}>{this.props.showFaves ? "Show Results" : "Show Favorites"}</button>
        <br/><br/>


        <select value={this.state.value} onChange={this.handleChange}>
              {
                  this.state.genres.map((genre) => {
                  return <option value={genre.id}>{genre.name}</option>
                })
              }
        </select>

      <br/><br/>
      <button onClick={() => {this.props.getMovies(this.state.value)}}>Search</button>

      </div>)
  }
}

export default Search
  //make an axios request in this component to get the list of genres from your endpoint GET GENRES
