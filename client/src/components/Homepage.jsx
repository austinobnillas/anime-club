import { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import { useNavigate, useParams, Link } from "react-router-dom";
import Login from './Login'
import Header from './Header';
import Headline from './Headline';
import HomepageBody from './HomepageBody';


function Homepage() {
const [count, setCount] = useState(0)
const [data, setData] = useState([])
const [currentAnime, setCurrentAnime] = useState([])
const [topAnime, setTopAnime] = useState([])
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
        });
        // axios.get(`https://api.jikan.moe/v4/seasons/now?sfw&limit=10`)
        axios.get(`https://api.jikan.moe/v4/seasons/now?sfw`)
        .then((res) => {
            console.log("yes")
            console.log(res)
            setCurrentAnime(res.data.data)
        })
        .catch((err) => {
            console.log(err)
        })
        axios.get(`https://api.jikan.moe/v4/top/anime?filter=bypopularity&limit=10`)
        .then((res) => {
            console.log("yes")
            console.log(res)
            setTopAnime(res.data.data)
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
    axios.get(`https://api.jikan.moe/v4/anime?q=${searchQuery}&sfw=true`)
        .then((res) => {
            console.log(res)
            setData(res.data.data)
        })
        .catch((err) => {
            console.log(err)
        })
}
return (
    <div className=''>
    <Header/>
    <Headline anime={data} setAnime={setData}/>
    <HomepageBody 
        currentAnime={currentAnime} 
        setCurrentAnime={setCurrentAnime}
        topAnime={topAnime} 
        setTopAnime={setTopAnime}
        />
    </div>
)
}

export default Homepage
