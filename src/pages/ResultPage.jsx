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
        <div className="font-sans text-center text-xl p-5">
            <h2 className="mb-8 text-3xl font-bold text-gray-800">
                <strong>Suchergebnisse für "{query}":</strong>
            </h2>

            <ul className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {results.map((result, index) => (
                    <li
                        key={index}
                        className="bg-white rounded-lg shadow-lg p-6 transition-transform transform hover:scale-105"
                    >
                        <a
                            href={`https://imslp.org/wiki/${encodeURIComponent(
                                result.title
                            )}`}
                            className="text-blue-1000 hover:bg-blue-300 text-xl font-sans cursor-pointer"
                        >
                            {result.title}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
}
