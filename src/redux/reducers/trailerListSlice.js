import { createSlice } from "@reduxjs/toolkit";

const trailerListSlice = createSlice({
    name: 'trailerList',
    initialState: {
        trailers: [],
        isLoading: false,
        error: null,
    },
    reducers: {
        setTrailers: (state, action) => {
            state.trailers = action.payload
        },
        setIsLoading: (state, action) => {
            state.isLoading = action.payload
        },
        setError: (state, action) => {
            state.error = action.payload
        }
    }
})

export const {setTrailers, setIsLoading, setError} = trailerListSlice.actions
export default trailerListSlice.reducer