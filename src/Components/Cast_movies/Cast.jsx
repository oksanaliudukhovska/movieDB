import React, { useEffect } from 'react'
import s from './Cast.module.scss'
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setCast , setCrew} from '../../redux/reducers/castSlice';
import { Link, useNavigate } from 'react-router';
import userPhoto from '../../assets/UserPhoto.jpg'
import { v4 as uuidv4 } from 'uuid'

const Cast = ({movieId}) => {
   const cast = useSelector(state => state.cast.cast);
   const crew = useSelector(state => state.cast.crew);
   let dispatch = useDispatch();
   let navigate = useNavigate();
    const goToActorPageHandler = (actorId) => {
        navigate(`/${actorId}`, { replace: true })
    } 

    const goToCastFullListPage = () => {
      navigate(`/movies/${movieId}/castList`)
    }

    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`
        }
      };

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URL}/movie/${movieId}/credits?language=en-US`, options)
        .then((res) => {
          dispatch(setCast(res.data.cast)); 
          dispatch(setCrew(res.data.crew)); 
          localStorage.setItem('cast', JSON.stringify(res.data.cast));
          localStorage.setItem('crew', JSON.stringify(res.data.crew));
        }
        // .then(res => console.log(res.data)
      )
    }, [movieId])

  return (
    <div className={s.Cast}>
    <h2 className={s.title}>Top Billed Cast</h2>
      <ul className={s.container}>
        {cast.slice(0, 19).map((actor) => <li key={uuidv4()}>
            <button className={s.actorBTN} onClick={() => goToActorPageHandler(actor.id)}>
                <img 
                src={actor.profile_path
                  ? `https://image.tmdb.org/t/p/w500/${actor.profile_path}`
                  : userPhoto
                }
                alt='no photo'/>
                <span className={s.actorName}>{actor.name}</span>
                <span className={s.actorCharacter}>{actor.character}</span>
            </button>
        </li>)}
      </ul>
      <h3 className={s.fullList} onClick={() => goToCastFullListPage(movieId)}>Full Cast & Crew</h3>
    </div>
  )
}

export default Cast
