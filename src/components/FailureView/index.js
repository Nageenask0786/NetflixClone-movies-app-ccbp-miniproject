import './index.css'

const FailureView = props => {
  const {onRetry} = props
  const onClickOfTryAgain = () => {
    onRetry()
  }
  return (
    <div className="failure-view">
      <img
        src="https://res.cloudinary.com/dchxbofyt/image/upload/v1704367316/failure-view_c1pt6m.png"
        alt="failure view"
        className="failure-image"
      />
      <p className="failure-view-description">
        Something went wrong. Please try again
      </p>
      <button
        type="button"
        className="retry-button"
        onClick={onClickOfTryAgain}
      >
        Try Again
      </button>
    </div>
  )
}

export default FailureView
