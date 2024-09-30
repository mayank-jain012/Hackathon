
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom'
import { AiFillInstagram } from 'react-icons/ai'
import { FaLinkedin } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
const Footer = () => {
  return (
    <div className='footer' id='footer'>
      <div className="footer-content">
        <div className="footer-content-left">
          <img src={assets.gericht} alt="" />
          <p>
          At our food ordering website, were committed to revolutionizing your dining experience.
           With an extensive array of culinary delights from top-notch restaurants, we aim to cater to every palate.
            Our user-friendly platform ensures hassle-free ordering and swift delivery, bringing the essence of fine dining 
            right to your doorstep. Explore, order, and savor the taste of excellence with us today.
          </p>
          <div className="footer-social-icons">
            <a href='https://www.facebook.com/profile.php?id=100024247802502'>
              <FaFacebook size={30} style={{ display: "flex", alignItems: "center", marginTop: "0.25rem" }} />
            </a>
            <a href='https://www.linkedin.com/in/mayank-jain-78682b22b/'>
              <FaLinkedin size={30} style={{ display: "flex", alignItems: "center", marginTop: "0.25rem" }} />
            </a>
            <a href='https://www.instagram.com/mayankjain194/'>
              <AiFillInstagram size={30} style={{ display: "flex", alignItems: "center", marginTop: "0.25rem" }} />
            </a>
            <a href='https://github.com/mayank-jain012'>
              <FaGithub size={30} style={{ display: "flex", alignItems: "center", marginTop: "0.25rem" }} />
            </a>

          </div>
        </div>
        <div className="footer-content-center">
          <h2>COMPANY</h2>
          <ul>
            <Link to='/privacy'>Privacy Policy</Link>
            <Link to='/shipping'>Shippment Policy</Link>
            <Link to='/terms'>Terms And Conditions</Link>
            <Link to='/refund'>Refund Policy</Link>
          </ul>
        </div>
        <div className="footer-content-right">
          <h2>GET IN TOUCH</h2>
          <ul>
            <li>+918826250203</li>
            <li>mayankjain12feb@gmail.com</li>
          </ul>
        </div>
      </div>
      <hr />
      <p className="footer-copyright">Copyright 2024 © GERICHT.com - All Right Reserved.</p>
      <p className="footer-copyright">
        <a href='https://github.com/mayank-jain012'>
          Developed By Mayank Jain
        </a>
      </p>
    </div>
  )
}

export default Footer

