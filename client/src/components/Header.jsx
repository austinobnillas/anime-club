import React from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
const Header = (props) => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const {searchResults, setSearchResults} = props
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
                    <button className='signInButton'>Sign in</button>
                    <button className='registerButton'>Create Account</button>
                </div>
            </div>
        </div>
    )
}
export default Header;