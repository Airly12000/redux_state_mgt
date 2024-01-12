import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface Props {
  firstTime: boolean;
  isLoggedIn: boolean;
  user: any;
  messages: any;
}

const initialState: Props = {
  firstTime: false,
  isLoggedIn: false,
  user: {},
  messages: [],
};

export const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    setIsLoggedIn: (state: any, action: PayloadAction<boolean>) => {
      state.isLoggedIn = action.payload;
    },
    setStoreValues: (
      state: any,
      action: PayloadAction<{ key: string; value: any }>
    ) => {
      state[action.payload.key] = action.payload.value;
    },
  },
});

export const { setIsLoggedIn, setStoreValues } = userSlice.actions;

export default userSlice.reducer;
