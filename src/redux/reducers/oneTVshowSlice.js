import { createSlice } from "@reduxjs/toolkit";

const oneTVshowSlice = createSlice({
    name: 'oneTVshow',
    initialState: {
        tvShow: {},        
    },
    reducers: {
        setTvShow: (state, action) => {
            state.tvShow = action.payload
        },
        
    }
})

export const {setTvShow} = oneTVshowSlice.actions
export default oneTVshowSlice.reducer