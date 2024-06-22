import React from "react";
import { useEffect } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import axios from "axios";
import Footer from "./Footer";
import Header from "./Header";
import AnimeListsInsert from "./AnimeListInsert";
import { useState } from "react";

const AnimeDetails = (props) => {
const {searchResults, setSearchResults} = props
const {user, setUser} = props
const {id} = useParams()
const [animeData, setAnimeData] = useState({})
const [imgUrl, setImgUrl] = useState()
const [trailerUrl, setTrailerUrl] = useState()
const [addStyleController, setAddStyleController] = useState(false)
const [addAnimeStyle, setAddAnimeStyle] = useState("animeDetails-addToListContainer-displayNone");
// for anime adding to anime list
const [anime_name, setAnimeName] = useState('')
const [anime_year, setAnimeYear] = useState()
const [anime_mal_id, setAnimeMal_id] = useState()
const [anime_rating, setAnimeRating] = useState()
const [anime_season, setAnimeSeason] = useState()
const [anime_score, setAnimeScore] = useState()
useEffect(() => {
    axios.get(`https://api.jikan.moe/v4/anime/${id}/full`)
        .then((res) => {
            console.log("LOAD")
            console.log(res.data.data)
            setAnimeData(res.data.data)
            console.log(res.data.data.images.jpg.large_image_url)
            setImgUrl(res.data.data.images.jpg.large_image_url)
            setTrailerUrl(res.data.data.trailer.embed_url)

            res.data.data.year ? setAnimeYear(res.data.data.year) : setAnimeYear(0)
            setAnimeMal_id(res.data.data.mal_id)
            setAnimeRating(res.data.data.rating)
            res.data.data.season ? setAnimeSeason(res.data.data.season) : setAnimeSeason('null')
            setAnimeScore(res.data.data.score)
            res.data.data.title_english ? setAnimeName(res.data.data.title_english) : setAnimeName(res.data.data.title)
            
        })
        .catch((err) => {
            console.log(err)
        });
        
}, [])

const addAnimeToListController = () => {
    if (user) {
        if (addStyleController === false){
        setAddAnimeStyle("animeDetails-addToListContainer-display")
        setAddStyleController(true)
        } else if (addStyleController === true) {
            setAddAnimeStyle("animeDetails-addToListContainer-displayNone")
            setAddStyleController(false)
        }
    } else {
        alert(`This feature is reserved for our members. Please Sign in or Create an account`)
    }
    
    
}
    return (
        <div className="animeDetailsContainer">
            <Header searchResults={searchResults} setSearchResults={setSearchResults} user={user} setUser={setUser}/>
            <div className="animeDetails-background">
                <div className="animeDetails-top">
                    <img className="animeDetails-image" src={imgUrl} alt="PV image" />
                    <div>
                        <h1 className="animeDetails-heading">{animeData.title_english ? animeData.title_english : animeData.title} - ({animeData.year})</h1>
                        <p>{animeData.rating}</p>
                        <button onClick={addAnimeToListController}>Add to AnimeList</button>
                    </div>
                </div>
                <div className={addAnimeStyle}>
                    <AnimeListsInsert 
                        anime_name={anime_name}
                        anime_year={anime_year}
                        anime_mal_id={anime_mal_id}
                        anime_rating={anime_rating}
                        anime_season={anime_season}
                        anime_score={anime_score}
                        anime_img_url={imgUrl}
                        />
                </div>
                </div>
                <div className="animeDetails-middle">
                    <div className="animeDetails-stats">
                        <h2>Details:</h2>
                        <p>Japanese: {animeData.title_japanese}</p>
                        <p>Season: {animeData.season} {animeData.year}</p>
                        <p>Status: {animeData.status}</p>
                        <p>Episodes: {animeData.episodes}</p>
                        <p>Source: {animeData.source}</p>
                        <a target="_blank" href={animeData.url}>MAL Link</a>
                    </div>
                    <div className="animeDetails-description">
                        <h2>Description: </h2>
                        <p>{animeData.synopsis}</p>
                    </div>
                </div>
                <div className="animeDetails-bottom">
                    <h2>Trailer:</h2>
                    {trailerUrl ? 
                    <iframe className="animeDetails-trailer" src={animeData.trailer.embed_url} frameBorder="0"></iframe> 
                    : <p>There is no trailer for this available</p>}
                    
                </div>
            <Footer />
        </div>
    )
}
export default AnimeDetails;