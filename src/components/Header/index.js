import {Component} from 'react'

import {Link, withRouter} from 'react-router-dom'

import {HiOutlineSearch} from 'react-icons/hi'

import {MdMenuOpen} from 'react-icons/md'

import {ImCross} from 'react-icons/im'

import './index.css'

class Header extends Component {
  state = {showNavBarSmall: false, currentRoutePath: ''}

  componentDidMount() {
    const {match} = this.props
    const {path} = match
    this.setState({currentRoutePath: path})
  }

  onClickOfSearch = () => {
    const {currentRoutePath} = this.state
    const {getSearchResults} = this.props
    if (currentRoutePath === '/search') {
      getSearchResults()
    }
  }

  showMenuItems = () => {
    this.setState({showNavBarSmall: true})
  }

  Close = () => {
    this.setState({showNavBarSmall: false})
  }

  onChangeSearchInput = event => {
    const {getSearchInputValue} = this.props
    getSearchInputValue(event.target.value)
  }

  onKeyDownEnter = event => {
    const {getSearchResults} = this.props
    if (event.key === 'Enter') {
      getSearchResults()
    }
  }

  render() {
    const {showNavBarSmall, currentRoutePath} = this.state

    return (
      <nav>
        <div className="navbar">
          <div>
            <Link to="/" className="nav-link">
              <img
                src="https://res.cloudinary.com/dchxbofyt/image/upload/v1698742911/Group_7399_wybri8.png"
                alt="website logo"
                className="website-logo"
              />
            </Link>
            <ul className="nav-items-container">
              <li className="nav-item">
                <Link to="/" className="nav-link">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/popular" className="nav-link">
                  Popular
                </Link>
              </li>
            </ul>
          </div>
          <div className="search-and-account">
            <div className="search-container">
              {currentRoutePath === '/search' && (
                <input
                  type="search"
                  className="search-input"
                  placeholder="Search"
                  onChange={this.onChangeSearchInput}
                  onKeyDown={this.onKeyDownEnter}
                />
              )}
              <Link to="/search" className="nav-link">
                <button
                  type="button"
                  className="search-button"
                  testid="searchButton"
                  onClick={this.onClickOfSearch}
                >
                  <HiOutlineSearch size={15} />
                </button>
              </Link>
            </div>
            <Link to="/account" className="nav-link">
              <img
                src="https://res.cloudinary.com/dchxbofyt/image/upload/v1698766606/Avatar_qtqou3.png"
                alt="profile"
                className="account-image"
              />
            </Link>

            <button
              type="button"
              onClick={this.showMenuItems}
              className="menu-button"
            >
              <MdMenuOpen size={30} color="#ffffff" />
            </button>
          </div>
        </div>
        {showNavBarSmall && (
          <ul className="nav-items-small">
            <li className="nav-item">
              <Link to="/" className="nav-link">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/popular" className="nav-link">
                Popular
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/account" className="nav-link">
                Account
              </Link>
            </li>
            <li>
              <button type="button" className="close-button">
                <ImCross size={20} onClick={this.Close} />
              </button>
            </li>
          </ul>
        )}
      </nav>
    )
  }
}

export default withRouter(Header)
