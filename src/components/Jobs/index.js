import './index.css'
import {Component} from 'react'
import {BsSearch} from 'react-icons/bs'
import Cookies from 'js-cookie'
import Header from '../Header'
import UserProfile from '../UserProfile'
import JobsList from '../JobsList'
import LoaderItem from '../LoaderItem'
import Filters from '../Filters'
import FailureView from '../FailureView'
import NoJobs from '../NoJobs'

const initialEmploymentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
    selected: false,
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
    selected: false,
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
    selected: false,
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
    selected: false,
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
    selected: false,
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
    selected: false,
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
    selected: false,
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
    selected: false,
  },
]

const apiStatusOptions = {
  initial: 'INITIAL',
  isLoading: 'IS_LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Jobs extends Component {
  state = {
    profileApiStatus: apiStatusOptions.initial,
    profileDetails: {},
    jobApiStatus: apiStatusOptions.initial,
    employmentTypesList: initialEmploymentTypesList,
    minimumPackage: '',
    searchInput: '',
    jobsList: [],
  }

  componentDidMount = () => {
    this.getUserProfile()
    this.getJobs()
  }

  getUserProfile = async () => {
    this.setState({profileApiStatus: apiStatusOptions.isLoading})
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/profile'
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
        name: data.profile_details.name,
        profileImageUrl: data.profile_details.profile_image_url,
        shortBio: data.profile_details.short_bio,
      }
      this.setState({
        profileDetails: formattedData,
        profileApiStatus: apiStatusOptions.success,
      })
    } else {
      this.setState({profileApiStatus: apiStatusOptions.failure})
    }
  }

  getJobs = async () => {
    this.setState({jobApiStatus: apiStatusOptions.isLoading})
    const jwtToken = Cookies.get('jwt_token')
    const {employmentTypesList, minimumPackage, searchInput} = this.state
    const filteredEmploymentTypesList = employmentTypesList.filter(
      type => type.selected === true,
    )
    const selectedEmploymentType = filteredEmploymentTypesList.map(
      type => type.employmentTypeId,
    )
    const employmentType = selectedEmploymentType.join(',')
    const url = `https://apis.ccbp.in/jobs?employment_type=${employmentType}&minimum_package=${minimumPackage}&search=${searchInput}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const {jobs} = data
      const formattedData = jobs.map(job => ({
        companyLogoUrl: job.company_logo_url,
        employmentType: job.employment_type,
        id: job.id,
        jobDescription: job.job_description,
        location: job.location,
        packagePerAnnum: job.package_per_annum,
        rating: job.rating,
        title: job.title,
      }))
      this.setState({
        jobsList: formattedData,
        jobApiStatus: apiStatusOptions.success,
      })
    } else {
      this.setState({jobApiStatus: apiStatusOptions.failure})
    }
  }

  setEmploymentType = event => {
    const {employmentTypesList} = this.state
    if (event.target.checked === true) {
      this.setState(
        {
          employmentTypesList: employmentTypesList.map(type =>
            type.employmentTypeId === event.target.id
              ? {...type, selected: true}
              : type,
          ),
        },
        this.getJobs,
      )
    } else {
      this.setState(
        {
          employmentTypesList: employmentTypesList.map(type =>
            type.employmentTypeId === event.target.id
              ? {...type, selected: false}
              : type,
          ),
        },
        this.getJobs,
      )
    }
  }

  setSalaryRange = id => {
    this.setState({minimumPackage: id}, this.getJobs)
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  getSearchResult = () => {
    this.getJobs()
  }

  RenderProfileSwitch = () => {
    const {profileDetails, profileApiStatus} = this.state
    switch (profileApiStatus) {
      case apiStatusOptions.isLoading:
        return <LoaderItem />
      case apiStatusOptions.success:
        return <UserProfile profileDetails={profileDetails} />
      case apiStatusOptions.failure:
        return (
          <div className="profile-failed">
            <button
              type="button"
              className="retry-btn"
              onClick={this.getUserProfile}
            >
              Retry
            </button>
          </div>
        )
      default:
        return null
    }
  }

  RenderJobsSwitch = () => {
    const {jobApiStatus, jobsList} = this.state
    switch (jobApiStatus) {
      case apiStatusOptions.isLoading:
        return <LoaderItem />
      case apiStatusOptions.success:
        if (jobsList.length === 0) {
          return <NoJobs />
        }
        return <JobsList jobsList={jobsList} />
      case apiStatusOptions.failure:
        return <FailureView retry={this.getJobs} />
      default:
        return null
    }
  }

  render() {
    const {employmentTypesList, searchInput} = this.state
    return (
      <div className="jobs">
        <Header />
        <div className="jobs-body">
          <div className="search-bar-mobile">
            <input
              type="search"
              placeholder="Search"
              className="search"
              value={searchInput}
              onChange={this.onChangeSearchInput}
            />
            <button
              type="button"
              className="search-btn"
              data-testid="searchButton"
              onClick={this.getSearchResult}
            >
              <BsSearch className="search-icon" />
            </button>
          </div>
          <div className="profile-controls">
            <this.RenderProfileSwitch />
            <hr />
            <Filters
              employmentTypesList={employmentTypesList}
              salaryRangesList={salaryRangesList}
              setEmploymentType={this.setEmploymentType}
              setSalaryRange={this.setSalaryRange}
            />
          </div>
          <div className="job-list-container">
            <div className="search-bar-large">
              <input
                type="search"
                placeholder="Search"
                className="search"
                value={searchInput}
                onChange={this.onChangeSearchInput}
              />
              <button
                type="button"
                className="search-btn"
                data-testid="searchButton"
                onClick={this.getSearchResult}
              >
                <BsSearch className="search-icon" />
              </button>
            </div>
            <this.RenderJobsSwitch />
          </div>
        </div>
      </div>
    )
  }
}
export default Jobs
