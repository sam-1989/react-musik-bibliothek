import React from "react";
import { FaMusic, FaBook, FaSmile } from "react-icons/fa";

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-20 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
            <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 shadow-xl rounded-lg overflow-hidden font-sans transition-colors duration-300">
                <div className="px-6 py-8 bg-gray-50 dark:bg-gray-800 shadow-[0_2px_20px_-3px_rgba(6,81,237,0.3)] rounded-2xl font-sans transition-colors duration-300">
                    <div className="flex items-center mb-6">
                        <FaMusic className="text-blue-500 dark:text-blue-400 h-10 w-10 mr-4" />
                        <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">
                            Über uns
                        </h2>
                    </div>

                    <p className="text-lg text-gray-800 dark:text-gray-300 mb-4">
                        Willkommen bei der
                        <span className="font-semibold">
                            {" "}
                            Musikbibliothek GitMan
                        </span>{" "}
                        - Wir sind eine Plattform, die schnellen und
                        komfortablen Zugang zu einer umfangreichen Sammlung von
                        Musik und Noten bietet.
                    </p>

                    <p className="text-lg text-gray-700 dark:text-gray-400 mb-6">
                        Unsere Mission ist es, Musikliebhabern und Fachleuten
                        gleichermaßen eine benutzerfreundliche Umgebung zu
                        bieten, in der sie klassische und moderne Musiknoten
                        einfach finden, durchsuchen und herunterladen können.
                    </p>

                    <div className="flex flex-col md:flex-row md:space-x-6">
                        <div className="flex mb-4 md:mb-0">
                            <FaBook className="text-green-500 dark:text-green-400 h-8 w-8 mr-3" />

                            <div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                                    Umfangreiche Sammlung
                                </h3>
                                <p className="text-gray-600 dark:text-gray-300">
                                    Zugriff auf Tausende von Musiknoten
                                    verschiedener Komponisten und Genres.
                                </p>
                            </div>
                        </div>

                        <div className="flex">
                            <FaSmile className="text-purple-500 dark:text-purple-400 h-8 w-8 mr-3" />

                            <div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                                    Benutzerfreundlich
                                </h3>
                                <p className="text-gray-600 dark:text-gray-300">
                                    Intuitive Suchfunktion und einfache
                                    Navigation für ein optimales Nutzererlebnis.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="px-6 py-4 bg-gray-200 dark:bg-gray-700">
                    <p className="text-center text-sm text-gray-600 dark:text-gray-300">
                        © {new Date().getFullYear()} Musikbibliothek GitMan.
                        Alle Rechte vorbehalten.
                    </p>
                </div>
            </div>
        </div>
    );
}
