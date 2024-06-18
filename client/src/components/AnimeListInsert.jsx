import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useParams} from "react-router-dom";

const AnimeListsInsert = (props) => {
    const {searchResults, setSearchResults} = props
    // const {id, setId} = props
    const {user, setUser} = props;
    const [animeList, setAnimeList] = useState([]);
    const [showForm, setShowForm] = useState(false)
    const [anime_list_name, setListName] = useState();
    const [error, setError] = useState();
    const {id} = useParams()
    const navigate = useNavigate();
    const user_id = 0; // THIS VARIABLE IS JUST A PLACEHOLDER

    useEffect(() => {
        axios.get(`http://localhost:8000/api/animelist`, {withCredentials: true})
            .then((res) => {
                // console.log(res)
                setAnimeList(res.data)
            })
            .catch((err) => {
                console.log(err)
                navigate('/')
            })
    }, [])

    const showFormController = () => {
        if (showForm === false) {
            setShowForm(true)
        } else if (showForm === true) {
            setShowForm(false)
        }
    }

    const addAnimeToListController = (e) => {
        e.preventDefault();
        axios.post()
            .then((res) => {
                console.log(res.data)
                setAnimeList(res.data)
            })
            .catch((err) => {
                console.log(err.response.data.detail[0].msg)
                setError(err.response.data.detail[0].msg)
            })
    }
    

    return (
        <div className="anime-list-insert-container">
            <h1 className="list-container-insert-heading">My Lists</h1>
                <div className="list-insert-container">
                    {animeList.map((list) => (
                    <Link onClick={''} key={list.id}>
                        <div className="list-insert">
                            <p>{list.list_name} </p>
                            <p>+</p>
                        </div>
                    </Link>
                        
                    ))}
                </div>
        </div>
    )
}
export default AnimeListsInsert;