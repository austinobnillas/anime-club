import React from "react";

const HomepageBody = (props) => {
    const {currentAnime, setCurrentAnime} = props
    const {topAnime, setTopAnime} = props
    return (
        <div className="homepageBodyContainer">
        <div className="leftHomepageBody">
            <h1>Currently Airing</h1>
                <div className="animeBox">
                    
                {currentAnime.map((anime) => (
                    <div key={anime.mal_id} className='animeList'>
                        <img className='images' src={anime.images.jpg.large_image_url} alt="Show PV" />
                        <p className='animeName'>
                            {anime.title_english ? anime.title_english : anime.title}
                        </p>
                    </div>
                ))}
            </div>
        </div>
        <div className="rightHomepageBody">
        <h1>Top Anime</h1>
                <div className="topAnimeList">
                {topAnime.map((anime, index) => (
                    <div key={anime.mal_id} className='topAnimeBox'>
                        {/* <h1>{index+1}</h1> */}
                        <img className='topAnimeImages' src={anime.images.jpg.large_image_url} alt="Show PV" />
                        <div>
                            <h3 className='topAnimeTitle'>
                            {anime.title_english ? anime.title_english : anime.title}
                            </h3>
                            <p>{anime.rating}</p>
                            <p>{anime.score}/10</p>
                        </div>
                        
                    </div>
                ))}
            </div>
        </div>
        
        </div>
    )
}
export default HomepageBody;