import {FaGoogle, FaTwitter, FaInstagram, FaYoutube} from 'react-icons/fa'

import './index.css'

const Footer = () => (
  <div className="footer-container">
    <div className="container">
      <div className="icons-container">
        <FaGoogle size={20} color="#ffffff" style={{margin: '6px'}} />
        <FaTwitter size={20} color="#ffffff" style={{margin: '6px'}} />
        <FaInstagram size={20} color="#ffffff" style={{margin: '6px'}} />
        <FaYoutube size={20} color="#ffffff" style={{margin: '6px'}} />
      </div>
      <p className="contact-us">Contact us</p>
    </div>
  </div>
)

export default Footer
