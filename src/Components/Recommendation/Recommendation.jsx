import React, {useEffect} from 'react'
import s from './Recommendation.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { setRecommendation } from '../../redux/reducers/recommendationSlice'
import { useNavigate } from 'react-router'
import { toggleWatchListMovie } from '../../redux/reducers/watchListSlice'
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import { v4 as uuidv4 } from 'uuid'
import movieIconBG from '../../assets/movieIconBG.jpg'

const Recommendation = ({movieId}) => {
    const recommendations = useSelector(state => state.recommendations.recommendations);
    const watchMoviesList = useSelector(state => state.watchList.watchMoviesList);
    let dispatch = useDispatch();
    const navigation = useNavigate()

    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`
        }
      };

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URL}/movie/${movieId}/recommendations?language=en-US&page=1`, options)
        .then(res => dispatch(setRecommendation(res.data.results))
        // .then(res => console.log(res.data)
    )
    }, [movieId])

    const goToRecommendationMovieHandler = (movieId) => {
      navigation(`/movies/${movieId}`)
    }

    const toggleWatchListHandler = (event, movie) => {
          event.stopPropagation();
          dispatch(toggleWatchListMovie(movie))
          // console.log(movie)
        }
    
        const isInWatchList = (id) =>
          watchMoviesList.some((item) => item.id === id);
    

  return (
    <div className={s.Recommendation}>
      <h2>Recommendations</h2>
      <ul className={s.container}>
        {recommendations.length > 0 ? (<>
          {recommendations.map((recommendation) => <li key={uuidv4()} className={s.item} onClick={() => goToRecommendationMovieHandler(recommendation.id)}>
            <img src={recommendation.backdrop_path ?
              `https://image.tmdb.org/t/p/w500/${recommendation.backdrop_path}`
              : movieIconBG}/>
           <div className={s.recTitle}> 
            <span>{recommendation.title} {`(${recommendation.release_date.split("-")[0]})`}</span> 
            <span>{Math.round(recommendation.vote_average * 10)}%</span>
            </div> 
            <span onClick={(e) => toggleWatchListHandler(e, recommendation)} 
          className={s.addtoWathcList} 
          title={
            isInWatchList(recommendation.id) ?
            'Remove from WhatchList' :
            'Add to WatchList'}>
              <PlaylistAddIcon 
              style={{color: isInWatchList(recommendation.id) ? 'orange' : 'inherit',}}/>
          </span>
            </li>)}
        </>) : ( <>
        <p className={s.empty}>No recommendations</p></>)}
       
      </ul>
    </div>
  )
}

export default Recommendation
