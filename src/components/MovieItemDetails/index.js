import {Component} from 'react'

import Cookies from 'js-cookie'

import Header from '../Header'

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

class MovieItemDetails extends Component {
  state = {movieItemDetails: {}, apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.getMovieDetails()
  }

  getFormattedDetails = Data => ({
    adult: Data.adult,
    budget: Data.budget,
    backdropPath: Data.backdrop_path,
    id: Data.id,
    overview: Data.overview,
    posterPath: Data.poster_path,
    releaseDate: Data.release_date,
    runtime: Data.runtime,
    title: Data.title,
    voteAverage: Data.vote_average,
    voteCount: Data.vote_count,
    genres: Data.genres.map(each => ({
      id: each.id,
      name: each.name,
    })),
    similarMovies: Data.similar_movies.map(each => ({
      id: each.id,
      overview: each.overview,
      backdropPath: each.backdrop_path,
      posterPath: each.poster_path,
      title: each.title,
    })),
    spokenLanguages: Data.spoken_languages.map(each => ({
      id: each.id,
      englishName: each.english_name,
    })),
  })

  getMovieDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const jwtToken = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const apiUrl = `https://apis.ccbp.in/movies-app/movies/${id}`
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      const movieDetails = data.movie_details
      const formattedData = this.getFormattedDetails(movieDetails)
      this.setState({
        movieItemDetails: formattedData,
        apiStatus: apiStatusConstants.success,
      })
      console.log(formattedData)
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderSuccessView = () => {
    const {movieItemDetails} = this.state
    const {
      backdropPath,
      title,
      overview,
      genres,
      spokenLanguages,
      voteCount,
      voteAverage,
      budget,
      releaseDate,
      similarMovies,
      runtime,
      adult,
    } = movieItemDetails
    console.log(genres)
    const Hours = Math.floor(runtime / 60)
    const minutes = runtime % 60
    const date = new Date(releaseDate)
    const year = date.getFullYear()
    return (
      <div className="movie-details-success-view">
        <div
          className="poster"
          style={{
            backgroundImage: `url(${backdropPath})
    `,
            minHeight: `40vh`,
            width: `100%`,
            flexShrink: `0`,
            backgroundSize: '100% 100%',
          }}
        >
          <div className="poster-details">
            <h1 className="movie-details-movie-name">{title}</h1>
            <div className="release-date-container">
              <p className="runtime">{`${Hours}h ${minutes}m`}</p>

              <p className="movie-info-a-ua">{adult ? 'A' : 'U/A'}</p>

              <p className="year">{year}</p>
            </div>
            <p className="movie-details-overview">{overview}</p>

            <button type="button" className="play-button-movie-details">
              Play
            </button>
          </div>
        </div>
        <div className="movie-details-main-container">
          <div className="genres-container">
            <h1 className="genre-heading">genres</h1>
            <ul>
              {genres.map(each => (
                <li key={each.id} className="para">
                  {each.name}
                </li>
              ))}
            </ul>
          </div>
          <div className="languages-container">
            <h1 className="languages-heading">Audio Available</h1>

            <ul>
              {spokenLanguages.map(each => (
                <li key={each.id} className="para">
                  {each.englishName}
                </li>
              ))}
            </ul>
          </div>
          <div className="rating-details">
            <h1 className="rating-count">Rating Count</h1>
            <p className="para">{voteCount}</p>
            <h1 className="rating-average">Rating Average</h1>
            <p className="para">{voteAverage}</p>
          </div>
          <div className="budget-and-release-date">
            <h1 className="budget">Budget</h1>
            <p className="para">{budget}</p>
            <h1 className="release-date">Release Date</h1>
            <p className="para">{releaseDate}</p>
          </div>
        </div>
        <h1 className="more-like-this">More like this</h1>
        <div className="similar-movies">
          <ul>
            {similarMovies.map(each => (
              <li key={each.id}>
                <img
                  src={each.posterPath}
                  alt={each.title}
                  className="similar-poster-image"
                />
              </li>
            ))}
          </ul>
        </div>
        <Footer />
      </div>
    )
  }

  onRetry = () => {
    this.getMovieDetails()
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
    return (
      <div className="movie-item-details-route">
        <Header />
        {this.renderFinalView()}
      </div>
    )
  }
}

export default MovieItemDetails
