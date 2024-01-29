import React from 'react';
import './NavBar.css';
import Logo from '../images/logo.png';
import { Link } from 'react-router-dom';

const NavBar = () => {
  const activeNavbar = (e) => {
    const element = document.querySelectorAll('nav ul li')
    for (let index = 0; index < element.length; index++) {
        element[index].classList.remove("active")
    }
    e.target.classList.add('active')
}
  return (
    <nav>
        <div>
            <img src={Logo} />
        </div>
      <ul>
        <Link >
        <li onClick={activeNavbar} className='active'>
            المنتجات
        </li>
        </Link>
        <li onClick={activeNavbar}>
            2المنتجات
        </li>
        <li onClick={activeNavbar}>
            3المنتجات
        </li>
        <li onClick={activeNavbar}>
            4المنتجات
        </li>
        <li onClick={activeNavbar}>
            5المنتجات
        </li>
        <li onClick={activeNavbar}>
            6المنتجات
        </li>
      </ul>
    </nav>
  )
}

export default NavBar
