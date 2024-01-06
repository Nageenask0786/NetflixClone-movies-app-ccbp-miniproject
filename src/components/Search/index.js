import {Component} from 'react'

import Cookies from 'js-cookie'

import Header from '../Header'
import './index.css'

import MovieItem from '../MovieItem'

import FailureView from '../FailureView'

import LoaderView from '../LoaderView'

const apiStatusConstants = {
  success: 'SUCCESS',
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  failure: 'FAILURE',
}

class Search extends Component {
  state = {movies: [], searchText: '', apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.getSearchResults()
  }

  getSearchResults = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const {searchText} = this.state
    const apiUrl = `https://apis.ccbp.in/movies-app/movies-search?search=${searchText}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      // console.log(data)
      const updatedData = data.results.map(each => ({
        posterPath: each.poster_path,
        title: each.title,
        id: each.id,
        backdropPath: each.backdrop_path,
      }))
      console.log(updatedData)
      this.setState({
        movies: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  getSearchInputValue = text => {
    this.setState({searchText: text})
  }

  renderSearchResults = () => {
    const {movies} = this.state
    return (
      <>
        {movies.length > 0 ? (
          <ul className="search-results-container">
            {movies.map(each => (
              <MovieItem movieDetails={each} key={each.id} />
            ))}
          </ul>
        ) : (
          this.renderNoSearchResultsView()
        )}
      </>
    )
  }

  renderNoSearchResultsView = () => {
    const {searchText} = this.state
    console.log(searchText)
    return (
      <div className="no-search-results">
        <img
          src="https://res.cloudinary.com/dchxbofyt/image/upload/v1704378765/no-search-results_igdqv5.png"
          alt="no movies"
          className="no-search-results-image"
        />
        <p className="no-search-results-text">
          Your search for {searchText} did not find any matches.
        </p>
      </div>
    )
  }

  renderSuccessView = () => {
    const {searchText} = this.state
    const isSearchNotEmpty = searchText === ''
    console.log(isSearchNotEmpty)
    return <div>{isSearchNotEmpty ? '' : this.renderSearchResults()}</div>
  }

  onRetry = () => {
    this.getSearchResults()
  }

  renderFinalView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.inProgress:
        return <LoaderView />
      case apiStatusConstants.failure:
        return <FailureView onRetry={this.onRetry} />
      default:
        return ''
    }
  }

  render() {
    const {searchText} = this.state
    console.log(searchText)
    return (
      <div className="search-route">
        <Header
          getSearchInputValue={this.getSearchInputValue}
          getSearchResults={this.getSearchResults}
        />
        {this.renderFinalView()}
      </div>
    )
  }
}

export default Search
