import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header className='bg-blue-600 p-4 text-white flex justify-between items-center'>
      <h1>E-Commerce</h1>
      <nav>
        <Link className='mr-4 hover:underline' to={'/'}>Home</Link>
        <Link className='mr-4 hover:underline' to={'/cart'}>Cart</Link>
      </nav>
    </header>
  )
}

export default Header
