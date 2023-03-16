import './index.css'
import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {BsBriefcaseFill} from 'react-icons/bs'

const SimilarJobCard = props => {
  const {jobDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    rating,
    title,
  } = jobDetails
  return (
    <li className="job-card">
      <div className="job-header">
        <img
          src={companyLogoUrl}
          alt="similar job company logo"
          className="company-logo"
        />
        <div>
          <h1 className="job-title">{title}</h1>
          <div className="rating-container">
            <AiFillStar className="star" style={{color: '#fbbf24'}} />
            <p className="rating">{rating}</p>
          </div>
        </div>
      </div>
      <h1 className="job-sub-heading">Descriptions</h1>
      <p className="job-description">{jobDescription}</p>
      <div className="job-info">
        <div className="info-item">
          <MdLocationOn className="card-icons" />
          <p>{location}</p>
        </div>
        <div className="info-item">
          <BsBriefcaseFill className="card-icons" />
          <p>{employmentType}</p>
        </div>
      </div>
    </li>
  )
}
export default SimilarJobCard
