import React, { useEffect } from 'react'
import s from './MoviePage.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router';
import axios from 'axios';
import { setMovie } from '../../redux/reducers/oneMovieSlice';
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import Cast from '../../Components/Cast_movies/Cast';
import Trailer from '../../Components/Trailer/Trailer';
import Recommendation from '../../Components/Recommendation/Recommendation';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import { toggleWatchListMovie } from '../../redux/reducers/watchListSlice'
import movieIcon from '../../assets/movieIcon.jpg'

const MoviePage = () => {
    const movie = useSelector(state => state.oneMovie.movie);
     const watchMoviesList = useSelector(state => state.watchList.watchMoviesList);
    const dispatch = useDispatch();
    let {movieId} = useParams();

    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`
        }
      };

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URL}/movie/${movieId}?language=en-US`, options)
        .then(res => dispatch(setMovie(res.data)))
    }, [movieId])
    
    let backgroundStyle = {
        backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), 
                          url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: '#fff'
      };

    let percentage = Math.round(movie.vote_average*10);

    const toggleWatchListHandler = (movie) => {
          dispatch(toggleWatchListMovie(movie))
        }
    
        const isInWatchList = (id) =>
          watchMoviesList.some((item) => item.id === id);

  return (
    <div className={s.MoviePage} >
      <div className={s.main} style={backgroundStyle}>
        <div className={s.poster}>
         <img 
        src={movie.poster_path ?
          `https://image.tmdb.org/t/p/w500${movie.poster_path}`
          : movieIcon} 
        alt={movie.original_title} width='300' height='auto'/>
        </div>
        <div className={s.descrition}>
        <p className={s.title}>{movie.original_title} </p>
        <p className={s.releaseDate}>{movie.release_date}</p>
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
        <p className={s.generalInfo}> <span>Production country:</span> {movie?.production_countries?.map((country, idx) => <span className={s.list} key={idx}>{'\u2022'} {country.name}</span>)}</p>
        <p className={s.generalInfo}> <span>Genres:</span> {movie?.genres?.map((genre, idx)=> <span className={s.list} key={idx}> {'\u2022'} {genre.name}</span>)}</p>
        <p className={s.generalInfo}>Budget</p>
        <p className={s.budget}>{new Intl.NumberFormat("en-US", {
         style: "currency",
         currency: "USD",
         }).format(movie.budget)}</p>
        <p className={s.budgetTitle}>Revenue</p>
        <p className={s.budget}>{new Intl.NumberFormat("en-US", {
         style: "currency",
         currency: "USD",
         }).format(movie.revenue)}</p>
          <span onClick={() => toggleWatchListHandler(movie)} 
          className={s.addtoWathcList} 
          title={
            isInWatchList(movie.id) ?
            'Remove from WhatchList' :
            'Add to WatchList'}>
              <BookmarkAddIcon 
              style={{color: isInWatchList(movie.id) ? 'orange' : 'inherit',}}/>
          </span>
        <p className={s.overviewTitle}>Overview</p>
        <p className={s.overview}>{movie.overview}</p>
        </div>
        </div>
        <div className={s.cast}><Cast key={movieId} movieId={movieId}/>
        </div>
        <div className={s.recommendations}><Recommendation key={movieId} movieId={movieId}/></div>
        <div className={s.trailer}><Trailer movieId={movieId}/></div>
    </div>
  )
}

export default MoviePage
