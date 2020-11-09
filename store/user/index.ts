import { createSlice } from '@reduxjs/toolkit';
import { createHttpReducer } from 'store/util/httpReducer';

export interface UserData {
  result?: string[] | number[];
  byId?: object;
}

export interface UserState {
  data?: UserData;
}

const initialState: UserState = {};

export interface CreateUserPayload {
  name?: string;
  email: string;
  password: string;
  confirmPassword?: string;
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    createUser: createHttpReducer<CreateUserPayload>(),
  },
});

const { actions, reducer } = userSlice;
export const { createUser } = actions;
export default reducer;
