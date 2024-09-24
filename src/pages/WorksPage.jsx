import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

export default function WorksPage() {
    const { composerName } = useParams();
    const [works, setWorks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchWorks() {
            setLoading(true);
            try {
                const composerCategory = composerName;
                const response = await fetch(
                    `https://corsproxy.io/?https://imslp.org/api.php?action=query&list=categorymembers&cmtitle=Category:${composerCategory}&cmlimit=500&format=json&origin=*`
                );
                if (!response.ok) {
                    throw new Error(
                        `Die Werke konnten leider nicht abgerufen werden: ${response.statusText}`
                    );
                }
                const data = await response.json();
                const worksArray = data.query.categorymembers || [];

                // filtering anything which is not the compositions and sorts it out
                const filteredWorks = worksArray.filter(
                    (item) => item.ns === 0
                );
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
        .replace(/_/g, "");

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen dark:bg-gray-900">
                <p className="text-lg text-gray-600 dark:text-gray-300">
                    Es werden Werke von {composerName.replace(/_/g, " ")}{" "}
                    geladen...
                </p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center h-screen dark:bg-gray-900">
                <p className="text-red-500 dark:text-red-400">{error}</p>;
            </div>
        );
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 p-5">
            <div className="max-w-4xl bg-white shadow-xl rounded-lg p-6 dark:bg-gray-800 dark:text-gray-200">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4 dark:text-gray-200">
                    Werke von {displayComposerName}
                </h2>
                {works.length > 0 ? (
                    <ul className="space-y-8">
                        {works.map((work) => (
                            <li
                                key={work.pageid}
                                className="text-blue-600 hover:underline dark:text-blue-400"
                            >
                                <div className="mt-8">
                                    <Link
                                        to={`/work/${work.pageid}`}
                                        className="inline-block px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition dark:bg-blue-600 dark:hover:bg-blue-800"
                                    >
                                        {work.title}
                                    </Link>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-600 dark:text-gray-400">
                        Leider wurden keine Werke gefunden. Versuche Dein Glück
                        mit einem anderen Komponisten
                    </p>
                )}
                {/* Zurück zur Komponistenliste*/}
                <div className="mt-20">
                    <Link
                        to="/composers"
                        className="inline-block px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition dark:bg-green-600 dark:hover:bg-green-700"
                    >
                        Zurück zur Komponistenliste
                    </Link>
                </div>
            </div>
        </div>
    );
}
