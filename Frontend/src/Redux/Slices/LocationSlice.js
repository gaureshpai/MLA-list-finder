import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  locations: JSON.parse(localStorage.getItem('locations')) || [],
};

const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    addLocation: (state, action) => {
      state.locations = [action.payload];
      localStorage.setItem('locations', JSON.stringify(state.locations));
    },
    clearLocations: (state) => {
      state.locations = [];
      localStorage.removeItem('locations');
    },
  },
});

export const { addLocation, clearLocations } = locationSlice.actions;
export default locationSlice.reducer;