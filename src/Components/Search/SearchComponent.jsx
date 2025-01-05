import React from 'react'
import s from './Search.module.scss'
import { useDispatch, useSelector} from 'react-redux'
import { useNavigate } from 'react-router';
import {setSearchPageQuery,setMainQuery} from '../../redux/reducers/searchSlice'
import backgroundImage from '../../assets/searchBG3.jpeg'


const SearchComponent = () => {
  const mainQuery = useSelector((state) => state.search.mainQuery);
    let dispatch = useDispatch()

    let backgroundStyle = {
      backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${backgroundImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      height: '40vh',
      color: '#fff',
    };
    
  const navigate = useNavigate()

  const searchHandler = () => {
    if (mainQuery) {
      dispatch(setSearchPageQuery(mainQuery)); 
      dispatch(setMainQuery(''))
      navigate('/search');
    }
  };

  return (
    <div className={s.Search} style={backgroundStyle}>
       <div className={s.text}>
       <h2>Welcome.</h2>
       <h3>Millions of movies, TV shows and people to discover. Explore now.</h3>
       </div>
    
       <div className={s.input}>
        <input
          type="text"
          placeholder="Search for movie, TV show ..."
          value={mainQuery}
          onChange={(e) => dispatch(setMainQuery(e.target.value))  
          }
        />
         {console.log(mainQuery)}
        <button onClick={searchHandler}>Search</button>
      </div>      
    </div>
 
    
  )
}

export default SearchComponent
