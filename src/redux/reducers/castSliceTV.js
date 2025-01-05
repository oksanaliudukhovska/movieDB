import { createSlice } from "@reduxjs/toolkit";

const castSliceTV = createSlice({
    name: 'castTV',
    initialState: {
        castTV: [],
        crewTV: [],
    },
    reducers:{
        setCastTV: (state, action) => {
            state.castTV = action.payload
        },
        setCrewTV: (state, action) => {
            state.crewTV = action.payload
        }
    }
})

export const {setCastTV, setCrewTV} = castSliceTV.actions;
export default castSliceTV.reducer;