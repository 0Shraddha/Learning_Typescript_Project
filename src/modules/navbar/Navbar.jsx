import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import './navbar.css'

const Navbar = () => {
  const location = useLocation()

  const links = [
    { to: '/', label: 'Home Page' },
    { to: '/pattern-list', label: 'My Digital Patterns' },
    { to: '/upload-pattern', label: 'Upload New Patterns' },
  ]

  return (
    <nav className="navbar">
      <div className="navbar-brand">Pattern Studio</div>
      <div className="navbar-links">
        {links.map(({ to, label }) => (
          <Link
            key={to}
            to={to}
            className={`navbar-link ${location.pathname === to ? 'active' : ''}`}
          >
            {label}
          </Link>
        ))}
      </div>
    </nav>
  )
}

export default Navbar