import React, { useState, useEffect } from 'react';
import './default-nav-bar.module.css';

// Navigation items
const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Agents', href: '/agents' },
  { label: 'Analytics', href: '/analytics' },
  { label: 'Automation', href: '/automation' },
  { label: 'Pricing', href: '/pricing' },
];

interface User {
  name: string;
  avatar?: string;
  email?: string;
}

interface NavbarSimpleProps {
  user?: User;
  onMenuClick?: (item: string) => void;
  onLoginClick?: () => void;
  onLogoutClick?: () => void;
  className?: string;
  hideOnScroll?: boolean;
}

const DefaultNavBar: React.FC<NavbarSimpleProps> = ({
  user,
  onMenuClick,
  onLoginClick,
  onLogoutClick,
  className = '',
  hideOnScroll = false,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Handle scroll effects
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      setIsScrolled(currentScrollY > 0);
      
      if (hideOnScroll) {
        setIsHidden(currentScrollY > lastScrollY && currentScrollY > 100);
        setLastScrollY(currentScrollY);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hideOnScroll, lastScrollY]);

  const handleMenuItemClick = (item: string) => {
    onMenuClick?.(item);
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  // Close menus when clicking outside
        /*
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
if (!target.closest('.navbar-user-menu') && !target.closest('.navbar-user-button')) {
        setIsUserMenuOpen(false);
      }
      if (!target.closest('.navbar-mobile-menu') && !target.closest('.navbar-mobile-toggle')) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);
*/
  return (
    <nav 
      className={`navbar ${isScrolled ? 'navbar--scrolled' : ''} ${isHidden ? 'navbar--hidden' : ''} ${className}`}
    >
      <div className="navbar__container">
        {/* Logo */}
        <div className="navbar__logo">
          Agent.AI
        </div>

        {/* Desktop Navigation */}
        <div className="navbar__nav">
          {navItems.map((item) => (
            <button
              key={item.label}
              className="navbar__link"
              onClick={() => handleMenuItemClick(item.label)}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Right side actions */}
        <div className="navbar__actions">
          {/* Search Button */}
          <button className="navbar__icon-button" title="Search">
            🔍
          </button>

          {user ? (
            <>
              {/* Notifications */}
              <button className="navbar__icon-button" title="Notifications">
                🔔
              </button>

              {/* User Menu */}
              <div className="navbar__user-container">
                <button
                  className="navbar__user-button"
                  onClick={toggleUserMenu}
                  title="Account"
                >
                  {user.avatar ? (
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="navbar__avatar"
                    />
                  ) : (
                    <div className="navbar__avatar navbar__avatar--fallback">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                  )}
                </button>

                {/* User Dropdown Menu */}
                {isUserMenuOpen && (
                  <div className="navbar__user-menu">
                    <div className="navbar__user-info">
                      <div className="navbar__user-name">{user.name}</div>
                      {user.email && (
                        <div className="navbar__user-email">{user.email}</div>
                      )}
                    </div>
                    <hr className="navbar__menu-divider" />
                    <button className="navbar__menu-item">Profile</button>
                    <button className="navbar__menu-item">Settings</button>
                    <hr className="navbar__menu-divider" />
                    <button 
                      className="navbar__menu-item navbar__menu-item--danger"
                      onClick={onLogoutClick}
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              {/* Login/Signup buttons for non-authenticated users */}
              <button
                className="navbar__button navbar__button--secondary"
                onClick={onLoginClick}
              >
                Sign In
              </button>
              <button
                className="navbar__button navbar__button--primary"
                onClick={onLoginClick}
              >
                Get Started
              </button>
            </>
          )}

          {/* Mobile menu toggle */}
          <button
            className="navbar__mobile-toggle"
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            ☰
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="navbar__mobile-menu">
            <div className="navbar__mobile-content">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  className="navbar__mobile-link"
                  onClick={() => handleMenuItemClick(item.label)}
                >
                  {item.label}
                </button>
              ))}
              
              {!user && (
                <div className="navbar__mobile-auth">
                  <button
                    className="navbar__mobile-link"
                    onClick={onLoginClick}
                  >
                    Sign In
                  </button>
                  <button
                    className="navbar__button navbar__button--primary navbar__button--mobile"
                    onClick={onLoginClick}
                  >
                    Get Started
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default DefaultNavBar;