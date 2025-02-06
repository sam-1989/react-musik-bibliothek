import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { GiViolin } from "react-icons/gi";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // Define your navigation items in an array for easier management
  const navItems = [
    { name: "Home", path: "/" },
    { name: "Komponisten", path: "/composers" },
    { name: "Über uns", path: "/about" },
    { name: "Kontakt", path: "/contact" },
  ];

  return (
    <nav className="bg-blue-200 dark:bg-gray-800 shadow-md w-full z-10 transition-colors duration-300">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link
          to="/"
          className="flex items-center text-2xl font-bold text-gray-800 dark:text-white"
        >
          <div className="flex items-center mr-2 transition-transform duration-300 hover:scale-150">
            <GiViolin className="h-10 w-10 text-blue-500 dark:text-blue-400" />
          </div>
          Musik Bibliothek GitMan
        </Link>

        {/* Hamburger Menu for Mobile Devices */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-800 dark:text-white focus:outline-none"
            aria-label={isOpen ? "Schließen Menü" : "Öffne Menü"}
            aria-expanded={isOpen}
          >
            {isOpen ? (
              // Close icon
              <svg
                className="w-6 h-6 transition-transform transform rotate-180"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              // Menu icon
              <svg
                className="w-6 h-6 transition-transform transform rotate-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Navigation Links */}
        <div
          className={`${
            isOpen ? "block" : "hidden"
          } md:flex items-center space-x-6`}
        >
          {navItems.map(({ name, path }) => (
            <Link
              key={path}
              to={path}
              className={`block mt-4 md:mt-0 text-lg font-medium transition-transform duration-300 transform hover:scale-110 ${
                location.pathname === path
                  ? "text-blue-600 font-semibold"
                  : "text-gray-800 dark:text-gray-200 hover:text-blue-600"
              }`}
              onClick={() => setIsOpen(false)} // Close menu on link click (mobile)
            >
              {name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}