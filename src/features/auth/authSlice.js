import { createSlice } from "@reduxjs/toolkit";

const storedUser = localStorage.getItem('user');

const initialState = {
    token: localStorage.getItem('token'),
    refreshToken: localStorage.getItem('refreshToken'),
    user: storedUser ? JSON.parse(storedUser) : null
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            const { token, refreshToken, user } = action.payload;
            state.token = token;
            state.refreshToken = refreshToken;
            state.user = user;
            localStorage.setItem('token', token);
            localStorage.setItem('refreshToken', refreshToken);
            localStorage.setItem('user', JSON.stringify(user)); 
        },
        logout: (state) => {
            state.token = null;
            state.refreshToken = null;
            state.user = null;
            localStorage.clear();
        }
    }
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
