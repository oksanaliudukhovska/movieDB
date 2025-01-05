import React from 'react'
import { FaStar } from "react-icons/fa";
import { CiUser } from "react-icons/ci";
import s from './TVMiniCard.module.scss'
import { useNavigate } from 'react-router';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import {toggleWatchListTV } from '../../redux/reducers/watchListSlice'
import { useDispatch, useSelector } from 'react-redux';

const TVMiniCard = ({tv}) => {
  const watchTVList = useSelector(state => state.watchList.watchTVList);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const goToTVShowPage = () => {
    navigate(`/tvShows/${tv.id}`)};

    const toggleWatchListHandler = (e, tv) => {
            e.stopPropagation();
            dispatch(toggleWatchListTV(tv))
            // console.log(movie)
          }
      
          const isInWatchList = (id) =>
            watchTVList.some((item) => item.id === id);
  
  return (
    <div className={s.TVMiniCard} onClick={goToTVShowPage}> 
          <img src={`https://image.tmdb.org/t/p/w500${tv.poster_path}`} 
                 alt={tv.title || "Image"} width={200}/>
               <p className={s.title}>{tv.name}</p>
               <span className={s.voteAvarage}>{tv.vote_average} <FaStar /></span>
               <span className={s.voteCount}>{tv.vote_count} <CiUser /></span>
               <span onClick={(e) => toggleWatchListHandler(e, tv)} 
          className={s.addtoWathcList} 
          title={
            isInWatchList(tv.id) ?
            'Remove from WhatchList' :
            'Add to WatchList'}>
              <PlaylistAddIcon 
              style={{color: isInWatchList(tv.id) ? 'orange' : 'inherit',}}/>
          </span>
       </div>
  )
}

export default TVMiniCard
