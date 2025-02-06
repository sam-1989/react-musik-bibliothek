import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

export default function SearchBar() {
  const [searchInput, setSearchInput] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const { dispatch } = useContext(AppContext);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchInput.trim() === "") {
      setErrorMessage("Bitte geben Sie einen Suchbegriff ein.");
      return;
    }
    setErrorMessage("");
    dispatch({ type: "SET_SEARCH_QUERY", payload: searchInput });
    navigate(`/search?query=${encodeURIComponent(searchInput)}`);
  };

  return (
    <div className="px-4 py-10 flex items-center justify-center">
      <form
        className="w-full max-w-2xl mx-auto"
        onSubmit={handleSearch}
      >
        <div className="flex flex-col items-center">
          <div className="flex w-full bg-white border border-gray-300 rounded-full shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl">
            <input
              type="text"
              placeholder="Gib Deine Suche hier ein..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="w-full px-6 py-4 text-gray-900 text-xl font-medium placeholder-gray-600 focus:outline-none"
              aria-label="Suchbegriff eingeben"
            />
            <button
              type="submit"
              className="bg-blue-500 px-8 py-4 text-white font-bold text-xl rounded-full transition-all duration-300 hover:bg-blue-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Suchen
            </button>
          </div>
          {errorMessage && (
            <p className="mt-2 text-red-500 text-sm">{errorMessage}</p>
          )}
        </div>
      </form>
    </div>
  );
}