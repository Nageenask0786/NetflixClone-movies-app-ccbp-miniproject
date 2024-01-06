import {Component} from 'react'

import {Redirect} from 'react-router-dom'

import Cookies from 'js-cookie'

import './index.css'

class LoginForm extends Component {
  state = {userName: '', Password: '', showErrorMessage: false, errorMsg: ''}

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30, path: '/'})
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showErrorMessage: true, errorMsg})
  }

  onChangeUserName = event => {
    this.setState({userName: event.target.value})
  }

  onChangePassword = event => {
    this.setState({Password: event.target.value})
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {userName, Password} = this.state
    Cookies.set('username', userName)
    Cookies.set('password', Password)
    const userDetails = {username: userName, password: Password}
    const apiUrl = 'https://apis.ccbp.in/login'
    const options = {method: 'POST', body: JSON.stringify(userDetails)}
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  render() {
    const {userName, Password, showErrorMessage, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-form-container">
        <img
          src="https://res.cloudinary.com/dchxbofyt/image/upload/v1698742911/Group_7399_wybri8.png"
          className="movies-image"
          alt="website logo"
        />
        <div className="form-card">
          <h1 className="login-heading">Login</h1>
          <form onSubmit={this.onSubmitForm}>
            <label className="label-text" htmlFor="username">
              Username
            </label>
            <input
              type="text"
              id="username"
              className="input-field"
              onChange={this.onChangeUserName}
              placeholder="Enter Username"
              value={userName}
            />
            <label className="label-text" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="input-field"
              onChange={this.onChangePassword}
              placeholder="Enter password"
              value={Password}
            />
            <button type="submit" className="login-button">
              Login
            </button>
          </form>
          {showErrorMessage && <p className="error-msg">{errorMsg}</p>}
        </div>
      </div>
    )
  }
}

export default LoginForm
