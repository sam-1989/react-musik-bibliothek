import React from "react";

export default function Footer() {
    return (
        <footer className="bg-blue-200 dark:bg-gray-800 shadow-md w-full py-4 ">
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
                <span className="dark:text-gray-200">
                   {" "}
                    <a href="#" className="hover:underline text-blue-600 dark:text-blue-400">
                        Musik-Bibliothek GitMan
                    </a>
                    . All Rights Reserved. &copy; {new Date().getFullYear()}
                </span>
                <ul className="flex space-x-6 mt-4 md:mt-0">
                    <li>
                        <a
                            href="#"
                            className="text-gray-900 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
                        >
                            Über uns
                        </a>
                    </li>
                    <li>
                        <a
                            href="#"
                            className="text-gray-900 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
                        >
                            Datenschutzrichtlinie
                        </a>
                    </li>
                    <li>
                        <a
                            href="#"
                            className="text-gray-900 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
                        >
                            Lizenzierung
                        </a>
                    </li>
                    <li>
                        <a
                            href="#"
                            className="text-gray-900 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
                        >
                            Kontakt
                        </a>
                    </li>
                </ul>
            </div>
        </footer>
    );
}
