import React from "react";
import SearchBar from "../components/SearchBar";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
    const navigate = useNavigate();

    function handleSearch(searchInput) {
        navigate(`/search?query=${encodeURIComponent(searchInput)}`);
    }
    return (
        <>
            <div className="flex flex-col items-center mt-10">
                <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-5xl dark:text-white">
                Deine Quelle für Noten rund um –{" "}
                    <span className="underline underline-offset-3 decoration-8 decoration-blue-400 dark:decoration-blue-600">
                     Klassische Musik
                    </span>
                </h1>
                <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
                Freier Zugang zu einer umfassenden Sammlung klassischer Noten – entdecke Werke aller großen Komponisten.
                </p>
                <SearchBar onSearch={handleSearch} />
            </div>
        </>
    );
};

export default HomePage;
