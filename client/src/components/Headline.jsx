import { useState } from "react";
import React from "react";
import axios from 'axios'
import { useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/bundle'
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';

const Headline = (props) => {
    const {anime, setAnime} = props;

    return (
        <div className="carousel">
        <Swiper
            style={{
                '--swiper-navigation-color': '#fff',
                '--swiper-pagination-color': '#fff',
                }}
            modules={[Autoplay, Navigation, Pagination, Scrollbar, A11y]}
            spaceBetween={50}
            slidesPerView={1}
            autoplay={{
                delay: 4000,
                disableOnInteraction: false,
                }}
            loop={true}
            pagination={{ clickable: true}}
            >
            {anime.map((content, index)=>{
                return(
                    <SwiperSlide key={index}>
                        <div className="carouselCard">
                        <div className="cardOverlay">
                            <h1>{content.title_english}</h1>
                            <p>{content.rating} - {content.year}</p>
                            <br />
                            <p className="animeSynopsis">{content.synopsis}</p>   
                        </div>
                        <img className="cardImage" src={content.images.jpg.large_image_url} alt="" />
                        </div>
                    </SwiperSlide>
                )
            })}
        </Swiper>
        </div>
        )}
export default Headline;

//VANILLA CAROUSEL
// const Headline = (props) => {
//     const {anime, setAnime} = props;
//     const [current, setCurrent] = useState(0)
//     const [autoPlay, setAutoPlay] = useState(null)

//     const slideLeft = () => {
//         setCurrent(current === anime.length - 1 ? 0 : current + 1)
//     }
//     const slideRight = () => {
//         setCurrent(current === 0 ? anime.length - 1 : current - 1 )
//     }
//     useEffect(()=> {
//         setTimeout(() => slideLeft() ,5000)
//     })

//     return (
//         <div className="carousel"> 
//             <div className="carouselWrapper">
//                 {anime.map((content, index) => {
//                     return( 
//                         <div key={index} className={index == current ? "carouselCard carouselCardActive" : "carouselCard"}>
//                             <div className="cardOverlay">
//                                 <h1>{content.title_english}</h1>
//                                 <p>{content.rating} - {content.year}</p>
//                                 <br />
//                                 <p className="animeSynopsis">{content.synopsis}</p>
//                             </div>
//                             <img className="cardImage" src={content.images.jpg.large_image_url} alt="" />
//                         </div>
//                     )
//                 })}
//                 {/* <div className="carouselPagination">
//                     {anime.map((_, index) => {
//                         return (
//                             <div key={index} className={
//                                 index == current ? "paginationDot paginationDotActive" : "paginationDot"}
//                             // } onClick={() => setCurrent()}
//                             >
//                             </div>
//                         )
//                     })}
//                 </div> */}
//                 </div>
                
//         </div>
//         )}
// export default Headline;

{/* <div className="carouselLeft">
            <h2>{currentAnime.title_english}</h2>
            <p>{currentAnime.rating} - {currentAnime.year}</p>
            <br />
            <p>{currentAnime.synopsis}</p>
        </div>
        <div className="carouselRight">
            <img src={currentAnime.images.jpg.large_image_url} alt="" />
        </div>
        <button onClick={changeCurrentAnime}>Test</button> */}