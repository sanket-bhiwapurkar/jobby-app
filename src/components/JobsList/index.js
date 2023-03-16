import './index.css'
import JobCard from '../JobCard'

const JobsList = props => {
  const {jobsList} = props
  return (
    <ul className="job-list">
      {jobsList.map(job => (
        <JobCard jobDetails={job} key={job.id} />
      ))}
    </ul>
  )
}
export default JobsList
