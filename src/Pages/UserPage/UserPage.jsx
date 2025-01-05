import React, {useEffect, useState} from 'react'
import s from './UserPage.module.scss'
import userBaner from '../../assets/userBaner.png'
import userIcon from '../../assets/user-icon.png'
import { useDispatch, useSelector } from 'react-redux'
import { removeMovieFromWatchList, removeTVFromWatchList } from '../../redux/reducers/watchListSlice'
import { v4 as uuidv4 } from 'uuid'
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useNavigate } from 'react-router'

const UserPage = () => {
  const watchMoviesList = useSelector(state => state.watchList.watchMoviesList);
  const  watchTVList = useSelector(state => state.watchList.watchTVList);
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const [isMoviesTab, setIsMoviesTab] = useState(true);
  const items = isMoviesTab ? watchMoviesList : watchTVList;

  const handleTabSwitch = (tab) => {
    setIsMoviesTab(tab === "movies");
  };

    let backgroundStyle = {
        backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), 
                          url(${userBaner})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '33vh',
        color: '#fff'
      };

      const goToPageHandler = (itemId, item) => {
        if (item.type === "movie") {
            navigate(`/movies/${itemId}`);
        } else if (item.type === "tv") {
            navigate(`/tvShows/${itemId}`);
        }
    };  

  return (
    <div className={s.UserPage}>
      <div className={s.baner} style={backgroundStyle}>
       <img src={userIcon} alt="User Name" width='300' height='auto' className={s.userIcon}/>
       <p className={s.gradientText}>User_name</p>
      </div>
      <section className={s.watchListContainer}>
        <div className={s.titleContainer}>
        <h4 className={s.watchTitle}>My Watchlist</h4>
        <div className={s.toggleMovieTV}>
        <button
              className={isMoviesTab ? s.activeTab : ""}
              onClick={() => handleTabSwitch("movies")}
            >
              Movies ({watchMoviesList.length})
            </button>
            <button
              className={!isMoviesTab ? s.activeTab : ""}
              onClick={() => handleTabSwitch("tvShows")}
            >
              TV Shows ({watchTVList.length})
            </button>
        </div>
        </div>
        {items.length > 0 ? ( <ul className={s.itemsList}>
        { items.map((item) => <li key={uuidv4()} className={s.item} onClick={() => goToPageHandler(item.id, item)}>
        <img src={`https://image.tmdb.org/t/p/original${item.poster_path}`} 
              alt={item.title || "Image"} width={150}/>
              <div className={s.description}>
              <p className={s.title}>{item.title || item.name}</p>
              <div className={s.progressContainer}>
        <CircularProgressbar
          className={s.circularProgressbar}
          value={Math.round(item.vote_average * 10)} 
          text={`${Math.round(item.vote_average * 10)}%`} 
          styles={buildStyles({
            textColor: "#00000086", 
            pathColor: Math.round(item.vote_average * 10) >= 70 
              ? "green" 
              : Math.round(item.vote_average * 10) >= 50 
              ? "orange" 
              : "red", 
            trailColor: "#d6d6d6", 
            textSize: "30px", 
          })}
        />
             </div>
           <p className={s.overview}>{item.overview}</p>
          <button className={s.removeButton}
          onClick={(e) => {
            e.stopPropagation();
            isMoviesTab
              ? dispatch(removeMovieFromWatchList(item.id))
              : dispatch(removeTVFromWatchList(item.id))
          }}
          > <HighlightOffIcon className={s.icon}/> Remove</button>
              </div>
         
          </li>)}
        </ul> ) 
        : (
          <>
          <div className={s.empty}>
           <p>
           You haven't added any movies to your watchlist.
           </p>
          </div>
          </>
        )}
      </section>
    </div>
  )
}

export default UserPage
