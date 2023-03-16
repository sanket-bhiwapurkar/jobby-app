import './index.css'
import Loader from 'react-loader-spinner'

const LoaderItem = () => (
  <div className="loader-container" data-testid="loader">
    <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
  </div>
)
export default LoaderItem
