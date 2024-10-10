import { configureStore } from '@reduxjs/toolkit';
import generalSlice from './slice/generalSlice';

const Store = configureStore({
  reducer: {
    general: generalSlice,
  },
});

export default Store;