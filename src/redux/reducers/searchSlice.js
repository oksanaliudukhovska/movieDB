import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
    name: 'search',
    initialState: {
      headerQuery: '',  
      mainQuery: '',     
      searchPageQuery: '', 
      results: [],
      category: "movie",
    },
    reducers: {
      setHeaderQuery: (state, action) => {
        state.headerQuery = action.payload;
      },
      setMainQuery: (state, action) => {
        state.mainQuery = action.payload;
      },
      setSearchPageQuery: (state, action) => {
        state.searchPageQuery = action.payload;
      },
      setResults: (state, action) => {
        state.results = action.payload;
      },
      setCategory: (state, action) => {
        state.category = action.payload;
      },
      clearQuery: (state) => {
        state.headerQuery = '';
        state.mainQuery = '';
        state.searchPageQuery = '';
      },
    },
  });
  
  export const {
    setHeaderQuery,
    setMainQuery,
    setSearchPageQuery,
    setResults,
    clearQuery,
    setCategory,
  } = searchSlice.actions;
  
  export default searchSlice.reducer;
  

