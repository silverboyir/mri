import {configureStore} from '@reduxjs/toolkit';
import orderSlice from '../features/orders/orderSlice';

const store = configureStore({
  reducer: {
    orders: orderSlice,
  },
});
export default store;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
