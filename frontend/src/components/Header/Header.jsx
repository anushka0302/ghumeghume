import React, { useRef, useEffect, useContext } from 'react';
import { Container, Row, Button } from 'reactstrap';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/images/logo.png';
import './header.css';
import { AuthContext } from './../../context/AuthContext';

const navLinks = [
  {
    path: '/home',
    display: 'Home',
  },
  {
    path: '#', // Use '#' for parent links that only open dropdowns
    display: 'Company',
    children: [
      { path: '/about', display: 'About Us' }, // Kept your 'about' link
      //{ path: '/our-team', display: 'Our Team' },
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
  // {
  //   path: '#',
  //   display: 'Trekking',
  //   children: [
  //     { path: '/tours', display: 'All Treks' }, // Kept your 'tours' link
  //     //{ path: '/trekking/ebc', display: 'Everest Base Camp' },
  //     //{ path: '/trekking/annapurna', display: 'Annapurna Circuit' },
  //   ],
  // },
  {
    path: '#',
    display: 'Useful Info',
    children: [
      { path: '/faq', display: 'FAQ' },
      { path: '/gear-list', display: 'Gear List' },
      { path: '/contact', display: 'Contact' },
    ],
  },
  {
    path: '/contact',
    display: 'Contact Us',
  },
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

  // useEffect(() => {
  //   const stickyHeaderFunc = () => {
  //     if (
  //       document.body.scrollTop > 80 ||
  //       document.documentElement.scrollTop > 80
  //     ) {
  //       headerRef.current.classList.add('sticky__header');
  //     } else {
  //       headerRef.current.classList.remove('sticky__header');
  //     }
  //   };

  //   window.addEventListener('scroll', stickyHeaderFunc);
  //   return () => window.removeEventListener('scroll', stickyHeaderFunc);
  // }, []);
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

  // NEW: Close mobile menu on scroll
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

  // NEW: Handle mobile dropdown clicks
  const handleMobileDropdown = (e) => {
    // Check if we are in mobile view (menu is active)
    if (menuRef.current.classList.contains('show__menu')) {
      const parentItem = e.target.closest('.nav__item');
      if (parentItem.classList.contains('dropdown')) {
        e.preventDefault(); // Prevent default link behavior
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

            {/* Navigation Menu */}
            <div className='navigation' ref={menuRef} onClick={toggleMenu}>
              <ul className='menu d-flex align-items-center gap-4' onClick={(e) => e.stopPropagation()}>
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
                      // NEW: Added click listener for mobile dropdowns
                     onClick={(e) => {
  handleMobileDropdown(e); // Keep existing dropdown logic
  if (!item.children) toggleMenu(); // Close menu ONLY if it's a direct link (no dropdown)
}}
                    >
                      {item.display}
                      {item.children && <i className='ri-arrow-down-s-line'></i>}
                    </NavLink>

                    {/* Render dropdown menu if children exist */}
                    {item.children && (
                      <ul className='dropdown__menu'>
                        {item.children.map((child, childIndex) => (
                          <li className='dropdown__item' key={childIndex}>
                            <NavLink to={child.path} onClick={toggleMenu}>{child.display}</NavLink>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {/* Navigation Right Section */}
            <div className='nav_right d-flex align-items-center gap-4'>
              {/* Search Icon */}
              <span className='nav__search-icon'>
                <i className='ri-search-line'></i>
              </span>

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