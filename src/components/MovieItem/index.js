import {Link} from 'react-router-dom'

import './index.css'

const MovieItem = props => {
  const {movieDetails} = props
  const {id, posterPath, title} = movieDetails
  return (
    <Link to={`/movies/${id}`}>
      <li>
        <img src={posterPath} alt={title} className="image" />
      </li>
    </Link>
  )
}

export default MovieItem
