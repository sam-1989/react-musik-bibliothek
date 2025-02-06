import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

export default function WorksPage() {
  const { composerName } = useParams();
  const [works, setWorks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // State for filtering works by first letter; empty means "all"
  const [filterLetter, setFilterLetter] = useState("");

  useEffect(() => {
    async function fetchWorks() {
      setLoading(true);
      try {
        const response = await fetch(
          `https://corsproxy.io/?https://imslp.org/api.php?action=query&list=categorymembers&cmtitle=Category:${composerName}&cmlimit=500&format=json&origin=*`
        );
        if (!response.ok) {
          throw new Error(
            `Die Werke konnten leider nicht abgerufen werden: ${response.statusText}`
          );
        }
        const data = await response.json();
        const worksArray = data.query.categorymembers || [];

        // Filter out anything that is not a composition (namespace 0)
        const filteredWorks = worksArray.filter((item) => item.ns === 0);
        filteredWorks.sort((a, b) => a.title.localeCompare(b.title));

        setWorks(filteredWorks);
      } catch (error) {
        setError(`Fehler beim Abrufen der Werke: ${error.message}`);
      } finally {
        setLoading(false);
      }
    }
    fetchWorks();
  }, [composerName]);

  const displayComposerName = composerName
    .replace(/^Category:/, "")
    .replace(/_/g, " ");

  // Filter works based on the selected alphabet letter
  const filteredWorks = works.filter((work) =>
    filterLetter ? work.title.charAt(0).toUpperCase() === filterLetter : true
  );

  // letters for filtering
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  // loading state
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 dark:from-gray-800 dark:to-gray-900">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent border-solid rounded-full animate-spin"></div>
        <p className="mt-4 text-gray-700 dark:text-gray-300 text-lg">
          Es werden Werke von {displayComposerName} geladen...
        </p>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 dark:from-gray-800 dark:to-gray-900">
        <p className="text-red-500 text-xl">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 dark:from-gray-800 dark:to-gray-900 p-6">
      <div className="max-w-6xl mx-auto bg-white dark:bg-gray-900 shadow-xl rounded-lg p-8">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 text-center mb-8">
          Werke von {displayComposerName}
        </h2>

        {/* Alphabet Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          <button
            onClick={() => setFilterLetter("")}
            className={`px-3 py-1 rounded-full transition-colors ${
              filterLetter === ""
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
            }`}
          >
            Alle
          </button>
          {letters.map((letter) => (
            <button
              key={letter}
              onClick={() => setFilterLetter(letter)}
              className={`px-3 py-1 rounded-full transition-colors ${
                filterLetter === letter
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
              }`}
            >
              {letter}
            </button>
          ))}
        </div>

        {filteredWorks.length > 0 ? (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
            {filteredWorks.map((work) => (
              <Link
                key={work.pageid}
                to={`/work/${work.pageid}`}
                className="block transform hover:scale-105 transition-transform duration-200"
              >
                <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 shadow hover:bg-gray-700 hover:shadow-lg transition-shadow">
                  <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-400">
                    {work.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-gray-600 dark:text-gray-400 text-center mt-6">
            Leider wurden keine Werke gefunden, die mit "{filterLetter}" beginnen.
          </p>
        )}

        {/* Back Button */}
        <div className="mt-10 flex justify-center">
          <Link
            to="/composers"
            className="px-8 py-3 bg-green-700 text-white font-medium rounded-full shadow-md hover:bg-green-500 transition-colors"
          >
            Zurück zur Komponistenliste
          </Link>
        </div>
      </div>
    </div>
  );
}