import React from "react";
import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";

const SearchResults = (props) => {
    const {searchResults, setSearchResults} = props
    const {id, setId} = props
    const navigate = useNavigate();
    useEffect(() => {
    if (searchResults.length === 0) {
        navigate('/')
    }
    }, [])
    return (
        <div>
            <Header searchResults={searchResults} setSearchResults={setSearchResults}/>
            <div className="animeBox-search">
                {searchResults.map((anime) => (
                    <Link key={anime.mal_id} to={`/anime/${anime.mal_id}`}>
                    <div className='searchResults'>
                        <img className='searchResults-img' src={anime.images.jpg.large_image_url} alt="Show PV" />
                        <p className='animeName'>
                            {anime.title_english ? anime.title_english : anime.title}
                        </p>
                    </div>
                    </Link>
                ))}
            </div>
            <Footer />
        </div>
    )
}
export default SearchResults;