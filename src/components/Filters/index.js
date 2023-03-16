import './index.css'

const Filters = props => {
  const {
    employmentTypesList,
    salaryRangesList,
    setSalaryRange,
    setEmploymentType,
  } = props

  const onSalaryRangeCheck = event => {
    setSalaryRange(event.target.id)
  }

  const onEmploymentTypeSelected = event => {
    setEmploymentType(event)
  }
  return (
    <div className="filters">
      <div className="filter">
        <h1 className="filter-heading">Type of Employment</h1>
        <ul className="filter-list">
          {employmentTypesList.map(eachItem => (
            <li className="filter-list-item" key={eachItem.employmentTypeId}>
              <input
                type="checkbox"
                id={eachItem.employmentTypeId}
                checked={eachItem.selected}
                onChange={onEmploymentTypeSelected}
              />
              <label
                className="filter-label"
                htmlFor={eachItem.employmentTypeId}
              >
                {eachItem.label}
              </label>
            </li>
          ))}
        </ul>
      </div>
      <hr />

      <div className="filter">
        <h1 className="filter-heading">Salary Range</h1>
        <ul className="filter-list">
          {salaryRangesList.map(eachItem => (
            <li className="filter-list-item" key={eachItem.salaryRangeId}>
              <input
                type="radio"
                name="salary"
                id={eachItem.salaryRangeId}
                value={eachItem.salaryRangeId}
                onChange={onSalaryRangeCheck}
              />
              <label className="filter-label" htmlFor={eachItem.salaryRangeId}>
                {eachItem.label}
              </label>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
export default Filters
