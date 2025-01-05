import React, {useEffect, useState} from 'react'
import s from './Trending.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { setTrendingList, setActiveTab, toggleIsFetching } from '../../redux/reducers/trendingSlice'
import { useNavigate } from 'react-router'
import Preloader from '../../utils/Preloader'
import MovieMimiCard from '../MovieMimiCard/MovieMiniCard'
import { v4 as uuidv4 } from 'uuid'

const Trending = () => {
    const trending = useSelector(state => state.trending.trendingList);
    const activeTab = useSelector(state => state.trending.activeTab)
    const isFetching = useSelector(state => state.trending.isFetching);
    const dispatch = useDispatch();
    const navigate = useNavigate();
   
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`
        }
      };

    useEffect(() => {
      const fetchTrending = async () => {
        dispatch(toggleIsFetching(true))
        const endpoint =
        activeTab === "today"
          ? `${import.meta.env.VITE_API_URL}/trending/movie/day?language=en-US`
          : `${import.meta.env.VITE_API_URL}/trending/movie/week?language=en-US`
          try{
            const res = await axios.get(endpoint, options);
            dispatch(setTrendingList(res.data.results));
          } catch(error) {
            console.error('error')
          } finally{
            dispatch(toggleIsFetching(false))
          }
        }
      fetchTrending();    
    }, [activeTab, dispatch])

    const handleTabChange = (tab) => {
      dispatch(setActiveTab(tab));
      dispatch(setTrendingList([]))
    }

  return (
    <div className={s.Trending}>
     <div className={s.panel}>
     <h2>Trending Movies</h2> 
        <button
          style={{
           color: activeTab === "today" ? "transparent" : "#000000", 
         backgroundImage:
         activeTab === "today"
         ? "linear-gradient(to right, #FFD700, #FF4500)" 
         : "none",
        WebkitBackgroundClip: activeTab === "today" ? "text" : "none", 
        WebkitTextFillColor: activeTab === "today" ? "transparent" : "initial"
          }}
          onClick={() => handleTabChange("today")}
        >
          Today
        </button>
        <button
          style={{
          color: activeTab === "week" ? "transparent" : "#000000", 
         backgroundImage:
        activeTab === "week"
        ? "linear-gradient(to right, #FFD700, #FF4500)" 
        : "none",
        WebkitBackgroundClip: activeTab === "week" ? "text" : "none", 
        WebkitTextFillColor: activeTab === "week" ? "transparent" : "initial"
          }}
          onClick={() => handleTabChange("week")}
        >
          This Week
        </button>
      </div>
      <ul className={s.container}>
  {isFetching ? (
    <Preloader/>
  ) : (
    trending.map((movie) => (
     <li className={s.movieCard} key={uuidv4()}><MovieMimiCard  movie={movie}/></li> 
    ))
  )}
</ul>
    </div>
  )
}

export default Trending
