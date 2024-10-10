import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  openMenù: false
};

const generalSlice = createSlice({
  name: 'general',
  initialState,
  reducers: {
    setOpenMenù(state, action) {
      state.openMenù = !state.openMenù;
    },
  },
});

export const { setOpenMenù } = generalSlice.actions;

export default generalSlice.reducer;