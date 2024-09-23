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
                console.log(categorymembers);
                              
            } catch (error) {
                setError(`Fehler beim Abrufen der Daten: ${error.message}`);
            } finally {
                setLoading(false);
            }
        }

        fetchComposers();
    }, [selectedLetter]);

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
        <div className="p-16">
            <h2 className="text-2xl text-center font-bold mb-4">Liste der Komponisten</h2>

            {/* Alphabetische Navigation */}
            <div className="flex flex-wrap justify-center py-4 mb-7">
                {letters.map((letter) => (
                    <button
                        key={letter}
                        onClick={() => setSelectedLetter(letter)}
                        className={`px-4 py-2 m-2 rounded-full transition-colors duration-300 ${
                            selectedLetter === letter
                                ? "bg-blue-600 text-white"
                                : "bg-gray-200 hover:bg-blue-700 hover:text-white"
                        }`}
                    >
                        {letter}
                    </button>
                ))}
            </div>

            {/* Anzeige der Komponisten */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {composers.map((composer) => (
                    <li
                        key={composer.pageid}
                        className="bg-white rounded-lg shadow-sm p-4 hover:shadow-xl transition-shadow duration-300"
                    >
                        <Link
                            to={`/composer/${decodeURIComponent(
                                composer.title.replace(/^Category:/, "").trim()
                            )}`}
                            className="text-lg font-semibold text-blue-900 hover:underline"
                        >
                            {composer.title.replace(/^Category:/, "")}
                        </Link>
                    </li>
                ))}
            </div>
        </div>
    );
}
