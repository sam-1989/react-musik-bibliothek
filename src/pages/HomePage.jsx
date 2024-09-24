import React, { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import { useNavigate } from "react-router-dom";
import { Carousel } from "flowbite-react";
import "../App.css";

const HomePage = () => {
    const navigate = useNavigate();
    const [carouselImages, setCarouselImages] = useState([]);
    const [error, setError] = useState(null);

    // // eine Funktion zum mischen eines Arrays
    // function shuffleArray(array){
    //     for (let i = array.length -1; i > 0; i--){
    //         const j = Math.floor(Math.random() * (i + 1));
    //         [array[i], array[j] = array[j], array[i]]
    //     }
    //     return array;
    // }

    // useEffect(() => {
    //     async function fetchImages() {
    //         try {
    //             const response = await fetch(
    //                 `https://corsproxy.io/?https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=Johann_Sebastian_Bach&prop=imageinfo&iiprop=url&format=json`);
    //             const data = await response.json();

    //             // console.log("API response:", data);

    //             if (data.query && data.query.pages) {
    //                 const pages = data.query.pages;

    //                 // Bilder extrahieren

    //                 const images = Object.keys(pages).map(
    //                     (key) => pages[key].imageinfo[0].url
    //                 );
    //                 setCarouselImages(images);
    //             } else {
    //                 throw new Error("Unerwartetes API-Antwortformat");
    //             }
    //         } catch (error) {
    //             console.error(
    //                 "Es gab einen Fehler beim Abrufen der Bilder: ",
    //                 error
    //             );
    //             setError(error.message);
    //         }
    //     }
    //     fetchImages();
    // }, []);

    // Falls keine gefetchte Bilder angezeigt werden
    // const fallbackImages = [
    //     "https://via.placeholder.com/800x400?text=Fallback+Bild+1",
    //     "https://via.placeholder.com/800x400?text=Fallback+Bild+2",
    //     "https://via.placeholder.com/800x400?text=Fallback+Bild+3",
    // ];

    function handleSearch(searchInput) {
        navigate(`/search?query=${encodeURIComponent(searchInput)}`);
    }

    return (
        <>
            <main className="flex flex-col items-center justify-center min-h-screen w-full bg-gray-100 dark:bg-gray-900 p-5">
                <div className="flex flex-col items-center">
                    <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-5xl dark:text-gray-50">
                        Deine Quelle für Noten rund um –{" "}
                        <span className="underline underline-offset-8 decoration-8 decoration-blue-400 dark:decoration-blue-800 text-color-change">
                            Klassische Musik
                        </span>
                    </h1>
                    <p className="text-xl font-normal text-gray-800 lg:text-xl dark:text-gray-400">
                        Freier Zugang zu einer umfassenden Sammlung klassischer
                        Noten – entdecke Werke aller großen Komponisten.
                    </p>
                    <SearchBar onSearch={handleSearch} />
                </div>
                {/* Bilder Carousel */}
                {/* <div className="w-screen mb-10">
                    {error ? (
                        <p className="text-red-500">
                            Es gab einen Fehler beim Abrufen der Bilder: {error}
                        </p>
                    ) : (
                        <Carousel slideInterval={3000}>
                            {carouselImages.length > 0
                                ? carouselImages.map((image, index) => (
                                      <img
                                          key={index}
                                          src={image}
                                          alt={`Bild ${index + 1}`}
                                          className="object-cover h-56 sm:h-64 xl:h-80 2xl:h-96 w-full"
                                      />
                                  ))
                                : fallbackImages.map((image, index) => (
                                      <img
                                          key={index}
                                          src={image}
                                          alt={`Fallback Bild ${index + 1}`}
                                          className="object-cover h-56 sm:h-64 xl:h-80 2xl:h-96 w-full"
                                      />
                                  ))}
                        </Carousel>
                    )}
                </div> */}
            </main>
        </>
    );
};

export default HomePage;
