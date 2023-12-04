import { createSlice } from '@reduxjs/toolkit';

import type { PayloadAction } from '@reduxjs/toolkit';

export interface UserBase {
  _id: string;
  userId: string;
  email: string;
  name: string;
}
export interface User extends UserBase {
  isKYC: boolean;
  avatar: string;
  authGoogleId: string;
  authType: string;
  camlyPoint: number;
  directCom: number;
  userRole: string;
  status: number;
  created_at?: string;
  updated_at?: string;
  __v?: number;
  referrerId: string;
  userRefs?: UserBase[];
}

type InitialState = {
  user: User;
  userToken: string;
};

const initialState: InitialState = {
  user: {} as User,
  userToken: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUser(state, action: PayloadAction<InitialState['user']>) {
      state.user = action.payload;
    },
    updateUserToken(state, action: PayloadAction<InitialState['userToken']>) {
      state.userToken = action.payload;
    },
    clearAllUserData(state) {
      state.userToken = '';
      state.user = {} as User;
    },
    updateUserRefs(state, action: PayloadAction<UserBase[]>) {
      state.user = { ...state.user, userRefs: action.payload };
    },
  },
});
export const { updateUser, updateUserToken, clearAllUserData, updateUserRefs } =
  userSlice.actions;
export default userSlice.reducer;
