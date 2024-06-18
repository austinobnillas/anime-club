import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useParams} from "react-router-dom";

const AnimeListsContents = (props) => {
    const {searchResults, setSearchResults} = props
    // const {id, setId} = props
    const {user, setUser} = props;
    const [animeList, setAnimeList] = useState([]);
    const [showForm, setShowForm] = useState(false)
    const [anime_list_name, setListName] = useState();
    const [error, setError] = useState();

    const [animeListData, setAnimeListData] = useState([]);

    const {list_id} = useParams();
    const navigate = useNavigate();
    const user_id = 0; // THIS VARIABLE IS JUST A PLACEHOLDER

    useEffect(() => {
        axios.get(`http://localhost:8000/api/animelist/${list_id}`, {withCredentials: true})
            .then((res) => {
                console.log("TEST", res.data)
                setAnimeListData(res.data)
            })
            .catch((err) => {
                console.log(err)
                // navigate('/')
            })
    }, [])
    

    return (
        <div className="anime-list-content-container">
            <Header searchResults={searchResults} setSearchResults={setSearchResults} user={user} setUser={setUser}/>
                {animeListData.map((data) => (
                    <Link to={`/anime/${data.mal_id}`}><p>{data.anime_name}</p></Link>
                ))}
            <Footer />
        </div>
    )
}
export default AnimeListsContents;