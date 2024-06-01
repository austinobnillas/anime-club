import React from "react";
import { useEffect } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import axios from "axios";
import Footer from "./Footer";
import Header from "./Header";
import { useState } from "react";

const AnimeDetails = (props) => {
const {searchResults, setSearchResults} = props
const {user, setUser} = props
const {id} = useParams()
const [animeData, setAnimeData] = useState({})
const [imgUrl, setImgUrl] = useState()
const [trailerUrl, setTrailerUrl] = useState()

useEffect(() => {
    axios.get(`https://api.jikan.moe/v4/anime/${id}/full`)
        .then((res) => {
            console.log("LOAD")
            console.log(res.data.data)
            setAnimeData(res.data.data)
            console.log(res.data.data.images.jpg.large_image_url)
            setImgUrl(res.data.data.images.jpg.large_image_url)
            setTrailerUrl(res.data.data.trailer.embed_url)
            
        })
        .catch((err) => {
            console.log(err)
        });

}, [])
    return (
        <div className="animeDetailsContainer">
            <Header searchResults={searchResults} setSearchResults={setSearchResults} user={user} setUser={setUser}/>
            <div className="animeDetails-background">
                <div className="animeDetails-top">
                    <img className="animeDetails-image" src={imgUrl} alt="PV image" />
                    <div>
                        <h1>{animeData.title_english ? animeData.title_english : animeData.title} - ({animeData.year})</h1>
                        <p>{animeData.rating}</p>
                    </div>
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