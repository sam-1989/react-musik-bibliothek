import React from "react";
import SearchBar from "../components/SearchBar";
import { useNavigate } from "react-router-dom";
import {Carousel} from "flowbite-react";
import "../App.css";

const HomePage = () => {
    const navigate = useNavigate();

    function handleSearch(searchInput) {
        navigate(`/search?query=${encodeURIComponent(searchInput)}`);
    }
    return (
        <>
        <main className="flex flex-col items-center bg-white dark:bg-gray-800 p-5 shadow-lg min-h-screen">            
            <div className="flex flex-col items-center mt-8">
                <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-5xl dark:text-white">
                Deine Quelle für Noten rund um –{" "}
                    <span className="underline underline-offset-3 decoration-8 decoration-blue-400 dark:decoration-blue-600 text-color-change">
                     Klassische Musik
                    </span>
                </h1>
                <p className="text-xl font-normal text-gray-500 lg:text-xl dark:text-gray-400">
                Freier Zugang zu einer umfassenden Sammlung klassischer Noten – entdecke Werke aller großen Komponisten.
                </p>
                <SearchBar onSearch={handleSearch} />
            </div>
             {/* Bilder Carousel */}
            <div className="w-full max-w-4xl mb-10">
                    <Carousel slideInterval={3000}>
                        {/* Slide 1 */}
                        <img
                            src="https://via.placeholder.com/800x400?text=Bild+1"
                            alt="Bild 1"
                            className="object-cover h-56 sm:h-64 xl:h-80 2xl:h-96"
                        />
                        {/* Slide 2 */}
                        <img
                            src="https://via.placeholder.com/800x400?text=Bild+2"
                            alt="Bild 2"
                            className="object-cover h-56 sm:h-64 xl:h-80 2xl:h-96"
                        />
                        {/* Slide 3 */}
                        <img
                            src="https://via.placeholder.com/800x400?text=Bild+3"
                            alt="Bild 3"
                            className="object-cover h-56 sm:h-64 xl:h-80 2xl:h-96"
                        />
                    </Carousel>
                </div>
            </main>
        </>
    );
};

export default HomePage;
