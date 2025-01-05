import React, {useEffect, useState} from 'react'
import axios from 'axios'
import s from './TVShowFullList.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { setGenres, setPage, setSelectedGenre, setTvShows, toggleIsFetching } from '../../redux/reducers/tvShowsSlice'
import TVMiniCard from '../../Components/TVMiniCard/TVMiniCard'
import Preloader from '../../utils/Preloader'
import genresBG from '../../assets/categories.jpeg'
import { v4 as uuidv4 } from 'uuid'

const TVShowFullList = () => {
  const dispatch = useDispatch()
  const tvShows = useSelector(state => state.tvShows.tvShows);
  const page = useSelector(state => state.tvShows.page);
  const isFetching = useSelector(state => state.tvShows.isFetching);
  const totalPages = useSelector(state => state.tvShows.totalPages);
  const selectedGenre = useSelector(state => state.tvShows.selectedGenre)
  const genres = useSelector(state => state.tvShows.genres)

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`
    }
  };
  useEffect(() => {
    const fetchTVShows = async () => {
      dispatch(toggleIsFetching(true));
      const genreFilter = selectedGenre ? `&with_genres=${selectedGenre}` : '';
      try {
  const res = await axios.get(
    `${import.meta.env.VITE_API_URL}/discover/tv?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc${genreFilter}`,
    options
  );
  dispatch(setTvShows({
    tvShows: res.data.results,
    totalPages: res.data.total_pages
  }));
} catch (error) {
  console.error('API Error:', error);
}finally{
        dispatch(toggleIsFetching(false))
      }}
      fetchTVShows()
  }, [page, selectedGenre, dispatch])


  useEffect(() => {
    const fetchGenre = async () => {
      try{
        const res = await axios.get(
         `${import.meta.env.VITE_API_URL}/genre/tv/list?language=en`, options)
         dispatch(setGenres(res.data.genres))
      } catch (error){
        console.error(error)
      } 
    } 
    console.log('Fetching TV Shows with Genre:', selectedGenre);
    fetchGenre()
  }, [dispatch])

  const onGenreSelectHandler = (genreId) => {
    console.log('Selected Genre:', genreId);
     dispatch(setSelectedGenre(genreId))
  }

  const onPageChangeHandler = (pageNumber) => {
    dispatch(setPage(pageNumber))
  }

  let backgroundStyle = {
    backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), 
                      url(${genresBG})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    color: '#fff'
  };
  return (
    
    <div className={s.TVShowFullList}>
      <div className={s.totalContainer}> 
        <div className={s.categories} >
                <ul style = {backgroundStyle} >
            <li className={!selectedGenre ? s.activeGenre : ''}
            onClick={() => onGenreSelectHandler(null)}
            >
              All
            </li>
            {genres.map(genre => <li 
            key={genre.id}
            className={selectedGenre === genre.id ? s.activeGenre : ''}
            onClick={() => onGenreSelectHandler(genre.id)}
            >
              {genre.name}</li>)}
          </ul>
        </div>
        <div className={s.tvContainer}>
      {isFetching ? (<Preloader/>) : (
    tvShows.map((tv) => <TVMiniCard className={s.oneTV} key={uuidv4()} tv={tv}/>))
    }
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

export default TVShowFullList
