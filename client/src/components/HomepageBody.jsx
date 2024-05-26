import React from "react"
import { Link, useNavigate } from "react-router-dom"

const HomepageBody = (props) => {
    const {currentAnime, setCurrentAnime} = props
    const {topAnime, setTopAnime} = props

    return (
        <div className="homepageBodyContainer">
        <div className="leftHomepageBody">
            <h1>Currently Airing</h1>
                <div className="animeBox">
                {currentAnime.map((anime) => (
                    <Link key={anime.mal_id} to={`/anime/${anime.mal_id}`}>
                        <div className='animeList'>
                            <img className='images' src={anime.images.jpg.large_image_url} alt="Show PV" />
                            <p className='animeName'>
                                {anime.title_english ? anime.title_english : anime.title}
                            </p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
        <div className="rightHomepageBody">
        <h1>Top Anime</h1>
                <div className="topAnimeList">
                {topAnime.map((anime, index) => (
                    <Link key={anime.mal_id} to={`/anime/${anime.mal_id}`}>
                    <div className='topAnimeBox'>
                        <img className='topAnimeImages' src={anime.images.jpg.large_image_url} alt="Show PV" />
                        <div>
                            <h3 className='topAnimeTitle'>
                            {anime.title_english ? anime.title_english : anime.title}
                            </h3>
                            <p>{anime.rating}</p>
                            <p>{anime.score}/10</p>
                        </div>
                        
                    </div>
                    </Link>
                ))}
            </div>
        </div>
        
        </div>
    )
}
export default HomepageBody;