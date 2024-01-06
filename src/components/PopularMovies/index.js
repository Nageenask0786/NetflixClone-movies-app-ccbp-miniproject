import {Component} from 'react'

import Cookies from 'js-cookie'

import Header from '../Header'

import MovieItem from '../MovieItem'

import Footer from '../Footer'

import FailureView from '../FailureView'

import LoaderView from '../LoaderView'

import './index.css'

const apiStatusConstants = {
  success: 'SUCCESS',
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  failure: 'FAILURE',
}

class PopularMovies extends Component {
  state = {popularMovies: [], apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.getPopularMovies()
  }

  getPopularMovies = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    console.log(jwtToken)
    const options = {
      method: 'GET',
      headers: {Authorization: `Bearer ${jwtToken}`},
    }
    const response = await fetch(
      'https://apis.ccbp.in/movies-app/popular-movies',
      options,
    )
    const data = await response.json()
    console.log(data)
    if (response.ok === true) {
      const formattedData = data.results.map(each => ({
        backDropPath: each.backdrop_path,
        id: each.id,
        posterPath: each.poster_path,
        title: each.title,
      }))
      console.log(formattedData)
      this.setState({
        popularMovies: formattedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderPopularMovies = () => {
    const {popularMovies} = this.state
    return (
      <>
        <ul className="popular-images-container">
          {popularMovies.map(each => (
            <MovieItem movieDetails={each} key={each.id} />
          ))}
        </ul>
        <Footer />
      </>
    )
  }

  onRetry = () => {
    this.getPopularMovies()
  }

  renderFinalView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderPopularMovies()
      case apiStatusConstants.inProgress:
        return <LoaderView />
      case apiStatusConstants.failure:
        return <FailureView onRetry={this.onRetry} />
      default:
        return ''
    }
  }

  render() {
    return (
      <div className="popular-movies-route">
        <Header />
        <div className="final-popular-route">{this.renderFinalView()}</div>
      </div>
    )
  }
}

export default PopularMovies
