import React from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import imgIcon from "../assets/icons8-tanjiro-kamado-48.png"

const Header = (props) => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const {searchResults, setSearchResults} = props;
    const [isShowListTrue, setIsShowListTrue] = useState(false)
    const {user, setUser} = props;

    useEffect(() => {
        axios.get(`http://localhost:8000/api/getuser`, {withCredentials: true})
        .then((res) => {
            console.log(res)
            setUser(res.data[0])
        })
        .catch((err) => {
            console.log(err)
            // console.log(errors.email_errors)
        })}, [])

    const searchAnime = (e) => {
        e.preventDefault();
        axios.get(`https://api.jikan.moe/v4/anime?q=${searchQuery}&sfw=true`)
            .then((res) => {
                console.log(res)
                setSearchResults(res.data.data)
                navigate('/search')
            })
            .catch((err) => {
                console.log(err)
                navigate('/search')
            })
    }
    const logout = () => {
        axios.post(`http://localhost:8000/api/logout`, {}, {withCredentials: true})
        .then((res) => {
            console.log(res)
            setUser('')
            navigate('/')
        })
        .catch((err) => {
            console.log(err)
        })
    }
    const showListController = () => {
        if (isShowListTrue === false) {
            setIsShowListTrue(true)
        } else if (isShowListTrue === true) {
            setIsShowListTrue(false)    
        }
    }

    return (
        <div className="header">
            <div className="header-content-container">
                <div className="header-left">
                    <Link to={'/'}><h1>AnimeClub</h1></Link>
                    {/* <div className="nav">
                        <Link><h3>Browse</h3></Link>
                        <h3>News</h3>
                        <h3>Search</h3>
                    </div> */}
                    
                </div>
                <div className="search">
                    <form onSubmit={searchAnime}>
                        <input className="searchBar" placeholder="Search Anime Name" type="text" onChange={(e) => setSearchQuery(e.target.value) }/>
                        <button className='searchButton' type='submit'>Search</button>
                    </form>
                </div>
                <div>
                    { user ? 
                    <div className='logout'>
                        
                        <div className="username-dropdown">
                            {isShowListTrue ? <Link className="dropdown-content"to={`/animelists`}> 
                                    <p>My Anime Lists</p> 
                                </Link> : null}
                            <button onClick={showListController} className="username-dropdown-btn">{user.username}</button>
                            
                        </div>
                        
                        <button onClick={logout} className='logoutbutton' >Sign Out</button>
                        
                    </div> : 
                    <div>
                        <Link to={'/login'}><button className='signInButton'>Sign in</button></Link>
                        <Link to={'/register'}><button className='registerButton' >Create Account</button></Link>
                    </div>}

                    
                </div>
            </div>
        </div>
    )
}
export default Header;