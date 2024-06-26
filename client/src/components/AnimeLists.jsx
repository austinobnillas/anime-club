import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useParams} from "react-router-dom";

const AnimeLists = (props) => {
    const {searchResults, setSearchResults} = props
    // const {id, setId} = props
    const {user, setUser} = props;
    const [animeList, setAnimeList] = useState([]);
    const [showForm, setShowForm] = useState(false)
    const [anime_list_name, setListName] = useState();
    const [error, setError] = useState();
    const {id} = useParams()
    const navigate = useNavigate();
    const user_id = 0; //placeholder as user_id get set in the backend
    const is_public = false;

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

    const createAnimeListController = (e) => {
        e.preventDefault();
        axios.post(`http://localhost:8000/api/createanimelist`, {anime_list_name , user_id, is_public}, {withCredentials: true})
            .then((res) => {
                console.log("HERE", res.data)
                setAnimeList(res.data)
            })
            .catch((err) => {
                console.log(err.response.data.detail[0].msg)
                setError(err.response.data.detail[0].msg)
            })
    }
    return (
        <div className="anime-list-container">
            <Header searchResults={searchResults} setSearchResults={setSearchResults} user={user} setUser={setUser}/>
            <div className="anime-list-middle">
                <h1 className="list-container-heading">My Lists</h1>
                <div className="create-button-container">
                    <button className="create-list-button" onClick={showFormController}>Create List</button>
                    {showForm === true ? <div className="create-list-form-container">
                                            <form className="animelist-form" onSubmit={createAnimeListController}>
                                                <input onChange={(e) => setListName(e.target.value)} className="animelist-input" placeholder="List Name" type="text" />
                                                <button className="create-list-button" type="submit">Create</button>
                                                {error ? <p className="registration-errors">{error}</p> : null}
                                            </form> 
                                        </div>: null}
                </div>
                <div className="list-container">
                    {animeList.map((list) => (
                    <Link to={`/animelists/${list.id}?name=${list.list_name}`} >
                        <div className="list" key={list.id}>
                            <p>{list.list_name}</p>
                        </div>
                    </Link>
                        
                    ))}
                </div>


            </div>
            
            {/* <hr className="list-container-hr"/> */}
            
            
            <Footer />
        </div>
    )
}
export default AnimeLists;