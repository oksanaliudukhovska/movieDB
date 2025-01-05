import { createSlice } from "@reduxjs/toolkit";


const oneMovieSlice  = createSlice({
    name: 'oneMovie',
    initialState: {
        movie: {}
    },
    reducers:{
        setMovie: (state, action) => {
            state.movie = action.payload
        }
        }
    
})

export const {setMovie} = oneMovieSlice.actions;
export default oneMovieSlice.reducer;