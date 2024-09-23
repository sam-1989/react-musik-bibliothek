import React, { useState } from "react";
import { Link } from "react-router-dom";
import { GiViolin } from "react-icons/gi";
import { FaBook } from "react-icons/fa";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <nav className="bg-blue-100 shadow-md  w-full z-10">
            <div className="container mx-auto px-4 py-3 flex items-center justify-between">
                <Link
                    to="/"
                    className="flex items-center text-2xl font-bold text-gray-800"
                >
                    <div className="flex items-center mr-2 transform transition-transform duration-300 hover:scale-150">
                        <GiViolin className="h-10 w-10 text-blue-500" />
                    </div>
                    Musik Bibliothek
                </Link>

                {/* Hamburger Meneu für mobile Geräte */}
                <div className="md:hidden">
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="text-gray-800 focus:outline-none"
                    >
                        {isOpen ? (
                            // Schließen-Icon
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
                            // Menü-Icon
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
                    className={`md:flex items-center space-x-6 ${
                        isOpen ? "block" : "hidden"
                    } md:block`}
                >
                    <Link
                        to="/"
                        className={`block mt-4 md:mt-0 text-lg transition-colors duration-300 ${
                            location.pathname === "/"
                                ? "text-blue-600 font-semibold"
                                : "text-gray-900"
                        } hover:text-blue-600`}
                    >
                        Home
                    </Link>
                    <Link
                        to="/composers"
                        className={`block mt-4 md:mt-0 text-lg transition-colors duration-300 ${
                            location.pathname === "/composers"
                                ? "text-blue-600 font-semibold"
                                : "text-gray-900"
                        } hover:text-blue-600`}
                    >
                        Komponisten
                    </Link>
                    <Link
                        to="/about"
                        className={`block mt-4 md:mt-0 text-lg transition-colors duration-300 ${
                            location.pathname === "/about"
                                ? "text-blue-600 font-semibold"
                                : "text-gray-900"
                        } hover:text-blue-600`}
                    >
                        Über uns
                    </Link>
                    <Link
                        to="/contact"
                        className={`block mt-4 md:mt-0 text-lg transition-colors duration-300 ${
                            location.pathname === "/contact"
                                ? "text-blue-600 font-semibold"
                                : "text-gray-900"
                        } hover:text-blue-600`}
                    >
                        Kontakt
                    </Link>
                </div>
            </div>
        </nav>
    );
}
