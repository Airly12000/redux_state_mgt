import { createSlice } from "@reduxjs/toolkit";

interface Props {
  firstTime: boolean;
  isLoggedIn: boolean;
  user: object;
  messages: any[];
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
    setIsLoggedIn: (state: any, action: any) => {
      state.isLoggedIn = action.payload;
    },
    setStoreValues: (state: any, action: any) => {
      state[action.payload.key] = action.payload.values;
    },
  },
});

export const { setIsLoggedIn, setStoreValues } = userSlice.actions;

export default userSlice.reducer;
