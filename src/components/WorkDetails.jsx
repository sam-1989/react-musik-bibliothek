import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function WorkDetails() {
    const { pageid } = useParams();
    const [workInfo, setWorkInfo] = useState(null);
    const [composerImage, setComposerImage] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchWorkInfo() {
            setLoading(true);
            try {
                const apiUrl = `https://corsproxy.io/?https://imslp.org/api.php?action=query&prop=info|revisions&pageids=${pageid}&rvprop=content&format=json&origin=*`;

                const response = await fetch(apiUrl);

                const data = await response.json();

                const page = data.query.pages[pageid];

                if (!page) {
                    throw new Error("Keine Werkdetails gefunden.");
                }

                // Extrahiere Audio- und Datei-Informationen mit regulären Ausdrücken
                const content =
                    page.revisions && page.revisions[0]
                        ? page.revisions[0]["*"]
                        : "Keine Zusammenfassung verfügbar.";

                // Audio-Dateien extrahieren
                const audioRegex = /\|File Name \d+=(.*\.mp3)/g;
                const audioMatches = [...content.matchAll(audioRegex)].map(
                    (match) => match[1]
                );

                // PDF-Dateien extrahieren
                const fileRegex = /\|File Name \d+=(.*\.pdf)/g;
                const fileMatches = [...content.matchAll(fileRegex)].map(
                    (match) => match[1]
                );

                setWorkInfo({
                    title: page.title,
                    audioFiles: audioMatches,
                    pdfFiles: fileMatches,
                });
            } catch (error) {
                setError(
                    `Die Werkdetails konnten nicht abgerufen werden: ${error.message}`
                );
            } finally {
                setLoading(false);
            }
        }
        fetchWorkInfo();
    }, [pageid]);

    // Funktion für den Zurück-button

    const goBack = () => {
        navigate(-1);
    };

    // Funktion für die entfernung der Dateiendungen wie mp3 oder pdf
    const extractWorkName = (fileName) => {
        const nameParts = fileName
            .split("_")
            .slice(1)
            .join(" ")
            .replace(/\.(mp3|pdf)$/, "")
            .replace(/[_-]/g, " ");
        return nameParts.replace(/_/g, " ");
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-lg text-gray-500">Lade Werkdetails...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-red-500">{error}</p>
            </div>
        );
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-5">
            <div className="max-w-5xl mx-auto p-10 bg-gray-50 shadow-lg rounded-lg dark:bg-gray-800 dark:text-gray-200 border">
                <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-4">
                    {workInfo.title}
                </h2>
                <h3 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-4">
                    Verfügbare Audio-Dateien:
                </h3>
                {workInfo.audioFiles.length > 0 ? (
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 mb-6">
                        {workInfo.audioFiles.map((file, index) => (
                            <div
                                key={index}
                                className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
                            >
                                <div className="flex flex-col items-start justify-between">
                                    <div className="flex-grow">
                                        <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                                            {extractWorkName(file)}
                                        </h4>
                                        <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                                            {file}
                                        </p>
                                    </div>
                                    <a
                                        href={`https://imslp.org/wiki/Special:IMSLPDisclaimerAccept/${file}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-block bg-blue-500 text-white px-3 py-1 rounded-md text-sm font-medium hover:bg-blue-600 transition dark:bg-blue-600 dark:hover:bg-blue-700"
                                    >
                                        Abspielen
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                        Keine Audio-Dateien verfügbar.
                    </p>
                )}

                <h3 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-4">
                    Verfügbare PDF-Dateien:
                </h3>
                {workInfo.pdfFiles.length > 0 ? (
                    <div className="list-disc pl-5 mb-6">
                        {workInfo.pdfFiles.map((file, index) => (
                            <div
                                key={index}
                                className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 mb-4 border"
                            >
                                <div className="flex items-center justify-between">
                                    <div className="truncate">
                                        <h4 className="ext-lg font-semibold text-gray-800 dark:text-gray-200">
                                            {extractWorkName(file)}
                                        </h4>
                                        <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                                            {file}
                                        </p>
                                    </div>

                                    <a
                                        href={`https://imslp.org/wiki/Special:IMSLPDisclaimerAccept/${file}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-block bg-blue-500 text-white px-3 py-1 rounded-md text-sm font-medium hover:bg-blue-600 transition dark:bg-blue-600 dark:hover:bg-blue-800 mr-8"
                                    >
                                        Öffnen
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-200 dark:text-gray-400 mb-6">
                        Keine PDF-Dateien verfügbar.
                    </p>
                )}
                <button
                    onClick={goBack}
                    className="mb-4 px-4 py-2 bg-green-500 text-gray-800 rounded-lg hover:bg-green-600 transition"
                >
                    Zurück zur Werkliste
                </button>
            </div>
        </div>
    );
}
