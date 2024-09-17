import React from 'react'
import {Link}from "react-router-dom";

export default function Navbar() {
  return (
    <nav>
        <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/works">Werke</Link></li>
            <li><Link to="/composers">Komponisten</Link></li>
        </ul>
    </nav>
  )
}
