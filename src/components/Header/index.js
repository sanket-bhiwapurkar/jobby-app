import './index.css'
import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {AiFillHome} from 'react-icons/ai'
import {BsBriefcaseFill} from 'react-icons/bs'
import {FiLogOut} from 'react-icons/fi'

const Header = props => {
  const logout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }
  return (
    <nav className="navbar">
      <Link to="/">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
          className="logo"
          style={{margin: '0px'}}
        />
      </Link>
      <ul className="nav-menu-mobile">
        <li>
          <Link to="/">
            <AiFillHome className="menu-icons" />
          </Link>
        </li>
        <li>
          <Link to="/jobs">
            <BsBriefcaseFill className="menu-icons" />
          </Link>
        </li>
      </ul>
      <ul className="nav-menu-large">
        <li>
          <Link to="/" className="menu-item">
            Home
          </Link>
        </li>
        <li>
          <Link to="/jobs" className="menu-item">
            Jobs
          </Link>
        </li>
      </ul>
      <button type="button" className="logout-btn-mobile" onClick={logout}>
        <FiLogOut className="menu-icons" />
      </button>
      <button type="button" className="logout-btn-large" onClick={logout}>
        Logout
      </button>
    </nav>
  )
}
export default withRouter(Header)
