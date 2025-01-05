import { createSlice } from "@reduxjs/toolkit";

const watchListSlice = createSlice({
    name: 'watchList',
    initialState: {
        watchMoviesList: JSON.parse(localStorage.getItem("watchMovie")) || [], 
        watchTVList: JSON.parse(localStorage.getItem("watchTV")) || [], 
    },
    reducers: {
        toggleWatchListMovie: (state, action) => {
            const existingIndex = state.watchMoviesList.findIndex(
              (movie) => movie.id === action.payload.id
            );
            if (existingIndex !== -1) {
              state.watchMoviesList.splice(existingIndex, 1);
            } else {
              state.watchMoviesList.push({ ...action.payload, type: "movie" });
            }
            localStorage.setItem("watchMovie", JSON.stringify(state.watchMoviesList));
          },
          removeMovieFromWatchList: (state, action) => {
            state.watchMoviesList = state.watchMoviesList.filter(
              (movie) => movie.id !== action.payload
            );
            localStorage.setItem("watchMovie", JSON.stringify(state.watchMoviesList));
          },
          toggleWatchListTV: (state, action) => {
            const existingIndex = state.watchTVList.findIndex(
              (tv) => tv.id === action.payload.id
            );
            if (existingIndex !== -1) {
              state.watchTVList.splice(existingIndex, 1);
            } else {
              state.watchTVList.push({ ...action.payload, type: "tv" });
            }
            localStorage.setItem("watchTV", JSON.stringify(state.watchTVList));
          },
          removeTVFromWatchList: (state, action) => {
            state.watchTVList = state.watchTVList.filter(
              (tv) => tv.id !== action.payload
            );
            localStorage.setItem("watchTV", JSON.stringify(state.watchTVList));
          },
    }
    }
)

export const {toggleWatchListMovie, removeMovieFromWatchList, toggleWatchListTV, removeTVFromWatchList } = watchListSlice.actions
export default watchListSlice.reducer
