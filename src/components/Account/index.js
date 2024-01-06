import {Component} from 'react'

import Cookies from 'js-cookie'

import Header from '../Header'

import Footer from '../Footer'

import './index.css'

class Account extends Component {
  onClickOfLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = this.props
    history.replace('/login')
  }

  render() {
    const userName = Cookies.get('username')
    const password = Cookies.get('password')
    console.log(password)
    const maskedPassword = '*'.repeat(9)
    return (
      <div className="account-route">
        <Header />
        <div className="account-details-container">
          <h1 className="account">Account</h1>
          <hr className="hr" />
          <div className="membership">
            <p className="membership-heading">Member ship</p>
            <div className="account-details">
              <p className="account-name">{userName}</p>
              <p className="account-password">
                {`Password : ${maskedPassword}`}
              </p>
            </div>
          </div>
          <hr className="hr" />
          <div className="membership">
            <p className="membership-heading">Plan details</p>
            <p className="para1">Premium</p>
            <p className="para1">Ultra HD</p>
          </div>
          <button
            type="button"
            className="logout-button"
            onClick={this.onClickOfLogout}
          >
            Logout
          </button>
        </div>
        <Footer />
      </div>
    )
  }
}

export default Account
