import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import ErrorPage from '../Pages/ErrorPage';
import MoviesFullList from '../Pages/MoviesFullList/MoviesFullList';
import TVShowFullList from '../Pages/TVShowFullList/TVShowFullList';
import HomePage from '../Pages/HomePage/HomePage';
import SearchPage from '../Pages/SearchPage/SearchPage';
import MoviePage from '../Pages/MoviePage/MoviePage';
import ActorPage from '../Pages/ActorPage/ActorPage';
import CastCrewFullList from '../Pages/CastCrewFullList/CastCrewFullList';
import UserPage from '../Pages/UserPage/UserPage';
import TVShowPage from '../Pages/TVShowPage/TVShowPage';


const router = createBrowserRouter([
    {
      path: "/",
      element: <App/>,
      errorElement: <ErrorPage/>,
      children: [
        {
         path: "",
         element: <HomePage/>
        },
        {
            path: "/movies",
            element: <MoviesFullList/>,
        },
        {
            path: "/movies/:movieId",
            element: <MoviePage/>,
        },
        {
            path: "/movies/:movieId/castList",
            element: <CastCrewFullList/>,
        },
        {
            path: "/tvShows",
            element: <TVShowFullList/>
        },
        {
            path: "/tvShows/:tvShowId",
            element: <TVShowPage/>
        },
        {
            path: "/search",
            element: <SearchPage/>
        },
        {
            path: "/actor/:actorId",
            element: <ActorPage/>
        },
        {
            path: "/user",
            element: <UserPage/>
        },

      ]
    }
],
{basename: "/movieDB"} )

export default router;