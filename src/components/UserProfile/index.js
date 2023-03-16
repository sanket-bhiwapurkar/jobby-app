import './index.css'

const UserProfile = props => {
  const {profileDetails} = props
  const {name, profileImageUrl, shortBio} = profileDetails
  return (
    <div className="user-profile">
      <img src={profileImageUrl} alt="profile" className="dp" />
      <h1 className="name">{name}</h1>
      <p className="bio">{shortBio}</p>
    </div>
  )
}
export default UserProfile
