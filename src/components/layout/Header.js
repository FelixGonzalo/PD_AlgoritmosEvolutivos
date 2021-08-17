import React from 'react'
import { NavLink } from 'react-router-dom'

const Header = () => {

  const activarMenu = (e) => {
    const header_nav = document.querySelector('.header-nav')
    header_nav.classList.toggle('header-nav-active');
  }

  return (
    <header className="header">
      <div className="header-top">
        <h2>RECICLAFONO</h2>
        <button onClick={(e) => activarMenu(e)} className="btn header-btn-menu"><i className="fas fa-bars"></i></button>
      </div>
      <nav className="header-nav">
        <ul>
          <li>
            <NavLink to="/mapa" className="header-option" activeClassName="header-active">
              Ver mapa
            </NavLink>
          </li>
          <li>
            <NavLink to="/" exact className="header-option" activeClassName="header-active">
              + Punto de Recolección
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header
