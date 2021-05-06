import {createAsyncThunk, createEntityAdapter
  , createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import {normalize, schema, Schema} from 'normalizr';
import {Order} from './types';

// eslint-disable-next-line max-len
export const orderEntity : Schema<any> = new schema.Entity('orders', {}, {idAttribute: 'order_number'});

const orderAdapter = createEntityAdapter<Order>({
  selectId: (order : Order) => {
    return order.order_number;
  },
});
const url : string = 'https://gist.githubusercontent.com/ryanjn/07512cb1c008a5ec754aea6cbbf4afab/raw/eabb4d324270cf0d3d17a79ffb00ff3cfaf9acc3/orders.json';

export const fetchOrders = createAsyncThunk(
    'orders/fetchAll',
    async () => {
      const data = await axios.get(url);
      const normalized = normalize(data.data, [orderEntity]);
      return normalized.entities.orders;
    },
);

export const orderSlice = createSlice({
  name: 'orders',
  initialState: orderAdapter.getInitialState({loading: false}),
  reducers: {
    ordersReceived(state, action) {
      orderAdapter.setAll(state, action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchOrders.fulfilled, (state, action) => {
      const enteties : any = action.payload;
      orderAdapter.setAll(state, enteties);
    });
  },
});

export const {
  selectById: selectOrderById,
  selectAll: selectAllOrders,
  selectTotal: selectTotalOrder,
} = orderAdapter.getSelectors((state : { [k: string]: any }) => state.orders);

export default orderSlice.reducer;
