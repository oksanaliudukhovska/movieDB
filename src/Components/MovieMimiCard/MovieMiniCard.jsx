import React from 'react'
import s from './MovieMiniCard.module.scss'
import { FaStar } from "react-icons/fa";
import { CiUser } from "react-icons/ci";
import { useNavigate } from 'react-router';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import {toggleWatchListMovie } from '../../redux/reducers/watchListSlice'
import { useDispatch, useSelector } from 'react-redux';

const MovieMimiCard = ({movie}) => {
  let navigate = useNavigate()
  const watchMoviesList = useSelector(state => state.watchList.watchMoviesList);
  const dispatch = useDispatch();
  const goToMoviePageHandler = () => {
    navigate(`/movies/${movie.id}`)
  }

   const toggleWatchListHandler = (event, movie) => {
        event.stopPropagation();
        dispatch(toggleWatchListMovie(movie))
      
      }
      const isInWatchList = (id) =>
        watchMoviesList.some((item) => item.id === id);
  
  return (
    <div className={s.MovieMiniCard} onClick={goToMoviePageHandler}> 
       <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
              alt={movie.title || "Image"} width={200}/>
            <p className={s.title} >{movie.title}</p>
            <span className={s.voteAvarage}>{movie.vote_average} <FaStar /></span>
            <span className={s.voteCount}>{movie.vote_count} <CiUser /></span>
            <span onClick={(e) => toggleWatchListHandler(e, movie)} 
          className={s.addtoWathcList} 
          title={
            isInWatchList(movie.id) ?
            'Remove from WhatchList' :
            'Add to WatchList'}>
              <PlaylistAddIcon 
              style={{color: isInWatchList(movie.id) ? 'orange' : 'inherit',}}/>
          </span>
    </div>
  )
}

export default MovieMimiCard;
