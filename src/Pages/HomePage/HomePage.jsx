import React from 'react'
import s from './HomePage.module.scss'
import SearchComponent from '../../Components/Search/SearchComponent'
import Trending from '../../Components/Trending/Trending'
import TrailerPopularList from '../../Components/TrailerPopularList/TrailerPopularList'
const HomePage = () => {
  return (
    <div className={s.HomePage}>
      <SearchComponent/>
      <Trending/>
      <TrailerPopularList/>
    </div>
  )
}

export default HomePage
