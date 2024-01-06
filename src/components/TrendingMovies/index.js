import {Component} from 'react'

import Loader from 'react-loader-spinner'

import Cookies from 'js-cookie'

import MoviesSlider from '../MoviesSlider'

import './index.css'

const apiStatusConstants = {
  success: 'SUCCESS',
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  failure: 'FAILURE',
}

class TrendingMovies extends Component {
  state = {trendingMovies: [], apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.getTrendingMovies()
  }

  getTrendingMovies = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const jwtToken = Cookies.get('jwt_token')
    console.log(jwtToken)
    const options = {
      method: 'GET',
      headers: {Authorization: `Bearer ${jwtToken}`},
    }
    const response = await fetch(
      'https://apis.ccbp.in/movies-app/trending-movies',
      options,
    )
    const data = await response.json()
    console.log(data)
    if (response.ok === true) {
      const formattedData = data.results.map(each => ({
        posterPath: each.poster_path,
        title: each.title,
        id: each.id,
      }))
      this.setState({
        trendingMovies: formattedData,
        apiStatus: apiStatusConstants.success,
      })
    }
  }

  renderTrendingMoviesLoadingView = () => (
    <div className="container1" testid="loader">
      <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
    </div>
  )

  onTryAgain = () => {
    this.getTrendingMovies()
  }

  renderFailureView = () => (
    <div className="container1">
      <img
        src="https://res.cloudinary.com/dchxbofyt/image/upload/v1700060716/alert-triangle_g4xogd.png"
        alt="failure view"
        className="failure-image-home"
      />
      <p className="failure-view-description">
        Something went wrong. Please try again
      </p>
      <button type="button" className="retry-button" onClick={this.onTryAgain}>
        Try Again
      </button>
    </div>
  )

  renderSuccessView = () => {
    const {trendingMovies} = this.state
    return (
      <div className="trending-movies-container">
        <h1 className="heading">Trending Now</h1>
        <MoviesSlider movies={trendingMovies} />
      </div>
    )
  }

  renderFinalOutput = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.inProgress:
        return this.renderTrendingMoviesLoadingView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return ''
    }
  }

  render() {
    return <div>{this.renderFinalOutput()}</div>
  }
}

export default TrendingMovies
