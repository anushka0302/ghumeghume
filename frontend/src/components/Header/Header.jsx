import React, { useRef, useEffect, useContext } from 'react';
import { Container, Row, Button } from 'reactstrap';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/images/logo.webp';
import './header.css';
import { AuthContext } from './../../context/AuthContext';

// ✅ 1. Import Google Logout
import { googleLogout } from '@react-oauth/google';

const navLinks = [
  { path: '/home', display: 'Home' },

  {
    path: '#',
    display: 'Company',
    children: [
      { path: '/about', display: 'About Us' },
      { path: '/why-us', display: 'Why Us' },
    ],
  },
  {
    path: '#',
    display: 'Expeditions',
    children: [
      { path: '/expeditions/meditation', display: 'Meditation' },
      { path: '/expeditions/enlightenment', display: 'Enlightenment' },
      { path: '/expeditions/remote-workplace', display: 'Remote Workplace' },
    ],
  },
  {
    path: '#',
    display: 'Useful Info',
    children: [
      { path: '/faq', display: 'FAQ' },
      { path: '/gear-list', display: 'Gear List' },
      { path: '/contact', display: 'Contact' },
    ],
  },
  { path: '/blogs', display: 'Blogs' },
  { path: '/contact', display: 'Contact Us' },
];

const Header = () => {
  const headerRef = useRef(null);
  const menuRef = useRef(null);
  const navigate = useNavigate();
  const { user, dispatch } = useContext(AuthContext);

  // ✅ 2. Integrated googleLogout into your existing logic
  const logout = () => {
    googleLogout(); // Clears Google session to stop "Sign in as Umang"
    dispatch({ type: 'LOGOUT' });
    navigate('/');
  };

  useEffect(() => {
    const stickyHeaderFunc = () => {
      if (
        document.body.scrollTop > 80 ||
        document.documentElement.scrollTop > 80
      ) {
        headerRef.current.classList.add('sticky__header');
      } else {
        headerRef.current.classList.remove('sticky__header');
      }
    };

    const closeMobileMenuOnScroll = () => {
      if (menuRef.current && menuRef.current.classList.contains('show__menu')) {
        menuRef.current.classList.remove('show__menu');
      }
    };

    window.addEventListener('scroll', stickyHeaderFunc);
    window.addEventListener('scroll', closeMobileMenuOnScroll);

    return () => {
      window.removeEventListener('scroll', stickyHeaderFunc);
      window.removeEventListener('scroll', closeMobileMenuOnScroll);
    };
  }, []);

  const toggleMenu = () => menuRef.current.classList.toggle('show__menu');

  const handleMobileDropdown = (e) => {
    if (menuRef.current.classList.contains('show__menu')) {
      const parentItem = e.target.closest('.nav__item');
      if (parentItem && parentItem.classList.contains('dropdown')) {
        e.preventDefault();
        parentItem.classList.toggle('mobile-dropdown-open');
      }
    }
  };

  return (
    <header className='header' ref={headerRef}>
      <Container>
        <Row>
          <div className='nav_wrapper d-flex align-items-center justify-content-between'>
            
            {/* Logo */}
            <div className='logo'>
              <Link to='/home'>
                <img src={logo} alt='Ghume Ghume' />
              </Link>
            </div>

            {/* Navigation Menu (Overlay + Drawer) */}
            <div className='navigation' ref={menuRef} onClick={toggleMenu}>
              <ul className='menu d-flex align-items-center gap-4' onClick={(e) => e.stopPropagation()}>
                
                <span className="mobile__menu_close" onClick={toggleMenu}>
                  <i className="ri-close-line"></i>
                </span>

                {navLinks.map((item, index) => (
                  <li
                    className={`nav__item ${item.children ? 'dropdown' : ''}`}
                    key={index}
                  >
                    <NavLink
                      to={item.path}
                      className={({ isActive }) =>
                        isActive ? 'active__link' : ''
                      }
                      onClick={(e) => {
                        handleMobileDropdown(e);
                        if (!item.children) toggleMenu();
                      }}
                    >
                      {item.display}
                      {item.children && <i className='ri-arrow-down-s-line'></i>}
                    </NavLink>

                    {item.children && (
                      <ul className='dropdown__menu'>
                        {item.children.map((child, childIndex) => (
                          <li className='dropdown__item' key={childIndex}>
                            <NavLink to={child.path} onClick={toggleMenu}>
                              {child.display}
                            </NavLink>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {/* Right Side Icons */}
            <div className='nav_right d-flex align-items-center gap-4'>
              <div className='nav_btns d-flex align-items-center gap-2'>
                {user ? (
                  <div className="user__profile d-flex align-items-center gap-2">
                    <div className="user__avatar_circle">
                      <i className="ri-user-fill"></i>
                    </div>
                    {/* ✅ Using the specific class for grey color */}
                    <h5 className='mb-0 username__text_grey'>{user.username}</h5>
                    <Button className='btn logout__btn' onClick={logout}>
                      Logout
                    </Button>
                  </div>
                ) : (
                  <>
                    <Button className='btn secondary__btn'>
                      <Link to='/login'>Login</Link>
                    </Button>
                    <Button className='btn primary__btn'>
                      <Link to='/register'>Register</Link>
                    </Button>
                  </>
                )}
              </div>

              {/* Hamburger Icon */}
              <span className='mobile__menu' onClick={toggleMenu}>
                <i className='ri-menu-line'></i>
              </span>
            </div>
          </div>
        </Row>
      </Container>
    </header>
  );
};

export default Header;