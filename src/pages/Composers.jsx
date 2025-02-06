// react-musik-bibliothek/src/pages/Composers.jsx
import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "../App.css";

export default function Composers() {
  const [composers, setComposers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedLetter, setSelectedLetter] = useState("A");
  const [visibleCount, setVisibleCount] = useState(20);
  const sentinelRef = useRef(null);
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  useEffect(() => {
    async function fetchComposers() {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `https://corsproxy.io/?https://imslp.org/api.php?action=query&list=categorymembers&cmtitle=Category:Composers&cmstartsortkeyprefix=${encodeURIComponent(
            selectedLetter
          )}&cmlimit=500&format=json`
        );
        if (!response.ok) {
          throw new Error(`Fehler beim Abrufen der Daten: ${response.statusText}`);
        }
        const data = await response.json();
        setComposers(data?.query?.categorymembers || []);
        setVisibleCount(20); // Reset visible count when the letter changes
      } catch (err) {
        setError(`Fehler beim Abrufen der Daten: ${err.message}`);
      } finally {
        setLoading(false);
      }
    }
    fetchComposers();
  }, [selectedLetter]);


  // Setup IntersectionObserver to load more items when the sentinel is visible
  useEffect(() => {
    if (loading) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisibleCount((prev) => Math.min(prev + 20, composers.length));
        }
      },
      { threshold: 1 }
    );
    const currentSentinel = sentinelRef.current;
    if (currentSentinel) observer.observe(currentSentinel);

    return () => {
      if (currentSentinel) observer.unobserve(currentSentinel);
    };
  }, [loading, composers.length]);


  // Function to scroll to the top
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 dark:from-gray-800 dark:to-gray-900 p-6">
      <div className="max-w-6xl mx-auto bg-white dark:bg-gray-900 shadow-xl rounded-lg p-8">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 text-center mb-8">
          Liste der Komponisten
        </h2>

        {/* Alphabetical Navigation */}
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

        {/* Error Message */}
        {error && !loading && (
          <div className="text-red-500 text-center mb-4">{error}</div>
        )}

        {/* Composers Grid */}
        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {composers.slice(0, visibleCount).map((composer) => {
              const composerName = composer.title.replace(/^Category:/, "").trim();
              return (
                <div
                  key={composer.pageid}
                  className="bg-white dark:bg-gray-800 rounded-lg border border-gray-500 shadow-sm p-4 hover:shadow-xl transition-shadow duration-300 animate-fadeIn"
                >
                  <Link
                    to={`/composer/${encodeURIComponent(composerName)}`}
                    className="text-sm font-semibold text-blue-900 dark:text-blue-400"
                  >
                    {composerName}
                  </Link>
                </div>
              );
            })}
          </div>
        )}

        {/* Sentinel element for lazy loading */}
        {!loading && visibleCount < composers.length && (
          <div ref={sentinelRef} className="h-10" />
        )}

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