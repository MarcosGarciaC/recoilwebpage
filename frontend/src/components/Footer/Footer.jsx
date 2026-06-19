import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer id='foot'>
      <div className='footer-content'>
        <div className="footer-left">
          <h1 className='logo'>RECOIL</h1>
        </div>

        <div className="footer-center">
          <ul className="footer-links">
            <li><a href='#'>LEGAL</a></li>
            <li><a href='#'>PRIVACY</a></li>
            <li><a href='#'>SUPPORT</a></li>
            <li><a href='#'>TWITCH</a></li>
            <li><a href='#'>DISCORD</a></li>
          </ul>
        </div>

        <div className="footer-right">
          <p>© 2024 RECOIL KINETIC CRITIQUE</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;