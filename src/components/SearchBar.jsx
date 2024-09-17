import React, { useState } from "react";

export default function SearchBar() {
    const [searchInput, setSearchInput] = useState("");

    function handleSearch(e) {
        e.preventDefault();
    }

    return (
        <>
            <h1>Discover Music: Your Personal Musicpedia</h1>
            <form>
                <input type="text" placeholder='"Search a' />
            </form>
        </>
    );
}
