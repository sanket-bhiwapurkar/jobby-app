import './index.css'

const NoJobs = () => (
  <div className="no-jobs">
    <img
      src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
      alt="no jobs"
      className="no-jobs-img"
    />
    <h1 className="no-jobs-title">No Jobs Found</h1>
    <p className="no-jobs-msg">
      We could not find any jobs. Try other filters.
    </p>
  </div>
)

export default NoJobs
