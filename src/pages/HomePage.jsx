import React from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import { Carousel } from "flowbite-react";
import "../App.css";

// Import the asset images
import violin from "../assets/violin.jpg";
import library from "../assets/library.jpg";
import score from "../assets/score.jpg";

const HomePage = () => {
  const navigate = useNavigate();

  const handleSearch = (searchInput) => {
    navigate(`/search?query=${encodeURIComponent(searchInput)}`);
  };

  // Only use the asset images for the carousel
  const ASSET_IMAGES = [violin, library, score];

  return (
    <main className="flex flex-col items-center justify-center min-h-screen w-full bg-gray-100 dark:bg-gray-900 p-5 overflow-auto">
      <div className="flex flex-col items-center">
        <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-5xl dark:text-gray-50">
          Deine Quelle für Noten rund um –{" "}
          <span className="underline underline-offset-8 decoration-8 decoration-blue-400 dark:decoration-blue-800 text-color-change">
            Klassische Musik
          </span>
        </h1>
        <p className="text-xl font-normal text-gray-800 lg:text-xl dark:text-gray-400">
          Freier Zugang zu einer umfassenden Sammlung klassischer Noten – entdecke Werke aller großen Komponisten.
        </p>
        <SearchBar onSearch={handleSearch} />
      </div>

      <div className="w-full mb-10">
        <Carousel slideInterval={3000} leftControl={<></>}
          rightControl={<></>}>
          {ASSET_IMAGES.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Bild ${index + 1}`}
              className="object-cover h-56 sm:h-64 xl:h-80 2xl:h-96 w-full"
            />
          ))}
        </Carousel>
      </div>
    </main>
  );
};

export default HomePage;