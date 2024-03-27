import { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'


function Homepage() {
const [count, setCount] = useState(0)
const [data, setData] = useState([])
const [pages, setPages] = useState()
const [searchQuery, setSearchQuery] = useState('');

// useEffect(() => {
//     axios.get(`https://api.jikan.moe/v4/seasons/now?sfw`)
//         .then((res) => {
//             console.log(res)
//             setData(res.data.data)
//             console.log(res.data.pagination.last_visible_page)
//             setPages(res.data.pagination.last_visible_page)
//         })
//         .catch((err) => {
//             console.log(err)
//         })
// }, [])
useEffect(() => {
    fetch(`https://api.jikan.moe/v4/seasons/now?sfw`)
    .then(res => {
        return res.json()
    })
    .then(data => {
        console.log(data)
        setData(data.data)
    })
    .catch(err => {
        console.log(err)})
}, [])

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
    <>
    <div className="header">
        <h1>AnimeClub</h1>
        <div>
        <button className='signInButton'>Sign in</button>
        <button className='registerButton'>Create Account</button>
        </div>
    </div>
    <div className="search">
        <form onSubmit={searchAnime}>
            <input className="searchBar" placeholder="Search Anime Name" type="text" onChange={(e) => {setSearchQuery(e.target.value)}} />
            <button className='searchButton' type='submit'>Search</button>
        </form>
        {/* <button className="btn btn-danger" onClick={getData}>Testing</button> */}
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
    </>
)
}

export default Homepage
