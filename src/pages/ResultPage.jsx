import React, { useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import { AppContext } from "../context/AppContext";

export default function ResultPage() {
  const { state, dispatch } = useContext(AppContext);
  const { searchQuery, results } = state;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // State to control how many results are visible
  const [visibleCount, setVisibleCount] = useState(50);

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
            `https://thingproxy.freeboard.io/fetch/https://imslp.org/api.php?action=query&list=search&srsearch=${encodeURIComponent(query)}&format=json&srlimit=500`
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

  // Loading spinner
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
        <div className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
      </div>
    );
  }

  // Error message
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
        <p className="text-red-600 text-xl">{error}</p>
      </div>
    );
  }

  // No results message
  if (!results || results.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
        <p className="text-gray-700 dark:text-gray-300 text-xl">
          Keine Ergebnisse wurden für "{query}" gefunden.
        </p>
      </div>
    );
  }

  // Determine the results to display (slice the array)
  const visibleResults = results.slice(0, visibleCount);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300 py-8">
      <div className="container mx-auto px-4">
        <h2 className="mb-8 text-3xl font-bold text-gray-800 dark:text-gray-100 text-center">
          Suchergebnisse für <span className="text-blue-600 dark:text-blue-400">"{query}"</span>:
        </h2>

        <ul className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {visibleResults.map((result, index) => (
            <li
              key={index}
              className="bg-white dark:bg-gray-700 rounded-lg shadow hover:shadow-lg transition-shadow duration-200"
            >
              <a
                href={`https://imslp.org/wiki/${encodeURIComponent(result.title)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-6 hover:bg-gray-50 dark:hover:bg-gray-600 rounded-lg transition-colors"
              >
                <h3 className="text-blue-800 dark:text-blue-200 text-xl font-semibold">
                  {result.title}
                </h3>
              </a>
            </li>
          ))}
        </ul>


        {visibleCount < results.length && (
          <div className="flex justify-center mt-8">
            <button
              onClick={() => setVisibleCount(results.length)}
              className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700 transition-colors"
            >
              Show More
            </button>
          </div>
        )}

        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
          aria-label="Nach oben scrollen"
        >
          ↑
        </button>
      </div>
    </div>
  );
}