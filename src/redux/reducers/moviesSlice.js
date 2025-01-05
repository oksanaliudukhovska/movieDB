import { createSlice } from "@reduxjs/toolkit";

const moviesSlice = createSlice({
    name: 'movies',
    initialState: {
        movies: [],
        page: 1,
        totalPages: 1,
        genres: [],
        isFetching: false,
        selectedGenre: null,
    },
    reducers:{
        setMovies: (state, action) =>{
            state.movies = action.payload.movies;
            state.totalPages = Math.min(action.payload.totalPages, 500)
        },
        setNextPage: (state) => {
            state.page++;
        },
        setPage: (state, action) => {
            state.page = action.payload;
        },
        toggleIsFetching: (state, action) => {
            state.isFetching = action.payload;
          },
        setGenres: (state, action) => {
            state.genres = action.payload;
        },
        setSelectedGenre: (state, action) => {
            state.selectedGenre = action.payload;
            state.page = 1;
        },
    }
 
})

export const {setMovies, setNextPage, setPage, toggleIsFetching, setGenres, setSelectedGenre} = moviesSlice.actions;
export default moviesSlice.reducer;