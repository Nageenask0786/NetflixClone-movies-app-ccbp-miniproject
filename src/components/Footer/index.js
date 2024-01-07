import {FaGoogle, FaTwitter, FaInstagram, FaYoutube} from 'react-icons/fa'

import './index.css'

const Footer = () => (
  <div className="footer-container">
    <div className="container">
      <ul className="icons-container">
        <li type="button" className="icon-button">
          <FaGoogle />
        </li>
        <li type="button" className="icon-button">
          <FaTwitter />
        </li>
        <li type="button" className="icon-button">
          <FaInstagram />
        </li>
        <li type="button" className="icon-button">
          <FaYoutube />
        </li>
      </ul>
      <p className="contact-us">Contact us</p>
    </div>
  </div>
)

export default Footer
