import Loader from 'react-loader-spinner'

import './index.css'

const LoaderView = () => (
  <div testid="loader" className="loader-container">
    <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
  </div>
)

export default LoaderView
