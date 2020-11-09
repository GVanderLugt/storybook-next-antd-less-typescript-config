import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createHttpReducer } from 'store/util/httpReducer';

export interface PlaceholderData {
  result?: string[] | number[];
  byId?: object;
}

export interface PlaceholderState {
  data?: PlaceholderData;
}

const initialState: PlaceholderState = {};

export type FetchUsersPayload = PayloadAction<null>;

const placeholderSlice = createSlice({
  name: 'placeholder',
  initialState,
  reducers: {
    fetchUsers: createHttpReducer<
      void
    >() /** @todo Figure out how to not need `void` here */,
  },
});

const { actions, reducer } = placeholderSlice;
export const { fetchUsers } = actions;
export default reducer;
