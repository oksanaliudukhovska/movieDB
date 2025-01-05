import React, {useEffect} from 'react'
import axios from 'axios'
import s from './SearchPage.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { setSearchPageQuery, setResults, setCategory} from '../../redux/reducers/searchSlice'
import { FaSearch } from "react-icons/fa";
import {useNavigate } from 'react-router';
import movieIcon from '../../assets/movieIcon.jpg'

const SearchPage = () => {
  const searchPageQuery = useSelector(state => state.search.searchPageQuery)
  const results = useSelector(state => state.search.results)
  const category = useSelector(state => state.search.category)
  let dispatch = useDispatch()
 let navigate = useNavigate()

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`
    }
  };

useEffect(() => {
  if (searchPageQuery) {
    const fetchSearch = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/search/${category}?query=${searchPageQuery}&include_adult=false&language=en-US&page=1`,
          options
        );
        dispatch(setResults(res.data.results));
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    };
    fetchSearch();
  }
   
}, [searchPageQuery, category, dispatch]);

const selectSearchCategoryHandler = (categoryName) => {
  console.log(`Switching category to: ${categoryName}`);
  dispatch(setCategory(categoryName));
};

    const goToPageHandler = (resultId, result) => {
      console.log(result)
      if(result.release_date){
      navigate(`/movies/${resultId}`)}
      else{
        navigate(`/tvShows/${resultId}`)
      }
    }

  return (
    <div className={s.SearchPage}>
      <div className={s.input}>
              <input 
              type="text" 
              placeholder='Search for movie, TV show ...'
              value={searchPageQuery}
              onChange={(e) => dispatch(setSearchPageQuery(e.target.value))}
              />
                <FaSearch className={s.searchIcon}/>
             </div>
     <div className={s.resultsContainer}>
       <div className={s.caterories}>
       <div className={s.categoriesContainer}>
       <h4 className={s.categoryTitle}>Search</h4>
        <p onClick={() => selectSearchCategoryHandler('movie')}className={category === "movie" ? s.active : ""}>Movies</p>
        <p onClick={() => selectSearchCategoryHandler('tv')} className={category === "tv" ? s.active : ""}>TV Shows</p>
       </div>
       </div>
       <div className={s.results}>
       {results.length > 0 ? (
    <>
      <h2 className={s.resultsTitle}>
        Search results for: <span>"{searchPageQuery}"</span>
      </h2>
      <ul className={s.resultsList}>
        {results.map((result) => (
          <li className={s.item} key={result.id} onClick={() => goToPageHandler(result.id, result)}>
            <img src={result.poster_path ?
              `https://image.tmdb.org/t/p/w500${result.poster_path}`
              : movieIcon} 
              alt={result.title || "Image"} width={100} />
              <div className={s.description}>
              <h4> {result.title || result.name} </h4>
              <span>{result.release_date}</span>
              <p className={s.overview}>{result.overview}</p>
              </div>
          </li>
        ))}
      </ul>
    </>
  ) : (
    <div className={s.noResults}>
      <h2>No results found for: <span>"{searchPageQuery}"</span></h2>
      <p>Try searching for something else.</p>
    </div>
  )}
       </div>
      
     </div>
    </div>
  )
}

export default SearchPage
