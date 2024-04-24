import Link from 'next/link';
import React from 'react'

const Header = () => {
  return (
    <header className='flex justify-between items-center bg-[#333] text-white px-3 py-5'>
      <div className="font-bold font-3xl">Application</div>
      <nav>
        <ul className="list-none">
          <li className='inline ml-5'>
            <Link href="/demo/google-places">Google Places</Link>
          </li>
          <li className='inline ml-5'>
            <a href="#nosotros">Nosotros</a>
          </li>
          <li className='inline ml-5'>
            <a href="#servicios">Servicios</a>
          </li>
          <li className='inline ml-5'>
            <a href="#contacto">Contacto</a>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header