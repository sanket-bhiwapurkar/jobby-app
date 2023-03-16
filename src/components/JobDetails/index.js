import './index.css'
import {Component} from 'react'
import Cookies from 'js-cookie'
import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {BsBriefcaseFill} from 'react-icons/bs'
import {FaExternalLinkAlt} from 'react-icons/fa'
import SimilarJobCard from '../SimilarJobCard'

import LoaderItem from '../LoaderItem'
import FailureView from '../FailureView'
import Header from '../Header'

const apiStatusOptions = {
  initial: 'INITIAL',
  isLoading: 'IS_LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class JobDetails extends Component {
  state = {jobDetailsApiStatus: apiStatusOptions.initial, currentJobDetails: {}}

  componentDidMount() {
    this.getJobDetails()
  }

  getJobDetails = async () => {
    this.setState({jobDetailsApiStatus: apiStatusOptions.isLoading})

    const {match} = this.props
    const {params} = match
    const {id} = params

    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const formattedData = {
        jobDetails: {
          companyLogoUrl: data.job_details.company_logo_url,
          companyWebsiteUrl: data.job_details.company_website_url,
          employmentType: data.job_details.employment_type,
          id: data.job_details.id,
          jobDescription: data.job_details.job_description,
          location: data.job_details.location,
          packagePerAnnum: data.job_details.package_per_annum,
          rating: data.job_details.rating,
          title: data.job_details.title,
        },

        skills: data.job_details.skills.map(eachSkill => ({
          imageUrl: eachSkill.image_url,
          name: eachSkill.name,
        })),
        lifeAtCompany: {
          description: data.job_details.life_at_company.description,
          imageUrl: data.job_details.life_at_company.image_url,
        },
        similarJobs: data.similar_jobs.map(eachJob => ({
          companyLogoUrl: eachJob.company_logo_url,
          employmentType: eachJob.employment_type,
          id: eachJob.id,
          jobDescription: eachJob.job_description,
          location: eachJob.location,
          rating: eachJob.rating,
          title: eachJob.title,
        })),
      }
      this.setState({
        currentJobDetails: formattedData,
        jobDetailsApiStatus: apiStatusOptions.success,
      })
    } else {
      this.setState({jobDetailsApiStatus: apiStatusOptions.failure})
    }
  }

  RenderJobDetailsSwitch = () => {
    const {jobDetailsApiStatus} = this.state
    switch (jobDetailsApiStatus) {
      case apiStatusOptions.isLoading:
        return <LoaderItem />
      case apiStatusOptions.success:
        return <this.RenderJobDetails />
      case apiStatusOptions.failure:
        return <FailureView retry={this.getJobDetails} />
      default:
        return null
    }
  }

  RenderJobDetails = () => {
    const {currentJobDetails} = this.state
    const {jobDetails, skills, lifeAtCompany, similarJobs} = currentJobDetails
    console.log(jobDetails)
    const {description, imageUrl} = lifeAtCompany
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      jobDescription,
      location,
      packagePerAnnum,
      rating,
      title,
    } = jobDetails
    return (
      <div className="job-details">
        <div className="job-details-card">
          <div className="job-details-header">
            <img
              src={companyLogoUrl}
              alt="job details company logo"
              className="job-details-company-logo"
            />
            <div>
              <h1 className="job-details-title">{title}</h1>
              <div className="job-details-rating-container">
                <AiFillStar
                  className="job-details-star"
                  style={{color: '#fbbf24'}}
                />
                <p className="job-details-rating">{rating}</p>
              </div>
            </div>
          </div>
          <div className="job-details-info">
            <div className="job-details-info-item">
              <MdLocationOn className="job-details-card-icons" />
              <p>{location}</p>
            </div>
            <div className="job-details-info-item">
              <BsBriefcaseFill className="job-details-card-icons" />
              <p>{employmentType}</p>
            </div>
            <p className="job-details-salary">{packagePerAnnum}</p>
          </div>
          <hr />
          <div className="link-container">
            <h1 className="job-details-sub-heading">Description</h1>
            <a href={companyWebsiteUrl} className="job-details-link">
              Visit
              <FaExternalLinkAlt style={{marginLeft: '4px'}} />
            </a>
          </div>
          <p className="job-details-description">{jobDescription}</p>
          <h1 className="job-details-sub-heading">Skills</h1>
          <ul className="skill-list">
            {skills.map(eachSkill => (
              <li key={eachSkill.name} className="skill">
                <img
                  src={eachSkill.imageUrl}
                  alt={eachSkill.name}
                  className="skill-icon"
                />
                <p>{eachSkill.name}</p>
              </li>
            ))}
          </ul>
          <h1 className="job-details-sub-heading">Life at Company</h1>
          <div className="life-at-company">
            <p className="job-details-description">{description}</p>
            <img
              src={imageUrl}
              alt="life at company"
              className="life-at-company-img"
            />
          </div>
        </div>
        <h1 className="job-details-sub-heading">Similar Jobs</h1>
        <ul className="skill-list">
          {similarJobs.map(eachJob => (
            <SimilarJobCard jobDetails={eachJob} key={eachJob.id} />
          ))}
        </ul>
      </div>
    )
  }

  render() {
    return (
      <>
        <Header />
        <div className="job-details-container">
          <this.RenderJobDetailsSwitch />
        </div>
      </>
    )
  }
}
export default JobDetails
