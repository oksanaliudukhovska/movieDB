import React, {useEffect} from 'react'
import s from './CastSeries.module.scss'
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { setCastTV, setCrewTV } from '../../redux/reducers/castSliceTV';
import userPhoto from '../../assets/UserPhoto.jpg'
import { useNavigate } from 'react-router';
import { v4 as uuidv4 } from 'uuid'

const CastSeries = ({tvShowId}) => {
    const castTV = useSelector(state => state.castTV.castTV);
    const crewTV = useSelector(state => state.castTV.crewTV);
    let dispatch = useDispatch();
    let navigate = useNavigate();
    const goToActorPageHandler = (actorId) => {
        navigate(`/actor/${actorId}`)
    }

    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`
        }
      };

     useEffect(() => {
       const fetchCastTV = async () => {
        try{
         const res = await axios.get(
            `${import.meta.env.VITE_API_URL}/tv/${tvShowId}/credits?language=en-US`, options);
            dispatch(setCastTV(res.data.cast))
            dispatch(setCrewTV(res.data.crew))
            localStorage.setItem('castTV', JSON.stringify(res.data.cast))
            localStorage.setItem('crewTV', JSON.stringify(res.data.crew))
        } catch (error){
        console.error(error)
        }
       }
       fetchCastTV() 
     }, [tvShowId]) 
  return (
    <div className={s.CastSeries}>
      <h2 className={s.title}>Series Cast</h2>
          <ul className={s.container}>
            {console.log({castTV})}
              {castTV.slice(0, 19).map((actorTV) => <li key={uuidv4()} >
                  <button className={s.actorBTN} onClick={() => goToActorPageHandler(actorTV.id)} >
                      <img 
                      src={actorTV.profile_path
                        ? `https://image.tmdb.org/t/p/w500/${actorTV.profile_path}`
                        : userPhoto
                      }
                      alt='no photo'/>
                      <span className={s.actorName}>{actorTV.name}</span>
                      <span className={s.actorCharacter}>{actorTV.character}</span>
                  </button>
              </li>)}
            </ul>
    </div>
  )
}

export default CastSeries
