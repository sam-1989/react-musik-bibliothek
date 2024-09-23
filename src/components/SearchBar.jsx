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
      <form className="text-center w-full max-w-xl mx-auto" onSubmit={handleSearch}>
        <div>
          <div className="bg-white mt-10 flex px-6 py-3 rounded-full shadow-xl border border-gray-300 overflow-hidden">
            <input type='text' placeholder='Gib Deine Suche hier ein...' value={searchInput} onChange={(e) => setSearchInput(e.target.value)} className="w-full text-gray-900 outline-none pl-4 text-md" />
            <button type='submit'
              className="bg-blue-600 hover:bg-blue-800 hover:shadow-lg px-6 py-3 transition-all text-white font-semibold rounded-full ">Suchen</button>
          </div>
        </div>

      </form>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 items-center mt-6">
            {/* Bilder Diashow */}

        

        </div>
    </div>
    );
}


// <div className="md:container">
//             <form
//                 onSubmit={handleSearch}
//                 className="flex justify-center align-middle py-20"
//             >
//                 <input
//                     value={searchInput}
//                     className="placeholder-black border-black border-2 rounded-full p-4"
//                     type="text"
//                     placeholder="Suche nach Komponisten, Werken, Genres und mehr..."
//                     onChange={(e) => setSearchInput(e.target.value)}
//                 />
//                 <button type="submit" className="bg-blue-600 text-white rounded-full p-3 mx-5 hover:bg-blue-400">
//                     Suche
//                 </button>
//             </form>
//         </div>