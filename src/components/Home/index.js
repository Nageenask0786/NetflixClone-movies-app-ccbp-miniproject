import {Component} from 'react'

import Loader from 'react-loader-spinner'

import Cookies from 'js-cookie'

import TrendingMovies from '../TrendingMovies'
import Header from '../Header'
import HomePoster from '../HomePoster'

import './index.css'

import TopRatedMovies from '../TopRatedMovies'

import Originals from '../Originals'
import Footer from '../Footer'

const apiStatusConstants = {
  success: 'SUCCESS',
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  failure: 'FAILURE',
}

class Home extends Component {
  state = {backDropMovie: {}, apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.getBacKDropMovie()
  }

  getBacKDropMovie = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const jwtToken = Cookies.get('jwt_token')
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
      const {results} = data
      const RandomIndex = Math.floor(Math.random() * results.length)
      console.log(RandomIndex)
      const BackDropPathDetails = results[RandomIndex]
      console.log(BackDropPathDetails)
      const formattedDetails = {
        title: BackDropPathDetails.title,
        overview: BackDropPathDetails.overview,
        backDropPath: BackDropPathDetails.backdrop_path,
      }
      this.setState({
        backDropMovie: formattedDetails,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderLoadingView = () => (
    <div className="home-main-container1" testid="loader">
      <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
    </div>
  )

  onTryAgain = () => {
    this.getBacKDropMovie()
  }

  renderFailureView = () => (
    <div className="home-main-container1">
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
    const {backDropMovie} = this.state
    return (
      <>
        <HomePoster Details={backDropMovie} />
      </>
    )
  }

  renderFinalView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return ''
    }
  }

  render() {
    return (
      <div className="home">
        <Header />
        {this.renderFinalView()}
        <TrendingMovies />
        <Originals />
        <TopRatedMovies />
        <Footer />
      </div>
    )
  }
}

export default Home
