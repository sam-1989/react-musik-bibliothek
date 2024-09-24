import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

export default function SearchBar() {
    const [searchInput, setSearchInput] = useState("");
    const navigate = useNavigate();

    const { dispatch } = useContext(AppContext);

    function handleSearch(e) {
        e.preventDefault();
        if (searchInput.trim() === "") {
            alert("Bitte geben Sie einen Suchbegriff ein.");
            return;
        }
        dispatch({ type: "SET_SEARCH_QUERY", payload: searchInput });

        navigate(`/search?query=${encodeURIComponent(searchInput)}`);
    }

    return (
        <div className="font-[sans-serif] px-4 py-10 flex items-center justify-center">
            <form
                className="text-center w-full max-w-2xl mx-auto"
                onSubmit={handleSearch}
            >
                <div className="search-bar-container">
                    <div className="bg-white mt-10 flex px-8 py-4 rounded-full shadow-md border border-gray-300 overflow-hidden hover:shadow-xl transition-all duration-300 ease-in-out">
                        <input
                            type="text"
                            placeholder="Gib Deine Suche hier ein..."
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)}
                            className="w-full text-gray-900 outline-none pl-6 text-xl font-medium placeholder-gray-600"
                        />
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 hover:shadow-lg px-8 py-4 transition-all duration-300 text-white font-bold text-xl rounded-full"
                        >
                            Suchen
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}
