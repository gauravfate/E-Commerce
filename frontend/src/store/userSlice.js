import { createSlice } from "@reduxjs/toolkit";

const initState = {
    userStatus: false,
    user: null,
};

export const userSlice = createSlice({
    name: "userSlice",
    initialState: initState,
    reducers: {
        login: (state, action) => {
            state.userStatus = true;
            state.user = action.payload;
        },
        logout: (state, action) => {
            state.userStatus = false;
            state.user = null;
        },
    },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
