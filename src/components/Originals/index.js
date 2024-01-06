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

class Originals extends Component {
  state = {originals: [], apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.getOriginals()
  }

  getOriginals = async () => {
    const jwtToken = Cookies.get('jwt_token')
    this.setState({apiStatus: apiStatusConstants.inProgress})

    console.log(jwtToken)
    const options = {
      method: 'GET',
      headers: {Authorization: `Bearer ${jwtToken}`},
    }
    const response = await fetch(
      'https://apis.ccbp.in/movies-app/originals',
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
        originals: formattedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderOriginalMoviesLoadingView = () => (
    <div className="container2" testid="loader">
      <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
    </div>
  )

  onTryAgain = () => {
    this.getOriginals()
  }

  renderFailureView = () => (
    <div className="container2">
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
    const {originals} = this.state
    return (
      <div className="trending-movies-container">
        <h1 className="heading">Originals</h1>
        <MoviesSlider movies={originals} />
      </div>
    )
  }

  renderFinalOutput = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.inProgress:
        return this.renderOriginalMoviesLoadingView()
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

export default Originals
