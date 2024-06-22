import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useParams} from "react-router-dom";

const AnimeListsInsert = (props) => {
    const [animeList, setAnimeList] = useState([]);
    const {anime_name, anime_year, anime_mal_id, anime_rating, anime_season, anime_score, anime_img_url} = props
    const [error, setError] = useState()
    const [successMessage, setSuccessMessage] = useState();
    
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:8000/api/animelist`, {withCredentials: true})
            .then((res) => {
                // console.log(res)
                setAnimeList(res.data)
            })
            .catch((err) => {
                console.log(err)
                // navigate('/')
            })
    }, [])

    

    const addAnimeToListController = (anime_list_id) => {
        axios.post(`http://localhost:8000/api/${anime_list_id}/addanime/${anime_mal_id}`,
            {anime_name, anime_year, anime_mal_id, anime_rating, anime_season, anime_score, anime_list_id, anime_img_url},
            {withCredentials: true})
            .then((res) => {
                console.log(res.data)
                setSuccessMessage(res.data.msg)
                setError('')
            })
            .catch((err) => {
                console.log(err)
                console.log(err.response.data.detail)
                setError(err.response.data.detail)
            })
    }
    

    return (
        <div className="anime-list-insert-container">
            <h1 className="list-container-insert-heading">My Lists</h1>
                <div className="list-insert-container">
                    {error ? <p className="registration-errors">{error}</p> : <p>{successMessage}</p>}
                    {animeList.map((list) => (
                    <button className="list-insert"onClick={() => {addAnimeToListController(list.id)}} key={list.id}>
                            <p>{list.list_name} </p>
                            <p>+</p>
                    </button>
                        
                    ))}
                </div>
        </div>
    )
}
export default AnimeListsInsert;