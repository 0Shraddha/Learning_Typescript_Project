import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div>
       
            <Link to={'/'}>
                Home Page 
            </Link>

            <Link to={'/pattern-list'}>
                My Digital Patterns 
            </Link>

            <Link to={'/upload-pattern'}>
                Upload New Patterns 
            </Link>
      
    </div>
  )
}

export default Navbar
