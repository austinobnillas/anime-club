import React from "react";
import { useNavigate, Link } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";

const SearchResults = (props) => {
    const {searchResults, setSearchResults} = props
    const {id, setId} = props
    return (
        <div>
            <Header searchResults={searchResults} setSearchResults={setSearchResults}/>
            <div className="animeBox-search">
                {searchResults.map((anime) => (
                    <div key={anime.mal_id} className='animeList'>
                        <img className='' src={anime.images.jpg.large_image_url} alt="Show PV" />
                        <p className='animeName'>
                            {anime.title_english ? anime.title_english : anime.title}
                        </p>
                    </div>
                ))}
            </div>
            <Footer />
        </div>
    )
}
export default SearchResults;