import { createSlice, createAsyncThunk, isPending, isFulfilled, isRejected, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../models';
import * as usersApi from '../api/user';

interface UserState {
  user: User | null;
  status: 'idle' | 'loading' | 'failed';
}

const initialState: UserState = {
  user: null,
  status: 'idle',
};

export const loginUser = createAsyncThunk('user/loginUser', usersApi.loginUser);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, { payload }: PayloadAction<User>) => {
        state.user = payload;
      })
      .addMatcher(isPending, (state) => {
        state.status = 'loading';
      })
      .addMatcher(isFulfilled, (state) => {
        state.status = 'idle';
      })
      .addMatcher(isRejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const { logoutUser } = userSlice.actions;

export default userSlice.reducer;