import React from 'react'

export default function Footer() {
  return (
    <footer className="bg-blue-100 text-black w-full mt-auto">
      <div className="container flex flex-col md:flex-row justify-between mx-auto p-4 text-center">
        <span>&copy; {new Date().getFullYear()} <a href="#" className="hover:underline">Musik Wikipedia</a>. All Rights Reserved.</span>
        <ul className='flex justify-center md:justify-end'>
          <li><a href="#" className='hover:underline me-4 md:me-6'>Über uns</a></li>
          <li><a href="#" className='hover:underline me-4 md:me-6'>Datenschutzrichtlinie</a></li>
          <li><a href="#" className='hover:underline me-4 md:me-6'>Lizenzierung</a></li>
          <li><a href="#" className='hover:underline me-4 md:me-6'>Kontakt</a></li>
        </ul>
      </div>
    </footer>
  )
}
