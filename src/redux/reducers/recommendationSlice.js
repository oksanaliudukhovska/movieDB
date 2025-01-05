import { createSlice } from "@reduxjs/toolkit";

const recommendationSlice = createSlice({
    name: 'recommendations',
    initialState: {
        recommendations: [],
    },
    reducers:{
        setRecommendation: (state, action) => {
            state.recommendations = action.payload
        }
    }
})

export const {setRecommendation} = recommendationSlice.actions;
export default recommendationSlice.reducer