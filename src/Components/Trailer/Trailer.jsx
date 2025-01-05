import React, {useEffect} from 'react'
import s from './Trailer.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { setTrailers } from '../../redux/reducers/trailerSlice'
import { v4 as uuidv4 } from 'uuid'

const Trailer = ({movieId}) => {
  const trailers = useSelector(state => state.trailer.trailers);
  const dispatch = useDispatch()
  
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`
    }
  };

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/movie/${movieId}/videos?language=en-USS`, options)
    .then(res => dispatch(setTrailers(res.data.results))
    // .then(res => console.log(res.data)
  )
}, [movieId])

  return (
    <div className={s.Trailer}>
      <h2 className={s.title}>Media</h2>
      <div className={s.containerTrailer}>
       {trailers.filter((trailer) => trailer.site === "YouTube" && trailer.type === "Trailer")
          .slice(0, 1).map(((trailer) =>
              <iframe
              key={uuidv4()}
              width="800"
              height="500"
              src={`https://www.youtube.com/embed/${trailer.key}`}
              title={trailer.name}
              style={{
                width: '80%', 
                height: '45vw', 
                maxWidth: '800px', 
                maxHeight: '450px', 
                border: 'none',
              }}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
           ))}
           </div>
    </div>
  )
}

export default Trailer
