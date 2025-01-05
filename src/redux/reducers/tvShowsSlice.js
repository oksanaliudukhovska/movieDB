import { createSlice } from "@reduxjs/toolkit";


const tvShowsSlice = createSlice({
    name: 'tvShows',
    initialState: {
        tvShows: [],
        page: 1,
        totalPages: 1,
        genres: [],
        isFetching: false,
        selectedGenre: null,
    },
    reducers: {
        setTvShows: (state, action) => {
            console.log('Action Payload (TV Shows):', action.payload);
            state.tvShows = action.payload.tvShows;
            state.totalPages = Math.min(action.payload.totalPages, 500)
        },
        toggleIsFetching: (state, action) => {
            state.isFetching = action.payload
        },
        setPage: (state) => {
            state.page++
        },
        setSelectedGenre: (state, action) => {
            console.log('Set Selected Genre:', action.payload);
            state.selectedGenre = action.payload;
            state.page = 1; 
        },
        setGenres: (state, action) => {
            state.genres = action.payload
        }

    }
})

export const {setTvShows, toggleIsFetching, setPage, setSelectedGenre, setGenres} = tvShowsSlice.actions
export default tvShowsSlice.reducer