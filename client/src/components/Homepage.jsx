import { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import { useNavigate, useParams, Link } from "react-router-dom";
import Login from './Login'
import Header from './Header';
import Headline from './Headline';


function Homepage() {
const [count, setCount] = useState(0)
const [data, setData] = useState([])
const [pages, setPages] = useState()
const [searchQuery, setSearchQuery] = useState('');

useEffect(() => {
    axios.get(`https://api.jikan.moe/v4/top/anime?limit=5`)
        .then((res) => {
            console.log(res)
            setData(res.data.data)
            console.log(res.data.pagination.last_visible_page)
            setPages(res.data.pagination.last_visible_page)
        })
        .catch((err) => {
            console.log(err)
        })
}, [])
// useEffect(() => {
//     // fetch(`https://api.jikan.moe/v4/seasons/now?sfw`)
//     fetch(`https://api.jikan.moe/v4/top/anime?limit=5`)
//     .then(res => {
//         return res.json()
//     })
//     .then(data => {
//         console.log(data)
//         setData(data.data)
//     })
//     .catch(err => {
//         console.log(err)})
// }, [])

const searchAnime = (e) => {
    e.preventDefault();
    setData([])
    axios.get(`https://api.jikan.moe/v4/anime?q=${searchQuery}&sfw`)
        .then((res) => {
            console.log(res)
            setData(res.data.data)
        })
        .catch((err) => {
            console.log(err)
        })
}
return (
    <div className='dashboardContainer'>
    <Header/>
    <Headline anime={data} setAnime={setData}/>
    <div className="search">
        <form onSubmit={searchAnime}>
            <input className="searchBar" placeholder="Search Anime Name" type="text" onChange={(e) => {setSearchQuery(e.target.value)}} />
            <button className='searchButton' type='submit'>Search</button>
        </form>
    </div>
    
    <div className="animeBox">
    {data.map((anime) => (
        <div key={anime.mal_id} className='animeList'>
            <img className='images' src={anime.images.jpg.large_image_url} alt="Show PV" />
            <p className='animeName'>
                {anime.title_english ? anime.title_english : anime.title}
            </p>
        </div>
    ))}
    </div>
    </div>
)
}

export default Homepage
