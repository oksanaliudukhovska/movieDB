import React from 'react'
import s from './Header.module.scss'
import logo1 from '../../assets/logo1.png'
import { NavLink, useNavigate } from 'react-router'
import userLogo from '../../assets/user-icon.png'
import { FaSearch,FaFilm, FaTv } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux'
import {setHeaderQuery, setSearchPageQuery} from '../../redux/reducers/searchSlice'

const Header = () => {
  const headerQuery = useSelector((state) => state.search.headerQuery);
  let dispatch = useDispatch()
  const navigate = useNavigate()

  const searchHandler = () => {
    if (headerQuery) {
      dispatch(setSearchPageQuery(headerQuery)); 
      dispatch(setHeaderQuery(''));
      navigate('/search');
    }
  };

  return (
    <header className={s.Header}>
         <div className={s.half}>
           <NavLink to='' className={s.navLinkLogo}>
           <div className={s.logo}>
           <img src={logo1} alt="logo" width='80' height='auto'/>
           <p className={s.logotitle}>movieland</p>
           </div>
            </NavLink> 
        
        <nav className={s.navigation}>
         <NavLink to='/movies' className={({ isActive }) => isActive ? `${s.navLink} ${s.active}` : s.navLink}>
         Movies</NavLink>
         <NavLink to='/movies' className={({ isActive }) => isActive ? `${s.navLinkIcons} ${s.active}` : s.navLinkIcons}><FaFilm title='movie'/></NavLink>
         <NavLink to='/tvShows' className={({ isActive }) => isActive ? `${s.navLink} ${s.active}` : s.navLink}>TV Show</NavLink>
         <NavLink to='/tvShows'className={({ isActive }) => isActive ? `${s.navLinkIcons} ${s.active}` : s.navLinkIcons}><FaTv title='tvShows'/></NavLink>
         </nav>
         </div>
        <div className={s.half}>
        <div className={s.searchContainer}>
          <input
            type="text"
            value={headerQuery}
            onChange={(e) => dispatch(setHeaderQuery(e.target.value))}
            placeholder="Search for movie, TV show ..."
            className={s.searchInput}
          />
          <button className={s.btnSearch} onClick={searchHandler}>
            <FaSearch />
          </button>
        </div>

        <NavLink to='/user'>
        <img className={s.userLogoIMG}src={userLogo} alt="user" width='30' height='auto' />
        </NavLink>
        </div>
        
        
    </header>
  )
}

export default Header
