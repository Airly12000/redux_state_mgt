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
    setIsLoggedIn: () => {},
    setStoreValues: () => {},
  },
});

export const { setIsLoggedIn, setStoreValues } = userSlice.actions;

export default userSlice.reducer;
