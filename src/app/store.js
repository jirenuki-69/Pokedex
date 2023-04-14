import { configureStore } from '@reduxjs/toolkit';
import homeSlice from '../features/home/homeSlice';
import authSlice from '../features/auth/authSlice';
import gridSlice from '../features/grid/gridSlice';
import loginSlice from '../features/login/loginSlice';
import tableSlice from '../features/table/tableSlice';

export default configureStore({
  reducer: {
    auth: authSlice,
    login: loginSlice,
    home: homeSlice,
    table: tableSlice,
    grid: gridSlice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
});
