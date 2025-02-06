import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function WorkDetails() {
  const { pageid } = useParams();
  const [workInfo, setWorkInfo] = useState(null);
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

        // Extract content from the revision if available.
        const content =
          page.revisions && page.revisions[0]
            ? page.revisions[0]["*"]
            : "Keine Zusammenfassung verfügbar.";

        // Extract audio files using regex
        const audioRegex = /\|File Name \d+=(.*\.mp3)/g;
        const audioMatches = [...content.matchAll(audioRegex)].map(
          (match) => match[1]
        );

        // Extract PDF files using regex
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

  // Function to navigate back
  const goBack = () => {
    navigate(-1);
  };

  // Function to remove file extensions and extra underscores
  const extractWorkName = (fileName) => {
    const nameParts = fileName
      .split("_")
      .slice(1)
      .join(" ")
      .replace(/\.(mp3|pdf)$/, "")
      .replace(/[_-]/g, " ");
    return nameParts;
  };

  // loading state
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent border-solid rounded-full animate-spin"></div>
        <p className="mt-4 text-gray-700 dark:text-gray-300 text-lg">
          Lade Werkdetails...
        </p>
      </div>
    );
  }

  // error state
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800">
        <p className="text-red-500 text-xl">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-5">
      <div className="max-w-5xl w-full bg-white dark:bg-gray-800 shadow-2xl rounded-lg p-10 border border-gray-200 dark:border-gray-700">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6 text-center">
          {workInfo.title}
        </h2>

        {/* Audio Files Section */}
        <h3 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-4">
          Verfügbare Audio-Dateien:
        </h3>
        {workInfo.audioFiles.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
            {workInfo.audioFiles.map((file, index) => (
              <div
                key={index}
                className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
              >
                <div className="flex flex-col justify-between h-full">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-1">
                      {extractWorkName(file)}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                      {file}
                    </p>
                  </div>
                  <div className="mt-4">
                    <a
                      href={`https://imslp.org/wiki/Special:IMSLPDisclaimerAccept/${file}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block w-full bg-blue-500 text-white px-3 py-1 rounded-md text-sm font-medium text-center hover:bg-blue-600 transition-colors dark:bg-blue-600 dark:hover:bg-blue-700"
                    >
                      Abspielen
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Keine Audio-Dateien verfügbar.
          </p>
        )}

        {/* PDF Files Section */}
        <h3 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-4">
          Verfügbare PDF-Dateien:
        </h3>
        {workInfo.pdfFiles.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 mb-8">
            {workInfo.pdfFiles.map((file, index) => (
              <div
                key={index}
                className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 border"
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
                  <div className="mb-3 sm:mb-0 sm:mr-4">
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
                    className="inline-block bg-blue-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-600 transition-colors dark:bg-blue-600 dark:hover:bg-blue-800"
                  >
                    Öffnen
                  </a>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Keine PDF-Dateien verfügbar.
          </p>
        )}

        {/* Back Button */}
        <div className="flex justify-center">
          <button
            onClick={goBack}
            className="px-6 py-3 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition-colors focus:outline-none focus:ring-2 focus:ring-green-400"
          >
            Zurück zur Werkliste
          </button>
        </div>
      </div>
    </div>
  );
}