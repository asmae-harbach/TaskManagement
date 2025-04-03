import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    initialState : {isloggedIn : false},
    name : "auth",
    reducers : {
        login(state){
            state.isloggedIn = true
        },
        logout(state){
            state.isloggedIn = false
        }
    }
})

export const authActions = authSlice.actions
export default authSlice.reducer