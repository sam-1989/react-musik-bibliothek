import React, { useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import { AppContext } from "../context/AppContext";

export default function ResultPage() {
    const { state, dispatch } = useContext(AppContext);
    const { searchQuery, results } = state;
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const query = searchQuery || queryParams.get("query");

    useEffect(() => {
        async function fetchResults() {
            if (!query) {
                setLoading(false);
                return;
            }
            try {
                const response = await fetch(
                    `https://corsproxy.io/?https://imslp.org/api.php?action=query&list=search&srsearch=${encodeURIComponent(
                        query
                    )}&format=json&srlimit=500`
                );
                if (!response.ok) {
                    throw new Error(`Fehler: ${response.statusText}`);
                }
                const data = await response.json();
                dispatch({
                    type: "SET_RESULTS",
                    payload: data.query.search || [],
                });
            } catch (error) {
                setError(`Fehler beim Abrufen der Daten: ${error.message}`);
            } finally {
                setLoading(false);
            }
        }
        fetchResults();
    }, [query, dispatch]);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    if (loading) {
        return <p>Die Ergebnisse werden geladen...</p>;
    }

    if (error) {
        return <p>Upps, ein Fehler ist aufgetaucht: {error}</p>;
    }

    if (!results) {
        return <p>Keine Ergebnisse wurden für "{query}" gefunden.</p>;
    }

    return (
        <div className="max-w-7xl mx-auto">
        <div className="min-h-screen font-sans text-center text-xl p-5 bg-gray-100 dark:bg-gray-900">
            <h2 className="mb-8 text-3xl font-bold text-gray-800 dark:text-gray-100">
                <strong>Suchergebnisse für "{query}":</strong>
            </h2>

            <ul className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {results.map((result, index) => (
                    <a
                        key={index}
                        href={`https://imslp.org/wiki/${encodeURIComponent(
                            result.title
                        )}`}
                        className="block"
                    >
                        <li className="bg-white dark:bg-gray-700 rounded-lg shadow-lg p-6 transition-transform transform hover:scale-105 cursor-pointer">
                            <h3 className="text-blue-600 dark:text-blue-200 text-xl font-sans">
                                {result.title}
                            </h3>
                        </li>
                    </a>
                ))}
            </ul>
            <button
                onClick={scrollToTop}
                className="fixed bottom-8 right-8 bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
            >
                Nach oben
            </button>
        </div>
        </div>
    );
}
