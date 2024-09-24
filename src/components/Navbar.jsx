import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { GiViolin } from "react-icons/gi";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    return (
        <nav className="bg-blue-200 dark:bg-gray-800 shadow-md w-full z-10 transition-colors duration-300">
            <div className="container mx-auto px-4 py-3 flex items-center justify-between">
                <Link
                    to="/"
                    className="flex items-center text-2xl font-bold text-gray-800 dark:text-white"
                >
                    <div className="flex items-center mr-2 transform transition-transform duration-300 hover:scale-150">
                        <GiViolin className="h-10 w-10 text-blue-500 dark:text-blue-400" />
                    </div>
                    Musik Bibliothek GitMan
                </Link>

                {/* Hamburger Menü für mobile Geräte */}
                <div className="md:hidden">
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="text-gray-800 dark:text-white focus:outline-none"
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
                        className={`block mt-4 md:mt-0 text-lg font-medium transition-all duration-300 transform hover:scale-110 ${
                            location.pathname === "/"
                                ? "text-blue-600 font-semibold"
                                : "text-gray-800 dark:text-gray-200"
                        } hover:text-blue-600`}
                    >
                        Home
                    </Link>
                    <Link
                        to="/composers"
                        className={`block mt-4 md:mt-0 text-lg font-medium transition-all duration-300 transform hover:scale-110 ${
                            location.pathname === "/composers"
                                ? "text-blue-600 font-semibold"
                                : "text-gray-800 dark:text-gray-200"
                        } hover:text-blue-600`}
                    >
                        Komponisten
                    </Link>
                    <Link
                        to="/about"
                        className={`block mt-4 md:mt-0 text-lg font-medium transition-all duration-300 transform hover:scale-110 ${
                            location.pathname === "/about"
                                ? "text-blue-600 font-semibold"
                                : "text-gray-800 dark:text-gray-200"
                        } hover:text-blue-600`}
                    >
                        Über uns
                    </Link>
                    <Link
                        to="/contact"
                        className={`block mt-4 md:mt-0 text-lg font-medium transition-all duration-300 transform hover:scale-110 ${
                            location.pathname === "/contact"
                                ? "text-blue-600 font-semibold"
                                : "text-gray-800 dark:text-gray-200"
                        } hover:text-blue-600`}
                    >
                        Kontakt
                    </Link>
                </div>
            </div>
        </nav>
    );
}
