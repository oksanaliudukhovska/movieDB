import { configureStore } from '@reduxjs/toolkit'
import moviesSlice from '../reducers/moviesSlice'
import oneMovieSlice from '../reducers/oneMovieSlice'
import castSlise from '../reducers/castSlice'
import castSliseTV from '../reducers/castSliceTV'
import oneActorSlice from '../reducers/oneActorSlice'
import movieCreditsSlice from '../reducers/movieCreditsSlice'
import trailerSlice from '../reducers/trailerSlice'
import recommendationSlice from '../reducers/recommendationSlice'
import searchSlice from '../reducers/searchSlice'
import trendingSlice from '../reducers/trendingSlice'
import trailerListSlice from '../reducers/trailerListSlice'
import tvShowsSlice from '../reducers/tvShowsSlice'
import oneTVshowSlice from '../reducers/oneTVshowSlice'
import watchListSlice from '../reducers/watchListSlice'

let store = configureStore({
reducer: {
    movies: moviesSlice,
    oneMovie: oneMovieSlice,
    cast: castSlise,
    castTV: castSliseTV,
    oneActor: oneActorSlice,
    movieCredits: movieCreditsSlice,
    trailer: trailerSlice,
    recommendations: recommendationSlice,
    search: searchSlice,
    trending: trendingSlice,
    trailerList: trailerListSlice,
    tvShows: tvShowsSlice,
    oneTVshow: oneTVshowSlice,
    watchList: watchListSlice,
}

})

export default store;