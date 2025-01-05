import React, {useEffect} from 'react'
import s from './TrailerPopularList.module.scss'
import backgroundImageTrailer from '../../assets/forTrailersBG1.jpeg'
import { useDispatch, useSelector } from 'react-redux'
import { setError, setIsLoading, setTrailers } from '../../redux/reducers/trailerListSlice'
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid'

const TrailerPopularList = () => {
     const trailers = useSelector(state => state.trailerList.trailers)
     const isLoading = useSelector(state => state.trailerList.isLoading)
     const error = useSelector(state => state.trailerList.error)
     const dispatch = useDispatch()
     


    let backgroundStyle = {
            backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), 
                              url(${backgroundImageTrailer})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            color: '#fff'
          };
     
    const options = {
        method: 'GET',
        headers: {
        accept: 'application/json',
        Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`
        }
    };
          
    useEffect(() => {
        const fetchTrailers = async () => {
          dispatch(setIsLoading(true));
          try {
            const popularMovies = await axios.get(
              `${import.meta.env.VITE_API_URL}/movie/popular?language=en-US&page=1`,
              options
            );
            const trailers = await Promise.all(
              popularMovies.data.results.map(async (movie) => {
                const trailerData = await axios.get(
                  `${import.meta.env.VITE_API_URL}/movie/${movie.id}/videos?language=en-US`,
                  options
                );
                const trailer = trailerData.data.results.find(
                  (video) => video.site === "YouTube" && video.type === "Trailer"
                );
          return {
            name: movie.title,
            key: trailer ? trailer.key : null, 
          };
        })
      );

      dispatch(setTrailers(trailers));
    } catch (error) {
      dispatch(setError(error.message));
    } finally {
      dispatch(setIsLoading(false));
    }
  };

  fetchTrailers();
}, [dispatch]);       


  return (
    <div className={s.TrailerPopularList} style={backgroundStyle}>
      <h2>Latest Trailers</h2>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <ul className={s.container}>
       {trailers.map((trailer) => <li  key={uuidv4()} className={s.item}>
    <iframe
    width="800"
    height="500"
    src={`https://www.youtube.com/embed/${trailer.key}`}
    title={trailer.name}
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowFullScreen
  ></iframe>
  <p>{trailer.name}</p> </li>)}
      </ul>
    </div>
  )
}

export default TrailerPopularList
