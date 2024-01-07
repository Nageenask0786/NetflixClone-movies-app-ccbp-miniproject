import {Component} from 'react'

import Slider from 'react-slick'

import './index.css'

class MoviesSlider extends Component {
  render() {
    const {movies} = this.props
    const settings = {
      slidesToShow: 4,
      infinite: false,
      autoplay: false,
      dots: false,
      slidesToScroll: 4,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
          },
        },
      ],
    }
    return (
      <div className="slick-main-container">
        <div className="slick-container">
          <Slider {...settings} className="slider">
            {movies.map(each => (
              <li key={each.id} className="slick-item" testid="MovieCard">
                <img
                  className="slick-movie-image"
                  src={each.posterPath}
                  alt={each.title}
                />
              </li>
            ))}
          </Slider>
        </div>
      </div>
    )
  }
}

export default MoviesSlider
