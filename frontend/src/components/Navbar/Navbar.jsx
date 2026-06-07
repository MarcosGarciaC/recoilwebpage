import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import './Navbar.css'
import UserMenu from '../UserMenu/UserMenu';

const Navbar = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem('currentUser')) } catch (e) { return null }
  })
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const [showGreeting, setShowGreeting] = useState(
    localStorage.getItem("justLoggedIn") === "true"
);

  useEffect(() =>{
    const handleClickOutside = (event) => {
      if (menuRef.current &&
        !menuRef.current.contains(event.target)
      ) {
          setMenuOpen(false);
      }
    };
    const handleEscKey = (event) =>{
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };
    document.addEventListener(
      "mousedown",
      handleClickOutside
    );
    window.addEventListener(
      "keydown",
      handleEscKey
    );
    return () => {
      document.removeEventListener("mousedown",
        handleClickOutside
      );
      window.removeEventListener(
        "keydown",
        handleEscKey
      );
    };
  }, []);

  useEffect(() => {
    if (currentUser && localStorage.getItem("justLoggedIn") === "true") {
      const timer = setTimeout(() => {
        setShowGreeting(false);

        localStorage.removeItem(
          "justLoggedIn"
        );
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [currentUser]);

  useEffect(() => {
    const onUserUpdated = () => {
      try { setCurrentUser(JSON.parse(localStorage.getItem('currentUser'))) } catch (e) {}
    }
    window.addEventListener('userUpdated', onUserUpdated)
    return () => window.removeEventListener('userUpdated', onUserUpdated)
  }, [])

  return (
    <nav id='navbar'>
      <div id='nb-left__side'>
        <h1 className='logo wave-logo'>RECOIL</h1>
      </div>
      <div id="nb-center">
        <ul className='option-list'>
          <li className='list-option'><a href="/">Descubre</a></li>
          <li className='list-option'><a href="/genders">Generos</a></li>
          <li className='list-option'><a href="/news">Noticias</a></li>
          <li className='list-option'><a href="/premium">Premium</a></li>
        </ul>
      </div>
      <div id="nb-right__side">
        {currentUser ? (
          <div className="user-section">
            <div className='greeting-container'>
          <span className={`greeting greeting-full ${
            showGreeting ? "show" : "hide"
          }`}>
            Hola, {currentUser.name}
            </span>
            <span
            className={`greeting greeting-name ${
              showGreeting ? "hide" : "show"
            }`}
            >
              {currentUser.name}
              </span>
            </div>
            <div ref={menuRef}>
            <div
              className='profile-avatar'
              onClick={() => setMenuOpen(prev => !prev)}
            >
              {currentUser?.avatar ? (
                <img src={currentUser.avatar} alt={currentUser.name} />
              ) : (
                (currentUser.name || 'U').charAt(0).toUpperCase()
              )}
            </div>
            {menuOpen && (
              <UserMenu currentUser={currentUser} />
            )}
            </div>
          </div>
        ) : (
        <a onClick={() => navigate("/login")} className="login-link">
        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" className="bi bi-person" viewBox="0 0 16 16">
          <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z" />
        </svg>
        <span>
          Login
        </span>
        </a>
        )}
      </div>
    </nav>
  )
}

export default Navbar
