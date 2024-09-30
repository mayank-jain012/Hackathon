import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import './index.css';
import { assets } from '../assets/assets';
import { Link, useNavigate } from 'react-router-dom';
import { GiHamburgerMenu } from 'react-icons/gi';
import { MdOutlineRestaurantMenu } from 'react-icons/md';
import { FaBasketShopping } from 'react-icons/fa6';
import { IoPersonAdd } from 'react-icons/io5';
import { logout } from '../features/auth/authSlice'; // Adjust the path based on your folder structure

const Header = ({ setShowLogin, setShowSignup }) => {
  const [menu, setMenu] = useState("home");
  const navigate = useNavigate();
  const [toggleMenu, setToggleMenu] = useState(false);
  
  const dispatch = useDispatch();
  const { currentUser, isAuthenticated } = useSelector((state) => state.auth); // Adjust if your slice is named differently

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <div className='app__navbar'>
      <Link to='/' className='app__navbar-logo'>
        <img src={assets.gericht} alt="" />
      </Link>
      <ul className="navbar-menu app__navbar-links">
        <li className='p__opensans'>
          <Link to="/" onClick={() => setMenu("home")} className={`${menu === "home" ? "active" : ""}`}>Home</Link>
        </li>
        <li className='p__opensans'>
          <Link to="/about" onClick={() => setMenu("about")} className={`${menu === "about" ? "active" : ""}`}>About</Link>
        </li>
        <li className='p__opensans'>
          <Link to="/shop" onClick={() => setMenu("shop")} className={`${menu === "shop" ? "active" : ""}`}>Shop Now</Link>
        </li>
        <li className='p__opensans'>
          <Link to="/blog" onClick={() => setMenu("blog")} className={`${menu === "blog" ? "active" : ""}`}>Blogs</Link>
        </li>
        {/* <li className='p__opensans'>
          <Link to="/app-download" onClick={() => setMenu("mob-app")} className={`${menu === "mob-app" ? "active" : ""}`}>Mobile App</Link>
        </li> */}
        <li className='p__opensans'>
          <Link to="/contact" onClick={() => setMenu("contact")} className={`${menu === "contact" ? "active" : ""}`}>Contact Us</Link>
        </li>
      </ul>
      <div className="navbar-right">
        <Link to='/cart' className='navbar-search-icon'>
          <FaBasketShopping color='white' size={30} />
          {/* Replace this with your cart item count */}
          <div className="dot"></div>
        </Link>
        {!isAuthenticated ? (
          <div>
            <button onClick={() => navigate('/login')} className='p__opensans'>Sign In</button>
            <button onClick={() => navigate('/signup')} className='p__opensans'>Sign Up</button>
          </div>
        ) : (
          <div className='navbar-profile'>
            <IoPersonAdd size={30} color='white' />
            <ul className='navbar-profile-dropdown'>
              <li onClick={() => navigate('/myorders')}>
                <img src={assets.bag_icon} alt="" /> <p>Orders</p>
              </li>
              <hr />
              <li onClick={() => navigate('/profile')}>
                <img src={assets.bag_icon} alt="" /> <p>Profile</p>
              </li>
              <hr />
              <li onClick={handleLogout}>
                <img src={assets.logout_icon} alt="" /> <p>Logout</p>
              </li>
            </ul>
          </div>
        )}
      </div>

      <div className='app__navbar-smallscreen'>
        <GiHamburgerMenu color='#fff' fontSize={27} onClick={() => { setToggleMenu(true) }} />
        {toggleMenu && (
          <div className='app__navbar-smallscreen_overlay flex__center slide-bottom'>
            <MdOutlineRestaurantMenu fontSize={27} className='overlay__close' onClick={() => { setToggleMenu(false) }} />
            <ul className="app__navbar-smallscreen-links">
              <li className='p__opensans'>
                <Link to="/" onClick={() => setMenu("home")} className={`${menu === "home" ? "active" : ""}`}>Home</Link>
              </li>
              <li className='p__opensans'>
                <Link to="/about" onClick={() => setMenu("about")} className={`${menu === "about" ? "active" : ""}`}>About Us</Link>
              </li>
              <li className='p__opensans'>
                <Link to="/menu" onClick={() => setMenu("menu")} className={`${menu === "menu" ? "active" : ""}`}>Menu</Link>
              </li>
              <li className='p__opensans'>
                <Link to="/awards" onClick={() => setMenu("awards")} className={`${menu === "awards" ? "active" : ""}`}>Awards</Link>
              </li>
              <li className='p__opensans'>
                <Link to="/app-download" onClick={() => setMenu("mob-app")} className={`${menu === "mob-app" ? "active" : ""}`}>Mobile App</Link>
              </li>
              <li className='p__opensans'>
                <Link to="/contact" onClick={() => setMenu("contact")} className={`${menu === "contact" ? "active" : ""}`}>Contact Us</Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
