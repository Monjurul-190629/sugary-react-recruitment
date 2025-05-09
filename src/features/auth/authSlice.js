import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    token : localStorage.getItem('token'),
    refreshToken : localStorage.getItem('refreshToken'),
    user : localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null
};


const authSlice = createSlice({
    name : 'auth',
    initialState,
    reducers : {
        setCredentials : (state, action) => {
            const {token, refreshToken, user} = action.payload;
            state.token = token;
            state.refreshToken = refreshToken;
            state.user = user;
            localStorage.setItem('token', token);
            localStorage.setItem('refreshToken', refreshToken);
            localStorage.setItem('user', user);
        },
        logout : (state) => {
            state.token = null;
            state.refreshToken = null;
            state.user = null;
            localStorage.clear();
        }
    }
})


export const {setCredentials, logout} = authSlice.actions;
export default authSlice.reducer;