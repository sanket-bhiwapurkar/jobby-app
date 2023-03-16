import './index.css'
import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

class Login extends Component {
  state = {username: '', password: '', errMsg: ''}

  onUsernameChange = event => {
    this.setState({username: event.target.value})
  }

  onPasswordChange = event => {
    this.setState({password: event.target.value})
  }

  onLogin = async event => {
    event.preventDefault()

    const {username, password} = this.state
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify({username, password}),
    }

    const response = await fetch(url, options)
    let data
    if (response.ok === true) {
      data = await response.json()
      this.onLoginSuccess(data)
    } else {
      data = await response.json()
      this.onLoginFailure(data)
    }
  }

  onLoginSuccess = data => {
    const jwtToken = data.jwt_token
    Cookies.set('jwt_token', jwtToken, {expires: 30})

    const {history} = this.props
    history.replace('/')
  }

  onLoginFailure = async data => {
    this.setState({errMsg: data.error_msg})
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    const {username, password, errMsg} = this.state
    return (
      <div className="login">
        <form className="login-form" onSubmit={this.onLogin}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="logo"
          />

          <label htmlFor="username" className="form-label">
            USERNAME
          </label>
          <input
            type="text"
            id="username"
            placeholder="Username"
            value={username}
            onChange={this.onUsernameChange}
            className="form-input"
          />

          <label htmlFor="password" className="form-label">
            PASSWORD
          </label>
          <input
            type="password"
            id="password"
            placeholder="Password"
            value={password}
            onChange={this.onPasswordChange}
            className="form-input"
          />

          <button type="submit" className="login-btn">
            Login
          </button>
          {errMsg !== '' ? <p className="err-msg">*{errMsg}</p> : null}
        </form>
      </div>
    )
  }
}
export default Login
