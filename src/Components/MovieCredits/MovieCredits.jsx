import React, {useEffect} from 'react'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setMovieCredits} from '../../redux/reducers/movieCreditsSlice';
import s from './MovieCredits.module.scss'
import { useNavigate } from 'react-router';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import { toggleWatchListMovie} from '../../redux/reducers/watchListSlice'
import movieIcon from '../../assets/movieIcon.jpg'
import { v4 as uuidv4 } from 'uuid'

const MovieCredits = ({actorId}) => {
    const dispatch = useDispatch();
    const watchMoviesList = useSelector(state => state.watchList.watchMoviesList);
    const movieCredits = useSelector(state => state.movieCredits.movieCredits);
    const navigate = useNavigate()
    
    const goToMovie = (movieId) => {
        navigate(`/movies/${movieId}`, { replace: true })
    }
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`
        }
      };
    
      useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URL}/person/${actorId}/movie_credits?language=en-USS`, options)
        .then(res => dispatch(setMovieCredits(res.data.cast))
      )
    }, [actorId])

    const toggleWatchListHandler = (event, movie) => {
          event.stopPropagation();
          dispatch(toggleWatchListMovie(movie))
        }
    
        const isInWatchList = (id) =>
          watchMoviesList.some((item) => item.id === id);

  return (
    <div className={s.MovieCredits}>
      <h3 className={s.filmTitle}>Known For</h3>
      <ul className={s.container}>
      {movieCredits.map((movieCredit) => 
      <li key={uuidv4()} className={s.movieCreditBTN} onClick={() => goToMovie(movieCredit.id)}>
        <img src={movieCredit.poster_path 
        ? `https://image.tmdb.org/t/p/original${movieCredit.poster_path}`
        : movieIcon} alt="no photo" width='150' height='auto' className={s.movieCreditIMG}/>
       <p className={s.movieCreditName}> {movieCredit.title}</p>
       <span className={s.voteAvarage}>
        {movieCredit.vote_average}
       </span>
       <span className={s.voteCount}>
        {movieCredit.vote_count}
       </span>
       <span onClick={(e) => toggleWatchListHandler(e, movieCredit)} 
          className={s.addtoWathcList} 
          title={
            isInWatchList(movieCredit.id) ?
            'Remove from WhatchList' :
            'Add to WatchList'}>
              <PlaylistAddIcon 
              style={{color: isInWatchList(movieCredit.id) ? 'orange' : 'inherit',}}/>
          </span>
        </li>
        )}
     </ul>   
    </div>
  )
}

export default MovieCredits
