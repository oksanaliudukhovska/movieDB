import React, {useEffect} from 'react'
import axios from 'axios'
import s from './TVShowPage.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { setTvShow } from '../../redux/reducers/oneTVshowSlice'
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import CastSeries from '../../Components/Cast_series/CastSeries'
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import { toggleWatchListTV } from '../../redux/reducers/watchListSlice'
import movieIcon from '../../assets/movieIcon.jpg'

const TVShowPage = () => {
const tvShow = useSelector(state => state.oneTVshow.tvShow);
const watchTVList = useSelector(state => state.watchList.watchTVList)
let {tvShowId} = useParams();
let dispatch = useDispatch();

const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`
    }
  };

useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/tv/${tvShowId}?language=en-US`, options)
    .then(res => dispatch(setTvShow(res.data))
  )
}, [tvShowId])

let backgroundStyle = {
    backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), 
                      url(https://image.tmdb.org/t/p/original${tvShow.backdrop_path})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    color: '#fff'
  };

let percentage = Math.round(tvShow.vote_average*10);

const toggleWatchListHandler = (tvShow) => {
          dispatch(toggleWatchListTV(tvShow))
        }
    
        const isInWatchList = (id) =>
          watchTVList.some((item) => item.id === id);
        
  return (
   
    <div className={s.TVShowPage}>
          <div className={s.main} style={backgroundStyle}>
        <div className={s.poster}>
         <img 
        src={`https://image.tmdb.org/t/p/w500${tvShow.poster_path}`} 
        alt={tvShow.original_name} width='300' height='auto'/>
        </div>
        <div className={s.descrition}>
        <p className={s.title}>{tvShow.original_name} </p>
        {/* <p className={s.title}>{movie.original_title} <span className={s.titleLight}>({movie.release_date.split('-')[0]})</span></p> */}
        <p className={s.releaseDate}> First epicode : {tvShow.first_air_date}</p>
       <div className={s.circularProgressbar}>
       <CircularProgressbar className={s.circularProgressbar1}
        value={percentage}
        text={`${percentage}%`}
        styles={buildStyles({
          textColor: "#fff",
          pathColor: percentage >= 70 ? "green" : percentage >= 50 ? "orange" : "red",
          trailColor: "#d6d6d6",
          textSize: "30px",
        })}
      />
      <p>User <br/> Score</p>
       </div>
        <p>{tvShow.number_of_seasons} Seasons</p>
        <span onClick={() => toggleWatchListHandler(tvShow)} 
          className={s.addtoWathcList} 
          title={
            isInWatchList(tvShow.id) ?
            'Remove from WhatchList' :
            'Add to WatchList'}>
              <BookmarkAddIcon 
              style={{color: isInWatchList(tvShow.id) ? 'orange' : 'inherit',}}/>
          </span>
        <p className={s.overviewTitle}>Overview</p>
        <p className={s.overview}>{tvShow.overview}</p>
        </div>
        </div>
        <div className={s.cast}>
        <CastSeries tvShowId={tvShowId}/>
        <div className={s.seasons}> 
          <h3 className={s.stitle}>Seasons</h3>
         <ul className={s.seasonContainer}>
         {tvShow?.seasons?.map((season) => (
         <li key={season.id} className={s.seasonCard}>
         <img
          src={season.poster_path ?
            `https://image.tmdb.org/t/p/w200${season.poster_path}`
            : movieIcon}
          alt={season.name}
         />
         <div className={s.sDescription}>
         <h3>{season.name}</h3>
         <p> Air Date: <span> {season.air_date} </span></p>
         <p>Episodes: <span>{season.episode_count} </span></p>
         <p>Overview: <span>{season.overview || "No overview available"}</span></p>
         <p>Average Vote: <span>{season.vote_average}</span></p>
         </div>
        
         </li>
         ))}
         </ul>
        </div>
        </div>
    </div>
  )
}

export default TVShowPage
