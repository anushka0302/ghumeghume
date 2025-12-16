import React, { useRef, useEffect, useContext } from 'react';
import { Container, Row, Button } from 'reactstrap';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/images/logo.webp';
import './header.css';
import { AuthContext } from './../../context/AuthContext';

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

  const logout = () => {
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

    // Close menu if user scrolls
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

  // Logic to handle mobile dropdown clicks
  const handleMobileDropdown = (e) => {
    if (menuRef.current.classList.contains('show__menu')) {
      const parentItem = e.target.closest('.nav__item');
      if (parentItem && parentItem.classList.contains('dropdown')) {
        e.preventDefault(); // Stop navigation
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
                
                {/* ❌ Close Button (Inside the White Drawer) */}
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
                        // Only close menu if it's a direct link (no children)
                        if (!item.children) toggleMenu();
                      }}
                    >
                      {item.display}
                      {/* Down arrow for dropdowns */}
                      {item.children && <i className='ri-arrow-down-s-line'></i>}
                    </NavLink>

                    {/* Sub Menu */}
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

            {/* Right Side Icons (User, Search, Hamburger) */}
            <div className='nav_right d-flex align-items-center gap-4'>
              <div className='nav_btns d-flex align-items-center gap-4'>
                {user ? (
                  <>
                    <h5 className='mb-0 username'>{user.username}</h5>
                    <Button className='btn btn-dark' onClick={logout}>
                      Logout
                    </Button>
                  </>
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

              {/* 🍔 Hamburger Icon (Visible on Mobile) */}
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