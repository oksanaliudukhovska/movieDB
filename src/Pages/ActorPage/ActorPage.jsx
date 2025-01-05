import React, { useEffect } from 'react'
import axios from 'axios';
import s from './ActorPage.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router';
import { setActor, setExpanded, toggleIsFetching } from '../../redux/reducers/oneActorSlice';
import { Typography, Button, Collapse } from "@mui/material";
import MovieCredits from '../../Components/MovieCredits/MovieCredits';
import userPhoto from '../../assets/UserPhoto.jpg'
import Preloader from '../../utils/Preloader';

const ActorPage = () => {
  const actor = useSelector(state => state.oneActor.actor);
  const expanded = useSelector(state => state.oneActor.expanded);
  const isFetching = useSelector(state => state.oneActor.isFetching)
  const dispatch = useDispatch();
  let { actorId } = useParams();


  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`
    }
  };

  useEffect(() => {
    const fetchActor = async () => {
      dispatch(toggleIsFetching(true));
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/person/${actorId}?language=en-US`, options);
        dispatch(setActor(res.data))
      } catch (error) {
        console.error('error')
      } finally {
        dispatch(toggleIsFetching(false))
      }
    }
    fetchActor();

  }, [actorId, dispatch])

  const handleToggle = () => {
    dispatch(setExpanded(!expanded));
  };

  return (
    <div className={s.ActorPage}>
      {isFetching ? (<Preloader/>) : (<>
              <div className={s.info}>
              <img src={actor.profile_path ?
                `https://image.tmdb.org/t/p/w500${actor.profile_path}`
                : userPhoto} alt="no photo" width='300' height='auto' />
              <div className={s.personal}>
                <h2>{actor.name}</h2>
                <h3>Biography</h3>
                <div className={s.collapseContainer}>
                  <Collapse in={expanded} collapsedSize={100}>
                    <Typography className={s.text}>{actor.biography}</Typography>
                  </Collapse>
                  <Button onClick={handleToggle} variant="text" className={s.collapseBTN}>
                    {expanded ? "Read Less" : "Read More"}
                  </Button>
                </div>
      
                <h4>Known For  <span>{actor.known_for_department}</span></h4>
                <h4>Gender  <span>{actor.gender === 2 ? 'Male' : 'Female'}</span></h4>
                <h4>Birthdayr  <span>{actor.birthday}</span></h4>
                <h4>Place of Birth   <span>{actor.place_of_birth}</span></h4>
                <h4>Also Known As</h4>
                <ul>
                  {actor?.also_known_as?.map((item, idx) => <li key={idx}>{item}</li>)}
                </ul>
              </div>
            </div>
            <div className={s.filmList}>
              <MovieCredits key={actorId} actorId={actorId} />
            </div>
     </> )}

    </div>
  )
}

export default ActorPage
