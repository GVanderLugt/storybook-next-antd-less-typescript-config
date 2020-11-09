import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface SystemState {
  loggedIn: boolean;
  session: string;
  userName: string;
}

const initialState: SystemState = {
  loggedIn: false,
  session: '',
  userName: '',
};

export type UpdateUserNamePayload = PayloadAction<string>;

const systemSlice = createSlice({
  name: 'system',
  initialState,
  reducers: {
    updateUserName: function (state, action: UpdateUserNamePayload) {
      state.userName = action.payload;
    },
  },
});

const { actions, reducer } = systemSlice;
export const { updateUserName } = actions;
export default reducer;
