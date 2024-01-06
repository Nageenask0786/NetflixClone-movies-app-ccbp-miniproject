import './index.css'

const HomePoster = props => {
  const {Details} = props
  const {backDropPath, title, overview} = Details
  return (
    <div
      className="home-poster"
      style={{
        backgroundImage: `url(${backDropPath})
    `,
        minHeight: `40vh`,
        width: `100%`,
        flexShrink: `0`,
        backgroundSize: '100% 100%',
      }}
    >
      <div className="home-poster-details">
        <h1 className="movie-name-home">{title}</h1>
        <p className="overview">{overview}</p>
        <button type="button" className="play-button">
          Play
        </button>
      </div>
    </div>
  )
}

export default HomePoster
