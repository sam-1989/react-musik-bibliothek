import React, { useState, useEffect } from "react";
import "../App.css";
import { Link } from "react-router-dom";

export default function Composers() {
    const [composers, setComposers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedLetter, setSelectedLetter] = useState("");

    useEffect(() => {
        async function fetchComposers() {
            setLoading(true);
            try {
                const response = await fetch(
                    `https://corsproxy.io/?https://imslp.org/api.php?action=query&list=categorymembers&cmtitle=Category:Composers&cmstartsortkeyprefix=${decodeURIComponent(
                        selectedLetter
                    )}&cmlimit=500&format=json&origin=*`
                );
                if (!response.ok) {
                    throw new Error(
                        `Fehler beim Abrufen der Daten: ${response.statusText}`
                    );
                }
                const data = await response.json();

                setComposers(data.query.categorymembers);
            } catch (error) {
                setError(`Fehler beim Abrufen der Daten: ${error.message}`);
            } finally {
                setLoading(false);
            }
        }

        fetchComposers();
    }, [selectedLetter]);

    // eine Scroll nach oben Funktion
    const scrollToTop = () => {
      window.scrollTo({top: 0, behavior: "smooth"})
    }


    // Eine Liste der Buchstaben A–Z
    const letters = Array.from({ length: 26 }, (_, i) =>
        String.fromCharCode(65 + i)
    );

    // Spinner beim Laden der Daten
    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-16 w-16"></div>
            </div>
        );
    }

    return (
        <div className="p-16 bg-gray-100 dark:bg-gray-900 min-h-screen text-gray-900 dark:text-gray-200 transition-colors duration-300">
            <h2 className="text-2xl text-center font-bold mb-4">
                Liste der Komponisten
            </h2>

            {/* Alphabetische Navigation */}
            <div className="flex flex-wrap justify-center py-4 mb-7">
                {letters.map((letter) => (
                    <button
                        key={letter}
                        onClick={() => setSelectedLetter(letter)}
                        className={`px-4 py-2 m-2 rounded-full transition-colors duration-300 ${
                            selectedLetter === letter
                                ? "bg-blue-600 text-white dark:bg-blue-500"
                                : "bg-gray-300 hover:bg-blue-700 hover:text-white dark:bg-gray-700 dark:hover:bg-blue-600 dark:text-gray-300"
                        }`}
                    >
                        {letter}
                    </button>
                ))}
            </div>

            {/* Anzeige der Komponisten */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {composers.map((composer) => (
                    <div
                        key={composer.pageid}
                        className="bg-white dark:bg-gray-800 rounded-lg border shadow-sm p-4 hover:shadow-xl transition-shadow duration-300"
                    >
                        <Link
                            to={`/composer/${decodeURIComponent(
                                composer.title.replace(/^Category:/, "").trim()
                            )}`}
                            className="text-lg font-semibold text-blue-900 dark:text-blue-400 hover:underline"
                        >
                            {composer.title.replace(/^Category:/, "")}
                        </Link>
                    </div>
                ))}
            </div>
            <button onClick={scrollToTop} className="fixed bottom-8 right-8 bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors">
              Nach oben
            </button>
        </div>
    );
}
