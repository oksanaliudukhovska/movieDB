import { createSlice } from "@reduxjs/toolkit";

const castSlice = createSlice({
    name: 'cast',
    initialState: {
        cast: [],
        crew: [],
    },
    reducers:{
        setCast: (state, action) => {
            state.cast = action.payload
        },
        setCrew: (state, action) => {
            state.crew = action.payload
        }
    }
})

export const {setCast, setCrew} = castSlice.actions;
export default castSlice.reducer;