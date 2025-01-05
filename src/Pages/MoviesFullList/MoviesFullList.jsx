import React, { useEffect } from 'react'
import s from './MoviesFullList.module.scss'
import {useDispatch, useSelector} from 'react-redux'
import axios from 'axios';
import { setGenres, setMovies, setPage, setNextPage, setSelectedGenre, toggleIsFetching } from '../../redux/reducers/moviesSlice';
import MovieMiniCard from '../../Components/MovieMimiCard/MovieMiniCard';
import Preloader from '../../utils/Preloader';
import genresBG from '../../assets/categories.jpeg'
import { v4 as uuidv4 } from 'uuid'


const MoviesFullList = () => {
  const movies = useSelector(state => state.movies.movies);
  const page = useSelector(state => state.movies.page)
  const totalPages = useSelector(state => state.movies.totalPages)
  const isFetching = useSelector(state => state.movies.isFetching)
  const genres = useSelector(state => state.movies.genres)
  const selectedGenre = useSelector(state => state.movies.selectedGenre)
  const dispatch = useDispatch();

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`
    }
  };

  useEffect(() => {
    const fetchMovies = async () => {
      dispatch(toggleIsFetching(true));
      const genreFilter = selectedGenre ? `&with_genres=${selectedGenre}` : '';
      try{
       const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc${genreFilter}`, options);
       dispatch(setMovies({
        movies: res.data.results,
        totalPages: res.data.total_pages}))
        console.log('Dispatched Total Pages:', res.data.total_pages);
      } catch(error) {
        console.error('error')
    } finally{
      dispatch(toggleIsFetching(false))
    }}
    fetchMovies();
  },[page, selectedGenre, dispatch]);

  useEffect(() => {
    const fetchGenre = async () => {
      try{
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/genre/movie/list?language=en`, options)
        dispatch(setGenres(res.data.genres))
      } catch (error) {
        console.error('Error fetching genres:', error);
      }
    }
    fetchGenre()
  }, [dispatch])


  const onGenreSelectHandler = (genreId) => {
    dispatch(setSelectedGenre(genreId));
  };

  const onPageChangeHandler = (pageNumber) => {
    dispatch(setPage(pageNumber));
  }

   let backgroundStyle = {
      backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), 
                        url(${genresBG})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      color: '#fff'
    };

  return (
    <div className={s.MoviesFullList}>
      <div className={s.totalContainer}>      
      <div className={s.categories}>
        <ul style={backgroundStyle}>
        <li  className={!selectedGenre ? s.activeGenre : ''} onClick={() => onGenreSelectHandler(null)}>
            All
          </li>
        {genres.map((genre) => (
            <li
              key={genre.id}
              className={selectedGenre === genre.id ? s.activeGenre : ''}
              onClick={() => onGenreSelectHandler(genre.id)}
            >
              {genre.name}
            </li>
          ))}
        </ul>
      </div>
      <div>
      <div className={s.moviesContainer}>
      {isFetching ? (<Preloader/>) : (
      movies.map((movie) => <MovieMiniCard className={s.oneMovie} key={uuidv4()} movie={movie}/>))}
      </div>
      </div>
      </div>
      <div className={s.pagination}>
      <button
    disabled={page === 1}
    onClick={() => onPageChangeHandler(page - 1)}
  >
    Previous
  </button>
  <span>Page {page} of {totalPages}</span>
  <button
    disabled={page === totalPages}
    onClick={() => onPageChangeHandler(page + 1)}
  >
    Next
  </button>
</div>
    </div>
  )
}

export default MoviesFullList
