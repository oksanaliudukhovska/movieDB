import React, {useEffect} from 'react'
import s from './CastCrewFullList.module.scss'
import { useDispatch, useSelector } from 'react-redux';
import { setCast, setCrew } from '../../redux/reducers/castSlice';
import userPhoto from '../../assets/UserPhoto.jpg'
import { v4 as uuidv4 } from 'uuid'
import { useNavigate } from 'react-router';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const CastCrewFullList = () => {
  const cast = useSelector(state => state.cast.cast);
  const crew = useSelector(state => state.cast.crew);
  let dispatch = useDispatch();
  let navigate = useNavigate();

  useEffect(() => {
    if (!cast.length || !crew.length) {
      const storedCast = localStorage.getItem('cast');
      const storedCrew = localStorage.getItem('crew');
      if (storedCast && storedCrew) {
        dispatch(setCast(JSON.parse(storedCast)));
        dispatch(setCrew(JSON.parse(storedCrew)));
      }
    }
  }, [cast, crew]);

  const goToActorPageHandler = (actodId) => {
    navigate(`/actor/${actodId}`)
  }
  const goBack = () => {
    navigate(-1)
  }
 
  return (
    <div className={s.CastCrewFullList}>
        <button onClick={goBack}> <ArrowBackIcon/> back</button>
      <div className={s.container}>
        <div className={s.castColumn}>
        <span>Cast ({cast.length})</span>
        <ul>
          {cast.map((actor) => 
            <li key={uuidv4()} onClick={() => goToActorPageHandler(actor.id)}>
             <img 
             src={actor.profile_path 
            ? `https://image.tmdb.org/t/p/w500/${actor.profile_path}` 
            : userPhoto} 
            alt={actor.name || "No Photo"} 
            width="50" 
            height="auto" 
             />
             <div className={s.name}>
             <p className={s.actorName}> {actor.name}</p>
             <p className={s.actorJob}>{actor.character}</p>
             </div>
            </li>)}
        </ul>
        </div>
        <div className={s.crewColumn}>
        <span>Crew ({crew.length})</span>
        <ul>
          {crew.map(stuff => 
            <li key={stuff.id}>
           <p className={s.stuffName}> {stuff.name}</p>
           <p className={s.stuffJob}>{stuff.job}</p>
            </li>)}
        </ul>
        </div>
       {console.log({cast})}
       {console.log({crew})}
      </div>
    </div>
  )
}

export default CastCrewFullList
