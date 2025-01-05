import { createSlice } from "@reduxjs/toolkit";

const trendingSlice = createSlice({
    name: 'trending',
    initialState:{
    trendingList: [],
    activeTab: "today",
    isFetching: false,
    
    },
    reducers:{
        setTrendingList: (state, action) => {
            state.trendingList = action.payload
        },
        setActiveTab: (state, action) => {
            state.activeTab = action.payload
        },
        toggleIsFetching: (state, action) => {
            state.isFetching = action.payload;
          },
    
    }
})

export const {setTrendingList, setActiveTab, toggleIsFetching} = trendingSlice.actions
export default trendingSlice.reducer