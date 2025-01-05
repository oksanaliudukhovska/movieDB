import { createSlice } from "@reduxjs/toolkit";

const oneActorSlice = createSlice({
    name: 'actor',
    initialState:{
        actor: {},
        expanded: false,
        isFetching: false,
    },
    reducers:{
        setActor: (state, action) => {
          state.actor = action.payload
        },
        setExpanded: (state, action) => {
          state.expanded = action.payload
        },
        toggleIsFetching: (state, action) => {
          state.isFetching = action.payload;
        },
    }
})

export const {setActor, setExpanded, toggleIsFetching} = oneActorSlice.actions;
export default oneActorSlice.reducer;