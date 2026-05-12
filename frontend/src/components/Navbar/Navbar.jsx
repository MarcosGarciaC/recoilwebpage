import React from 'react'
import './Navbar.css'

const Navbar = () => {
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
          <li className='list-option'><a href="#">Premium</a></li>
        </ul>
      </div>
      <div id="nb-right__side">
        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-person" viewBox="0 0 16 16">
          <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z" />
        </svg>
        <p style={{ fontFamily: '"Space Grotesk", sans-serif' }}>
          Login
        </p>
      </div>
    </nav>
  )
}

export default Navbar
