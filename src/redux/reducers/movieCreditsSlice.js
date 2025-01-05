import { createSlice } from "@reduxjs/toolkit";

const movieCredirSlice = createSlice({
    name: 'movieCredits',
    initialState: {
        movieCredits: [],
    },
    reducers: {
        setMovieCredits: (state, action) => {
            state.movieCredits = action.payload
        },
       
    }
})

export const {setMovieCredits, clearMovieCredits} = movieCredirSlice.actions;
export default movieCredirSlice.reducer