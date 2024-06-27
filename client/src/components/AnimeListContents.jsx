import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useParams, useLocation} from "react-router-dom";

import trashIcon from "../assets/icons8-trash-128.png"

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const AnimeListsContents = (props) => {
    const {searchResults, setSearchResults} = props
    const {user, setUser} = props;
    const [animeListData, setAnimeListData] = useState([]);
    const [listName, setListName] = useState();
    const [isEditTrue, setIsEditTrue] = useState(false);
    const [showOptionsTrue, setShowOptionsTrue] = useState(false)
    const [showOptionsControl, setShowOptionsControl] = useState("options-list-control")
    const [anime_list_name, setUpdatedListName] = useState()

    const {list_id} = useParams();
    const is_public = false; // placeholder
    const navigate = useNavigate();
    let query = useQuery();

    useEffect(() => {
        axios.get(`http://localhost:8000/api/animelist/${list_id}`, {withCredentials: true}) 
            .then((res) => {
                console.log("TEST", res.data)
                setAnimeListData(res.data)
                res.data[0].list_name ? setListName(res.data[0].list_name) : setListName(query.get("name"))
            })
            .catch((err) => {
                console.log(err)
                // navigate('/')
            })
            setListName(query.get("name"))
    }, [])

    
    const showFormController = () => {
        if (isEditTrue === false) {
            setIsEditTrue(true)
        } else if (isEditTrue === true) {
            setIsEditTrue(false)    
        }
    }
    const showOptions = () => {
        if (showOptionsTrue === false) {
            setShowOptionsTrue(true)
            setShowOptionsControl("options-list ")
        } else if (showOptionsTrue === true) {
            setShowOptionsTrue(false)    
            setShowOptionsControl("options-list-control")
        }
    }
    const editAnimeListController = (e) => {
        e.preventDefault();
        axios.patch(`http://localhost:8000/api/editanimelist/${list_id}`, {anime_list_name, list_id, is_public}, {withCredentials: true})
            .then((res)=>{
                setListName(anime_list_name)
                setIsEditTrue(false) 
            })
            .catch((err)=> {
                console.log(err)
            })
    } 
    const deleteAnime = (id) => {
        axios.delete(`http://localhost:8000/api/deleteanime/${id}`, {withCredentials: true})
            .then((res)=> {
                console.log(res)
                window.location.reload(false);
            })
            .catch((err)=> {
                console.log(err)
            })
    }

    return (
        <div className="anime-list-content-container">
            <Header searchResults={searchResults} setSearchResults={setSearchResults} user={user} setUser={setUser}/>
            <div className="anime-list-content-list-container">
                <div className="anime-list-content-heading">
                    <h1>{listName}</h1>
                    <div className="anime-list-edit-delete">
                        <button className="edit-list-button" onClick={showFormController}>Edit List</button>
                        {isEditTrue === true? 
                            <form onSubmit={editAnimeListController} className="edit-list-form">
                                <input onChange={(e) => setUpdatedListName(e.target.value)} placeholder="New List Name" className="animelist-input"type="text" />
                                <button type="submite">Submit</button>
                            </form> : null}
                        <button>Remove List</button>
                    </div>
                </div>
                
                {animeListData.map((data) => (
                    
                    <div className="anime-list-content">
                        <div className="anime-list-content-data">
                            <img className="anime-list-content-image" src={data.img_url} alt="" />
                            <Link to={`/anime/${data.mal_id}`} className="anime-list-content-text">
                                <h2>{data.anime_name} - {data.season} {data.year}</h2>
                                <p>{data.rating}</p>
                                <p>{data.score}/10</p>
                                
                            </Link>
                        </div>
                        <button onClick={() => deleteAnime(data.id)} className="delete-anime-button">
                            <img className="deleteIcon" src={trashIcon}></img>
                        </button>
                    </div>
                    
                    
                    
                ))}
            </div>
            <Footer />
        </div>
    )
}
export default AnimeListsContents;